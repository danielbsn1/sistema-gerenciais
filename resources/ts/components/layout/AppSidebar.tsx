import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Laptop,
    Users,
    ArrowLeftRight,
    ClipboardList,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    const current = window.location.pathname;
    const { auth } = usePage().props as { auth?: { user?: { role?: string } } };
    const isAdmin = auth?.user?.role === "admin";

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/equipamentos", label: "Equipamentos", icon: Laptop },
        { href: "/funcionarios", label: "Funcionários", icon: Users },
        { href: "/emprestimos", label: "Empréstimos", icon: ArrowLeftRight },
        {
            href: isAdmin ? "/solicitacoes/admin" : "/solicitacoes",
            label: "Solicitações",
            icon: ClipboardList,
        },
    ];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                    SG
                </div>
                <div className="grid flex-1 leading-tight group-data-[collapsible=icon]:hidden">
                    <p className="truncate text-sm font-semibold">
                        Sistema Gerenciais
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                        Gestão de Patrimônio
                    </p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {links.map(({ href, label, icon: Icon }) => (
                            <SidebarMenuItem key={href}>
                                <SidebarMenuButton
                                    render={<Link href={href} />}
                                    isActive={current.startsWith(href)}
                                    tooltip={label}
                                    size="lg"
                                >
                                    <Icon />
                                    <span>{label}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
