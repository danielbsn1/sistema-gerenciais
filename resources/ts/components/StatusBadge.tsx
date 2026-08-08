import { Badge } from "@/components/ui/badge"

type Status =
    | "disponivel"
    | "em_uso"
    | "manutencao"
    | "ativo"
    | "devolvido"
    | "atrasado"
    | "interno"
    | "prefeitura"
    | "pendente"
    | "aprovada"
    | "recusada"
    | "baixa"
    | "media"
    | "alta"

const CONFIG: Record<
    Status,
    { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
> = {
    disponivel: { variant: "secondary", label: "Disponível" },
    em_uso: { variant: "default", label: "Em Uso" },
    manutencao: { variant: "outline", label: "Manutenção" },
    ativo: { variant: "default", label: "Ativo" },
    devolvido: { variant: "secondary", label: "Devolvido" },
    atrasado: { variant: "destructive", label: "Atrasado" },
    interno: { variant: "default", label: "Interno" },
    prefeitura: { variant: "outline", label: "Prefeitura" },
    pendente: { variant: "outline", label: "Pendente" },
    aprovada: { variant: "default", label: "Aprovada" },
    recusada: { variant: "destructive", label: "Recusada" },
    baixa: { variant: "secondary", label: "Baixa" },
    media: { variant: "outline", label: "Média" },
    alta: { variant: "destructive", label: "Alta" },
}

interface StatusBadgeProps {
    status: string
    label?: string
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
    const config = CONFIG[status as Status]
    if (!config) {
        return <Badge variant="outline">{status}</Badge>
    }
    return <Badge variant={config.variant}>{label ?? config.label}</Badge>
}
