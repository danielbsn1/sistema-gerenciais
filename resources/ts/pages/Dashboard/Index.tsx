import AppLayout from "../../layout/AppLayout";
import StatCard from "../../components/cards/StatCard";

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Visão geral do sistema</p>
            </div>

            <div className="stats-grid">
                <StatCard title="Total" value={120} />
                <StatCard title="Funcionários" value={25} />

                <StatCard title="Disponíveis" value={80} />

                <StatCard title="Em Uso" value={30} />

                <StatCard title="Manutenção" value={10} />
            </div>
        </AppLayout>
    );
}
