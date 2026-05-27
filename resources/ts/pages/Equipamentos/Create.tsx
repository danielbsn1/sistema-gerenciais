// resources/ts/pages/Equipamentos/Create.tsx
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
import "../../styles/components.css";

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

const EquipamentosCreate: FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        id_patrimonio: "",
        tipo: "",
        marca: "",
        modelo: "",
        status: "disponivel",
        observacoes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/equipamentos");
    };

    return (
        <AppLayout title="Equipamentos">
            <Card>
                <CardHeader
                    title="Cadastrar Equipamento"
                    subtitle="Preencha os dados do novo equipamento"
                />

                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        id="create-form"
                    >
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    ID Patrimônio
                                </label>
                                <input
                                    className={`form-input ${errors.id_patrimonio ? "is-error" : ""}`}
                                    placeholder="Ex: PAT-001"
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
                                    placeholder="Ex: Dell, HP, Lenovo..."
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
                                    placeholder="Ex: Inspiron 15"
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
                                        setData("status", e.target.value)
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

                            <div className="form-group form-group--full">
                                <label className="form-label">
                                    Observações
                                </label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Informações adicionais..."
                                    value={data.observacoes}
                                    onChange={(e) =>
                                        setData("observacoes", e.target.value)
                                    }
                                />
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
                        form="create-form"
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? "Salvando..." : "Cadastrar"}
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
};

export default EquipamentosCreate;
