import { useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";

import { toast } from "@/components/ui/toast";

type Flash = {
    success?: string;
    error?: string;
};

export default function FlashToasts() {
    const { flash } = usePage().props as { flash?: Flash };
    const prev = useRef<Flash>({});

    useEffect(() => {
        if (flash?.success && flash.success !== prev.current.success) {
            toast.add({ title: flash.success, type: "success" });
        }
        if (flash?.error && flash.error !== prev.current.error) {
            toast.add({ title: flash.error, type: "error" });
        }
        prev.current = {
            success: flash?.success,
            error: flash?.error,
        };
    }, [flash?.success, flash?.error]);

    return null;
}
