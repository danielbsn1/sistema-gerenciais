// resources/ts/pages/Funcionarios/Index.tsx
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
import { Funcionario } from "../../types/funcionarios";
import "../../styles/equipamentos.css";
import "../../styles/showeq.css";

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
            {/* Filters */}
            <div className="filters-card">
                <div className="filter-group">
                    <label className="filter-label">Buscar</label>
                    <input
                        className="filter-input"
                        placeholder="Nome, CPF..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Setor</label>
                    <input
                        className="filter-input"
                        placeholder="Ex: Campo"
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
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
                        <option value="interno">Interno</option>
                        <option value="externo">Externo</option>
                    </select>
                </div>

                <Button onClick={handleFilter}>
                    Filtrar
                </Button>
                <Button variant="ghost" onClick={handleClear}>
                    Limpar
                </Button>
            </div>

            {/* Table */}
            <div className="card">
                <div className="card__header">
                    <span className="list-header__count">
                        {funcionarios.length} funcionário(s)
                    </span>
                    <Button
                        render={<Link href="/funcionarios/create" />}
                        size="sm"
                    >
                        + Cadastrar
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <tr>
                            <TableHead>Nome</TableHead>
                            <TableHead>CPF</TableHead>
                            <TableHead>Setor</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Equipamento</TableHead>
                            <TableHead>Ações</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {funcionarios.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    Nenhum funcionário cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            funcionarios.map((f) => (
                                <TableRow key={f.id}>
                                    <TableCell>{f.nome}</TableCell>
                                    <TableCell className="font-mono text-[13px]">
                                        {f.cpf}
                                    </TableCell>
                                    <TableCell>{f.setor}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={f.tipo} />
                                    </TableCell>
                                    <TableCell>{f.equipamento_atual ?? "—"}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
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
                                                className={f.ativo ? "text-destructive hover:text-destructive" : ""}
                                                onClick={() => {
                                                    const acao = f.ativo ? "inativar" : "ativar";
                                                    if (confirm(`Deseja ${acao} ${f.nome}?`)) {
                                                        router.patch(`/funcionarios/${f.id}/inativar`, {}, { preserveScroll: true });
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
            </div>
        </AppLayout>
    );
};

export default FuncionariosIndex;
