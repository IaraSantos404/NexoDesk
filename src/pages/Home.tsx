import Header from '@/components/UI/Header'
import InfoTable from '@/components/InfoTable'
import InfoCard from '@/components/InfoCard'

import { LuFolder } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Home() {

  const cards = [
    { title: "Total de Chamados", icon: <LuFolder />, number: 5 },
    { title: "Abertos", icon: <FaRegFolderOpen />, number: 5 },
    { title: "Em Andamento", icon: <IoTimeOutline />, number: 3 },
    { title: "Concluídos", icon: <IoIosCheckmarkCircleOutline />, number: 3 }
  ]

  return (
    <section className=" items-center justify-center" id="center">
      <Header />
      <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center py-10">
        Central de Chamados
      </h1>

      <div className="flex flex-col w-8/12 m-auto gap-">
        <div className="flex flex-wrap justify-between gap-4 mb-10">
          {cards.map((card, index) => (
            <InfoCard key={index} title={card.title} icon={card.icon} number={card.number} />
          ))}
        </div>
        <div className="w-full">
            <InfoTable />
        </div>
          
      
      </div>


    </section>

  )
}