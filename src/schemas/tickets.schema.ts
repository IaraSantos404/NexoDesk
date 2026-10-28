import { z } from "zod";

export const ticketSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().trim().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  requester: z.string().trim().min(3, "O nome do solicitante deve ter pelo menos 3 caracteres"),
  email: z.email("Informe um e-mail válido"),
  sector: z.enum(["TI", "RH", "Financeiro", "Operações", "Vendas"], {
    error: "Selecione um setor",
  }),
  priority: z.enum(["Alta", "Média", "Baixa"], {
    error: "Selecione uma prioridade",
  }),
  status: z.enum(["Aberto", "Em andamento", "Concluído"], {
    error: "Selecione um status",
  }),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export const createTicketSchema = ticketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTicketSchema = createTicketSchema.partial();

export type Ticket = z.infer<typeof ticketSchema>;
export type CreateTicketFormData = z.infer<typeof createTicketSchema>;
export type UpdateTicketFormData = z.infer<typeof updateTicketSchema>;

