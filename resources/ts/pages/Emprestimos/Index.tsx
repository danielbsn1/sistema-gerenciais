// resources/ts/pages/Emprestimos/Index.tsx
import { FC, useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { Emprestimo } from "../../types/funcionarios";

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

                <Button variant="primary" onClick={handleFilter}>
                    Filtrar
                </Button>
                <button className="btn--ghost-text" onClick={handleClear}>
                    Limpar
                </button>
            </div>

            {/* Table */}
            <div className="card">
                <div className="card__header">
                    <span className="list-header__count">
                        {emprestimos.length} empréstimo(s)
                    </span>
                    <Button
                        as="link"
                        href="/emprestimos/create"
                        variant="primary"
                        size="sm"
                    >
                        + Novo Empréstimo
                    </Button>
                </div>

                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Equipamento</th>
                                <th>Funcionário</th>
                                <th>Setor</th>
                                <th>Início</th>
                                <th>Prev. Devolução</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {emprestimos.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="table__empty">
                                        Nenhum empréstimo registrado.
                                    </td>
                                </tr>
                            ) : (
                                emprestimos.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>
                                            {emp.equipamento.marca}{" "}
                                            {emp.equipamento.modelo}
                                            <div
                                                style={{
                                                    fontSize: 11,
                                                    color: "var(--text-muted)",
                                                    fontFamily: "monospace",
                                                }}
                                            >
                                                #{emp.equipamento.id_patrimonio}
                                            </div>
                                        </td>
                                        <td>{emp.funcionario.nome}</td>
                                        <td>
                                            <span className="chip">
                                                {emp.setor}
                                            </span>
                                        </td>
                                        <td
                                            style={{
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                            }}
                                        >
                                            {new Date(
                                                emp.data_inicio,
                                            ).toLocaleDateString("pt-BR")}
                                        </td>
                                        <td
                                            style={{
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                            }}
                                        >
                                            {emp.data_prevista_devolucao
                                                ? new Date(
                                                      emp.data_prevista_devolucao,
                                                  ).toLocaleDateString("pt-BR")
                                                : "—"}
                                        </td>
                                        <td>
                                            <Badge variant={emp.status} />
                                        </td>
                                        <td>
                                            <div className="table__actions">
                                                <Button
                                                    as="link"
                                                    href={`/emprestimos/${emp.id}`}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                {emp.status === "ativo" && (
                                                    <Button
                                                        variant="link-warning"
                                                        size="sm"
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
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default EmprestimosIndex;
