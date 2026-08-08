import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/toast";
import { TooltipProvider } from "./components/ui/tooltip";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", {
            eager: true,
        }) as Record<string, { default: React.ComponentType<any> }>;

        return pages[`./pages/${name}.tsx`];
    },

    setup({ el, App, props }) {
        createRoot(el).render(
            <ThemeProvider>
                <TooltipProvider>
                    <App {...props} />
                    <Toaster />
                </TooltipProvider>
            </ThemeProvider>,
        );
    },
});
