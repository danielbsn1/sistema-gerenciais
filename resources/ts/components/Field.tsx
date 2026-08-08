import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldProps = {
    label?: string;
    required?: boolean;
    error?: string;
    hint?: string;
    className?: string;
    children: React.ReactNode;
};

export function Field({
    label,
    required,
    error,
    hint,
    className,
    children,
}: FieldProps) {
    return (
        <div className={cn("grid gap-1.5", className)}>
            {label && (
                <Label className={cn(required && "after:ml-0.5 after:content-['*'] after:text-destructive")}>
                    {label}
                </Label>
            )}
            {children}
            {hint && !error && (
                <p className="text-xs text-muted-foreground">{hint}</p>
            )}
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}
