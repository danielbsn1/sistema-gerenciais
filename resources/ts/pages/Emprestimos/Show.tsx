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
import { Emprestimo } from "../../types/funcionarios";

interface Props {
    emprestimo: Emprestimo;
}

const EmprestimosShow: FC<Props> = ({ emprestimo }) => {
    return (
        <AppLayout title="Detalhes do Empréstimo">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Empréstimo #{emprestimo.id}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {emprestimo.equipamento?.marca}{" "}
                        {emprestimo.equipamento?.modelo}
                    </p>
                </div>
                <Button render={<Link href="/emprestimos" />} variant="outline">
                    Voltar
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do Empréstimo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Funcionário
                            </span>
                            <span className="text-sm font-medium">
                                {emprestimo.funcionario?.nome ?? "—"}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Equipamento
                            </span>
                            <span className="text-sm font-medium">
                                {emprestimo.equipamento?.marca}{" "}
                                {emprestimo.equipamento?.modelo}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                ID Patrimônio
                            </span>
                            <span className="font-mono text-sm font-medium">
                                #{emprestimo.equipamento?.patrimonio_id ?? "—"}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Setor
                            </span>
                            <span className="text-sm font-medium">
                                {emprestimo.setor ?? "—"}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Data Início
                            </span>
                            <span className="text-sm font-medium">
                                {emprestimo.data_inicio
                                    ? new Date(
                                          emprestimo.data_inicio,
                                      ).toLocaleDateString("pt-BR")
                                    : "—"}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Prev. Devolução
                            </span>
                            <span className="text-sm font-medium">
                                {emprestimo.data_prevista_devolucao
                                    ? new Date(
                                          emprestimo.data_prevista_devolucao,
                                      ).toLocaleDateString("pt-BR")
                                    : "—"}
                            </span>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Status
                            </span>
                            <StatusBadge status={emprestimo.status} />
                        </div>
                        {emprestimo.observacoes && (
                            <div className="grid gap-1 sm:col-span-2 lg:col-span-3">
                                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Observações
                                </span>
                                <span className="text-sm font-medium">
                                    {emprestimo.observacoes}
                                </span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default EmprestimosShow;
