import { FC, useState } from "react";
import { Link, router } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import StatusBadge from "../../components/StatusBadge";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Equipamento } from "../../types/funcionarios";
import "../../styles/equipamentos.css";

interface Props {
    equipamentos: Equipamento[];
    filters: { search?: string; tipo?: string; status?: string };
}

const TIPOS = [
    "Notebook",
    "Desktop",
    "Monitor",
    "Tablet",
    "Celular",
    "Impressora",
    "Outros",
];
const STATUS = ["disponivel", "em_uso", "manutencao"];

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
            onSuccess: () => {
                console.log("Equipamento excluído");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout title="Equipamentos">
            {/* Filters */}
            <div className="filters-card">
                <div className="filter-group">
                    <label className="filter-label">Buscar</label>
                    <input
                        className="filter-input"
                        placeholder="ID, marca, modelo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Tipo</label>
                    <select
                        className="filter-select"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {TIPOS.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Status</label>
                    <select
                        className="filter-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {STATUS.map((s) => (
                            <option key={s} value={s}>
                                {s === "disponivel"
                                    ? "Disponível"
                                    : s === "em_uso"
                                        ? "Em Uso"
                                        : "Manutenção"}
                            </option>
                        ))}
                    </select>
                </div>

                <Button onClick={handleFilter}>
                    Filtrar
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                    Limpar
                </Button>
            </div>

            {/* Table Card */}
            <div className="card">
                <div className="card__header">
                    <span className="list-header__count">
                        {equipamentos.length} equipamento(s)
                    </span>
                    <Button
                        render={<Link href="/equipamentos/create" />}
                        size="sm"
                    >
                        + Cadastrar
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <tr>
                            <TableHead>ID Patrimônio</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Equipamento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Ações</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {equipamentos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    Nenhum equipamento cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            equipamentos.map((eq) => (
                                <TableRow key={eq.id}>
                                    <TableCell className="font-mono text-[13px]">
                                        #{eq.id_patrimonio}
                                    </TableCell>
                                    <TableCell>{eq.tipo}</TableCell>
                                    <TableCell>
                                        {eq.marca} {eq.modelo}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={eq.status} />
                                    </TableCell>
                                    <TableCell>{eq.usuario_atual ?? "—"}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
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
            </div>
        </AppLayout>
    );
};

export default EquipamentosIndex;
