import { router, usePage } from "@inertiajs/react";
import {
    Bell,
    ChevronDown,
    LogOut,
    Monitor,
    Moon,
    Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTheme } from "@/components/theme/theme-provider";

function ThemeMenu() {
    const { theme, setTheme } = useTheme();

    const icons: Record<string, React.ReactNode> = {
        light: <Sun className="size-4" />,
        dark: <Moon className="size-4" />,
        system: <Monitor className="size-4" />,
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Alternar tema"
                        className="rounded-full"
                    />
                }
            >
                <Sun className="size-4 dark:hidden" />
                <Moon className="hidden size-4 dark:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Tema</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={(value) =>
                            setTheme(value as "light" | "dark" | "system")
                        }
                    >
                        {(["light", "dark", "system"] as const).map((t) => (
                            <DropdownMenuRadioItem
                                key={t}
                                value={t}
                                closeOnClick
                                className="gap-2"
                            >
                                {icons[t]}
                                {t === "light"
                                    ? "Claro"
                                    : t === "dark"
                                      ? "Escuro"
                                      : "Sistema"}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function NotificationsMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Notificações"
                        className="rounded-full"
                    />
                }
            >
                <Bell className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-72">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                    Você não tem notificações
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function AccountMenu({ user }: { user?: { name?: string; email?: string } }) {
    const name = user?.name ?? "Usuário";
    const email = user?.email;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        aria-label="Conta"
                        className="gap-2 rounded-full px-2"
                    />
                }
            >
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {name.charAt(0).toUpperCase()}
                </span>
                <ChevronDown className="hidden size-4 sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col">
                            <span className="text-sm">{name}</span>
                            {email && (
                                <span className="truncate text-xs font-normal text-muted-foreground">
                                    {email}
                                </span>
                            )}
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => router.post("/logout")}
                >
                    <LogOut />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default function Topbar() {
    const { auth } = usePage().props as { auth?: { user?: any } };

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
            <SidebarTrigger
                variant="ghost"
                size="icon-sm"
                aria-label="Alternar sidebar"
            />
            <div className="flex items-center gap-1">
                <ThemeMenu />
                <NotificationsMenu />
                <AccountMenu user={auth?.user} />
            </div>
        </header>
    );
}
