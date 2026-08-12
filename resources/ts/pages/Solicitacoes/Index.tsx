import { FC, useState } from "react";
import { useForm } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../components/ui/table";
import StatusBadge from "../../components/StatusBadge";
import { Field } from "../../components/Field";

interface Solicitacao {
    id: number;
    tipo_equipamento: string;
    motivo: string;
    urgencia: "baixa" | "media" | "alta";
    observacoes?: string;
    status: "pendente" | "aprovada" | "recusada";
    created_at: string;
}

interface Props {
    solicitacoes: Solicitacao[];
}

const TIPOS = [
    "Notebook",
    "Desktop",
    "Monitor",
    "Tablet",
    "Celular",
    "Impressora",
];

const SolicitacoesIndex: FC<Props> = ({ solicitacoes = [] }) => {
    const [showForm, setShowForm] = useState(solicitacoes.length === 0);

    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_equipamento: "",
        motivo: "",
        urgencia: "media",
        observacoes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/solicitacoes", {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <AppLayout title="Solicitações">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Minhas Solicitações
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Solicite equipamentos e acompanhe o status
                    </p>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)}>
                        + Nova Solicitação
                    </Button>
                )}
            </div>

            {showForm && (
                <Card className="mx-auto max-w-3xl">
                    <form onSubmit={handleSubmit}>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field
                                    label="Tipo de Equipamento"
                                    required
                                    error={errors.tipo_equipamento}
                                >
                                    <Select
                                        value={data.tipo_equipamento || null}
                                        onValueChange={(value) =>
                                            setData("tipo_equipamento", value ?? "")
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TIPOS.map((t) => (
                                                <SelectItem key={t} value={t}>
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field
                                    label="Urgência"
                                    required
                                    error={errors.urgencia}
                                >
                                    <Select
                                        value={data.urgencia || null}
                                        onValueChange={(value) =>
                                            setData("urgencia", value ?? "media")
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="baixa">Baixa</SelectItem>
                                            <SelectItem value="media">Média</SelectItem>
                                            <SelectItem value="alta">Alta</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field
                                    label="Motivo"
                                    required
                                    error={errors.motivo}
                                    className="sm:col-span-2"
                                >
                                    <Input
                                        placeholder="Ex: Equipamento atual com defeito, novo colaborador..."
                                        value={data.motivo}
                                        onChange={(e) =>
                                            setData("motivo", e.target.value)
                                        }
                                        aria-invalid={!!errors.motivo}
                                    />
                                </Field>

                                <Field
                                    label="Observações"
                                    className="sm:col-span-2"
                                >
                                    <Textarea
                                        placeholder="Informações adicionais, especificações, etc..."
                                        value={data.observacoes}
                                        onChange={(e) =>
                                            setData("observacoes", e.target.value)
                                        }
                                    />
                                </Field>
                            </div>
                        </CardContent>

                        <CardFooter className="justify-end gap-2">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    reset();
                                    setShowForm(false);
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Enviando..." : "Enviar Solicitação"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            )}

            {solicitacoes.length > 0 ? (
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHead>Equipamento</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Urgência</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Data</TableHead>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {solicitacoes.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell className="font-medium">
                                            {s.tipo_equipamento}
                                        </TableCell>
                                        <TableCell className="max-w-60 truncate text-muted-foreground">
                                            {s.motivo}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={s.urgencia} />
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={s.status} />
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(
                                                s.created_at,
                                            ).toLocaleDateString("pt-BR")}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                !showForm && (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-16 text-center">
                        <span className="text-3xl">📋</span>
                        <p className="text-sm text-muted-foreground">
                            Nenhuma solicitação ainda.
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowForm(true)}
                        >
                            Criar a primeira
                        </Button>
                    </div>
                )
            )}
        </AppLayout>
    );
};

export default SolicitacoesIndex;
