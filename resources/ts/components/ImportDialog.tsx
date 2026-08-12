import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FileUp, Download } from "lucide-react";

interface Props {
    title: string;
    description: string;
    templateHref: string;
    importUrl: string;
}

export function ImportDialog({ title, description, templateHref, importUrl }: Props) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    function handleImport() {
        if (!file) {
            return;
        }

        setProcessing(true);
        setError("");

        router.post(
            importUrl,
            { planilha: file },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    setFile(null);
                },
                onError: (errors) => {
                    setError(errors.planilha ?? "Erro ao importar o arquivo.");
                },
                onFinish: () => setProcessing(false),
            },
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
                <FileUp />
                Importar
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-3">
                    <Input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => {
                            setFile(e.target.files?.[0] ?? null);
                            setError("");
                        }}
                    />
                    {error && (
                        <p className="text-xs text-destructive">{error}</p>
                    )}
                    <a
                        href={templateHref}
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                        <Download />
                        Baixar modelo da planilha
                    </a>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleImport}
                        disabled={!file || processing}
                    >
                        {processing ? "Importando..." : "Importar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
