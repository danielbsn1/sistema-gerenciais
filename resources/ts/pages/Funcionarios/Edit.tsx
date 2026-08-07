// resources/ts/pages/Funcionarios/Edit.tsx
import { FC } from "react";
import { Link, useForm } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Funcionario } from "../../types/funcionarios";

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
                <CardHeader>
                    <CardTitle>Editar Funcionário</CardTitle>
                    <CardDescription>{funcionario.nome}</CardDescription>
                </CardHeader>

                <CardContent>
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
                </CardContent>

                <CardFooter className="gap-2">
                    <Button render={<Link href="/funcionarios" />} variant="outline">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="edit-func-form"
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
