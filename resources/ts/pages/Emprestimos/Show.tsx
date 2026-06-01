import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { Card, CardHeader, CardBody } from "../../components/ui/Modal";
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
                        as="link"
                        href="/emprestimos"
                        variant="secondary"
                        size="sm"
                    >
                        ← Voltar
                    </Button>
                </div>
            </div>

            <Card style={{ marginBottom: 20 }}>
                <CardHeader title="Dados do Empréstimo" />
                <CardBody>
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
                                <Badge variant={emprestimo.status} />
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
                </CardBody>
            </Card>
        </AppLayout>
    );
}
