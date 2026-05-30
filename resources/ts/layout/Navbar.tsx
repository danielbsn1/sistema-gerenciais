import { usePage, Link } from "@inertiajs/react";
import "../styles/navbar.css";

export default function Navbar() {
    const page = usePage();

    console.log(page.props);

    return (
        <header className="navbar">
            <h1>Dashboard</h1>

            <div className="navbar-right">
                <span>Usuário</span>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="logout-button"
                >
                    Sair
                </Link>
            </div>
        </header>
    );
}
