import {
  Search,
  Plus,
  Phone,
  ShoppingBag,
  HelpCircle,
  Settings,
  Bell,
  Sparkles,
  ChevronDown,
  PlayCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { useTour } from '@/contexts/TourContext'

export function TopHeader() {
  const { startTour } = useTour()

  return (
    <header className="h-14 bg-hubspot-nav flex items-center justify-between px-4 sticky top-0 z-50 text-white shrink-0 border-b border-white/10">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <div className="relative w-full max-w-sm" id="tour-search-bar">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Pesquisar na ADAPTΔCRM"
            className="h-8 pl-9 bg-white/10 border-transparent text-white placeholder:text-gray-300 focus-visible:ring-1 focus-visible:ring-hubspot-orange focus-visible:bg-white focus-visible:text-gray-900 focus-visible:placeholder:text-gray-500 rounded-sm"
          />
        </div>
        <Button
          size="icon"
          className="h-8 w-8 rounded-full bg-hubspot-orange hover:bg-hubspot-orange-hover border-transparent text-white shadow-sm"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={startTour}
          variant="ghost"
          className="text-white hover:bg-white/10 hover:text-white h-8 px-3 rounded-sm border border-white/40 mr-2 gap-2"
        >
          <PlayCircle className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Iniciar onboarding</span>
        </Button>

        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 hover:text-white h-8 px-3 rounded-sm border border-white/40"
        >
          <span className="mr-1 h-4 w-4 rounded-full border border-white flex items-center justify-center text-[10px]">
            ↑
          </span>
          Upgrade
        </Button>

        <div className="h-6 w-px bg-white/20 mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 h-9 w-9"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 h-9 w-9"
        >
          <ShoppingBag className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 h-9 w-9"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 h-9 w-9"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 h-9 w-9 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-hubspot-nav"></span>
        </Button>

        <div className="h-6 w-px bg-white/20 mx-1" />

        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 h-9 gap-1 px-2"
        >
          <Sparkles className="h-4 w-4 text-purple-300 fill-purple-300" />
          <span className="font-medium">Assistente</span>
        </Button>

        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 h-9 gap-2 pl-1 pr-2"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3" />
            <AvatarFallback className="bg-orange-500 text-white text-xs">
              CO
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden md:inline">codando</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </div>
    </header>
  )
}
