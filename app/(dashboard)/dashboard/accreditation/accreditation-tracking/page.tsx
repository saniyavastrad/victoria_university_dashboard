"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AccreditationRow = {
  sn: string;
  programName: string;
  accreditedDate: string;
  expiryDate: string;
  status: string;
};

type CsvParseResult = {
  data: any[];
};

const parseCsvWithHeader = (
  text: string,
  options: {
    header: boolean;
    skipEmptyLines: boolean;
    complete: (result: CsvParseResult) => void;
    error: (err: Error) => void;
  }
) => {
  try {
    const rawLines = text.split(/\r?\n/);
    const lines = options.skipEmptyLines
      ? rawLines.filter((line) => line.trim().length > 0)
      : rawLines;

    if (!options.header || lines.length === 0) {
      options.complete({ data: [] });
      return;
    }

    const headerLine = lines[0];
    const headers = headerLine.split(",").map((h) => h.trim());

    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = (values[index] ?? "").trim();
      });
      return row;
    });

    options.complete({ data });
  } catch (e: any) {
    const err = e instanceof Error ? e : new Error("Failed to parse CSV data");
    options.error(err);
  }
};

let cachedState: {
  rows: AccreditationRow[];
  hasUploadedFile: boolean;
  filter: "all" | "expiring" | "under-review";
} | null = null;

export default function AccreditationTrackingPage() {
  const [rows, setRows] = useState<AccreditationRow[]>(cachedState?.rows ?? []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUploadedFile, setHasUploadedFile] = useState(
    cachedState?.hasUploadedFile ?? false
  );
  const [filter, setFilter] = useState<"all" | "expiring" | "under-review">(
    cachedState?.filter ?? "all"
  );

  const getRowClassName = (row: AccreditationRow, index: number) => {
    const base = "transition-colors";

    // Status-based highlighting (yellow)
    const status = row.status?.toLowerCase() ?? "";
    const isUnderReview = status === "under review";

    // Expiry-based highlighting (red when within next 10 days)
    let isExpiringSoon = false;
    if (row.expiryDate) {
      const parsed = Date.parse(row.expiryDate);
      if (!Number.isNaN(parsed)) {
        const today = new Date();
        const expiry = new Date(parsed);
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffDays = (expiry.getTime() - today.getTime()) / msPerDay;

        if (diffDays >= 0 && diffDays <= 10) {
          isExpiringSoon = true;
        }
      }
    }

    if (isExpiringSoon) {
      return `${base} bg-red-50 hover:bg-red-100`;
    }

    if (isUnderReview) {
      return `${base} bg-yellow-50 hover:bg-yellow-100`;
    }

    // Default alternating colors
    const stripe = index % 2 === 0 ? "bg-white" : "bg-sky-50";
    return `${base} ${stripe} hover:bg-sky-100`;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text !== "string") {
        setError("Unable to read the selected file.");
        setLoading(false);
        return;
      }

      parseCsvWithHeader(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const mapped: AccreditationRow[] = (result.data as any[]).map((row) => ({
            sn: row["S/n"] ?? row["S/N"] ?? row["SNo"] ?? "",
            programName:
              row["Program name"] ??
              row["Program Name"] ??
              row["Programme Name"] ??
              "",
            accreditedDate:
              row["Accredited Date"] ??
              row["Accreditation Date"] ??
              row["Accredited date"] ??
              "",
            expiryDate: row["Expiry Date"] ?? row["Expiry date"] ?? "",
            status: row["Status"] ?? row["status"] ?? "",
          }));

          setRows(mapped);
          setHasUploadedFile(true);
          setLoading(false);
        },
        error: (err) => {
          setError(err.message || "Failed to parse the uploaded file.");
          setLoading(false);
        },
      });
    };

    reader.onerror = () => {
      setError("Failed to read the selected file.");
      setLoading(false);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    const loadCsv = async () => {
      if (cachedState?.rows && cachedState.rows.length > 0) {
        // Use cached data instead of refetching when returning to this page
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/data/NCHE_report.csv");

        if (!response.ok) {
          throw new Error("Failed to load NCHE_report.csv");
        }

        const csvText = await response.text();

        parseCsvWithHeader(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const mapped: AccreditationRow[] = (result.data as any[]).map((row) => ({
              sn: row["S/n"] ?? row["S/N"] ?? row["SNo"] ?? "",
              programName:
                row["Program name"] ??
                row["Program Name"] ??
                row["Programme Name"] ??
                "",
              accreditedDate:
                row["Accredited Date"] ??
                row["Accreditation Date"] ??
                row["Accredited date"] ??
                "",
              expiryDate: row["Expiry Date"] ?? row["Expiry date"] ?? "",
              status: row["Status"] ?? row["status"] ?? "",
            }));

            setRows(mapped);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message || "Failed to parse NCHE_report.csv");
            setLoading(false);
          },
        });
      } catch (err: any) {
        setError(err.message || "Failed to load NCHE_report.csv");
        setLoading(false);
      }
    };

    loadCsv();
  }, []);

  useEffect(() => {
    cachedState = {
      rows,
      hasUploadedFile,
      filter,
    };
  }, [rows, hasUploadedFile, filter]);

  const isExpiringSoon = (row: AccreditationRow) => {
    if (!row.expiryDate) return false;
    const parsed = Date.parse(row.expiryDate);
    if (Number.isNaN(parsed)) return false;

    const today = new Date();
    const expiry = new Date(parsed);
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = (expiry.getTime() - today.getTime()) / msPerDay;

    return diffDays >= 0 && diffDays <= 10;
  };

  const isUnderReview = (row: AccreditationRow) => {
    const status = row.status?.toLowerCase() ?? "";
    return status === "under review";
  };

  const filteredRows = rows.filter((row) => {
    if (filter === "expiring") {
      return isExpiringSoon(row);
    }
    if (filter === "under-review") {
      return isUnderReview(row);
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <Card className="border-sky-100 bg-white shadow-sm rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Accreditation Tracking
              </CardTitle>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="rounded-md border border-sky-200 bg-white px-2 py-1 text-xs text-sky-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300"
              >
                <option value="all">All</option>
                <option value="expiring">Expiring</option>
                <option value="under-review">Under Review</option>
              </select>
            </div>
            {!hasUploadedFile && (
              <div className="flex items-center gap-2">
                <label className="inline-flex cursor-pointer items-center rounded-md border border-sky-200 bg-white px-3 py-1.5 text-xs font-medium text-sky-800 shadow-sm hover:bg-sky-50">
                  <span>Upload CSV</span>
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading && (
            <p className="text-sm text-sky-800/80">Loading accreditation data...</p>
          )}
          {error && !loading && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sky-50 text-left text-xs font-semibold uppercase tracking-wide text-sky-800">
                    <th className="px-4 py-2 border-b border-sky-100">S/n</th>
                    <th className="px-4 py-2 border-b border-sky-100">Program name</th>
                    <th className="px-4 py-2 border-b border-sky-100">Accredited Date</th>
                    <th className="px-4 py-2 border-b border-sky-100">Expiry Date</th>
                    <th className="px-4 py-2 border-b border-sky-100">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, index) => (
                    <tr
                      key={`${row.programName}-${index}`}
                      className={getRowClassName(row, index)}
                    >
                      <td className="px-4 py-2 border-b border-sky-50 align-top">
                        {row.sn}
                      </td>
                      <td className="px-4 py-2 border-b border-sky-50 align-top">
                        {row.programName}
                      </td>
                      <td className="px-4 py-2 border-b border-sky-50 align-top">
                        {row.accreditedDate}
                      </td>
                      <td className="px-4 py-2 border-b border-sky-50 align-top">
                        {row.expiryDate}
                      </td>
                      <td className="px-4 py-2 border-b border-sky-50 align-top">
                        {row.status}
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-6 text-center text-sm text-sky-800/70"
                      >
                        No accreditation records found in NCHE_report.csv.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
