import { FC } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "../../layout/AppLayout";
import Button from "../../components/ui/Button";

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
        <AppLayout>
            <div className="card">
                <h2>Novo Empréstimo</h2>

                <form onSubmit={submit}>
                    <div>
                        <label>Equipamento</label>

                        <select
                            value={data.equipamento_id}
                            onChange={(e) =>
                                setData("equipamento_id", e.target.value)
                            }
                        >
                            <option value="">Selecione um equipamento</option>

                            {equipamentos.map((eq) => (
                                <option key={eq.id} value={eq.id}>
                                    {eq.marca} {eq.modelo} -{eq.patrimonio_id}
                                </option>
                            ))}
                        </select>

                        {errors.equipamento_id && (
                            <p>{errors.equipamento_id}</p>
                        )}
                    </div>

                    <div>
                        <label>Funcionário</label>

                        <select
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
                            <p>{errors.funcionario_id}</p>
                        )}
                    </div>

                    <div>
                        <label>Observações</label>

                        <textarea
                            value={data.observacoes}
                            onChange={(e) =>
                                setData("observacoes", e.target.value)
                            }
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Salvando..." : "Registrar Empréstimo"}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
};

export default EmprestimosCreate;
