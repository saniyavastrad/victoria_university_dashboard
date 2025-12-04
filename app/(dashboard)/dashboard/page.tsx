"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const departmentData = [
  { department: "Business Management", attendance: 92 },
  { department: "Law", attendance: 88 },
  { department: "Health Science", attendance: 90 },
  { department: "Information Technology", attendance: 94 },
  { department: "Engineering", attendance: 87 },
];

const lecturerPieData = [
  { name: "Business Management", attendance: 92 },
  { name: "Law", attendance: 88 },
  { name: "Health Science", attendance: 90 },
  { name: "Information Technology", attendance: 94 },
  { name: "Engineering", attendance: 87 },
];

const PIE_COLORS = ["#0ea5e9", "#6366f1", "#22c55e", "#f97316", "#e11d48"];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-sky-100 bg-sky-50/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Quality Assurance Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            High-level summary of key metrics and recent activity for Victoria University.
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-5">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="shadow-none border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled students</CardTitle>
                <Badge variant="secondary">Today</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,326</div>
                <p className="text-xs text-muted-foreground">+12.4% from last term</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">Across 7 faculties</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Teaching staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">312</div>
                <p className="text-xs text-muted-foreground">Including adjunct and visiting</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="dashboard-fade-slide-in flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is where you can surface enrollment changes, timetable updates, and other
              important events across the university.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-sky-100 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-900">
                Attendance by Department
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="department" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                    formatter={(value: number) => [`${value}%`, "Attendance"]}
                  />
                  <Bar dataKey="attendance" fill="#0ea5e9" radius={[4, 4, 0, 0]} isAnimationActive>
                    <LabelList
                      dataKey="attendance"
                      position="top"
                      formatter={(value: any) => `${value}%`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-sky-100 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-900">
                Department Attendance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                    formatter={(value: number, _name, entry: any) => [
                      `${value}%`,
                      entry?.payload?.name ?? "Attendance",
                    ]}
                  />
                  <Pie
                    data={lecturerPieData}
                    dataKey="attendance"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    isAnimationActive
                    animationDuration={800}
                    labelLine={false}
                    label={({ name }) => name}
                  >
                    {lecturerPieData.map((entry, index) => (
                      <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
