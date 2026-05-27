import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

type Props = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content">
                <Navbar />

                <main className="page-content">{children}</main>
            </div>
        </div>
    );
}
