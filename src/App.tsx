import { HashRouter } from 'react-router-dom'
import { PalTrackerProvider } from '@/context/PalTrackerContext'
import { Layout } from '@/components/shared/Layout/Layout'
import { AppRoutes } from '@/routes/AppRoutes'

export function App() {
  return (
    <HashRouter>
      <PalTrackerProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </PalTrackerProvider>
    </HashRouter>
  )
}
