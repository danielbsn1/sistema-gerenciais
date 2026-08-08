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
import { Equipamento } from "../../types/funcionarios";

interface Props {
    equipamentos: Equipamento[];
    filters: { search?: string; tipo?: string; status?: string };
}

const TIPOS = [
    { value: "notebook", label: "Notebook" },
    { value: "desktop", label: "Desktop" },
    { value: "monitor", label: "Monitor" },
    { value: "tablet", label: "Tablet" },
    { value: "celular", label: "Celular" },
    { value: "impressora", label: "Impressora" },
    { value: "outros", label: "Outros" },
];
const STATUS = [
    { value: "disponivel", label: "Disponível" },
    { value: "em_uso", label: "Em Uso" },
    { value: "manutencao", label: "Manutenção" },
];

const EquipamentosIndex: FC<Props> = ({ equipamentos = [], filters = {} }) => {
    const [search, setSearch] = useState(filters.search ?? "");
    const [tipo, setTipo] = useState(filters.tipo ?? "");
    const [status, setStatus] = useState(filters.status ?? "");

    const handleFilter = () => {
        router.get(
            "/equipamentos",
            { search, tipo, status },
            { preserveState: true },
        );
    };

    const handleClear = () => {
        setSearch("");
        setTipo("");
        setStatus("");
        router.get("/equipamentos", {}, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Deseja excluir este equipamento?")) {
            return;
        }

        router.delete(`/equipamentos/${id}`, {
            preserveScroll: true,
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout title="Equipamentos">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Equipamentos
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os ativos do inventário
                    </p>
                </div>
                <Button render={<Link href="/equipamentos/create" />}>
                    + Cadastrar
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Buscar</label>
                            <Input
                                placeholder="ID, marca, modelo..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleFilter()
                                }
                                className="w-full sm:w-56"
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
                                    {TIPOS.map((t) => (
                                        <SelectItem key={t.value} value={t.value}>
                                            {t.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                                <TableHead>ID Patrimônio</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Equipamento</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Usuário</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {equipamentos.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-muted-foreground"
                                    >
                                        Nenhum equipamento cadastrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                equipamentos.map((eq) => (
                                    <TableRow key={eq.id}>
                                        <TableCell className="font-mono text-[13px]">
                                            #{eq.patrimonio_id}
                                        </TableCell>
                                        <TableCell>{eq.tipo}</TableCell>
                                        <TableCell>
                                            {eq.marca} {eq.modelo}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={eq.status} />
                                        </TableCell>
                                        <TableCell>
                                            {eq.usuario_atual ?? "—"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-1">
                                                <Button
                                                    render={<Link href={`/equipamentos/${eq.id}`} />}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                <Button
                                                    render={<Link href={`/equipamentos/${eq.id}/edit`} />}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => handleDelete(eq.id)}
                                                >
                                                    Excluir
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

export default EquipamentosIndex;
