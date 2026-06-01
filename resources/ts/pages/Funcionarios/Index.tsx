// resources/ts/pages/Funcionarios/Index.tsx
import { FC, useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { Funcionario } from "../../types/funcionarios";
import "../../styles/equipamentos.css";
import "../../styles/showeq.css";

interface Props {
    funcionarios: Funcionario[];
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
                        {funcionarios.length} funcionário(s)
                    </span>
                    <Button
                        as="link"
                        href="/funcionarios/create"
                        variant="primary"
                        size="sm"
                    >
                        + Cadastrar
                    </Button>
                </div>

                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Setor</th>
                                <th>Tipo</th>
                                <th>Equipamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funcionarios.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="table__empty">
                                        Nenhum funcionário cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                funcionarios.map((f) => (
                                    <tr key={f.id}>
                                        <td>{f.nome}</td>
                                        <td
                                            style={{
                                                fontFamily: "monospace",
                                                fontSize: 13,
                                            }}
                                        >
                                            {f.cpf}
                                        </td>
                                        <td>
                                            <span className="chip">
                                                {f.setor}
                                            </span>
                                        </td>
                                        <td>
                                            <Badge variant={f.tipo} />
                                        </td>
                                        <td>{f.equipamento_atual ?? "—"}</td>
                                        <td>
                                            <div className="table__actions">
                                                <Button
                                                    as="link"
                                                    href={`/funcionarios/${f.id}`}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                <Button
                                                    as="link"
                                                    href={`/funcionarios/${f.id}/edit`}
                                                    variant="link-warning"
                                                    size="sm"
                                                >
                                                    Editar
                                                </Button>
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

export default FuncionariosIndex;
