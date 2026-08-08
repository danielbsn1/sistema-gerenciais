// resources/ts/pages/Emprestimos/Index.tsx
import { FC, useState } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import StatusBadge from "../../components/StatusBadge";
import { Emprestimo } from "../../types/funcionarios";

interface Props {
    emprestimos: Emprestimo[];
    filters: { search?: string; status?: string };
}

const STATUS = [
    { value: "ativo", label: "Ativo" },
    { value: "devolvido", label: "Devolvido" },
    { value: "atrasado", label: "Atrasado" },
];

const EmprestimosIndex: FC<Props> = ({ emprestimos = [], filters = {} }) => {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");

    const handleFilter = () => {
        router.get("/emprestimos", { search, status }, { preserveState: true });
    };

    const handleClear = () => {
        setSearch("");
        setStatus("");
        router.get("/emprestimos", {}, { preserveState: true });
    };

    const handleDevolver = (id: number) => {
        if (confirm("Confirmar devolução deste equipamento?")) {
            router.patch(`/emprestimos/${id}/devolver`);
        }
    };

    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Empréstimos
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhe os empréstimos de equipamentos
                    </p>
                </div>
                <Button render={<Link href="/emprestimos/create" />}>
                    + Novo Empréstimo
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Buscar</label>
                            <Input
                                placeholder="Funcionário, equipamento..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleFilter()
                                }
                                className="w-full sm:w-64"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Status</label>
                            <Select
                                value={status || null}
                                onValueChange={(value) => setStatus(value ?? "")}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS.map((s) => (
                                        <SelectItem key={s.value} value={s.value}>
                                            {s.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filtrar</Button>
                            <Button variant="ghost" onClick={handleClear}>
                                Limpar
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHead>Equipamento</TableHead>
                                <TableHead>Funcionário</TableHead>
                                <TableHead>Setor</TableHead>
                                <TableHead>Início</TableHead>
                                <TableHead>Prev. Devolução</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {emprestimos.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground"
                                    >
                                        Nenhum empréstimo registrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                emprestimos.map((emp) => (
                                    <TableRow key={emp.id}>
                                        <TableCell>
                                            {emp.equipamento.marca}{" "}
                                            {emp.equipamento.modelo}
                                            <div className="font-mono text-[11px] text-muted-foreground">
                                                #{emp.equipamento.patrimonio_id}
                                            </div>
                                        </TableCell>
                                        <TableCell>{emp.funcionario.nome}</TableCell>
                                        <TableCell>{emp.setor}</TableCell>
                                        <TableCell className="tabular-nums">
                                            {new Date(
                                                emp.data_inicio,
                                            ).toLocaleDateString("pt-BR")}
                                        </TableCell>
                                        <TableCell className="tabular-nums">
                                            {emp.data_prevista_devolucao
                                                ? new Date(
                                                      emp.data_prevista_devolucao,
                                                  ).toLocaleDateString("pt-BR")
                                                : "—"}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={emp.status} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    render={<Link href={`/emprestimos/${emp.id}`} />}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                {emp.status === "ativo" && (
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        className="text-destructive hover:text-destructive"
                                                        onClick={() =>
                                                            handleDevolver(emp.id)
                                                        }
                                                    >
                                                        Devolver
                                                    </Button>
                                                )}
                                            </div>
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

export default EmprestimosIndex;
