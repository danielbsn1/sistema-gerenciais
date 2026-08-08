import { FC } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../components/ui/table";
import StatusBadge from "../../components/StatusBadge";

interface Solicitacao {
    id: number;
    tipo_equipamento: string;
    motivo: string;
    urgencia: "baixa" | "media" | "alta";
    observacoes?: string;
    status: "pendente" | "aprovada" | "recusada";
    created_at: string;
    user: { name: string; email: string };
}

interface Props {
    solicitacoes: Solicitacao[];
}

const SolicitacoesAdmin: FC<Props> = ({ solicitacoes = [] }) => {
    const handleAvaliar = (id: number, status: "aprovada" | "recusada") => {
        const acao = status === "aprovada" ? "aprovar" : "recusar";
        if (confirm(`Deseja ${acao} esta solicitação?`)) {
            router.patch(
                `/solicitacoes/${id}/avaliar`,
                { status },
                { preserveScroll: true },
            );
        }
    };

    const pendentes = solicitacoes.filter((s) => s.status === "pendente");
    const avaliadas = solicitacoes.filter((s) => s.status !== "pendente");

    return (
        <AppLayout title="Solicitações">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Solicitações
                </h1>
                <p className="text-sm text-muted-foreground">
                    Analise e responda as solicitações de equipamentos
                </p>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHead>Solicitante</TableHead>
                                <TableHead>Equipamento</TableHead>
                                <TableHead>Motivo</TableHead>
                                <TableHead>Urgência</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {pendentes.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-muted-foreground"
                                    >
                                        Nenhuma solicitação pendente.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                pendentes.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>
                                            <span className="font-medium">
                                                {s.user.name}
                                            </span>
                                            <div className="text-xs text-muted-foreground">
                                                {s.user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>{s.tipo_equipamento}</TableCell>
                                        <TableCell className="max-w-60">
                                            <span className="text-muted-foreground">
                                                {s.motivo}
                                            </span>
                                            {s.observacoes && (
                                                <div className="text-xs text-muted-foreground">
                                                    {s.observacoes}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={s.urgencia} />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                s.created_at,
                                            ).toLocaleDateString("pt-BR")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleAvaliar(s.id, "aprovada")
                                                    }
                                                >
                                                    Aprovar
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() =>
                                                        handleAvaliar(s.id, "recusada")
                                                    }
                                                >
                                                    Recusar
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {avaliadas.length > 0 && (
                <Card>
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between px-4 pt-4">
                            <span className="text-sm font-medium text-muted-foreground">
                                Histórico — {avaliadas.length} avaliada(s)
                            </span>
                        </div>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHead>Solicitante</TableHead>
                                    <TableHead>Equipamento</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Urgência</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Data</TableHead>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {avaliadas.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.user.name}</TableCell>
                                        <TableCell>{s.tipo_equipamento}</TableCell>
                                        <TableCell className="max-w-60 text-muted-foreground">
                                            {s.motivo}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={s.urgencia} />
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={s.status} />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                s.created_at,
                                            ).toLocaleDateString("pt-BR")}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </AppLayout>
    );
};

export default SolicitacoesAdmin;
