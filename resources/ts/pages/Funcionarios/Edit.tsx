// resources/ts/pages/Funcionarios/Edit.tsx
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/Field";
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Editar Funcionário
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {funcionario.nome}
                    </p>
                </div>
                <Button render={<Link href="/funcionarios" />} variant="outline">
                    Voltar
                </Button>
            </div>

            <Card className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} id="edit-func-form">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="Nome Completo"
                                required
                                error={errors.nome}
                                className="sm:col-span-2"
                            >
                                <Input
                                    value={data.nome}
                                    onChange={(e) => setData("nome", e.target.value)}
                                    aria-invalid={!!errors.nome}
                                />
                            </Field>

                            <Field label="CPF" required error={errors.cpf}>
                                <Input
                                    value={data.cpf}
                                    onChange={(e) => setData("cpf", e.target.value)}
                                    aria-invalid={!!errors.cpf}
                                />
                            </Field>

                            <Field label="Setor" required error={errors.setor}>
                                <Input
                                    value={data.setor}
                                    onChange={(e) => setData("setor", e.target.value)}
                                    aria-invalid={!!errors.setor}
                                />
                            </Field>

                            <Field label="Tipo" required error={errors.tipo}>
                                <Select
                                    value={data.tipo || null}
                                    onValueChange={(value) =>
                                        setData("tipo", value as any)
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
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                        <Button render={<Link href="/funcionarios" />} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit" form="edit-func-form" disabled={processing}>
                            {processing ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
};

export default FuncionariosEdit;
