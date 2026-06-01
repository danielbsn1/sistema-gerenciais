// resources/ts/pages/Funcionarios/Show.tsx
// resources/ts/pages/Funcionarios/Show.tsx
import { FC } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { Card, CardHeader, CardBody } from "../../components/ui/Modal";
import { Funcionario, Emprestimo } from "../../types/funcionarios";
import "../../styles/showeq.css";
import "../../styles/equipamentos.css";

interface Props {
    funcionario: Funcionario & { ativo: boolean };
    historico: Emprestimo[];
}

const FuncionariosShow: FC<Props> = ({ funcionario, historico }) => {
    return (
        <AppLayout title="Funcionários">
            <div className="page-header">
                <div className="page-header__info">
                    <h2>{funcionario.nome}</h2>
                    <p>{funcionario.cpf}</p>
                </div>
                <div className="page-header__actions">
                    <Button as="link" href="/funcionarios" variant="secondary" size="sm">
                        ← Voltar
                    </Button>
                    <Button
                        variant={funcionario.ativo ? "danger" : "primary"}
                        size="sm"
                        onClick={() => {
                            const acao = funcionario.ativo ? "inativar" : "ativar";
                            if (confirm(`Deseja ${acao} este funcionário?`)) {
                                router.patch(`/funcionarios/${funcionario.id}/inativar`);
                            }
                        }}
                    >
                        {funcionario.ativo ? "Inativar" : "Ativar"}
                    </Button>
                    <Button as="link" href={`/funcionarios/${funcionario.id}/edit`} variant="primary" size="sm">
                        Editar
                    </Button>
                </div>
            </div>

            <Card style={{ marginBottom: 20 }}>
                <CardHeader title="Dados do Funcionário" />
                <CardBody>
                    <div className="detail-grid">
                        <div className="detail-item">
                            <span className="detail-label">Nome</span>
                            <span className="detail-value">
                                {funcionario.nome}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">CPF</span>
                            <span
                                className="detail-value"
                                style={{ fontFamily: "monospace" }}
                            >
                                {funcionario.cpf}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Setor</span>
                            <div style={{ marginTop: 4 }}>
                                <span className="chip">
                                    {funcionario.setor}
                                </span>
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Tipo</span>
                            <div style={{ marginTop: 4 }}>
                                <Badge variant={funcionario.tipo} />
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">
                                Equipamento Atual
                            </span>
                            <span className="detail-value">
                                {funcionario.equipamento_atual ?? "—"}
                            </span>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card>
                <CardHeader title="Histórico de Empréstimos" />
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Equipamento</th>
                                <th>ID Patrimônio</th>
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
                                        <td>
                                            {emp.equipamento.marca}{" "}
                                            {emp.equipamento.modelo}
                                        </td>
                                        <td
                                            style={{
                                                fontFamily: "monospace",
                                                fontSize: 13,
                                            }}
                                        >
                                            #{emp.equipamento.id_patrimonio}
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

export default FuncionariosShow;
