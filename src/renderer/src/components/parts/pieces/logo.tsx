import actRecallLogo from '@/assets/activeRecall.svg'
import { cn } from '@renderer/lib/utils'
import { JSX } from 'react'

export const Logo = (): JSX.Element => {
  return (
    <div className="hidden md:flex items-center gap-x-2 cursor-default">
      <img src={actRecallLogo} height="40px" width="40px" alt="Logo" className="dark:invert" />
      <p className={cn('font-semibold')}>ActRecall</p>
    </div>
  )
}
