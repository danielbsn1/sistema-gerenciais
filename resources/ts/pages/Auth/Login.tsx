import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/Field";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post("/login");
    }

    return (
        <div className="flex min-h-svh items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Sistema<span className="text-primary">Gerenciais</span>
                    </CardTitle>
                    <CardDescription>
                        Faça login para continuar
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit} className="grid gap-4">
                        <Field label="E-mail" required error={errors.email}>
                            <Input
                                type="email"
                                placeholder="seu@email.com"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                aria-invalid={!!errors.email}
                            />
                        </Field>

                        <Field label="Senha" required error={errors.password}>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                aria-invalid={!!errors.password}
                            />
                        </Field>

                        <Button type="submit" disabled={processing} className="mt-2 w-full">
                            {processing ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
