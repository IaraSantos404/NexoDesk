import { useEffect, useRef, useState } from 'react'
import type { Ticket } from '@/types/ticket'
import { formatData } from '@/utils/formatData'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { LuX } from 'react-icons/lu'
import { useDeleteTicket, useUpdateTicket } from '@/hooks/queries/useTickets.queries'
import DeleteTicketModal from '@/components/DeleteTicketModal'
import TicketDetailsModal from '@/components/TicketDetailsModal'
import { toast } from 'sonner'

interface InfoTableProps {
  tickets: Ticket[]
}

export default function InfoTable({ tickets }: InfoTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>(null)
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null)
  const [ticketToView, setTicketToView] = useState<Ticket | null>(null)
  const [status, setStatus] = useState<Ticket['status']>('Aberto')
  const menuRef = useRef<HTMLDivElement>(null)
  const updateTicketMutation = useUpdateTicket()
  const deleteTicketMutation = useDeleteTicket()

  useEffect(() => {
    if (!openMenuId) return

    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenuId(null)
    }

    document.addEventListener('mousedown', handleDocumentClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenuId])

  const handleEditStatus = async () => {
    if (!ticketToEdit) return

    try {
      await updateTicketMutation.mutateAsync({
        id: ticketToEdit.id,
        input: { status },
      })
      setTicketToEdit(null)
    } catch {
      toast.error('Erro ao atualizar o status do chamado. Tente novamente.')
    }
  }

  const handleDelete = async (ticket: Ticket) => {
    try {
      await deleteTicketMutation.mutateAsync(ticket.id)
      setTicketToDelete(null)
      setOpenMenuId(null)
    } catch {
      toast.error('Erro ao excluir o chamado. Tente novamente.')
    }
  }

  return (
    <section className="overflow-x-auto text-gray-800 dark:text-gray-200" id="center">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Título</th>
            <th className="border border-gray-300 p-2">Setor</th>
            <th className="border border-gray-300 p-2">Prioridade</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Data de criação</th>
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tickets.length > 0 ? tickets.map((ticket) => (
            <tr key={ticket.id} className="transition-colors hover:bg-blue-100/50 dark:hover:bg-blue-950/30">
              <td className="border border-gray-300 p-2">{ticket.title}</td>
              <td className="border border-gray-300 p-2">{ticket.sector}</td>
              <td className="border border-gray-300 p-2">{ticket.priority}</td>
              <td className="border border-gray-300 p-2">{ticket.status}</td>
              <td className="border border-gray-300 p-2">{formatData(ticket.createdAt)}</td>
              <td className="relative border border-gray-300 p-2">
                <div ref={openMenuId === ticket.id ? menuRef : undefined} className="inline-block">
                  <button
                    type="button"
                    aria-label={`Mais ações para ${ticket.title}`}
                    aria-expanded={openMenuId === ticket.id}
                    aria-controls={`ticket-actions-${ticket.id}`}
                    onClick={() => setOpenMenuId((current) => current === ticket.id ? null : ticket.id)}
                    className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    <BsThreeDotsVertical aria-hidden="true" />
                  </button>
                  {openMenuId === ticket.id && (
                    <div
                      id={`ticket-actions-${ticket.id}`}
                      role="menu"
                      aria-label={`Ações para ${ticket.title}`}
                      className="absolute right-2 top-12 z-20 min-w-44 rounded-lg border border-slate-200 bg-white p-1 text-left shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setTicketToView(ticket)
                          setOpenMenuId(null)
                        }}
                        className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        Ver detalhes
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setStatus(ticket.status)
                          setTicketToEdit(ticket)
                          setOpenMenuId(null)
                        }}
                        className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-slate-200 dark:hover:bg-slate-700"
                      >
                        Editar status
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setTicketToDelete(ticket)
                          setOpenMenuId(null)
                        }}
                        className="block w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30"
                      >
                        Excluir chamado
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="border border-gray-300 p-8 text-slate-500 dark:text-slate-400">
                Nenhum chamado encontrado com os filtros selecionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <DeleteTicketModal
        ticket={ticketToDelete}
        isPending={deleteTicketMutation.isPending}
        onClose={() => {
          if (!deleteTicketMutation.isPending) setTicketToDelete(null)
        }}
        onConfirm={() => {
          if (ticketToDelete) void handleDelete(ticketToDelete)
        }}
      />
      <TicketDetailsModal
        ticket={ticketToView}
        onClose={() => setTicketToView(null)}
      />
      {ticketToEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setTicketToEdit(null)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-ticket-status-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="edit-ticket-status-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Editar status
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{ticketToEdit.title}</p>
              </div>
              <button
                type="button"
                aria-label="Fechar edição de status"
                onClick={() => setTicketToEdit(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-slate-800"
              >
                <LuX aria-hidden="true" size={20} />
              </button>
            </div>
            <label htmlFor="edit-ticket-status" className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Status
            </label>
            <select
              id="edit-ticket-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as Ticket['status'])}
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            >
              <option>Aberto</option>
              <option>Em andamento</option>
              <option>Concluído</option>
            </select>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setTicketToEdit(null)}
                className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void handleEditStatus()}
                disabled={updateTicketMutation.isPending}
                className="cursor-pointer rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updateTicketMutation.isPending ? 'Salvando...' : 'Salvar status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}