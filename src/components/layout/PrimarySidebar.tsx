import {
  Users,
  Megaphone,
  FileText,
  Ticket,
  Workflow,
  PieChart,
  Bookmark,
  Database,
  Archive,
  CreditCard,
  Sparkles,
  Store,
  ChevronRight,
  Command,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useRef } from 'react'
import { SidebarFlyout } from './SidebarFlyout'

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  isActive?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  hasSeparator?: boolean
}

function SidebarItem({
  icon: Icon,
  label,
  isActive,
  onMouseEnter,
  onMouseLeave,
  hasSeparator,
}: SidebarItemProps) {
  return (
    <>
      <div
        className={cn(
          'flex items-center justify-center h-10 w-full text-gray-300 hover:text-white hover:bg-hubspot-crm-hover transition-colors group relative cursor-pointer',
          isActive &&
            'bg-hubspot-crm-hover text-white relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[3px] after:bg-hubspot-orange',
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Icon className={cn('h-5 w-5', isActive && 'text-white')} />
        <span className="sr-only">{label}</span>

        {/* Tooltip for items that don't trigger the flyout */}
        {!isActive && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-200">
            {label}
          </div>
        )}
      </div>
      {hasSeparator && (
        <div className="w-8 h-px bg-white/20 mx-auto my-1.5 shrink-0" />
      )}
    </>
  )
}

export function PrimarySidebar() {
  const [activeMenu, setActiveMenu] = useState<'crm' | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (menu: 'crm') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 150) // Small delay to allow moving mouse to the flyout
  }

  const keepMenuOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  return (
    <>
      {/* Removed border-r border-gray-800 to create seamless integration with the curved content area */}
      <aside
        id="tour-sidebar"
        className="w-[60px] bg-hubspot-sidebar flex flex-col items-center py-3 shrink-0 z-50"
      >
        <div className="mb-4 flex items-center justify-center w-full">
          <div className="h-8 w-8 rounded-full bg-hubspot-orange flex items-center justify-center cursor-pointer hover:bg-hubspot-orange-hover transition-colors">
            <Command className="h-5 w-5 text-white" />
          </div>
        </div>

        <nav className="flex flex-col w-full gap-1">
          <SidebarItem icon={Bookmark} label="Marcadores" hasSeparator />

          <SidebarItem icon={Users} label="Contatos" />
          <SidebarItem icon={Megaphone} label="Marketing" />

          {/* CRM Trigger Item */}
          <SidebarItem
            icon={FileText}
            label="Vendas / CRM"
            isActive={activeMenu === 'crm'}
            onMouseEnter={() => handleMouseEnter('crm')}
            onMouseLeave={handleMouseLeave}
          />

          <SidebarItem icon={Ticket} label="Serviços" />
          <SidebarItem icon={Archive} label="Biblioteca" />
          <SidebarItem icon={CreditCard} label="Pagamentos" />
          <SidebarItem icon={Database} label="Dados" />
          <SidebarItem icon={Workflow} label="Automação" />
          <SidebarItem icon={PieChart} label="Relatórios" hasSeparator />

          <SidebarItem icon={Sparkles} label="ADAPTΔCRM AI" />
          <SidebarItem icon={Store} label="Marketplace" />
        </nav>

        <div className="mt-auto w-full flex flex-col gap-1">
          <SidebarItem icon={ChevronRight} label="Expandir" />
        </div>
      </aside>

      <SidebarFlyout
        isVisible={activeMenu === 'crm'}
        onMouseEnter={keepMenuOpen}
        onMouseLeave={handleMouseLeave}
      />
    </>
  )
}
