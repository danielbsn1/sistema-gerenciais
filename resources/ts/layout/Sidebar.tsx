import { Link } from "@inertiajs/react";
import "../styles/sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Painel Administrativo</h2>

            <nav>
                <ul>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/equipamentos">Equipamentos</Link>
                    </li>

                    <li>
                        <Link href="/funcionarios">Funcionários</Link>
                    </li>

                    <li>
                        <Link href="/emprestimos">Empréstimos</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
