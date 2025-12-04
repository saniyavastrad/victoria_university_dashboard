"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
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

const lecturerPieData = [
  { name: "Business Management", attendance: 92 },
  { name: "Law", attendance: 88 },
  { name: "Health Science", attendance: 90 },
  { name: "Information Technology", attendance: 94 },
  { name: "Engineering", attendance: 87 },
];

const departmentAttendanceChartConfig: ChartConfig = {
  attendance: {
    label: "Attendance %",
    color: "var(--chart-1)",
  },
};

const departmentBreakdownChartConfig: ChartConfig = {
  attendance: {
    label: "Attendance %",
    color: "var(--chart-1)",
  },
};

export default function LecturerAttendancePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-4">
      <Card className="border-sky-100 bg-sky-50/70">
        <CardHeader className="flex flex-col gap-2 pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Lecturer Attendance Management
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Dashboard</span>
            <ChevronRight className="h-3 w-3" />
            <span>Quality Modules</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">Lecturer Attendance</span>
          </div>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      <div className="dashboard-fade-slide-in flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-sky-100 bg-sky-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sky-900">
                Present Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">--</div>
            </CardContent>
          </Card>

          <Card className="border-sky-100 bg-sky-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sky-900">
                Absent Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">--</div>
            </CardContent>
          </Card>

          <Card className="border-sky-100 bg-sky-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-sky-900">
                Overall Attendance %
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">--</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-sky-100 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-900">
                Attendance by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={departmentAttendanceChartConfig}
                className="mt-2"
              >
                <BarChart
                  data={departmentData}
                  margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="department"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="attendance"
                    fill="var(--color-attendance)"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive
                  >
                    <LabelList
                      dataKey="attendance"
                      position="top"
                      formatter={(value: any) => `${value}%`}
                    />
                  </Bar>
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
                config={departmentBreakdownChartConfig}
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
