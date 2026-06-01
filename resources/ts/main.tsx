import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import './styles/globals.css';
import './components/Index.css';
import './styles/button.css';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<{ default: React.ComponentType }>(
            "./pages/**/*.tsx",
            { eager: true },
        );
        return pages[`./pages/${name}.tsx`].default;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
