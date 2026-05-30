import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

type Props = {
    title?: string;
    children: React.ReactNode;
};

export default function AppLayout({ title, children }: Props) {
    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content">
                <main className="page-content">{children}</main>
            </div>
        </div>
    );
}
