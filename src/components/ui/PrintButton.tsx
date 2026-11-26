"use client";

export function PrintButton() {
  return (
    <button type="button" className="btn btn--sm" onClick={() => window.print()} data-testid="print-resume">
      Print or save as PDF
    </button>
  );
}
