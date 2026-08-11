import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";

interface Props {
    titulo: string;
    colunas: string[];
    linhas: (string | number | null)[][];
    emitidoEm?: string;
}

export default function Imprimir({ titulo, colunas, linhas, emitidoEm }: Props) {
    useEffect(() => {
        const timeout = setTimeout(() => window.print(), 600);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="p-6">
            <div className="no-print mb-4 flex items-center justify-between">
                <Link href="/relatorios">
                    <Button variant="outline">
                        <ArrowLeft />
                        Voltar
                    </Button>
                </Link>
                <Button onClick={() => window.print()}>
                    <Printer />
                    Imprimir
                </Button>
            </div>

            <h1 className="text-xl font-bold">{titulo}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
                Emitido em:{" "}
                {emitidoEm ??
                    new Date().toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
            </p>

            <table className="mt-4 w-full border-collapse text-left text-sm">
                <thead>
                    <tr>
                        {colunas.map((coluna) => (
                            <th
                                key={coluna}
                                className="border bg-muted px-2 py-1.5 font-semibold"
                            >
                                {coluna}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {linhas.length === 0 ? (
                        <tr>
                            <td
                                colSpan={colunas.length}
                                className="border px-2 py-1.5 text-center text-muted-foreground"
                            >
                                Nenhum registro encontrado.
                            </td>
                        </tr>
                    ) : (
                        linhas.map((linha, indice) => (
                            <tr key={indice}>
                                {linha.map((valor, indiceColuna) => (
                                    <td
                                        key={indiceColuna}
                                        className="border px-2 py-1.5"
                                    >
                                        {valor ?? "—"}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <style>{`
                @media print {
                    .no-print {
                        display: none;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>
        </div>
    );
}
