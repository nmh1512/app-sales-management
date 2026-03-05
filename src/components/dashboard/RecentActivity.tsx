import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityLog } from "@/types";
import { User, ArrowRight } from "lucide-react";

interface RecentActivityProps {
  logs: ActivityLog[];
}

export function RecentActivity({ logs }: RecentActivityProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Hoạt động gần đây
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-y-auto max-h-[400px] scrollbar-hide">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${log.url ? "bg-blue-500/10 text-blue-500" : "bg-muted text-muted-foreground"}`}
              >
                {log.url ? (
                  <ArrowRight className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {log.user_name}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                  {log.description}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {log.time_ago}
                </div>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              Chưa có hoạt động nào
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
