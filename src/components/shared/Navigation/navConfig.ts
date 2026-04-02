export interface NavItem {
  path: string
  label: string
  icon: string
}

/**
 * Add a new object here to add a tab to the app.
 * No other files need to change.
 */
export const NAV_ITEMS: NavItem[] = [
  { path: '/materials', label: 'Materials', icon: '🪨' },
  { path: '/pals', label: 'Pal Browser', icon: '🐾' },
  { path: '/tracker', label: 'Pal Tracker', icon: '✅' },
  { path: '/breeding', label: 'Breeding', icon: '🥚' },
  { path: '/base', label: 'Base Builder', icon: '🏠' },
  { path: '/work', label: 'Work', icon: '⚒️' },
  { path: '/locations', label: 'Locations', icon: '📍' },
]
