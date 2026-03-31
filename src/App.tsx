/* Main App Component - Handles routing (using react-router-dom) */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import MainLayout from '@/components/layout/MainLayout'
import ContactsPage from '@/pages/ContactsPage'
import NotFound from '@/pages/NotFound'

const App = () => {
  useEffect(() => {
    document.title = 'ADAPTΔCRM'
  }, [])

  return (
    <BrowserRouter
      future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/contacts" replace />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/companies" element={<ContactsPage />} />
            <Route path="/deals" element={<ContactsPage />} />
            <Route path="/tickets" element={<ContactsPage />} />
            <Route path="/orders" element={<ContactsPage />} />
            <Route path="/lists" element={<ContactsPage />} />
            <Route path="/inbox" element={<ContactsPage />} />
            <Route path="/calls" element={<ContactsPage />} />
            <Route path="/tasks" element={<ContactsPage />} />
            <Route path="/playbooks" element={<ContactsPage />} />
            <Route path="/templates" element={<ContactsPage />} />
            <Route path="/snippets" element={<ContactsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
