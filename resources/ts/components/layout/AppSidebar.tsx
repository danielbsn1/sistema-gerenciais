import {
    LayoutDashboard,
    Laptop,
    Users,
    ArrowLeftRight,
} from "lucide-react";

import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
} from "@/components/ui/sidebar";

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="sidebar-brand">
                    <h2>Sistema Gerenciais</h2>
                    <span>Gestão de Patrimônio</span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <nav>
                        <ul>
                            <li>
                                <a href="/dashboard" className="active">
                                    <LayoutDashboard size={20} />
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <li>
                                <a href="/equipamentos">
                                    <Laptop size={20} />
                                    <span>Equipamentos</span>
                                </a>
                            </li>

                            <li>
                                <a href="/funcionarios">
                                    <Users size={20} />
                                    <span>Funcionários</span>
                                </a>
                            </li>

                            <li>
                                <a href="/emprestimos">
                                    <ArrowLeftRight size={20} />
                                    <span>Empréstimos</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}