import { FC } from "react";
import { Link } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import StatusBadge from "../../components/StatusBadge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Equipamento, Emprestimo } from "../../types/funcionarios";
import "../../styles/showeq.css";
import "../../styles/equipamentos.css";

interface Props {
    equipamento: Equipamento;
    historico: Emprestimo[];
}

const EquipamentosShow: FC<Props> = ({ equipamento, historico }) => {
    return (
        <AppLayout title="Equipamentos">
            {/* Header */}
            <div className="page-header">
                <div className="page-header__info">
                    <h2>
                        {equipamento.marca} {equipamento.modelo}
                    </h2>
                    <p>#{equipamento.id_patrimonio}</p>
                </div>
                <div className="page-header__actions">
                    <Button
                        render={<Link href="/equipamentos" />}
                        variant="outline"
                        size="sm"
                    >
                        ← Voltar
                    </Button>
                    <Button
                        render={<Link href={`/equipamentos/${equipamento.id}/edit`} />}
                        size="sm"
                    >
                        Editar
                    </Button>
                </div>
            </div>

            {/* Details */}
            <Card className="mb-5">
                <CardHeader>
                    <CardTitle>Dados do Equipamento</CardTitle>
                </CardHeader>
                <CardContent>
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
                                <StatusBadge status={equipamento.status} />
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Usuário Atual</span>
                            <span className="detail-value">
                                {equipamento.usuario_atual ?? "—"}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Histórico */}
            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Empréstimos</CardTitle>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHead>Funcionário</TableHead>
                            <TableHead>Setor</TableHead>
                            <TableHead>Início</TableHead>
                            <TableHead>Devolução</TableHead>
                            <TableHead>Status</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {historico.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Nenhum empréstimo registrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            historico.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell>{emp.funcionario.nome}</TableCell>
                                    <TableCell>{emp.setor}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            emp.data_inicio,
                                        ).toLocaleDateString("pt-BR")}
                                    </TableCell>
                                    <TableCell>
                                        {emp.data_devolucao
                                            ? new Date(
                                                emp.data_devolucao,
                                            ).toLocaleDateString("pt-BR")
                                            : "—"}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={emp.status} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </AppLayout>
    );
};

export default EquipamentosShow;
