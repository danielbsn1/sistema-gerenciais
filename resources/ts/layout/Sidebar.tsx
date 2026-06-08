import { Link, usePage } from "@inertiajs/react";
import "../styles/sidebar.css";

export default function Sidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === "admin";

    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <div className="sidebar__logo-name">
                    Sistema<span>Gerenciais </span>
                </div>
                <div className="sidebar__logo-sub">
                    {isAdmin
                        ? "Painel Administrativo"
                        : "Portal do Colaborador"}
                </div>
            </div>

            <nav className="sidebar__nav">
                {isAdmin ? (
                    <>
                        <Link href="/dashboard" className="sidebar__item">
                            Dashboard
                        </Link>
                        <Link href="/equipamentos" className="sidebar__item">
                            Equipamentos
                        </Link>
                        <Link href="/funcionarios" className="sidebar__item">
                            Funcionários
                        </Link>
                        <Link href="/emprestimos" className="sidebar__item">
                            Empréstimos
                        </Link>
                        <Link
                            href="/solicitacoes/admin"
                            className="sidebar__item"
                        >
                            Solicitações
                        </Link>
                    </>
                ) : (
                    <Link
                        href="/solicitacoes"
                        className="sidebar__item sidebar__item--active"
                    >
                        Minhas Solicitações
                    </Link>
                )}
            </nav>

            <div className="sidebar__footer">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="sidebar__logout"
                >
                    Sair
                </Link>
            </div>
        </aside>
    );
}
