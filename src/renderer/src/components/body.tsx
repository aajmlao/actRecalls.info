import React from 'react'
import { FirstBody } from './firstBody'

export const Body = (): React.JSX.Element => {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="flex-1 flex flex-col items-center text-center px-6 gap-10 py-10">
        <FirstBody />
      </div>
    </div>
  )
}
