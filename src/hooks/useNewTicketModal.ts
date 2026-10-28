import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  createTicketSchema,
  type CreateTicketFormData,
} from '@/schemas/tickets.schema'
import { useCreateTicket } from '@/hooks/queries/useTickets.queries'

interface UseNewTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const DEFAULT_FORM_VALUES: CreateTicketFormData = {
  title: '',
  description: '',
  requester: '',
  email: '',
  sector: 'TI',
  priority: 'Média',
  status: 'Aberto',
}

export function useNewTicketModal({ isOpen, onClose }: UseNewTicketModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const createTicketMutation = useCreateTicket()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })

  // Gerenciamento de foco e atalhos de teclado (acessibilidade do modal)
  useEffect(() => {
    if (!isOpen) {
      reset(DEFAULT_FORM_VALUES)
      return
    }

    triggerRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [isOpen, onClose, reset])

  const onSubmit = async (data: CreateTicketFormData) => {
    try {
      await createTicketMutation.mutateAsync(data)
      reset(DEFAULT_FORM_VALUES)
      onClose()
    } catch {
      // Falha na requisição tratada pelo onError da mutation (toast com mensagem genérica)
    }
  }

  const onInvalid = () => {
    toast.error('Por favor, preencha todos os campos obrigatórios corretamente.')
  }

  const handleClose = () => {
    reset(DEFAULT_FORM_VALUES)
    onClose()
  }

  const errorMessage = (field: keyof CreateTicketFormData) => errors[field]?.message

  return {
    register,
    handleSubmit: handleSubmit(onSubmit, onInvalid),
    errors,
    errorMessage,
    isSubmitting: createTicketMutation.isPending,
    dialogRef,
    closeButtonRef,
    handleClose,
    reset,
  }
}
