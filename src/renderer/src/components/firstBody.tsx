import React from 'react'

export const FirstBody = (): React.JSX.Element => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Welcome to {''} <span className="underline">ActRecall</span>.
        <br />A smarter way to take notes
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl, font-medium">
        <span className="underline">Capture</span> your thoughts,{' '}
        <span className="underline">Visualize</span> them, and instantly{' '}
        <span className="underline">Retrieve</span> and <span className="underline">Organize</span>{' '}
        anything when you need it. All enhanced by an AI assistant.
      </h3>
    </div>
  )
}
