import { cn } from '@/lib/utils'
import { Logo } from './pieces/logo'
import { ModeToggle } from './pieces/modeToggle'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { JSX } from 'react'

export const Navbar = (): JSX.Element => {
  const scrolled = useScrollTop()

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[rgb(31,31,31)] fixed top-0 flex items-center w-full p-6 h-20',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {/* <LoginComp /> */}
        <ModeToggle />
      </div>
    </div>
  )
}
