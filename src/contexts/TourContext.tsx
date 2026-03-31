import React, { createContext, useContext, useState, ReactNode } from 'react'

export type TourStep = {
  id: string
  targetId: string | null
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    targetId: null,
    title: 'Bem-vindo ao ADAPTΔCRM',
    content:
      'Vamos fazer um tour rápido para você conhecer as principais funcionalidades e navegar na plataforma com eficiência.',
    position: 'center',
  },
  {
    id: 'search',
    targetId: 'tour-search-bar',
    title: 'Pesquisa Global',
    content:
      'Encontre contatos, empresas, negócios e muito mais rapidamente usando a barra de pesquisa.',
    position: 'bottom',
  },
  {
    id: 'navigation',
    targetId: 'tour-sidebar',
    title: 'Navegação Principal',
    content:
      'Use a barra lateral para acessar todas as ferramentas do CRM, como Contatos, Vendas e Relatórios.',
    position: 'right',
  },
  {
    id: 'views',
    targetId: 'tour-view-toggle',
    title: 'Modos de Visualização',
    content:
      'Alterne entre visualização de Tabela e Quadro (Kanban) para gerenciar seus dados da forma que preferir.',
    position: 'bottom',
  },
  {
    id: 'add-contact',
    targetId: 'tour-add-contact',
    title: 'Criar Registros',
    content: 'Comece adicionando novos contatos clicando neste botão.',
    position: 'bottom',
  },
]

interface TourContextType {
  steps: TourStep[]
  currentStepIndex: number
  isTourOpen: boolean
  startTour: () => void
  closeTour: () => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (index: number) => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export function TourProvider({ children }: { children: ReactNode }) {
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const startTour = () => {
    setCurrentStepIndex(0)
    setIsTourOpen(true)
  }

  const closeTour = () => {
    setIsTourOpen(false)
  }

  const nextStep = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      closeTour()
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const goToStep = (index: number) => {
    if (index >= 0 && index < TOUR_STEPS.length) {
      setCurrentStepIndex(index)
    }
  }

  return (
    <TourContext.Provider
      value={{
        steps: TOUR_STEPS,
        currentStepIndex,
        isTourOpen,
        startTour,
        closeTour,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
}
