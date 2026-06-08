import { FC, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import "../../styles/form.css";

interface Solicitacao {
    id: number;
    tipo_equipamento: string;
    motivo: string;
    urgencia: "baixa" | "media" | "alta";
    observacoes?: string;
    status: "pendente" | "aprovada" | "recusada";
    created_at: string;
}

interface Props {
    solicitacoes: Solicitacao[];
}

const URGENCIA_LABEL: Record<string, string> = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
};

const URGENCIA_CLASS: Record<string, string> = {
    baixa: "badge--devolvido",
    media: "badge--ativo",
    alta: "badge--atrasado",
};

const STATUS_CLASS: Record<string, string> = {
    pendente: "badge--ativo",
    aprovada: "badge--devolvido",
    recusada: "badge--atrasado",
};

const STATUS_LABEL: Record<string, string> = {
    pendente: "Pendente",
    aprovada: "Aprovada",
    recusada: "Recusada",
};

const SolicitacoesIndex: FC<Props> = ({ solicitacoes = [] }) => {
    const [showForm, setShowForm] = useState(solicitacoes.length === 0);

    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_equipamento: "",
        motivo: "",
        urgencia: "media",
        observacoes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/solicitacoes", {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <AppLayout title="Solicitações">
            <div className="page-form">
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <div>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                            Minhas Solicitações
                        </h2>
                        <p
                            style={{
                                fontSize: "0.875rem",
                                color: "var(--text-muted)",
                                marginTop: 2,
                            }}
                        >
                            Solicite equipamentos e acompanhe o status
                        </p>
                    </div>
                    {!showForm && (
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setShowForm(true)}
                        >
                            + Nova Solicitação
                        </Button>
                    )}
                </div>

                {/* Formulário */}
                {showForm && (
                    <div className="form-card" style={{ marginBottom: 24 }}>
                        <div className="form-card__header">
                            <h3 className="form-card__title">
                                Nova Solicitação
                            </h3>
                            <p className="form-card__subtitle">
                                Preencha os dados do equipamento que precisa
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-card__body">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label form-label--required">
                                            Tipo de Equipamento
                                        </label>
                                        <select
                                            className={`form-select ${errors.tipo_equipamento ? "is-error" : ""}`}
                                            value={data.tipo_equipamento}
                                            onChange={(e) =>
                                                setData(
                                                    "tipo_equipamento",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                Selecione...
                                            </option>
                                            <option value="Notebook">
                                                Notebook
                                            </option>
                                            <option value="Desktop">
                                                Desktop
                                            </option>
                                            <option value="Monitor">
                                                Monitor
                                            </option>
                                            <option value="Tablet">
                                                Tablet
                                            </option>
                                            <option value="Celular">
                                                Celular
                                            </option>
                                            <option value="Impressora">
                                                Impressora
                                            </option>
                                        </select>
                                        {errors.tipo_equipamento && (
                                            <span className="form-error">
                                                {errors.tipo_equipamento}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label form-label--required">
                                            Urgência
                                        </label>
                                        <select
                                            className={`form-select ${errors.urgencia ? "is-error" : ""}`}
                                            value={data.urgencia}
                                            onChange={(e) =>
                                                setData(
                                                    "urgencia",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="baixa">
                                                🟢 Baixa
                                            </option>
                                            <option value="media">
                                                🟡 Média
                                            </option>
                                            <option value="alta">
                                                🔴 Alta
                                            </option>
                                        </select>
                                        {errors.urgencia && (
                                            <span className="form-error">
                                                {errors.urgencia}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group form-group--full">
                                        <label className="form-label form-label--required">
                                            Motivo
                                        </label>
                                        <input
                                            className={`form-input ${errors.motivo ? "is-error" : ""}`}
                                            placeholder="Ex: Equipamento atual com defeito, novo colaborador..."
                                            value={data.motivo}
                                            onChange={(e) =>
                                                setData(
                                                    "motivo",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.motivo && (
                                            <span className="form-error">
                                                {errors.motivo}
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group form-group--full">
                                        <label className="form-label">
                                            Observações
                                        </label>
                                        <textarea
                                            className="form-textarea"
                                            placeholder="Informações adicionais, especificações, etc..."
                                            value={data.observacoes}
                                            onChange={(e) =>
                                                setData(
                                                    "observacoes",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-card__footer">
                                <Button
                                    variant="secondary"
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setShowForm(false);
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Enviando..."
                                        : "Enviar Solicitação"}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Lista de solicitações */}
                {solicitacoes.length > 0 && (
                    <div className="card">
                        <div className="card__header">
                            <span className="list-header__count">
                                {solicitacoes.length} solicitação(ões)
                            </span>
                        </div>
                        <div className="table-wrapper">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Equipamento</th>
                                        <th>Motivo</th>
                                        <th>Urgência</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solicitacoes.map((s) => (
                                        <tr key={s.id}>
                                            <td>{s.tipo_equipamento}</td>
                                            <td
                                                style={{
                                                    maxWidth: 260,
                                                    color: "var(--text-secondary)",
                                                }}
                                            >
                                                {s.motivo}
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge ${URGENCIA_CLASS[s.urgencia]}`}
                                                >
                                                    {URGENCIA_LABEL[s.urgencia]}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge ${STATUS_CLASS[s.status]}`}
                                                >
                                                    {STATUS_LABEL[s.status]}
                                                </span>
                                            </td>
                                            <td
                                                style={{
                                                    color: "var(--text-muted)",
                                                    fontSize: "0.85rem",
                                                }}
                                            >
                                                {new Date(
                                                    s.created_at,
                                                ).toLocaleDateString("pt-BR")}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {solicitacoes.length === 0 && !showForm && (
                    <div
                        className="card"
                        style={{ textAlign: "center", padding: "48px 20px" }}
                    >
                        <p style={{ fontSize: "2rem", marginBottom: 8 }}>📋</p>
                        <p style={{ color: "var(--text-muted)" }}>
                            Nenhuma solicitação ainda.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default SolicitacoesIndex;
