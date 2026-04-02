import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const MaterialSearch = lazy(() =>
  import('@/components/MaterialSearch/MaterialSearch').then((m) => ({ default: m.MaterialSearch }))
)
const PalBrowser = lazy(() =>
  import('@/components/PalBrowser/PalBrowser').then((m) => ({ default: m.PalBrowser }))
)
const PalDetail = lazy(() =>
  import('@/components/PalBrowser/PalDetail/PalDetail').then((m) => ({ default: m.PalDetail }))
)
const PalTracker = lazy(() =>
  import('@/components/PalTracker/PalTracker').then((m) => ({ default: m.PalTracker }))
)

function PageLoader() {
  return (
    <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
      Loading...
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/materials" replace />} />
        <Route path="/materials" element={<MaterialSearch />} />
        <Route path="/pals" element={<PalBrowser />} />
        <Route path="/pals/:palId" element={<PalDetail />} />
        <Route path="/tracker" element={<PalTracker />} />
        <Route path="*" element={<Navigate to="/materials" replace />} />
      </Routes>
    </Suspense>
  )
}
