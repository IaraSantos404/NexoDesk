import { useTheme } from '../hooks/useTheme';
import { FaMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

export default function ToggleButton() {
  const {theme, setTheme} = useTheme();

  return(
    <>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="bg-gray-200 cursor-pointer transition-colors dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
      >
        {theme === "light" ? <GoSun /> : <FaMoon />}
      </button>
    </>
  )
}