// resources/ts/pages/Funcionarios/Edit.tsx
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
import { Funcionario } from "../../types/funcionarios";
import "../../styles/components.css";

interface Props {
    funcionario: Funcionario;
}

const FuncionariosEdit: FC<Props> = ({ funcionario }) => {
    const { data, setData, put, processing, errors } = useForm({
        nome: funcionario.nome,
        cpf: funcionario.cpf,
        setor: funcionario.setor,
        tipo: funcionario.tipo,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/funcionarios/${funcionario.id}`);
    };

    return (
        <AppLayout title="Funcionários">
            <Card>
                <CardHeader
                    title="Editar Funcionário"
                    subtitle={funcionario.nome}
                />

                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        id="edit-func-form"
                    >
                        <div className="form-grid">
                            <div className="form-group form-group--full">
                                <label className="form-label form-label--required">
                                    Nome Completo
                                </label>
                                <input
                                    className={`form-input ${errors.nome ? "is-error" : ""}`}
                                    value={data.nome}
                                    onChange={(e) =>
                                        setData("nome", e.target.value)
                                    }
                                />
                                {errors.nome && (
                                    <span className="form-error">
                                        {errors.nome}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    CPF
                                </label>
                                <input
                                    className={`form-input ${errors.cpf ? "is-error" : ""}`}
                                    value={data.cpf}
                                    onChange={(e) =>
                                        setData("cpf", e.target.value)
                                    }
                                />
                                {errors.cpf && (
                                    <span className="form-error">
                                        {errors.cpf}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label form-label--required">
                                    Setor
                                </label>
                                <input
                                    className={`form-input ${errors.setor ? "is-error" : ""}`}
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
                                    Tipo
                                </label>
                                <select
                                    className={`form-select ${errors.tipo ? "is-error" : ""}`}
                                    value={data.tipo}
                                    onChange={(e) =>
                                        setData("tipo", e.target.value as any)
                                    }
                                >
                                    <option value="interno">Interno</option>
                                    <option value="externo">Externo</option>
                                </select>
                                {errors.tipo && (
                                    <span className="form-error">
                                        {errors.tipo}
                                    </span>
                                )}
                            </div>
                        </div>
                    </form>
                </CardBody>

                <CardFooter>
                    <Button as="link" href="/funcionarios" variant="secondary">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="edit-func-form"
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

export default FuncionariosEdit;
