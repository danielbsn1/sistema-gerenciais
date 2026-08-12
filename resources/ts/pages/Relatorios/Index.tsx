import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Laptop, Users, ArrowLeftRight, Printer, FileDown } from "lucide-react";

const RELATORIOS = [
    {
        titulo: "Equipamentos",
        descricao: "Inventário de ativos com patrimônio, tipo, marca, modelo e status.",
        icon: Laptop,
        rota: "/relatorios/equipamentos",
    },
    {
        titulo: "Funcionários",
        descricao: "Colaboradores com nome, CPF, cargo, setor, telefone e situação.",
        icon: Users,
        rota: "/relatorios/funcionarios",
    },
    {
        titulo: "Empréstimos",
        descricao: "Empréstimos de equipamentos com datas e status.",
        icon: ArrowLeftRight,
        rota: "/relatorios/emprestimos",
    },
];

export default function RelatoriosIndex() {
    return (
        <AppLayout title="Relatórios">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Relatórios
                </h1>
                <p className="text-sm text-muted-foreground">
                    Gere relatórios do sistema com opção de imprimir ou baixar em PDF
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {RELATORIOS.map(({ titulo, descricao, icon: Icon, rota }) => (
                    <Card key={titulo}>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <CardTitle>{titulo}</CardTitle>
                                    <CardDescription>{descricao}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <a href={rota} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline">
                                        <Printer />
                                        Imprimir
                                    </Button>
                                </a>
                                <a href={`${rota}/pdf`}>
                                    <Button>
                                        <FileDown />
                                        Baixar PDF
                                    </Button>
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
