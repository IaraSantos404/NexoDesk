
import type { ReactNode } from 'react'

interface InfoCardProps {
  title: string;
  icon: ReactNode;
  number: number;
}

export default function InfoCard({ title, icon, number }: InfoCardProps) {
  return (
    <article className="group flex min-w-0 flex-1 items-center gap-4 justify-between
    rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-slate-700/80 dark:bg-slate-900/70 dark:hover:border-blue-500/70">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          {number}
        </p>

      </div>
      <div
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700 ring-1 ring-inset ring-blue-100 transition-colors group-hover:bg-blue-100 dark:bg-blue-950/70 dark:text-blue-300 dark:ring-blue-900/80 dark:group-hover:bg-blue-900/70"
      >
        {icon}
      </div>

    </article>
  )
}