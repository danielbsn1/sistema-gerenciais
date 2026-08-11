export type RoleUsuario = "admin" | "user";

export interface Usuario {
    id: number;
    name: string;
    email: string;
    role: RoleUsuario;
    created_at?: string;
}

export interface NotificationData {
    tipo?: string;
    importados?: number;
    erros?: number;
    caminho_erros?: string | null;
    mensagem?: string;
}

export interface SystemNotification {
    id: string;
    type: string;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
}
