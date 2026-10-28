import type { ButtonHTMLAttributes } from 'react'
import { LuPlus } from 'react-icons/lu'

interface NewTicketButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onOpenModal?: () => void
}

export default function NewTicketButton({
  onOpenModal,
  onClick,
  className = '',
  children = 'Novo Chamado',
  ...props
}: NewTicketButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpenModal ?? onClick}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl
        bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
        dark:bg-blue-300 dark:text-blue-950 dark:hover:bg-blue-200 dark:focus-visible:ring-blue-300
        dark:focus-visible:ring-offset-gray-900 ${className}`}
      {...props}
    >
      <span className="flex items-center justify-center rounded-lg bg-white/15 p-1 dark:bg-blue-950/15">
        <LuPlus aria-hidden="true" className="text-base" />
      </span>
      <span>{children}</span>
    </button>
  )
}
