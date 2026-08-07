import { AppSidebar } from "@/components/layout/AppSidebar";
import Topbar from "./Topbar";
import "../../styles/layout.css";

type Props = {
    title?: string;
    children: React.ReactNode;
};

export default function AppLayout({ title, children }: Props) {
    return (
        <div className="layout">
            <AppSidebar />

            <div className="main-content">
                <Topbar />

                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
}