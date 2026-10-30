import { LuX } from 'react-icons/lu'
import { useNewTicketModal } from '@/hooks/useNewTicketModal'
import SelectField from '@/components/UI/SelectField'

interface NewTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const fieldClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'

export default function NewTicketModal({ isOpen, onClose }: NewTicketModalProps) {
  const {
    register,
    handleSubmit,
    isSubmitting,
    dialogRef,
    closeButtonRef,
    errorMessage,
    handleClose,
  } = useNewTicketModal({ isOpen, onClose })

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-ticket-title"
        aria-describedby="new-ticket-description"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6 dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="new-ticket-title" className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Novo chamado
            </h2>
            <p id="new-ticket-description" className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Preencha os dados do chamado. Os campos marcados com * são obrigatórios.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Fechar novo chamado"
            className="rounded-lg p-2 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <LuX aria-hidden="true" size={20} />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="ticket-title" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Título *
            </label>
            <input
              id="ticket-title"
              {...register('title')}
              className={fieldClassName}
              aria-invalid={Boolean(errorMessage('title'))}
              aria-describedby={errorMessage('title') ? 'ticket-title-error' : undefined}
            />
            {errorMessage('title') && (
              <p id="ticket-title-error" className="mt-1 text-sm text-red-600" role="alert">
                {errorMessage('title')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="ticket-description" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Descrição *
            </label>
            <textarea
              id="ticket-description"
              rows={4}
              {...register('description')}
              className={fieldClassName}
              aria-invalid={Boolean(errorMessage('description'))}
              aria-describedby={errorMessage('description') ? 'ticket-description-error' : undefined}
            />
            {errorMessage('description') && (
              <p id="ticket-description-error" className="mt-1 text-sm text-red-600" role="alert">
                {errorMessage('description')}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ticket-requester" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Nome do solicitante *
              </label>
              <input
                id="ticket-requester"
                {...register('requester')}
                className={fieldClassName}
                aria-invalid={Boolean(errorMessage('requester'))}
                aria-describedby={errorMessage('requester') ? 'ticket-requester-error' : undefined}
              />
              {errorMessage('requester') && (
                <p id="ticket-requester-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errorMessage('requester')}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="ticket-email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
                E-mail *
              </label>
              <input
                id="ticket-email"
                type="email"
                {...register('email')}
                className={fieldClassName}
                aria-invalid={Boolean(errorMessage('email'))}
                aria-describedby={errorMessage('email') ? 'ticket-email-error' : undefined}
              />
              {errorMessage('email') && (
                <p id="ticket-email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errorMessage('email')}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField id="ticket-sector" label="Setor *" error={errorMessage('sector')} {...register('sector')}>
              <option value="">Selecione</option>
              <option value="TI">TI</option>
              <option value="RH">RH</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Operações">Operações</option>
              <option value="Vendas">Vendas</option>
            </SelectField>
            <SelectField id="ticket-priority" label="Prioridade *" error={errorMessage('priority')} {...register('priority')}>
              <option value="">Selecione</option>
              <option value="Alta">Alta</option>
              <option value="Média">Média</option>
              <option value="Baixa">Baixa</option>
            </SelectField>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-lg cursor-pointer border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:w-auto dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-700 cursor-pointer px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? 'Salvando...' : 'Criar chamado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

