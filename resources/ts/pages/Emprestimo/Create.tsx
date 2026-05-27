// resources/ts/pages/Emprestimos/Create.tsx
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
import { Equipamento, Funcionario } from "../../types/funcionarios";
import "../../styles/components.css";

interface Props {
    equipamentos: Equipamento[];
    funcionarios: Funcionario[];
}

const EmprestimosCreate: FC<Props> = ({ equipamentos, funcionarios }) => {
    const { data, setData, post, processing, errors } = useForm({
        equipamento_id: "",
        funcionario_id: "",
        setor: "",
        data_inicio: new Date().toISOString().split("T")[0],
        data_prevista_devolucao: "",
        observacoes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/emprestimos");
    };

    // Auto-fill setor from selected funcionario
    const handleFuncionarioChange = (id: string) => {
        setData("funcionario_id", id);
        const func = funcionarios.find((f) => String(f.id) === id);
        if (func) setData("setor", func.setor);
    };

    return (
        <AppLayout title="Empréstimos">
            <Card>
                <CardHeader
                    title="Novo Empréstimo"
                    subtitle="Registrar empréstimo de equipamento"
                />

                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        id="create-emp-form"
                    >
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Equipamento
                                </label>
                                <select
                                    className={`form-select ${errors.equipamento_id ? "is-error" : ""}`}
                                    value={data.equipamento_id}
                                    onChange={(e) =>
                                        setData(
                                            "equipamento_id",
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Selecione...</option>
                                    {equipamentos
                                        .filter(
                                            (eq) => eq.status === "disponivel",
                                        )
                                        .map((eq) => (
                                            <option key={eq.id} value={eq.id}>
                                                #{eq.id_patrimonio} — {eq.marca}{" "}
                                                {eq.modelo}
                                            </option>
                                        ))}
                                </select>
                                {errors.equipamento_id && (
                                    <span className="form-error">
                                        {errors.equipamento_id}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Funcionário
                                </label>
                                <select
                                    className={`form-select ${errors.funcionario_id ? "is-error" : ""}`}
                                    value={data.funcionario_id}
                                    onChange={(e) =>
                                        handleFuncionarioChange(e.target.value)
                                    }
                                >
                                    <option value="">Selecione...</option>
                                    {funcionarios.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.nome} — {f.setor}
                                        </option>
                                    ))}
                                </select>
                                {errors.funcionario_id && (
                                    <span className="form-error">
                                        {errors.funcionario_id}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Setor
                                </label>
                                <input
                                    className={`form-input ${errors.setor ? "is-error" : ""}`}
                                    placeholder="Setor de destino"
                                    value={data.setor}
                                    onChange={(e) =>
                                        setData("setor", e.target.value)
                                    }
                                />
                                {errors.setor && (
                                    <span className="form-error">
                                        {errors.setor}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Data de Início
                                </label>
                                <input
                                    type="date"
                                    className={`form-input ${errors.data_inicio ? "is-error" : ""}`}
                                    value={data.data_inicio}
                                    onChange={(e) =>
                                        setData("data_inicio", e.target.value)
                                    }
                                />
                                {errors.data_inicio && (
                                    <span className="form-error">
                                        {errors.data_inicio}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Previsão de Devolução
                                </label>
                                <input
                                    type="date"
                                    className="form-input"
                                    value={data.data_prevista_devolucao}
                                    onChange={(e) =>
                                        setData(
                                            "data_prevista_devolucao",
                                            e.target.value,
                                        )
                                    }
                                />
                                <span className="form-hint">Opcional</span>
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
                    <Button as="link" href="/emprestimos" variant="secondary">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="create-emp-form"
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? "Registrando..." : "Registrar Empréstimo"}
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
};

export default EmprestimosCreate;
