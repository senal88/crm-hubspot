import {
  Search,
  ChevronDown,
  Settings,
  ListFilter,
  ArrowUpDown,
  Download,
  LayoutGrid,
  Table as TableIcon,
  Plus,
  Copy,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useContacts } from '@/contexts/ContactsContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function ContactToolbar() {
  const { viewMode, setViewMode } = useContacts()

  return (
    <div className="flex flex-col bg-white border-b border-gray-200 shrink-0 z-20">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-3 gap-4 overflow-x-auto">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'relative transition-all duration-300',
              viewMode === 'board' ? 'w-80 lg:w-[450px]' : 'w-64 lg:w-80',
            )}
          >
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-hubspot-orange" />
            <Input
              placeholder="Pesquisar contatos"
              className="pl-9 h-9 border-gray-300 bg-gray-50 focus-visible:ring-1 focus-visible:ring-hubspot-orange focus-visible:border-hubspot-orange rounded-sm"
            />
          </div>
          <Separator orientation="vertical" className="h-6" />

          <div id="tour-view-toggle">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-sm gap-2 px-3 min-w-[170px] justify-between"
                >
                  <div className="flex items-center gap-2">
                    {viewMode === 'table' ? (
                      <TableIcon className="h-4 w-4" />
                    ) : (
                      <LayoutGrid className="h-4 w-4" />
                    )}
                    {viewMode === 'table'
                      ? 'Exibição de tabela'
                      : 'Exibição de quadro'}
                  </div>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[170px]">
                <DropdownMenuItem onClick={() => setViewMode('table')}>
                  <TableIcon className="mr-2 h-4 w-4" />
                  Exibição de tabela
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode('board')}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Exibição de quadro
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-600 hover:bg-gray-100 rounded-sm"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {viewMode === 'table' ? (
            <>
              <Button
                variant="ghost"
                className="h-9 text-gray-600 hover:bg-gray-100 hover:text-hubspot-nav font-medium rounded-sm"
              >
                <ListFilter className="h-4 w-4 mr-2" />
                Editar colunas
              </Button>
              <Button
                variant="ghost"
                className="h-9 text-gray-600 hover:bg-gray-100 hover:text-hubspot-nav font-medium rounded-sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              className="h-9 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium rounded-sm gap-2 px-3"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          )}

          <Button
            variant="ghost"
            className={cn(
              'h-9 text-gray-600 hover:bg-gray-100 hover:text-hubspot-nav font-medium rounded-sm',
              viewMode === 'board' &&
                'border border-gray-300 bg-white hover:bg-gray-50',
            )}
          >
            <ArrowUpDown
              className={cn(
                'h-4 w-4 mr-2',
                viewMode === 'board' && 'h-3.5 w-3.5',
              )}
            />
            Classificar
          </Button>
          <Button
            variant="ghost"
            className={cn(
              'h-9 text-gray-600 hover:bg-gray-100 hover:text-hubspot-nav font-medium rounded-sm',
              viewMode === 'board' &&
                'border border-gray-300 bg-white hover:bg-gray-50',
            )}
          >
            {viewMode === 'table' && <Download className="h-4 w-4 mr-2" />}
            Exportar
          </Button>

          {viewMode === 'board' && (
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-sm"
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center">
          <Button
            disabled
            className="h-9 bg-gray-100 text-gray-400 border border-gray-200 rounded-sm font-medium px-4"
          >
            Salvar
          </Button>
        </div>
      </div>

      {/* Board View Specific Filters */}
      {viewMode === 'board' && (
        <div className="flex items-center gap-2 px-3 pb-3 overflow-x-auto no-scrollbar">
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-sm"
          >
            Proprietário do contato
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-sm"
          >
            Data de criação
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-sm"
          >
            Data da última atividade
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-sm"
          >
            Status do lead
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-sm"
          >
            <Plus className="mr-1 h-3 w-3" />
            Mais
          </Button>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <Button
            variant="ghost"
            className="h-8 px-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-sm"
          >
            <Filter className="mr-2 h-3 w-3" />
            Filtros avançados
          </Button>
        </div>
      )}
    </div>
  )
}
