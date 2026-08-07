import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button"
import "../../styles/showeq.css";
import "../../styles/equipamentos.css";
import "../../styles/emprestimo.css";

export default function Show({ emprestimo }: any) {
    return (
        <AppLayout title="Detalhes do Empréstimo">
            <div className="page-header">
                <div className="page-header__info">
                    <h2>Empréstimo #{emprestimo.id}</h2>
                    <p>
                        {emprestimo.equipamento?.marca}{" "}
                        {emprestimo.equipamento?.modelo}
                    </p>
                </div>
                <div className="page-header__actions">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.location.assign("/emprestimos")}
                    >
                        ← Voltar
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <div className="detail-grid-header">
                    <h3 className="detail-title">Dados do Empréstimo</h3>
                </div>
                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">Funcionário</span>
                        <span className="detail-value">
                            {emprestimo.funcionario?.nome ?? "—"}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Equipamento</span>
                        <span className="detail-value">
                            {emprestimo.equipamento?.marca}{" "}
                            {emprestimo.equipamento?.modelo}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">ID Patrimônio</span>
                        <span
                            className="detail-value"
                            style={{ fontFamily: "monospace" }}
                        >
                            #{emprestimo.equipamento?.id_patrimonio ?? "—"}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Setor</span>
                        <div style={{ marginTop: 4 }}>
                            <span className="chip">
                                {emprestimo.setor ?? "—"}
                            </span>
                        </div>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Data Início</span>
                        <span className="detail-value">
                            {emprestimo.data_inicio
                                ? new Date(
                                    emprestimo.data_inicio,
                                ).toLocaleDateString("pt-BR")
                                : "—"}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">
                            Prev. Devolução
                        </span>
                        <span className="detail-value">
                            {emprestimo.data_prevista_devolucao
                                ? new Date(
                                    emprestimo.data_prevista_devolucao,
                                ).toLocaleDateString("pt-BR")
                                : "—"}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Status</span>
                        <div style={{ marginTop: 4 }}>
                            <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-800">
                                {emprestimo.status ?? "—"}
                            </span>
                        </div>
                    </div>
                    {emprestimo.observacoes && (
                        <div
                            className="detail-item"
                            style={{ gridColumn: "1 / -1" }}
                        >
                            <span className="detail-label">
                                Observações
                            </span>
                            <span className="detail-value">
                                {emprestimo.observacoes}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
