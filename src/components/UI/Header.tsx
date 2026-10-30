import ToggleButton from '../ToggleButton'
import Logo from '../../assets/logo.png'

export default function Header(){
  return(
    <header className="bg-gray-300 w-full dark:bg-gray-800 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
          <p className="ml-2 text-[16px] font-bold text-gray-800 dark:text-gray-200">Nexo<span>Desk</span></p>
      </div>
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200"></h1>
      <ToggleButton />
    </header>
  )
}