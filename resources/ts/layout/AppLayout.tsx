import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/layout.css";
import { usePage } from "@inertiajs/react";

type Props = {
    title?: string;
    children: React.ReactNode;
};

export default function AppLayout({ title, children }: Props) {
    const { flash } = usePage().props as any;

    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content">
                {flash?.success && (
                    <div className="alert alert-success">{flash.success}</div>
                )}

                {flash?.error && (
                    <div className="alert alert-error">{flash.error}</div>
                )}

                <main className="page-content">{children}</main>
            </div>
        </div>
    );
}
