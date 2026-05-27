// resources/ts/pages/Equipamentos/Edit.tsx
import { FC } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "../../layout/Navbar";
import Button from "../../components/ui/Button";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "../../components/ui/Modal";
import { Equipamento } from "../../types/funcionarios";
import "../../styles/components.css";

interface Props {
    equipamento: Equipamento;
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
const STATUS = [
    { value: "disponivel", label: "Disponível" },
    { value: "em_uso", label: "Em Uso" },
    { value: "manutencao", label: "Manutenção" },
];

const EquipamentosEdit: FC<Props> = ({ equipamento }) => {
    const { data, setData, put, processing, errors } = useForm({
        id_patrimonio: equipamento.id_patrimonio,
        tipo: equipamento.tipo,
        marca: equipamento.marca,
        modelo: equipamento.modelo,
        status: equipamento.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/equipamentos/${equipamento.id}`);
    };

    return (
        <AppLayout title="Equipamentos">
            <Card>
                <CardHeader
                    title="Editar Equipamento"
                    subtitle={`#${equipamento.id_patrimonio} — ${equipamento.marca} ${equipamento.modelo}`}
                />

                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        id="edit-form"
                    >
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    ID Patrimônio
                                </label>
                                <input
                                    className={`form-input ${errors.id_patrimonio ? "is-error" : ""}`}
                                    value={data.id_patrimonio}
                                    onChange={(e) =>
                                        setData("id_patrimonio", e.target.value)
                                    }
                                />
                                {errors.id_patrimonio && (
                                    <span className="form-error">
                                        {errors.id_patrimonio}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Tipo
                                </label>
                                <select
                                    className={`form-select ${errors.tipo ? "is-error" : ""}`}
                                    value={data.tipo}
                                    onChange={(e) =>
                                        setData("tipo", e.target.value)
                                    }
                                >
                                    <option value="">Selecione...</option>
                                    {TIPOS.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                                {errors.tipo && (
                                    <span className="form-error">
                                        {errors.tipo}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Marca
                                </label>
                                <input
                                    className={`form-input ${errors.marca ? "is-error" : ""}`}
                                    value={data.marca}
                                    onChange={(e) =>
                                        setData("marca", e.target.value)
                                    }
                                />
                                {errors.marca && (
                                    <span className="form-error">
                                        {errors.marca}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Modelo
                                </label>
                                <input
                                    className={`form-input ${errors.modelo ? "is-error" : ""}`}
                                    value={data.modelo}
                                    onChange={(e) =>
                                        setData("modelo", e.target.value)
                                    }
                                />
                                {errors.modelo && (
                                    <span className="form-error">
                                        {errors.modelo}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Status
                                </label>
                                <select
                                    className={`form-select ${errors.status ? "is-error" : ""}`}
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value as any)
                                    }
                                >
                                    {STATUS.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && (
                                    <span className="form-error">
                                        {errors.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    </form>
                </CardBody>

                <CardFooter>
                    <Button as="link" href="/equipamentos" variant="secondary">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="edit-form"
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
};

export default EquipamentosEdit;
