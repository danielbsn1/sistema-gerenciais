import AppLayout from "../../layout/AppLayout";
import StatCard from "../../components/cards/StatCard";

import { FaUsers } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

import "../../styles/dashboard.css";

interface Props {
    totalEquipamentos: number;
    equipamentosDisponiveis: number;
    equipamentosEmUso: number;
    equipamentosManutencao: number;
    totalFuncionarios: number;
}

export default function Dashboard({
    totalEquipamentos,
    equipamentosDisponiveis,
    equipamentosEmUso,
    equipamentosManutencao,
    totalFuncionarios,
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
                    value={equipamentosDisponiveis}
                    icon={<FaCheckCircle />}
                />

                <StatCard
                    title="Em Uso"
                    value={equipamentosEmUso}
                    icon={<FaUsers />}
                />

                <StatCard
                    title="Manutenção"
                    value={equipamentosManutencao}
                    icon={<FaTools />}
                />

                <StatCard
                    title="Funcionários"
                    value={totalFuncionarios}
                    icon={<FaUsers />}
                />
            </div>
        </AppLayout>
    );
}
