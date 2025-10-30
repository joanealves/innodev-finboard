import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useDarkMode() {
  const [enabled, setEnabled] = useLocalStorage<boolean>('theme:dark', true)

  useEffect(() => {
    const root = document.documentElement
    enabled ? root.classList.add('dark') : root.classList.remove('dark')
  }, [enabled])

  return { dark: enabled, setDark: setEnabled }
}
