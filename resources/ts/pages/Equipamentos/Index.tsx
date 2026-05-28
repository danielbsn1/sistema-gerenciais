import { FC, useState } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Input";
import { Equipamento } from "../../types/funcionarios";

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

const EquipamentosIndex: FC<Props> = ({ equipamentos, filters }) => {
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
        if (confirm("Deseja excluir este equipamento?")) {
            router.delete(`/equipamentos/${id}`);
        }
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

                <Button variant="primary" onClick={handleFilter}>
                    Filtrar
                </Button>
                <button className="btn--ghost-text" onClick={handleClear}>
                    Limpar
                </button>
            </div>

            {/* Table Card */}
            <div className="card">
                <div className="card__header">
                    <span className="list-header__count">
                        {equipamentos.length} equipamento(s)
                    </span>
                    <Button
                        as="link"
                        href="/equipamentos/create"
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
                                <th>ID Patrimônio</th>
                                <th>Tipo</th>
                                <th>Equipamento</th>
                                <th>Status</th>
                                <th>Usuário</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipamentos.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="table__empty">
                                        Nenhum equipamento cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                equipamentos.map((eq) => (
                                    <tr key={eq.id}>
                                        <td
                                            style={{
                                                fontFamily: "monospace",
                                                fontSize: 13,
                                            }}
                                        >
                                            #{eq.id_patrimonio}
                                        </td>
                                        <td>{eq.tipo}</td>
                                        <td>
                                            {eq.marca} {eq.modelo}
                                        </td>
                                        <td>
                                            <Badge variant={eq.status} />
                                        </td>
                                        <td>{eq.usuario_atual ?? "—"}</td>
                                        <td>
                                            <div className="table__actions">
                                                <Button
                                                    as="link"
                                                    href={`/equipamentos/${eq.id}`}
                                                    variant="link"
                                                    size="sm"
                                                >
                                                    Ver
                                                </Button>
                                                <Button
                                                    as="link"
                                                    href={`/equipamentos/${eq.id}/edit`}
                                                    variant="link-warning"
                                                    size="sm"
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="link-danger"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDelete(eq.id)
                                                    }
                                                >
                                                    Excluir
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

export default EquipamentosIndex;
