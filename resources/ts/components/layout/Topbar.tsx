import { router, usePage } from "@inertiajs/react";
import {
    Bell,
    BellOff,
    ChevronDown,
    LogOut,
    Monitor,
    Moon,
    Sun,
    Download,
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
import { SystemNotification } from "@/types/usuario";

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
    const { notificacoes } = usePage().props as {
        notificacoes?: SystemNotification[];
    };
    const lista = notificacoes ?? [];
    const naoLidas = lista.filter((n) => !n.read_at).length;

    function formatarData(iso?: string) {
        if (!iso) return "";
        const data = new Date(iso);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Notificações"
                        className="relative rounded-full"
                    />
                }
            >
                <Bell className="size-4" />
                {naoLidas > 0 && (
                    <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
                        {naoLidas}
                    </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-80">
                <DropdownMenuGroup className="flex items-center justify-between">
                    <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                    {naoLidas > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() =>
                                router.post("/notificacoes/read-all", {}, {
                                    preserveScroll: true,
                                })
                            }
                        >
                            Marcar todas como lidas
                        </Button>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {lista.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 px-2 py-6 text-center text-sm text-muted-foreground">
                        <BellOff className="size-5" />
                        Você não tem notificações
                    </div>
                ) : (
                    <div className="max-h-80 overflow-y-auto">
                        {lista.map((n) => (
                            <div
                                key={n.id}
                                className={
                                    n.read_at
                                        ? "border-b px-2 py-2 last:border-b-0"
                                        : "border-b bg-primary/5 px-2 py-2 last:border-b-0"
                                }
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm">{n.data?.mensagem ?? "Notificação"}</p>
                                    {!n.read_at && (
                                        <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                                    )}
                                </div>
                                <div className="mt-1 flex items-center justify-between gap-2">
                                    <span className="text-xs text-muted-foreground">
                                        {formatarData(n.created_at)}
                                    </span>
                                    {n.data?.caminho_erros && (
                                        <a
                                            href={`/notificacoes/${n.id}/erros`}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                        >
                                            <Download className="size-3" />
                                            Baixar erros
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => router.get("/notificacoes")}
                    className="justify-center text-center"
                >
                    Ver todas
                </DropdownMenuItem>
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
