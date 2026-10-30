import ToggleButton from '../ToggleButton'
import Logo from '../../assets/logo.png'

export default function Header(){
  return(
    <header className="fixed inset-x-0 top-0 z-40 flex min-h-14 w-full items-center justify-between bg-gray-300 px-4 py-2 shadow-sm dark:bg-gray-800 sm:min-h-16 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center">
        <img src={Logo} alt="Logo NexoDesk" className="h-10 w-auto sm:h-12" />
        <p className="ml-2 truncate text-base font-bold text-gray-800 dark:text-gray-200">
          Nexo<span>Desk</span>
        </p>
      </div>
      <ToggleButton />
    </header>
  )
}