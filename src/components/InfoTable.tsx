import { useEffect, useState } from 'react'
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
  const updateTicketMutation = useUpdateTicket()
  const deleteTicketMutation = useDeleteTicket()

  useEffect(() => {
    if (!openMenuId) return

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target
      const clickedInsideActionsMenu = target instanceof Element
        && target.closest('[data-ticket-actions-menu]') !== null

      if (!clickedInsideActionsMenu) {
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

  const statusClassName = (ticketStatus: Ticket['status']) => {
    if (ticketStatus === 'Concluído') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
    if (ticketStatus === 'Em andamento') return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
    return 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
  }

  const priorityClassName = (ticketPriority: Ticket['priority']) => {
    if (ticketPriority === 'Alta') return 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
    if (ticketPriority === 'Média') return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
    return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
  }

  const renderActions = (ticket: Ticket) => (
    <div data-ticket-actions-menu className="relative inline-block">
      <button
        type="button"
        aria-label={`Mais ações para ${ticket.title}`}
        aria-expanded={openMenuId === ticket.id}
        aria-controls={`ticket-actions-${ticket.id}`}
        onClick={() => setOpenMenuId((current) => current === ticket.id ? null : ticket.id)}
        className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
      >
        <BsThreeDotsVertical aria-hidden="true" />
      </button>
      {openMenuId === ticket.id && (
        <div
          id={`ticket-actions-${ticket.id}`}
          role="menu"
          aria-label={`Ações para ${ticket.title}`}
          className="absolute right-0 top-11 z-20 min-w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-slate-800"
        >
          <button type="button" role="menuitem" onClick={() => { setTicketToView(ticket); setOpenMenuId(null) }} className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-slate-200 dark:hover:bg-slate-700">Ver detalhes</button>
          <button type="button" role="menuitem" onClick={() => { setStatus(ticket.status); setTicketToEdit(ticket); setOpenMenuId(null) }} className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-slate-200 dark:hover:bg-slate-700">Editar status</button>
          <button type="button" role="menuitem" onClick={() => { setTicketToDelete(ticket); setOpenMenuId(null) }} className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 dark:hover:bg-red-950/30">Excluir chamado</button>
        </div>
      )}
    </div>
  )

  return (
    <section className="w-full text-gray-800 dark:text-gray-200" id="center ">
      <div className="hidden overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900/70 lg:block">
        <table className="w-full border-collapse">
          <caption className="sr-only">Lista de chamados</caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-left dark:border-slate-700 dark:bg-slate-800/60">
              {['Título', 'Setor', 'Prioridade', 'Status', 'Data de criação', 'Ações'].map((heading) => (
                <th key={heading} scope="col" className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-blue-50/50 dark:border-slate-800 dark:hover:bg-blue-950/20">
                <td className="max-w-xs px-5 py-4"><p className="truncate font-semibold text-slate-900 dark:text-slate-100">{ticket.title}</p><p className="mt-1 truncate text-xs text-slate-500">{ticket.requester || 'Solicitante não informado'}</p></td>
                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{ticket.sector || 'Não informado'}</td>
                <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${priorityClassName(ticket.priority)}`}>{ticket.priority}</span></td>
                <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(ticket.status)}`}>{ticket.status}</span></td>
                <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">{formatData(ticket.createdAt)}</td>
                <td className="relative px-5 py-4">{renderActions(ticket)}</td>
              </tr>
            )) : <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500">Nenhum chamado encontrado com os filtros selecionados.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 lg:hidden">
        {tickets.length > 0 ? tickets.map((ticket) => (
          <article key={ticket.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">{ticket.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{ticket.requester || 'Solicitante não informado'}</p>
              </div>
              {renderActions(ticket)}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityClassName(ticket.priority)}`}>{ticket.priority}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClassName(ticket.status)}`}>{ticket.status}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
              <div><dt className="text-xs text-slate-500">Setor</dt><dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{ticket.sector || 'Não informado'}</dd></div>
              <div><dt className="text-xs text-slate-500">Criado em</dt><dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{formatData(ticket.createdAt)}</dd></div>
            </dl>
          </article>
        )) : <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">Nenhum chamado encontrado com os filtros selecionados.</div>}
      </div>
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