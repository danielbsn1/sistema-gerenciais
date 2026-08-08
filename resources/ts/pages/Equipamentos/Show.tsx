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

interface Props {
    equipamento: Equipamento;
    historico: Emprestimo[];
}

const EquipamentosShow: FC<Props> = ({ equipamento, historico }) => {
    return (
        <AppLayout title="Equipamentos">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {equipamento.marca} {equipamento.modelo}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        #{equipamento.patrimonio_id}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button render={<Link href="/equipamentos" />} variant="outline">
                        Voltar
                    </Button>
                    <Button
                        render={<Link href={`/equipamentos/${equipamento.id}/edit`} />}
                    >
                        Editar
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do Equipamento</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                ID Patrimônio
                            </span>
                            <span className="font-mono text-sm font-medium">
                                #{equipamento.patrimonio_id}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Tipo
                            </span>
                            <span className="text-sm font-medium capitalize">
                                {equipamento.tipo}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Marca
                            </span>
                            <span className="text-sm font-medium">
                                {equipamento.marca}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Modelo
                            </span>
                            <span className="text-sm font-medium">
                                {equipamento.modelo}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Status
                            </span>
                            <StatusBadge status={equipamento.status} />
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Usuário Atual
                            </span>
                            <span className="text-sm font-medium">
                                {equipamento.usuario_atual ?? "—"}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Empréstimos</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
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
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-muted-foreground"
                                    >
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
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default EquipamentosShow;
