import { useTheme } from '../hooks/useTheme';

export default function ToggleButton() {
  const {theme, setTheme} = useTheme();

  return(
    <>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
      >
        {theme === "light" ? "ON" : "OFF"}
      </button>
    </>
  )
}