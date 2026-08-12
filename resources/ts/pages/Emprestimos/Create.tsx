import { FC } from "react";
import { Link, useForm } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/Field";

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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Novo Empréstimo
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Vincule um equipamento a um funcionário
                    </p>
                </div>
                <Button render={<Link href="/emprestimos" />} variant="outline">
                    Voltar
                </Button>
            </div>

            <Card className="mx-auto max-w-3xl">
                <form onSubmit={submit} id="emprestimo-form">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 gap-4">
                            <Field
                                label="Equipamento"
                                required
                                error={errors.equipamento_id}
                            >
                                <Select
                                    value={data.equipamento_id || null}
                                    onValueChange={(value) =>
                                        setData("equipamento_id", value ?? "")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um equipamento" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipamentos.map((eq) => (
                                            <SelectItem
                                                key={eq.id}
                                                value={String(eq.id)}
                                            >
                                                {eq.marca} {eq.modelo} —{" "}
                                                {eq.patrimonio_id}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field
                                label="Funcionário"
                                required
                                error={errors.funcionario_id}
                            >
                                <Select
                                    value={data.funcionario_id || null}
                                    onValueChange={(value) =>
                                        setData("funcionario_id", value ?? "")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um funcionário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {funcionarios.map((func) => (
                                            <SelectItem
                                                key={func.id}
                                                value={String(func.id)}
                                            >
                                                {func.nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field label="Observações">
                                <Textarea
                                    placeholder="Informações adicionais sobre o empréstimo..."
                                    value={data.observacoes}
                                    onChange={(e) =>
                                        setData("observacoes", e.target.value)
                                    }
                                />
                            </Field>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                        <Button render={<Link href="/emprestimos" />} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit" form="emprestimo-form" disabled={processing}>
                            {processing ? "Salvando..." : "Registrar Empréstimo"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
};

export default EmprestimosCreate;
