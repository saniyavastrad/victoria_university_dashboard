"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ContractStatus = "Active" | "Expired" | "Expiring Soon";

type ContractRow = {
  serial: number;
  name: string;
  issuedDate: string;
  expiryDate: string;
  issuedTo: string;
  status: ContractStatus;
};

const CONTRACT_ROWS: ContractRow[] = [
  {
    serial: 1,
    name: "Clinical Training MOU",
    issuedDate: "2023-01-15",
    expiryDate: "2026-01-14",
    issuedTo: "City Hospital Group",
    status: "Active",
  },
  {
    serial: 2,
    name: "Library Resource Sharing",
    issuedDate: "2020-09-01",
    expiryDate: "2023-08-31",
    issuedTo: "Regional University Consortium",
    status: "Expired",
  },
  {
    serial: 3,
    name: "Industry Internship Partnership",
    issuedDate: "2022-07-10",
    expiryDate: "2025-07-09",
    issuedTo: "Tech Innovations Ltd.",
    status: "Expiring Soon",
  },
  {
    serial: 4,
    name: "International Exchange Agreement",
    issuedDate: "2021-03-01",
    expiryDate: "2024-02-29",
    issuedTo: "Global Education Network",
    status: "Active",
  },
  {
    serial: 5,
    name: "Research Collaboration MOU",
    issuedDate: "2019-11-20",
    expiryDate: "2022-11-19",
    issuedTo: "National Science Council",
    status: "Expired",
  },
  {
    serial: 6,
    name: "Student Accommodation Agreement",
    issuedDate: "2022-05-05",
    expiryDate: "2025-05-04",
    issuedTo: "City Housing Authority",
    status: "Expiring Soon",
  },
  {
    serial: 7,
    name: "Clinical Placement Agreement",
    issuedDate: "2024-02-10",
    expiryDate: "2027-02-09",
    issuedTo: "Regional Health Board",
    status: "Active",
  },
  {
    serial: 8,
    name: "IT Infrastructure Support",
    issuedDate: "2021-09-30",
    expiryDate: "2024-09-29",
    issuedTo: "Digital Systems Co.",
    status: "Expiring Soon",
  },
  {
    serial: 9,
    name: "Sports Facilities Usage MOU",
    issuedDate: "2018-06-12",
    expiryDate: "2021-06-11",
    issuedTo: "City Sports Council",
    status: "Expired",
  },
  {
    serial: 10,
    name: "Alumni Engagement Partnership",
    issuedDate: "2023-04-01",
    expiryDate: "2026-03-31",
    issuedTo: "Alumni Association",
    status: "Active",
  },
  {
    serial: 11,
    name: "Community Outreach Program",
    issuedDate: "2020-01-10",
    expiryDate: "2023-01-09",
    issuedTo: "Local NGO Alliance",
    status: "Expired",
  },
  {
    serial: 12,
    name: "Faculty Development Sponsorship",
    issuedDate: "2022-09-05",
    expiryDate: "2025-09-04",
    issuedTo: "Education Trust Fund",
    status: "Active",
  },
  {
    serial: 13,
    name: "Joint Degree Program MOU",
    issuedDate: "2023-06-18",
    expiryDate: "2028-06-17",
    issuedTo: "International Partner University",
    status: "Active",
  },
];

const STATUS_COLOR_CLASSES: Record<ContractStatus, string> = {
  Active: "text-emerald-700",
  Expired: "text-rose-700",
  "Expiring Soon": "text-amber-700",
};

export default function MousContractsPage() {
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "">("");

  const filteredRows = useMemo(() => {
    if (!statusFilter) return CONTRACT_ROWS;
    return CONTRACT_ROWS.filter((row) => row.status === statusFilter);
  }, [statusFilter]);
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-sky-100 bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            MOUs and Contracts
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div className="dashboard-fade-slide-in flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-5">
            <div className="text-sm font-medium text-emerald-900">Active Contracts</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-emerald-950">
                24
              </span>
              <span className="text-xs font-medium uppercase text-emerald-800">
                currently valid
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-rose-300 bg-rose-50 px-6 py-5">
            <div className="text-sm font-medium text-rose-900">Expired Contracts</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-rose-950">
                8
              </span>
              <span className="text-xs font-medium uppercase text-rose-800">
                require review
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-300 bg-amber-50 px-6 py-5">
            <div className="text-sm font-medium text-amber-900">Upcoming Expirations</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-amber-950">
                12
              </span>
              <span className="text-xs font-medium uppercase text-amber-800">
                next 90 days
              </span>
            </div>
          </div>
        </div>
        <Card className="border-sky-100 bg-white">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold tracking-tight">
              MOUs and Contracts Overview
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Status</span>
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter((event.target.value || "") as ContractStatus | "")
                }
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 shadow-sm outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Expiring Soon">Expiring Soon</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sky-50 text-sky-900">
                    <th className="px-4 py-3 text-left font-medium">Serial Number</th>
                    <th className="px-4 py-3 text-left font-medium">Contract Name</th>
                    <th className="px-4 py-3 text-left font-medium">Issued Date</th>
                    <th className="px-4 py-3 text-left font-medium">Expiry Date</th>
                    <th className="px-4 py-3 text-left font-medium">Issued To</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRows.map((row) => (
                    <tr key={row.serial} className="hover:bg-slate-50">
                      <td className="px-4 py-3 align-top text-slate-700">{row.serial}</td>
                      <td className="px-4 py-3 align-top text-slate-900">{row.name}</td>
                      <td className="px-4 py-3 align-top text-slate-700">{row.issuedDate}</td>
                      <td className="px-4 py-3 align-top text-slate-700">{row.expiryDate}</td>
                      <td className="px-4 py-3 align-top text-slate-700">{row.issuedTo}</td>
                      <td
                        className={
                          "px-4 py-3 align-top font-medium " + STATUS_COLOR_CLASSES[row.status]
                        }
                      >
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
      </Card>
      </div>
    </div>
  );
}
