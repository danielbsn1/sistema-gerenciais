// resources/ts/components/Badge.tsx
import "../styles/components.css";

type Variant =
    | "disponivel"
    | "em_uso"
    | "manutencao"
    | "ativo"
    | "devolvido"
    | "atrasado"
    | "interno"
    | "externo";

const LABELS: Record<Variant, string> = {
    disponivel: "Disponível",
    em_uso: "Em Uso",
    manutencao: "Manutenção",
    ativo: "Ativo",
    devolvido: "Devolvido",
    atrasado: "Atrasado",
    interno: "Interno",
    externo: "Externo",
};

interface Props {
    variant: Variant;
    label?: string;
}

export default function Badge({ variant, label }: Props) {
    return (
        <span className={`badge badge--${variant}`}>
            {label ?? LABELS[variant] ?? variant}
        </span>
    );
}
