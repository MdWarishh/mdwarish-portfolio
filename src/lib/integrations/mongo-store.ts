import type { Collection, MongoClient as MongoClientType } from "mongodb";
import type { Lead, LeadStore, NewLead, SyncChannel, SyncState } from "@/lib/contact/service";

type LeadDoc = Omit<NewLead, never>;

const globalForMongo = globalThis as unknown as {
  __mwMongo?: Promise<MongoClientType>;
  __mwIndexes?: Promise<unknown>;
};

/** One client per server process (and across hot reloads in development). */
async function getClient(uri: string): Promise<MongoClientType> {
  if (!globalForMongo.__mwMongo) {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 8_000, appName: "mdwarish.com" });
    globalForMongo.__mwMongo = client.connect().catch((error) => {
      globalForMongo.__mwMongo = undefined;
      throw error;
    });
  }
  return globalForMongo.__mwMongo;
}

function ensureIndexes(collection: Collection<LeadDoc>) {
  globalForMongo.__mwIndexes ??= Promise.all([
    collection.createIndex({ idempotencyKey: 1 }, { unique: true, name: "uniq_idempotency" }),
    collection.createIndex({ createdAt: -1 }, { name: "by_created" }),
    collection.createIndex({ "sync.sheets.status": 1, "sync.email.status": 1, createdAt: 1 }, { name: "by_sync" }),
  ]).catch((error) => {
    globalForMongo.__mwIndexes = undefined;
    throw error;
  });
  return globalForMongo.__mwIndexes;
}

function isDuplicateKey(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}

export async function createMongoLeadStore({ uri, dbName }: { uri: string; dbName: string }): Promise<LeadStore> {
  const client = await getClient(uri);
  const collection = client.db(dbName).collection<LeadDoc>("leads");
  await ensureIndexes(collection);

  const toLead = (doc: LeadDoc & { _id: { toString(): string } }): Lead => {
    const { _id, ...rest } = doc;
    return { ...rest, id: _id.toString() };
  };

  return {
    async insert(lead) {
      try {
        const result = await collection.insertOne({ ...lead });
        return { id: result.insertedId.toString(), duplicate: false };
      } catch (error) {
        if (!isDuplicateKey(error)) throw error;
        const existing = await collection.findOne({ idempotencyKey: lead.idempotencyKey }, { projection: { _id: 1 } });
        if (!existing) throw error;
        return { id: existing._id.toString(), duplicate: true };
      }
    },

    async updateSync(id: string, channel: SyncChannel, state: SyncState) {
      const { ObjectId } = await import("mongodb");
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: { [`sync.${channel}`]: state } });
    },

    async findNeedingSync({ olderThan, maxAttempts, limit }) {
      const needs = (c: SyncChannel) => ({
        [`sync.${c}.status`]: { $in: ["pending", "failed"] },
        [`sync.${c}.attempts`]: { $lt: maxAttempts },
      });
      const docs = await collection
        .find({ createdAt: { $lte: olderThan }, $or: [needs("sheets"), needs("email")] })
        .sort({ createdAt: 1 })
        .limit(limit)
        .toArray();
      return docs.map((doc) => toLead(doc));
    },
  };
}
