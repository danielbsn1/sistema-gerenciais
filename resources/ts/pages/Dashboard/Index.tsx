import AppLayout from "../../components/layout/AppLayout";
import StatCard from "../../components/cards/StatCard";
import {
    Users,
    Package,
    Wrench,
    CheckCircle2,
} from "lucide-react";
import { ChartPieInteractive } from "./chartds";

interface Props {
    totalEquipamentos: number;
    disponiveis: number;
    emUso: number;
    manutencao: number;
    funcionarios: number;
}

export default function Dashboard({
    totalEquipamentos,
    disponiveis,
    emUso,
    manutencao,
    funcionarios,
}: Props) {
    return (
        <AppLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Visão geral do sistema
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard
                    title="Total"
                    value={totalEquipamentos}
                    icon={<Package className="size-5" />}
                />
                <StatCard
                    title="Disponíveis"
                    value={disponiveis}
                    icon={<CheckCircle2 className="size-5" />}
                />
                <StatCard
                    title="Em Uso"
                    value={emUso}
                    icon={<Users className="size-5" />}
                />
                <StatCard
                    title="Manutenção"
                    value={manutencao}
                    icon={<Wrench className="size-5" />}
                />
                <StatCard
                    title="Funcionários"
                    value={funcionarios}
                    icon={<Users className="size-5" />}
                />
            </div>

            <ChartPieInteractive />
        </AppLayout>
    );
}
