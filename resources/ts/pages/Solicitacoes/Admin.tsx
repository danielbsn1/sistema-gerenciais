import { FC } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import "../../styles/equipamentos.css";
import "../../styles/showeq.css";

interface Solicitacao {
    id: number;
    tipo_equipamento: string;
    motivo: string;
    urgencia: "baixa" | "media" | "alta";
    observacoes?: string;
    status: "pendente" | "aprovada" | "recusada";
    created_at: string;
    user: { name: string; email: string };
}

interface Props {
    solicitacoes: Solicitacao[];
}

const URGENCIA_CLASS: Record<string, string> = {
    baixa: "badge--devolvido",
    media: "badge--ativo",
    alta:  "badge--atrasado",
};

const URGENCIA_LABEL: Record<string, string> = {
    baixa: "Baixa",
    media: "Média",
    alta:  "Alta",
};

const STATUS_CLASS: Record<string, string> = {
    pendente:  "badge--ativo",
    aprovada:  "badge--devolvido",
    recusada:  "badge--atrasado",
};

const STATUS_LABEL: Record<string, string> = {
    pendente: "Pendente",
    aprovada: "Aprovada",
    recusada: "Recusada",
};

const SolicitacoesAdmin: FC<Props> = ({ solicitacoes = [] }) => {

    const handleAvaliar = (id: number, status: "aprovada" | "recusada") => {
        const acao = status === "aprovada" ? "aprovar" : "recusar";
        if (confirm(`Deseja ${acao} esta solicitação?`)) {
            router.patch(`/solicitacoes/${id}/avaliar`, { status }, { preserveScroll: true });
        }
    };

    const pendentes  = solicitacoes.filter((s) => s.status === "pendente");
    const avaliadas  = solicitacoes.filter((s) => s.status !== "pendente");

    return (
        <AppLayout title="Solicitações">

            {/* Pendentes */}
            <div className="card" style={{ marginBottom: 20 }}>
                <div className="card__header">
                    <span className="list-header__count">
                        {pendentes.length} pendente(s)
                    </span>
                </div>
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Solicitante</th>
                                <th>Equipamento</th>
                                <th>Motivo</th>
                                <th>Urgência</th>
                                <th>Data</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendentes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="table__empty">
                                        Nenhuma solicitação pendente.
                                    </td>
                                </tr>
                            ) : (
                                pendentes.map((s) => (
                                    <tr key={s.id}>
                                        <td>
                                            {s.user.name}
                                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                                {s.user.email}
                                            </div>
                                        </td>
                                        <td>{s.tipo_equipamento}</td>
                                        <td style={{ maxWidth: 220, color: "var(--text-secondary)" }}>
                                            {s.motivo}
                                            {s.observacoes && (
                                                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                                                    {s.observacoes}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={`badge ${URGENCIA_CLASS[s.urgencia]}`}>
                                                {URGENCIA_LABEL[s.urgencia]}
                                            </span>
                                        </td>
                                        <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                                            {new Date(s.created_at).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td>
                                            <div className="table__actions">
                                                <button
                                                    className="btn btn--link"
                                                    onClick={() => handleAvaliar(s.id, "aprovada")}
                                                >
                                                    Aprovar
                                                </button>
                                                <button
                                                    className="btn btn--link-danger"
                                                    onClick={() => handleAvaliar(s.id, "recusada")}
                                                >
                                                    Recusar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Avaliadas */}
            {avaliadas.length > 0 && (
                <div className="card">
                    <div className="card__header">
                        <span className="list-header__count">Histórico — {avaliadas.length} avaliada(s)</span>
                    </div>
                    <div className="table-wrapper">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Solicitante</th>
                                    <th>Equipamento</th>
                                    <th>Motivo</th>
                                    <th>Urgência</th>
                                    <th>Status</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {avaliadas.map((s) => (
                                    <tr key={s.id}>
                                        <td>{s.user.name}</td>
                                        <td>{s.tipo_equipamento}</td>
                                        <td style={{ maxWidth: 220, color: "var(--text-secondary)" }}>{s.motivo}</td>
                                        <td>
                                            <span className={`badge ${URGENCIA_CLASS[s.urgencia]}`}>
                                                {URGENCIA_LABEL[s.urgencia]}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${STATUS_CLASS[s.status]}`}>
                                                {STATUS_LABEL[s.status]}
                                            </span>
                                        </td>
                                        <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                                            {new Date(s.created_at).toLocaleDateString("pt-BR")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </AppLayout>
    );
};

export default SolicitacoesAdmin;
