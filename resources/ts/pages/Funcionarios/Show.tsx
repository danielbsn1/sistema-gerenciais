// resources/ts/pages/Funcionarios/Show.tsx
// resources/ts/pages/Funcionarios/Show.tsx
import { FC } from "react";
import { Link, router } from "@inertiajs/react";
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
                    <Button render={<Link href="/funcionarios" />} variant="outline" size="sm">
                        ← Voltar
                    </Button>
                    <Button
                        variant={funcionario.ativo ? "destructive" : "default"}
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
                    <Button render={<Link href={`/funcionarios/${funcionario.id}/edit`} />} size="sm">
                        Editar
                    </Button>
                </div>
            </div>

            <Card className="mb-5">
                <CardHeader>
                    <CardTitle>Dados do Funcionário</CardTitle>
                </CardHeader>
                <CardContent>
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
                                <StatusBadge status={funcionario.tipo} />
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
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Empréstimos</CardTitle>
                </CardHeader>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableHead>Equipamento</TableHead>
                            <TableHead>ID Patrimônio</TableHead>
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
                                    <TableCell>
                                        {emp.equipamento.marca}{" "}
                                        {emp.equipamento.modelo}
                                    </TableCell>
                                    <TableCell className="font-mono text-[13px]">
                                        #{emp.equipamento.id_patrimonio}
                                    </TableCell>
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

export default FuncionariosShow;
