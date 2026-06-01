import AppLayout from "../../layout/AppLayout";
import StatCard from "../../components/cards/StatCard";
import { FaUsers, FaBox, FaTools, FaCheckCircle } from "react-icons/fa";
import "../../styles/dashboard.css";

interface Props {
    totalEquipamentos: number;
    disponiveis: number;
    emUso: number;
    manutencao: number;
    funcionarios: number;
}

export default function Dashboard({
    totalEquipamentos,
    disponiveis,
    emUso,
    manutencao,
    funcionarios,
}: Props) {
    return (
        <AppLayout>
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Visão geral do sistema</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Total"
                    value={totalEquipamentos}
                    icon={<FaBox />}
                />

                <StatCard
                    title="Disponíveis"
                    value={disponiveis}
                    icon={<FaCheckCircle />}
                />

                <StatCard title="Em Uso" value={emUso} icon={<FaUsers />} />

                <StatCard
                    title="Manutenção"
                    value={manutencao}
                    icon={<FaTools />}
                />

                <StatCard
                    title="Funcionários"
                    value={funcionarios}
                    icon={<FaUsers />}
                />
            </div>
        </AppLayout>
    );
}
