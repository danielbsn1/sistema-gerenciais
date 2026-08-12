import { Link } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BellOff, Download } from "lucide-react";
import { SystemNotification } from "../../types/usuario";

interface Props {
    notificacoes: {
        data: SystemNotification[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

function formatarData(iso?: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function NotificacoesIndex({ notificacoes }: Props) {
    const items = notificacoes?.data ?? [];

    return (
        <AppLayout title="Notificações">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Notificações
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Acompanhe o resultado das importações e solicitações
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 px-2 py-10 text-center text-sm text-muted-foreground">
                            <BellOff className="size-6" />
                            Você não tem notificações
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {items.map((n) => (
                                <li
                                    key={n.id}
                                    className={
                                        n.read_at
                                            ? "flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                            : "flex flex-col gap-1 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                    }
                                >
                                    <div>
                                        <p className="text-sm">
                                            {n.data?.mensagem ?? "Notificação"}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                            {formatarData(n.created_at)}
                                        </span>
                                    </div>
                                    {n.data?.caminho_erros && (
                                        <a
                                            href={`/notificacoes/${n.id}/erros`}
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                                        >
                                            <Download className="size-3.5" />
                                            Baixar CSV de erros
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            {notificacoes?.links?.length > 3 && (
                <div className="flex flex-wrap justify-center gap-1">
                    {notificacoes.links.map((link, i) => {
                        if (link.url === null) {
                            return (
                                <Button key={i} variant="ghost" size="sm" disabled>
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            );
                        }

                        return (
                            <Link key={i} href={link.url}>
                                <Button
                                    variant={link.active ? "default" : "ghost"}
                                    size="sm"
                                >
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </Button>
                            </Link>
                        );
                    })}
                </div>
            )}
        </AppLayout>
    );
}
