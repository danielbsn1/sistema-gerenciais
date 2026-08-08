// resources/ts/pages/Equipamentos/Edit.tsx
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Field } from "@/components/Field";
import { Equipamento } from "../../types/funcionarios";

interface Props {
    equipamento: Equipamento;
}

const TIPOS = [
    { value: "notebook", label: "Notebook" },
    { value: "desktop", label: "Desktop" },
    { value: "monitor", label: "Monitor" },
    { value: "tablet", label: "Tablet" },
    { value: "celular", label: "Celular" },
    { value: "impressora", label: "Impressora" },
    { value: "outros", label: "Outros" },
];
const STATUS = [
    { value: "disponivel", label: "Disponível" },
    { value: "em_uso", label: "Em Uso" },
    { value: "manutencao", label: "Manutenção" },
];

const EquipamentosEdit: FC<Props> = ({ equipamento }) => {
    const { data, setData, put, processing, errors } = useForm({
        patrimonio_id: equipamento.patrimonio_id,
        tipo: equipamento.tipo,
        marca: equipamento.marca,
        modelo: equipamento.modelo,
        status: equipamento.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/equipamentos/${equipamento.id}`);
    };

    return (
        <AppLayout title="Equipamentos">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Editar Equipamento
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        #{equipamento.patrimonio_id} — {equipamento.marca}{" "}
                        {equipamento.modelo}
                    </p>
                </div>
                <Button render={<Link href="/equipamentos" />} variant="outline">
                    Voltar
                </Button>
            </div>

            <Card className="mx-auto max-w-3xl">
                <form onSubmit={handleSubmit} id="edit-form">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field
                                label="ID Patrimônio"
                                required
                                error={errors.patrimonio_id}
                            >
                                <Input
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
                                    value={data.marca}
                                    onChange={(e) => setData("marca", e.target.value)}
                                    aria-invalid={!!errors.marca}
                                />
                            </Field>

                            <Field label="Modelo" required error={errors.modelo}>
                                <Input
                                    value={data.modelo}
                                    onChange={(e) => setData("modelo", e.target.value)}
                                    aria-invalid={!!errors.modelo}
                                />
                            </Field>

                            <Field label="Status" required error={errors.status}>
                                <Select
                                    value={data.status || null}
                                    onValueChange={(value) =>
                                        setData("status", value as any)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS.map((s) => (
                                            <SelectItem key={s.value} value={s.value}>
                                                {s.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </Field>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-end gap-2">
                        <Button render={<Link href="/equipamentos" />} variant="outline">
                            Cancelar
                        </Button>
                        <Button type="submit" form="edit-form" disabled={processing}>
                            {processing ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
};

export default EquipamentosEdit;
