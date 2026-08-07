// resources/ts/pages/Funcionarios/Create.tsx
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

const FuncionariosCreate: FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        nome: "",
        cpf: "",
        setor: "",
        tipo: "interno",
        telefone: "",
        email: "",
        observacoes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/funcionarios");
    };

    const maskCPF = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            .slice(0, 14);
    };

    return (
        <AppLayout title="Funcionários">
            <Card>
                <CardHeader>
                    <CardTitle>Cadastrar Funcionário</CardTitle>
                    <CardDescription>
                        Preencha os dados do novo funcionário
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        id="create-func-form"
                    >
                        <div className="form-grid">
                            <div className="form-group form-group--full">
                                <label className="form-label form-label--required">
                                    Nome Completo
                                </label>
                                <input
                                    className={`form-input ${errors.nome ? "is-error" : ""}`}
                                    placeholder="Nome e sobrenome"
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
                                    placeholder="000.000.000-00"
                                    value={data.cpf}
                                    onChange={(e) =>
                                        setData("cpf", maskCPF(e.target.value))
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
                                    placeholder="Ex: TI, Campo, Administrativo..."
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
                                        setData("tipo", e.target.value)
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

                            <div className="form-group">
                                <label className="form-label">Telefone</label>
                                <input
                                    className="form-input"
                                    placeholder="(00) 00000-0000"
                                    value={data.telefone}
                                    onChange={(e) =>
                                        setData("telefone", e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">E-mail</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    placeholder="email@empresa.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
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
                </CardContent>

                <CardFooter className="gap-2">
                    <Button render={<Link href="/funcionarios" />} variant="outline">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="create-func-form"
                        disabled={processing}
                    >
                        {processing ? "Salvando..." : "Cadastrar"}
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
};

export default FuncionariosCreate;
