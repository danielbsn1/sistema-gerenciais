import { FC } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";
import "../../styles/form.css";
import "../../styles/emprestimo.css";

interface Equipamento {
    id: number;
    patrimonio_id: string;
    marca: string;
    modelo: string;
}

interface Funcionario {
    id: number;
    nome: string;
}

interface Props {
    equipamentos: Equipamento[];
    funcionarios: Funcionario[];
}

const EmprestimosCreate: FC<Props> = ({
    equipamentos = [],
    funcionarios = [],
}) => {
    const { data, setData, post, processing, errors } = useForm({
        equipamento_id: "",
        funcionario_id: "",
        observacoes: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/emprestimos");
    };

    return (
        <AppLayout title="Novo Empréstimo">
            <div className="page-form">
                <div className="form-card">
                    <div className="form-card__header">
                        <h2 className="form-card__title">Novo Empréstimo</h2>
                        <p className="form-card__subtitle">
                            Vincule um equipamento a um funcionário
                        </p>
                    </div>

                    <form onSubmit={submit} id="emprestimo-form" className="emprestimo-form">
                        <div className="form-card__body">
                            <div className="form-grid">
                                <div className="form-group form-group--full">
                                    <label className="form-label form-label--required">
                                        Equipamento
                                    </label>
                                    <select
                                        className={`form-select ${errors.equipamento_id ? "is-error" : ""}`}
                                        value={data.equipamento_id}
                                        onChange={(e) =>
                                            setData("equipamento_id", e.target.value)
                                        }
                                    >
                                        <option value="">Selecione um equipamento</option>
                                        {equipamentos.map((eq) => (
                                            <option key={eq.id} value={eq.id}>
                                                {eq.marca} {eq.modelo} — {eq.patrimonio_id}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.equipamento_id && (
                                        <span className="form-error">{errors.equipamento_id}</span>
                                    )}
                                </div>

                                <div className="form-group form-group--full">
                                    <label className="form-label form-label--required">
                                        Funcionário
                                    </label>
                                    <select
                                        className={`form-select ${errors.funcionario_id ? "is-error" : ""}`}
                                        value={data.funcionario_id}
                                        onChange={(e) =>
                                            setData("funcionario_id", e.target.value)
                                        }
                                    >
                                        <option value="">Selecione um funcionário</option>
                                        {funcionarios.map((func) => (
                                            <option key={func.id} value={func.id}>
                                                {func.nome}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.funcionario_id && (
                                        <span className="form-error">{errors.funcionario_id}</span>
                                    )}
                                </div>

                                <div className="form-group form-group--full">
                                    <label className="form-label">Observações</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Informações adicionais sobre o empréstimo..."
                                        value={data.observacoes}
                                        onChange={(e) =>
                                            setData("observacoes", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-card__footer">
                            <Button as="link" href="/emprestimos" variant="secondary">
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary" disabled={processing}>
                                {processing ? "Salvando..." : "Registrar Empréstimo"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default EmprestimosCreate;
