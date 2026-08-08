// resources/ts/pages/Funcionarios/Create.tsx
import { FC } from "react";
import { Link, useForm } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/Field";

const FuncionariosCreate: FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        nome: "",
        cpf: "",
        setor: "",
        tipo: "interno",
        telefone: "",
        email: "",
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Cadastrar Funcionário
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Preencha os dados do novo funcionário
                    </p>
                </div>
                <Button render={<Link href="/funcionarios" />} variant="outline">
                    Voltar
                </Button>
            </div>

            <Card className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} id="create-func-form">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="Nome Completo"
                                required
                                error={errors.nome}
                                className="sm:col-span-2"
                            >
                                <Input
                                    placeholder="Nome e sobrenome"
                                    value={data.nome}
                                    onChange={(e) => setData("nome", e.target.value)}
                                    aria-invalid={!!errors.nome}
                                />
                            </Field>

                            <Field label="CPF" required error={errors.cpf}>
                                <Input
                                    placeholder="000.000.000-00"
                                    value={data.cpf}
                                    onChange={(e) =>
                                        setData("cpf", maskCPF(e.target.value))
                                    }
                                    aria-invalid={!!errors.cpf}
                                />
                            </Field>

                            <Field label="Setor" required error={errors.setor}>
                                <Input
                                    placeholder="Ex: TI, Campo, Administrativo..."
                                    value={data.setor}
                                    onChange={(e) => setData("setor", e.target.value)}
                                    aria-invalid={!!errors.setor}
                                />
                            </Field>

                            <Field label="Tipo" required error={errors.tipo}>
                                <Select
                                    value={data.tipo || null}
                                    onValueChange={(value) =>
                                        setData("tipo", value ?? "interno")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="interno">Interno</SelectItem>
                                        <SelectItem value="prefeitura">Prefeitura</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field label="Telefone">
                                <Input
                                    placeholder="(00) 00000-0000"
                                    value={data.telefone}
                                    onChange={(e) =>
                                        setData("telefone", e.target.value)
                                    }
                                />
                            </Field>

                            <Field label="E-mail">
                                <Input
                                    type="email"
                                    placeholder="email@empresa.com"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                            </Field>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                        <Button render={<Link href="/funcionarios" />} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit" form="create-func-form" disabled={processing}>
                            {processing ? "Salvando..." : "Cadastrar"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
};

export default FuncionariosCreate;
