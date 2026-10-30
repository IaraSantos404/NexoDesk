import { useEffect, useRef } from 'react'
import { LuTriangle, LuX } from 'react-icons/lu'
import type { Ticket } from '@/types/ticket'

interface DeleteTicketModalProps {
  ticket: Ticket | null
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteTicketModal({
  ticket,
  isPending,
  onClose,
  onConfirm,
}: DeleteTicketModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!ticket) return

    cancelButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isPending) onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isPending, onClose, ticket])

  if (!ticket) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) onClose()
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-ticket-title"
        aria-describedby="delete-ticket-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
      >
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-950/50 dark:text-red-400">
            <LuTriangle aria-hidden="true" size={22} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h2 id="delete-ticket-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Excluir chamado?
              </h2>
              <button
                type="button"
                aria-label="Fechar confirmação de exclusão"
                onClick={onClose}
                disabled={isPending}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-800"
              >
                <LuX aria-hidden="true" size={20} />
              </button>
            </div>
            <p id="delete-ticket-description" className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              Tem certeza de que deseja excluir o chamado <strong>{ticket.title}</strong>? Essa ação não pode ser desfeita.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Excluindo...' : 'Excluir chamado'}
          </button>
        </div>
      </div>
    </div>
  )
}
