import ToggleButton from '../ToggleButton'

export default function Header(){
  return(
    <header className="bg-gray-300 w-full dark:bg-gray-800 p-4 flex justify-between items-center">
      <p>Logo</p>
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200"></h1>
      <ToggleButton />
    </header>
  )
}