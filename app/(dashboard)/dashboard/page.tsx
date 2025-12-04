"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";

const departmentData = [
  { department: "Business Management", attendance: 92 },
  { department: "Law", attendance: 88 },
  { department: "Health Science", attendance: 90 },
  { department: "Information Technology", attendance: 94 },
  { department: "Engineering", attendance: 87 },
];

const data = [
  { name: "Business Mgmt", present: 45, absent: 10 },
  { name: "Law", present: 38, absent: 7 },
  { name: "Health Science", present: 50, absent: 12 },
  { name: "IT", present: 42, absent: 8 },
  { name: "Engineering", present: 36, absent: 14 },
];

const lecturerPieData = [
  { name: "Business Management", attendance: 92 },
  { name: "Law", attendance: 88 },
  { name: "Health Science", attendance: 90 },
  { name: "Information Technology", attendance: 94 },
  { name: "Engineering", attendance: 87 },
];

const attendanceChartConfig: ChartConfig = {
  present: {
    label: "Present",
    color: "var(--chart-1)",
  },
  absent: {
    label: "Absent",
    color: "var(--chart-2)",
  },
};

const departmentAttendanceChartConfig: ChartConfig = {
  attendance: {
    label: "Attendance",
    color: "var(--chart-1)",
  },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-sky-100 bg-sky-50/70">
        <CardHeader className="pb-3">
          <CardTitle className="text-5xl font-semibold tracking-tight text-[#002147]">
            Quality Assurance Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            High-level summary of key metrics and recent activity for Victoria University.
          </p>
        </CardHeader>
        <CardContent className="pt-0 pb-5">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="shadow-none border-slate-200 bg-sky-100 text-[#002147]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Enrolled students</CardTitle>
                <Badge variant="secondary" className="text-xs font-semibold text-[#002147]">
                  Today
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4,326</div>
                <p className="text-sm text-[#002147]">+12.4% from last term</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-slate-200 bg-sky-100 text-[#002147]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Active courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">128</div>
                <p className="text-sm text-[#002147]">Across 7 faculties</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-slate-200 bg-sky-100 text-[#002147]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">Teaching staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">312</div>
                <p className="text-sm text-[#002147]">Including adjunct and visiting</p>
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
            <CardContent>
              <ChartContainer
                config={attendanceChartConfig}
                className="mt-2"
              >
                <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="present"
                    fill="#1D4ED8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="absent"
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-sky-100 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-900">
                Department Attendance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={departmentAttendanceChartConfig}
                className="mt-2"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
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
                      <Cell
                        key={entry.name}
                        fill={`var(--chart-${(index % 5) + 1})`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
