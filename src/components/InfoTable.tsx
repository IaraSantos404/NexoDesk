

export default function InfoTable() {
  return(
    <section className="flex items-center justify-center text-gray-800 dark:text-gray-200" id="center">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Título</th>
            <th className="border border-gray-300 p-2">Setor</th>
            <th className="border border-gray-300 p-2">Prioridade</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Data de criação</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="border border-gray-300 p-2">Problema com o computador</td>
            <td className="border border-gray-300 p-2">TI</td>
            <td className="border border-gray-300 p-2">Alta</td>
            <td className="border border-gray-300 p-2">Aberto</td>
            <td className="border border-gray-300 p-2">2023-10-01</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}