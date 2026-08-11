import { FC, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import AppLayout from "../../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Usuario } from "../../types/usuario";

interface Props {
    usuarios: Usuario[];
    filters: { search?: string };
}

const ROLES: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
    admin: { label: "Admin", variant: "default" },
    user: { label: "Colaborador", variant: "secondary" },
};

const UsuariosIndex: FC<Props> = ({ usuarios = [], filters = {} }) => {
    const { auth } = usePage().props as { auth?: { user?: { id?: number } } };
    const [search, setSearch] = useState(filters.search ?? "");
    const userId = auth?.user?.id;

    const handleFilter = () => {
        router.get("/usuarios", { search }, { preserveState: true });
    };

    const handleDelete = (usuario: Usuario) => {
        if (!confirm(`Deseja excluir o usuário ${usuario.name}?`)) {
            return;
        }

        router.delete(`/usuarios/${usuario.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Usuários">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Usuários
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Gerencie os acessos ao sistema
                    </p>
                </div>
                <Button render={<Link href="/usuarios/create" />}>
                    + Cadastrar
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="grid gap-1.5">
                            <label className="text-sm font-medium">Buscar</label>
                            <Input
                                placeholder="Nome ou e-mail..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleFilter()
                                }
                                className="w-full sm:w-64"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleFilter}>Filtrar</Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setSearch("");
                                    router.get("/usuarios", {}, { preserveState: true });
                                }}
                            >
                                Limpar
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <tr>
                                <TableHead>Nome</TableHead>
                                <TableHead>E-mail</TableHead>
                                <TableHead>Perfil</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {usuarios.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        Nenhum usuário cadastrado.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                usuarios.map((u) => {
                                    const role = ROLES[u.role] ?? {
                                        label: u.role,
                                        variant: "outline",
                                    };

                                    return (
                                        <TableRow key={u.id}>
                                            <TableCell className="font-medium">
                                                {u.name}
                                                {u.id === userId && (
                                                    <span className="ml-2 text-xs text-muted-foreground">
                                                        (você)
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>{u.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={role.variant}>
                                                    {role.label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-end gap-1">
                                                    <Button
                                                        render={
                                                            <Link href={`/usuarios/${u.id}/edit`} />
                                                        }
                                                        variant="link"
                                                        size="sm"
                                                    >
                                                        Editar
                                                    </Button>
                                                    {u.id !== userId && (
                                                        <Button
                                                            variant="link"
                                                            size="sm"
                                                            className="text-destructive hover:text-destructive"
                                                            onClick={() => handleDelete(u)}
                                                        >
                                                            Excluir
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default UsuariosIndex;
