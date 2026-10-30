
interface FiltersProps {
  status: string
  priority: string
  onStatusChange: (status: string) => void
  onPriorityChange: (priority: string) => void
  onClear: () => void
}

export default function Filters({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
  onClear,
}: FiltersProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[29rem] lg:grid-cols-3">
      <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
        Status
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-blue-400"
        >
          <option value="Todos">Todos</option>
          <option value="Aberto">Aberto</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
        </select>
      </label>

      <label className="flex min-w-0 flex-col gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
        Prioridade
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-blue-400"
        >
          <option value="Todos">Todos</option>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onClear}
        className="h-[46px] self-end whitespace-nowrap rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/50 dark:hover:text-blue-300 sm:col-span-2 lg:col-span-1"
      >
        Limpar filtros
      </button>
    </div>
  )
}