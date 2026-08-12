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

const TIPOS = [
    { value: "notebook", label: "Notebook" },
    { value: "desktop", label: "Desktop" },
    { value: "monitor", label: "Monitor" },
    { value: "tablet", label: "Tablet" },
];

export default function EquipamentosCreate() {
    const { data, setData, post, processing, errors } = useForm({
        patrimonio_id: "",
        tipo: "",
        marca: "",
        modelo: "",
        observacoes: "",
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post("/equipamentos");
    }

    return (
        <AppLayout title="Novo Equipamento">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Cadastrar Equipamento
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Preencha os dados do novo ativo
                    </p>
                </div>
                <Button render={<Link href="/equipamentos" />} variant="outline">
                    Voltar
                </Button>
            </div>

            <Card className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} id="create-eq-form">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="ID Patrimônio"
                                required
                                error={errors.patrimonio_id}
                            >
                                <Input
                                    type="text"
                                    placeholder="Ex: PAT-0001"
                                    value={data.patrimonio_id}
                                    onChange={(e) =>
                                        setData("patrimonio_id", e.target.value)
                                    }
                                    aria-invalid={!!errors.patrimonio_id}
                                />
                            </Field>

                            <Field label="Tipo" required error={errors.tipo}>
                                <Select
                                    value={data.tipo || null}
                                    onValueChange={(value) =>
                                        setData("tipo", value ?? "")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TIPOS.map((t) => (
                                            <SelectItem key={t.value} value={t.value}>
                                                {t.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field label="Marca" required error={errors.marca}>
                                <Input
                                    type="text"
                                    placeholder="Ex: Dell, Lenovo..."
                                    value={data.marca}
                                    onChange={(e) => setData("marca", e.target.value)}
                                    aria-invalid={!!errors.marca}
                                />
                            </Field>

                            <Field label="Modelo" required error={errors.modelo}>
                                <Input
                                    type="text"
                                    placeholder="Ex: Inspiron 15"
                                    value={data.modelo}
                                    onChange={(e) => setData("modelo", e.target.value)}
                                    aria-invalid={!!errors.modelo}
                                />
                            </Field>

                            <Field
                                label="Observações"
                                className="sm:col-span-2"
                            >
                                <Textarea
                                    placeholder="Informações adicionais..."
                                    value={data.observacoes}
                                    onChange={(e) =>
                                        setData("observacoes", e.target.value)
                                    }
                                />
                            </Field>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                        <Button render={<Link href="/equipamentos" />} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Salvando..." : "Cadastrar"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}
