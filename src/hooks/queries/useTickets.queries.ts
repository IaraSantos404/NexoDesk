import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import type { Ticket, CreateTicketFormData, UpdateTicketFormData } from '@/schemas/tickets.schema'

export const ticketsQueryKey = ['tickets'] as const
export const ticketQueryKey = (id: string) => ['tickets', id] as const

export type TicketInput = CreateTicketFormData

export const GENERIC_SUCCESS_MESSAGE = 'Operação realizada com sucesso!'
export const GENERIC_ERROR_MESSAGE = 'Ocorreu um erro ao processar a operação. Tente novamente.'

export class TicketsApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'TicketsApiError'
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let message = 'Não foi possível concluir a operação com o chamado.'

    try {
      const body = (await response.json()) as { message?: string }
      if (body.message) message = body.message
    } catch {
      // Falha ao interpretar JSON de erro; manter mensagem padrão
    }

    throw new TicketsApiError(message, response.status)
  }

  if (response.status === 204) return undefined as T

  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    throw new TicketsApiError(
      'A API retornou uma resposta inválida. Verifique se o servidor de chamados está disponível.',
      502,
    )
  }

  return response.json() as Promise<T>
}

export function getTickets() {
  return request<Ticket[]>('/tickets')
}

export function getTicket(id: string) {
  return request<Ticket>(`/tickets/${id}`)
}

export function createTicket(input: CreateTicketFormData) {
  return request<Ticket>('/tickets', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updateTicket(id: string, input: UpdateTicketFormData) {
  return request<Ticket>(`/tickets/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  })
}

export function deleteTicket(id: string) {
  return request<void>(`/tickets/${id}`, { method: 'DELETE' })
}

export function useTickets() {
  return useQuery({
    queryKey: ticketsQueryKey,
    queryFn: getTickets,
  })
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ticketQueryKey(id),
    queryFn: () => getTicket(id),
    enabled: Boolean(id),
  })
}

export function useCreateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ticketsQueryKey })
      toast.success(GENERIC_SUCCESS_MESSAGE)
    },
    onError: () => {
      toast.error(GENERIC_ERROR_MESSAGE)
    },
  })
}

export function useUpdateTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTicketFormData }) =>
      updateTicket(id, input),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ticketsQueryKey })
      if (variables.id) {
        await queryClient.invalidateQueries({ queryKey: ticketQueryKey(variables.id) })
      }
      toast.success(GENERIC_SUCCESS_MESSAGE)
    },
    onError: () => {
      toast.error(GENERIC_ERROR_MESSAGE)
    },
  })
}

export function useDeleteTicket() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ticketsQueryKey })
      toast.success(GENERIC_SUCCESS_MESSAGE)
    },
    onError: () => {
      toast.error(GENERIC_ERROR_MESSAGE)
    },
  })
}