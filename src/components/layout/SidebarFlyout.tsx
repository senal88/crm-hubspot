import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ArrowUpCircle } from 'lucide-react'

interface SidebarFlyoutProps {
  isVisible: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function SidebarFlyout({
  isVisible,
  onMouseEnter,
  onMouseLeave,
}: SidebarFlyoutProps) {
  if (!isVisible) return null

  return (
    <div
      className="fixed left-[60px] top-[56px] bottom-0 w-[240px] bg-hubspot-crm z-50 flex flex-col shadow-xl animate-in fade-in slide-in-from-left-2 duration-150"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex flex-col py-4 px-2">
        <h2 className="px-4 text-white font-bold text-lg mb-2 tracking-wide">
          CRM
        </h2>

        <nav className="flex flex-col gap-1">
          <FlyoutLink to="/contacts" label="Contatos" />
          <FlyoutLink to="/companies" label="Empresas" />
          <FlyoutLink to="/deals" label="Negócios" />
          <FlyoutLink to="/tickets" label="Tickets" />
          <FlyoutLink to="/orders" label="Pedidos" />

          <div className="my-2 border-t border-white/20 mx-4" />

          <FlyoutLink to="/lists" label="Segmentos (listas)" />
          <FlyoutLink to="/inbox" label="Caixa de entrada" />
          <FlyoutLink to="/calls" label="Chamadas" />
          <FlyoutLink to="/tasks" label="Tarefas" />

          <FlyoutLink to="/playbooks" label="Manuais de atividades">
            <ArrowUpCircle className="h-4 w-4 ml-auto text-white/70" />
          </FlyoutLink>

          <FlyoutLink to="/templates" label="Modelos de mensagens" />
          <FlyoutLink to="/snippets" label="Snippets" />
        </nav>
      </div>
    </div>
  )
}

function FlyoutLink({
  to,
  label,
  children,
}: {
  to: string
  label: string
  children?: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 text-white/90 hover:bg-hubspot-crm-hover hover:text-white rounded-md transition-colors text-sm font-medium"
    >
      <span className="truncate">{label}</span>
      {children}
    </Link>
  )
}
