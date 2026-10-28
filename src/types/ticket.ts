export interface Ticket {
  id: string;
  title: string;
  description?: string;
  email?: string;
  sector?: string;
  priority: "Alta" | "Média" | "Baixa";
  status: "Aberto" | "Em andamento" | "Concluído";
  requester?: string;
  createdAt: string;
  updatedAt?: string;
}