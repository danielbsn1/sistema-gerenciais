// resources/ts/pages/Emprestimos/Index.tsx
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
import { Emprestimo } from "../../types/funcionarios";
import "../../styles/form.css";
import "../../styles/equipamentos.css";
import "../../styles/showeq.css";

interface Props {
    emprestimos: Emprestimo[];
    filters: { search?: string; status?: string };
}

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
            {/* Filters */}
            <div className="filters-card">
                <div className="filter-group">
                    <label className="filter-label">Buscar</label>
                    <input
                        className="filter-input"
                        placeholder="Funcionário, equipamento..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleFilter()}
                    />
                </div>

                <div className="filter-group">
                    <label className="filter-label">Status</label>
                    <select
                        className="filter-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="devolvido">Devolvido</option>
                        <option value="atrasado">Atrasado</option>
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
                        {emprestimos.length} empréstimo(s)
                    </span>
                    <Button
                        render={<Link href="/emprestimos/create" />}
                        size="sm"
                    >
                        + Novo Empréstimo
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <tr>
                            <TableHead>Equipamento</TableHead>
                            <TableHead>Funcionário</TableHead>
                            <TableHead>Setor</TableHead>
                            <TableHead>Início</TableHead>
                            <TableHead>Prev. Devolução</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {emprestimos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
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
                                            #{emp.equipamento.id_patrimonio}
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
                                        <div className="flex gap-1">
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
                                                        handleDevolver(
                                                            emp.id,
                                                        )
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
            </div>
        </AppLayout>
    );
};

export default EmprestimosIndex;
