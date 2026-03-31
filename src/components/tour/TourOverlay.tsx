import { useEffect, useState, useRef } from 'react'
import { useTour } from '@/contexts/TourContext'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export function TourOverlay() {
  const { steps, currentStepIndex, isTourOpen, closeTour, nextStep, prevStep } =
    useTour()
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentStep = steps[currentStepIndex]

  // Update rect on step change or resize
  useEffect(() => {
    if (!isTourOpen) return

    const updateRect = () => {
      if (currentStep.targetId) {
        const element = document.getElementById(currentStep.targetId)
        if (element) {
          const rect = element.getBoundingClientRect()
          setTargetRect(rect)
          // Scroll into view if needed
          if (
            rect.top < 0 ||
            rect.bottom > window.innerHeight ||
            rect.left < 0 ||
            rect.right > window.innerWidth
          ) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center',
            })
          }
          return
        }
      }
      setTargetRect(null)
    }

    updateRect()
    window.addEventListener('resize', updateRect)
    window.addEventListener('scroll', updateRect, true) // Capture scroll to update position

    // Small delay to allow layout changes
    const timeout = setTimeout(updateRect, 100)

    return () => {
      window.removeEventListener('resize', updateRect)
      window.removeEventListener('scroll', updateRect, true)
      clearTimeout(timeout)
    }
  }, [currentStepIndex, isTourOpen, currentStep])

  if (!isTourOpen) return null

  // Calculate tooltip position
  const getTooltipStyle = () => {
    if (!targetRect) {
      // Center position
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }

    const gap = 12
    const tooltipWidth = 320 // Approximation
    const tooltipHeight = 200 // Approximation

    let top = 0
    let left = 0
    let transform = ''

    switch (currentStep.position) {
      case 'top':
        top = targetRect.top - gap
        left = targetRect.left + targetRect.width / 2
        transform = 'translate(-50%, -100%)'
        break
      case 'bottom':
        top = targetRect.bottom + gap
        left = targetRect.left + targetRect.width / 2
        transform = 'translate(-50%, 0)'
        break
      case 'left':
        top = targetRect.top + targetRect.height / 2
        left = targetRect.left - gap
        transform = 'translate(-100%, -50%)'
        break
      case 'right':
        top = targetRect.top + targetRect.height / 2
        left = targetRect.right + gap
        transform = 'translate(0, -50%)'
        break
      default: // bottom or auto
        top = targetRect.bottom + gap
        left = targetRect.left + targetRect.width / 2
        transform = 'translate(-50%, 0)'
    }

    // Basic viewport boundary check could be added here
    return { top, left, transform }
  }

  const isLastStep = currentStepIndex === steps.length - 1

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* SVG Mask Background */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none transition-all duration-300 ease-in-out"
        width="100%"
        height="100%"
      >
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left - 4}
                y={targetRect.top - 4}
                width={targetRect.width + 8}
                height={targetRect.height + 8}
                rx="4"
                fill="black"
                className="transition-all duration-300 ease-in-out"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#tour-mask)"
        />
        {/* Highlight Border */}
        {targetRect && (
          <rect
            x={targetRect.left - 4}
            y={targetRect.top - 4}
            width={targetRect.width + 8}
            height={targetRect.height + 8}
            rx="4"
            fill="transparent"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="4 2"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Interactive Layer (blocks interaction with rest of page) */}
      <div
        className="absolute inset-0 z-[-1]"
        onClick={(e) => {
          e.stopPropagation()
        }}
      />

      {/* Tooltip Card */}
      <div
        className="absolute transition-all duration-300 ease-in-out max-w-[350px] w-full p-2"
        style={getTooltipStyle()}
      >
        <Card className="shadow-2xl border-0 animate-in fade-in zoom-in-95 duration-200">
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-lg font-bold text-hubspot-nav">
              {currentStep.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 h-6 w-6 text-gray-400 hover:text-gray-600"
              onClick={closeTour}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 pb-4">
            {currentStep.content}
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex gap-1">
              <span className="text-xs text-gray-400 font-medium self-center">
                {currentStepIndex + 1} de {steps.length}
              </span>
            </div>
            <div className="flex gap-2">
              {currentStepIndex > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  className="h-8 text-xs"
                >
                  <ChevronLeft className="mr-1 h-3 w-3" />
                  Voltar
                </Button>
              )}
              <Button
                size="sm"
                onClick={nextStep}
                className="h-8 text-xs bg-hubspot-orange hover:bg-hubspot-orange-hover border-transparent"
              >
                {isLastStep ? 'Concluir' : 'Próximo'}
                {!isLastStep && <ChevronRight className="ml-1 h-3 w-3" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
