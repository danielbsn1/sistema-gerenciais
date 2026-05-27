import { usePage, Link } from "@inertiajs/react";
import type { PageProps } from "../types/PageProps";
export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;

    return (
        <aside className="sidebar">
            <h2>PAINEL ADIMINISTRATIVO </h2>
            <p>Dashboard</p>
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
