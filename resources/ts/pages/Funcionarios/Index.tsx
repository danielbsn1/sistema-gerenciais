// resources/ts/pages/Funcionarios/Index.tsx
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
import { ImportDialog } from "../../components/ImportDialog";
import { Funcionario } from "../../types/funcionarios";

type FuncionarioComAtivo = Funcionario & { ativo: boolean };

interface Props {
    funcionarios: FuncionarioComAtivo[];
    filters: { search?: string; setor?: string; tipo?: string };
}

const FuncionariosIndex: FC<Props> = ({ funcionarios = [], filters = {} }) => {
    const [search, setSearch] = useState(filters.search ?? "");
    const [setor, setSetor] = useState(filters.setor ?? "");
    const [tipo, setTipo] = useState(filters.tipo ?? "");

    const handleFilter = () => {
        router.get(
            "/funcionarios",
            { search, setor, tipo },
            { preserveState: true },
        );
    };

    const handleClear = () => {
        setSearch("");
        setSetor("");
        setTipo("");
        router.get("/funcionarios", {}, { preserveState: true });
    };

    return (
        <AppLayout title="Funcionários">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Funcionários
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os colaboradores
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <ImportDialog
                        title="Importar Funcionários"
                        description="Envie uma planilha (.xlsx, .xls ou .csv). Campos obrigatórios: nome, cpf, cargo, setor e telefone."
                        templateHref="/funcionarios/importar/template"
                        importUrl="/funcionarios/importar"
                    />
                    <Button render={<Link href="/funcionarios/create" />}>
                        + Cadastrar
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Buscar</label>
                            <Input
                                placeholder="Nome, CPF..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleFilter()
                                }
                                className="w-full sm:w-56"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Setor</label>
                            <Input
                                placeholder="Ex: Campo"
                                value={setor}
                                onChange={(e) => setSetor(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleFilter()
                                }
                                className="w-full sm:w-40"
                            />
                        </div>

                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Tipo</label>
                            <Select
                                value={tipo || null}
                                onValueChange={(value) => setTipo(value ?? "")}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="interno">Interno</SelectItem>
                                    <SelectItem value="prefeitura">Prefeitura</SelectItem>
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
                                <TableHead>Nome</TableHead>
                                <TableHead>CPF</TableHead>
                                <TableHead>Setor</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Equipamento</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {funcionarios.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-muted-foreground"
                                    >
                                        Nenhum funcionário cadastrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                funcionarios.map((f) => (
                                    <TableRow key={f.id}>
                                        <TableCell className="font-medium">
                                            {f.nome}
                                        </TableCell>
                                        <TableCell className="font-mono text-[13px]">
                                            {f.cpf}
                                        </TableCell>
                                        <TableCell>{f.setor}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={f.tipo} />
                                        </TableCell>
                                        <TableCell>
                                            {f.equipamento_atual ?? "—"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    render={<Link href={`/funcionarios/${f.id}`} />}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                <Button
                                                    render={<Link href={`/funcionarios/${f.id}/edit`} />}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className={
                                                        f.ativo
                                                            ? "text-destructive hover:text-destructive"
                                                            : ""
                                                    }
                                                    onClick={() => {
                                                        const acao = f.ativo
                                                            ? "inativar"
                                                            : "ativar";
                                                        if (
                                                            confirm(
                                                                `Deseja ${acao} ${f.nome}?`,
                                                            )
                                                        ) {
                                                            router.patch(
                                                                `/funcionarios/${f.id}/inativar`,
                                                                {},
                                                                {
                                                                    preserveScroll: true,
                                                                },
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {f.ativo ? "Inativar" : "Ativar"}
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
        </AppLayout>
    );
};

export default FuncionariosIndex;
