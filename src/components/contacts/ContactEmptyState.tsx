import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactEmptyState() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-hubspot-bg relative">
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-hubspot-nav leading-tight">
              Adicione mais contatos para organizar e identificar leads
              promissores.
            </h2>

            <div className="space-y-6">
              {[
                {
                  text: 'Importe um arquivo ou sincronize contatos diretamente de outros aplicativos que sua empresa já utiliza.',
                },
                {
                  text: 'Nós ajudaremos você a remover duplicidades. Assim, seu negócio vai crescer com dados limpos.',
                },
                {
                  text: 'Não é necessário nenhum trabalho sofisticado com dados e estamos aqui para ajudar em cada etapa.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 h-8 w-8 rounded-full bg-hubspot-purple/10 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full bg-hubspot-purple flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://img.usecurling.com/p/500/350?q=isometric%20business%20cards%20illustration&dpr=2"
              alt="Contacts Illustration"
              className="w-full max-w-md object-contain mix-blend-multiply opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Footer Pagination */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200 p-4 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            disabled
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 px-2"
          >
            <span className="mr-1">‹</span>
            Voltar
          </Button>
          <Button
            variant="ghost"
            disabled
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 h-8 px-2"
          >
            Próximo
            <span className="ml-1">›</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
          25 por página
          <ChevronDown className="h-3 w-3" />
        </div>
      </div>
    </div>
  )
}
