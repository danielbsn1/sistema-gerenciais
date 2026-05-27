// resources/ts/pages/Dashboard/Index.tsx
import { FC } from "react";
import AppLayout from "../../layout/Navbar";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { DashboardStats, Emprestimo } from "../../types/funcionarios";
import "../../styles/components.css";

interface Props {
    stats: DashboardStats;
    emprestimos_em_uso: Emprestimo[];
}

const STAT_ITEMS = (stats: DashboardStats) => [
    {
        value: stats.total,
        label: "Total",
        color: "blue" as const,
        icon: "🖥️",
    },
    {
        value: stats.disponiveis,
        label: "Disponíveis",
        color: "green" as const,
        icon: "✅",
    },
    {
        value: stats.em_uso,
        label: "Em Uso",
        color: "yellow" as const,
        icon: "👤",
    },
    {
        value: stats.manutencao,
        label: "Manutenção",
        color: "red" as const,
        icon: "🔧",
    },
    {
        value: stats.funcionarios,
        label: "Funcionários",
        color: "purple" as const,
        icon: "👥",
    },
];

const Dashboard: FC<Props> = ({ stats, emprestimos_em_uso }) => {
    return (
        <AppLayout title="Dashboard">
            {/* Stat Cards */}
            <div className="dashboard-stats">
                {STAT_ITEMS(stats).map((item, i) => (
                    <div
                        key={item.label}
                        className="stat-card"
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        <div
                            className={`stat-card__icon stat-card__icon--${item.color}`}
                        >
                            {item.icon}
                        </div>
                        <div className="stat-card__body">
                            <div className="stat-card__value">{item.value}</div>
                            <div className="stat-card__label">{item.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Equipamentos em Uso */}
            <div className="card" style={{ marginTop: 24 }}>
                <div className="card__header">
                    <div className="card__title">Equipamentos em Uso</div>
                    <Button
                        as="link"
                        href="/emprestimos/create"
                        variant="primary"
                        size="sm"
                    >
                        + Novo Empréstimo
                    </Button>
                </div>

                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Equipamento</th>
                                <th>Funcionário</th>
                                <th>Setor</th>
                                <th>Desde</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprestimos_em_uso.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="table__empty">
                                        Nenhum equipamento em uso no momento.
                                    </td>
                                </tr>
                            ) : (
                                emprestimos_em_uso.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>
                                            {emp.equipamento.marca}{" "}
                                            {emp.equipamento.modelo}
                                            <div
                                                style={{
                                                    fontSize: 11,
                                                    color: "var(--text-muted)",
                                                    marginTop: 2,
                                                }}
                                            >
                                                #{emp.equipamento.id_patrimonio}
                                            </div>
                                        </td>
                                        <td>{emp.funcionario.nome}</td>
                                        <td>
                                            <span className="chip">
                                                {emp.setor}
                                            </span>
                                        </td>
                                        <td
                                            style={{
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                            }}
                                        >
                                            {new Date(
                                                emp.data_inicio,
                                            ).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td>
                                            <div className="table__actions">
                                                <Button
                                                    as="link"
                                                    href={`/emprestimos/${emp.id}`}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                <Button
                                                    as="link"
                                                    href={`/emprestimos/${emp.id}/devolver`}
                                                    method="post"
                                                    variant="link-warning"
                                                    size="sm"
                                                >
                                                    Devolver
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
