import { useMemo, useState } from 'react'
import Header from '@/components/UI/Header'
import InfoTable from '@/components/InfoTable'
import InfoCard from '@/components/InfoCard'
import Filters from '@/components/Filters'
import Search from '@/components/Search'
import NewTicketButton from '@/components/NewTicketButton'
import NewTicketModal from '@/components/NewTicketModal'
import { useTickets } from '@/hooks/queries/useTickets.queries'

import { LuFolder } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Home() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [priority, setPriority] = useState('Todos')
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false)
  const { data: tickets = [], isLoading, error } = useTickets()

  const filteredTickets = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase()

    return tickets.filter((ticket) => {
      const matchesSearch = ticket.title.toLocaleLowerCase().includes(normalizedSearch)
      const matchesStatus = status === 'Todos' || ticket.status === status
      const matchesPriority = priority === 'Todos' || ticket.priority === priority

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [priority, search, status, tickets])

  const cards = [
    { title: "Total de Chamados", icon: <LuFolder />, number: tickets.length },
    { title: "Abertos", icon: <FaRegFolderOpen />, number: tickets.filter((ticket) => ticket.status === 'Aberto').length },
    { title: "Em Andamento", icon: <IoTimeOutline />, number: tickets.filter((ticket) => ticket.status === 'Em andamento').length },
    { title: "Concluídos", icon: <IoIosCheckmarkCircleOutline />, number: tickets.filter((ticket) => ticket.status === 'Concluído').length }
  ]

  return (
    <section className="min-h-screen w-full" id="center">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 py-6 sm:flex-row sm:items-center sm:py-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100 sm:text-3xl">
              Central de Chamados
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Acompanhe, gerencie e crie novos chamados para a sua equipe
            </p>
          </div>
          <NewTicketButton className="w-full sm:w-auto" onClick={() => setIsNewTicketModalOpen(true)} />
        </div>
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-10 lg:grid-cols-4">
          {cards.map((card, index) => (
            <InfoCard key={index} title={card.title} icon={card.icon} number={card.number} />
          ))}
        </div>
        <div className="w-full space-y-5 pb-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 dark:border-slate-700/80 dark:bg-slate-900/40">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Filtrar chamados</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Busque pelo título e refine os resultados por status e prioridade.
              </p>
            </div>
            <div className="flex flex-col items-stretch justify-center gap-4 lg:flex-row lg:items-end">
              <div className="min-w-0 flex-1">
                <Search value={search} onChange={setSearch} />
              </div>
              <Filters
                status={status}
                priority={priority}
                onStatusChange={setStatus}
                onPriorityChange={setPriority}
                onClear={() => {
                  setSearch('')
                  setStatus('Todos')
                  setPriority('Todos')
                }}
              />
            </div>
          </div>
          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700" role="alert">{error.message}</p>
          ) : isLoading ? (
            <p className="p-8 text-center text-slate-500" role="status">Carregando chamados...</p>
          ) : (
            <InfoTable tickets={filteredTickets} />
          )}
        </div>
      </main>
      <NewTicketModal
        isOpen={isNewTicketModalOpen}
        onClose={() => setIsNewTicketModalOpen(false)}
      />
    </section>

  )
}