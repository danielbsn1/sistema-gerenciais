import AppLayout from "../../layout/AppLayout";
import StatCard from "../../components/cards/StatCard";
import { FaUsers } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaBeer, FaCheckCircle } from "react-icons/fa"; // Importa da biblioteca FontAwesome
import { MdOutlineAlarm } from "react-icons/md"; // Importa da biblioteca Material Design
import EquipamentosEmUso from "../../components/dashboard/EquipamentosEmUso";
import "../../styles/dashboard.css";
export default function Dashboard() {
    return (
        <AppLayout>
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Visão geral do sistema</p>
            </div>

            <div className="stats-grid">
                <StatCard title="Total" value={120} icon={<FaBox />} />
                <StatCard
                    title="Disponíveis"
                    value={80}
                    icon={<FaCheckCircle />}
                />
                <StatCard title="Em Uso" value={30} icon={<FaUsers />} />
                <StatCard title="Manutenção" value={10} icon={<FaTools />} />
                <StatCard title="Funcionários" value={25} icon={<FaUsers />} />
            </div>
        </AppLayout>
    );
}
