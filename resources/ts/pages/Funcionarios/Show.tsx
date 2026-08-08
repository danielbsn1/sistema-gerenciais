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

interface Props {
    funcionario: Funcionario & { ativo: boolean };
    historico: Emprestimo[];
}

const FuncionariosShow: FC<Props> = ({ funcionario, historico }) => {
    return (
        <AppLayout title="Funcionários">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {funcionario.nome}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {funcionario.cpf}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button render={<Link href="/funcionarios" />} variant="outline">
                        Voltar
                    </Button>
                    <Button
                        variant={funcionario.ativo ? "destructive" : "default"}
                        onClick={() => {
                            const acao = funcionario.ativo
                                ? "inativar"
                                : "ativar";
                            if (confirm(`Deseja ${acao} este funcionário?`)) {
                                router.patch(
                                    `/funcionarios/${funcionario.id}/inativar`,
                                );
                            }
                        }}
                    >
                        {funcionario.ativo ? "Inativar" : "Ativar"}
                    </Button>
                    <Button
                        render={
                            <Link href={`/funcionarios/${funcionario.id}/edit`} />
                        }
                    >
                        Editar
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do Funcionário</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Nome
                            </span>
                            <span className="text-sm font-medium">
                                {funcionario.nome}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                CPF
                            </span>
                            <span className="text-sm font-medium">
                                {funcionario.cpf}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Setor
                            </span>
                            <span className="text-sm font-medium">
                                {funcionario.setor}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Tipo
                            </span>
                            <StatusBadge status={funcionario.tipo} />
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Equipamento Atual
                            </span>
                            <span className="text-sm font-medium">
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
                <CardContent className="p-0">
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
                                        <TableCell>
                                            {emp.equipamento.marca}{" "}
                                            {emp.equipamento.modelo}
                                        </TableCell>
                                        <TableCell className="font-mono text-[13px]">
                                            #{emp.equipamento.patrimonio_id}
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
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default FuncionariosShow;
