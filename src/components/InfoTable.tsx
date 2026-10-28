
import type { Ticket } from '@/types/ticket'
import { BsThreeDotsVertical } from "react-icons/bs";

interface InfoTableProps {
  tickets: Ticket[]
}

export default function InfoTable({ tickets }: InfoTableProps) {
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
              <td className="border border-gray-300 p-2">{ticket.createdAt}</td>
              <td className="border border-gray-300 p-2">
                <button
                  type="button"
                  aria-label={`Mais ações para ${ticket.title}`}
                  className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                >
                  <BsThreeDotsVertical />
                </button>
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
    </section>
  )
}