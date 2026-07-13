export function useTheme() {
  const themeCookie = useCookie<'dark' | 'light' | null>('brutalist-portfolio-theme', {
    default: () => null,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365
  })

  const isDark = useState('theme-dark', () => themeCookie.value === 'dark')

  if (import.meta.client && themeCookie.value === null) {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    themeCookie.value = isDark.value ? 'dark' : 'light'
  }

  // Escuta mudança de preferência do SO, mas só enquanto o usuário
  // não tiver escolhido manualmente um tema (cookie ainda null)
  function watchSystemTheme() {
    if (!import.meta.client) return () => {}

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
        if (themeCookie.value === null) {
        isDark.value = e.matches
        }
    }

    mediaQueryList.addEventListener('change', handler)

    return () => {
        mediaQueryList.removeEventListener('change', handler)
    }
  }

  return { isDark, toggleTheme, watchSystemTheme }
}