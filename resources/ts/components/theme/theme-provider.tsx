import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
    defaultTheme?: Theme;
    children: React.ReactNode;
};

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
        const dark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(dark ? "dark" : "light");
        return;
    }

    root.classList.add(theme);
}

export function ThemeProvider({
    defaultTheme = "system",
    children,
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        return stored ?? defaultTheme;
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (theme !== "system") {
            return;
        }
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => applyTheme("system");
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return ctx;
}
