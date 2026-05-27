import { usePage, Link } from "@inertiajs/react";
import type { PageProps } from "../types/PageProps";

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;

    return (
        <header className="navbar">
            <h1>Painel Administrativo</h1>

            <div>{auth.user.name}</div>
            <Link href="/login" method="get" as="button">
                login
            </Link>

            <Link href="/dashboard" method="get" as="button">
                dashboard
            </Link>

            <Link href="/equipamentos" method="get" as="button">
                equipamentos
            </Link>
            <Link href="/funcionarios" method="get" as="button">
                funcionarios
            </Link>

            <Link href="/emprestimos" method="get" as="button">
                emprestimos
            </Link>

            <Link href="/logout" method="post" as="button">
                sair
            </Link>
        </header>
    );
}
