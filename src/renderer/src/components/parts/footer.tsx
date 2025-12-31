import activeRecallLogo from '@/assets/activeRecall.svg'
import { Button } from '../ui/button'
import React from 'react'

export const Footer = (): React.JSX.Element => {
  return (
    <div className="flex items-center w-full p-5 z-50 bg-background dark:bg-[#1F1F1F]">
      <div className="md:ml-auto w-full justify-between sm:justify-start flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Developer & Teams
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
        <img
          src={activeRecallLogo}
          height="40px"
          width="40px"
          className="hidden sm:block md:ml-auto dark:invert"
        />
        <div className="hidden sm:block md:ml-auto dark:invert">
          <p>© 2025 ActRecall. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
