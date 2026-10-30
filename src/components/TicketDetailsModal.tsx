import { useEffect, useRef } from 'react'
import { LuX } from 'react-icons/lu'
import type { Ticket } from '@/types/ticket'
import { formatData } from '@/utils/formatData'

interface TicketDetailsModalProps {
  ticket: Ticket | null
  onClose: () => void
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm text-slate-800 dark:text-slate-100">{value}</dd>
    </div>
  )
}

export default function TicketDetailsModal({ ticket, onClose }: TicketDetailsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!ticket) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, ticket])

  if (!ticket) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-details-title"
        aria-describedby="ticket-details-description"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="ticket-details-title" className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Detalhes do chamado
            </h2>
            <p id="ticket-details-description" className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Consulte todas as informações registradas para este chamado.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Fechar detalhes do chamado"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <LuX aria-hidden="true" size={20} />
          </button>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <DetailItem label="Título" value={ticket.title} />
          </div>
          <div className="sm:col-span-2">
            <DetailItem label="Descrição" value={ticket.description || 'Não informada'} />
          </div>
          <DetailItem label="Nome do solicitante" value={ticket.requester || 'Não informado'} />
          <DetailItem label="E-mail" value={ticket.email || 'Não informado'} />
          <DetailItem label="Setor" value={ticket.sector || 'Não informado'} />
          <DetailItem label="Prioridade" value={ticket.priority} />
          <DetailItem label="Status" value={ticket.status} />
          <DetailItem label="Data de criação" value={formatData(ticket.createdAt)} />
        </dl>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-blue-300 dark:text-blue-950 dark:hover:bg-blue-200"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
