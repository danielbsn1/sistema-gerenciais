import "../css/app.css";
import "./styles/globals.css";
import "./components/Index.css";
import "./styles/button.css";

import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", {
            eager: true,
        }) as Record<string, { default: React.ComponentType<any> }>;

        return pages[`./pages/${name}.tsx`];
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
