import { Outlet } from 'react-router-dom'
import { TopHeader } from './TopHeader'
import { PrimarySidebar } from './PrimarySidebar'
import { TourProvider } from '@/contexts/TourContext'
import { TourOverlay } from '@/components/tour/TourOverlay'

export default function MainLayout() {
  return (
    <TourProvider>
      <TourOverlay />
      <div className="flex flex-col h-screen w-full overflow-hidden bg-hubspot-bg">
        <TopHeader />
        {/* 
        Container for Sidebar and Main Content.
        We set bg-hubspot-nav here so the "gap" created by the rounded corner of main
        reveals this dark background, creating the cutout effect.
      */}
        <div className="flex flex-1 overflow-hidden relative bg-hubspot-nav">
          <PrimarySidebar />
          {/* 
          Main content area.
          Added rounded-tl-3xl to create the curved intersection.
          Background is bg-hubspot-bg (light) on top of the dark parent.
          Added overflow-hidden to clip content to the rounded corner.
        */}
          <main className="flex-1 overflow-hidden flex flex-col min-w-0 bg-hubspot-bg relative z-0 rounded-tl-3xl">
            <Outlet />
          </main>
        </div>
      </div>
    </TourProvider>
  )
}
