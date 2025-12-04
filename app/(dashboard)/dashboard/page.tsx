import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    </div>
  );
}
