import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Topbar from "./Topbar";
import FlashToasts from "./FlashToasts";

type Props = {
    title?: string;
    children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Topbar />
                <FlashToasts />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
