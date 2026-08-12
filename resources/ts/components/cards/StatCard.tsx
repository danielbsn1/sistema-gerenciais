import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
    title: string;
    value: number | string;
    icon: ReactNode;
};

export default function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {title}
                    </p>
                    <p className="text-2xl font-semibold leading-tight text-foreground">
                        {value}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
