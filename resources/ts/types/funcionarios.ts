// =============================================
// TYPES — VersaReurb
// =============================================

export type StatusEquipamento = 'disponivel' | 'em_uso' | 'manutencao';
export type TipoFuncionario   = 'interno' | 'externo';
export type StatusEmprestimo  = 'ativo' | 'devolvido' | 'atrasado';

export interface Equipamento {
  id: number;
  id_patrimonio: string;
  tipo: string;
  marca: string;
  modelo: string;
  status: StatusEquipamento;
  usuario_atual?: string;
  setor_atual?: string;
  created_at?: string;
}

export interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  setor: string;
  tipo: TipoFuncionario;
  equipamento_atual?: string;
  created_at?: string;
}

export interface Emprestimo {
  id: number;
  equipamento: Equipamento;
  funcionario: Funcionario;
  setor: string;
  data_inicio: string;
  data_prevista_devolucao?: string;
  data_devolucao?: string;
  status: StatusEmprestimo;
  observacoes?: string;
}

export interface DashboardStats {
  total: number;
  disponiveis: number;
  em_uso: number;
  manutencao: number;
  funcionarios: number;
}

export interface PageProps {
  auth: { user: { name: string; email: string } };
}