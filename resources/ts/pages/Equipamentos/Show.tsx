// resources/ts/pages/Equipamentos/Show.tsx
import { FC } from "react";
import AppLayout from "../../layout/Navbar";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { Card, CardHeader, CardBody } from "../../components/ui/Modal";
import { Equipamento, Emprestimo } from "../../types/funcionarios";
import "../../styles/components.css";

interface Props {
    equipamento: Equipamento;
    historico: Emprestimo[];
}

const EquipamentosShow: FC<Props> = ({ equipamento, historico }) => {
    return (
        <AppLayout title="Equipamentos">
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <div>
                    <h2
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        {equipamento.marca} {equipamento.modelo}
                    </h2>
                    <p
                        style={{
                            fontSize: 12,
                            color: "var(--text-muted)",
                            marginTop: 2,
                            fontFamily: "monospace",
                        }}
                    >
                        #{equipamento.id_patrimonio}
                    </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <Button
                        as="link"
                        href="/equipamentos"
                        variant="secondary"
                        size="sm"
                    >
                        ← Voltar
                    </Button>
                    <Button
                        as="link"
                        href={`/equipamentos/${equipamento.id}/edit`}
                        variant="primary"
                        size="sm"
                    >
                        Editar
                    </Button>
                </div>
            </div>

            {/* Details */}
            <Card style={{ marginBottom: 20 }}>
                <CardHeader title="Dados do Equipamento" />
                <CardBody>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="detail-label">ID Patrimônio</span>
                            <span
                                className="detail-value"
                                style={{ fontFamily: "monospace" }}
                            >
                                #{equipamento.id_patrimonio}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Tipo</span>
                            <span className="detail-value">
                                {equipamento.tipo}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Marca</span>
                            <span className="detail-value">
                                {equipamento.marca}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Modelo</span>
                            <span className="detail-value">
                                {equipamento.modelo}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Status</span>
                            <div style={{ marginTop: 4 }}>
                                <Badge variant={equipamento.status} />
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Usuário Atual</span>
                            <span className="detail-value">
                                {equipamento.usuario_atual ?? "—"}
                            </span>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Histórico */}
            <Card>
                <CardHeader title="Histórico de Empréstimos" />
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Funcionário</th>
                                <th>Setor</th>
                                <th>Início</th>
                                <th>Devolução</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historico.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="table__empty">
                                        Nenhum empréstimo registrado.
                                    </td>
                                </tr>
                            ) : (
                                historico.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.funcionario.nome}</td>
                                        <td>
                                            <span className="chip">
                                                {emp.setor}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(
                                                emp.data_inicio,
                                            ).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td>
                                            {emp.data_devolucao
                                                ? new Date(
                                                      emp.data_devolucao,
                                                  ).toLocaleDateString("pt-BR")
                                                : "—"}
                                        </td>
                                        <td>
                                            <Badge variant={emp.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AppLayout>
    );
};

export default EquipamentosShow;
