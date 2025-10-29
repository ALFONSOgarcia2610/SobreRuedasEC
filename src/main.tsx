import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './routes/app-router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster
            richColors
            toastOptions={{
              classNames: {
                success: '!bg-emerald-200 !text-emerald-900 !border !border-emerald-200',
                error: '!bg-red-200 !text-red-900 !border !border-red-200',
                warning: '!bg-yellow-200 !text-black !border !border-yellow-200',
                info: '!bg-sky-200 !text-sky-900 !border !border-sky-200',
              },
            }}
          />
    </QueryClientProvider>
  </StrictMode>
)
