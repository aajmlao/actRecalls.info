import { Navbar } from './parts/navbar'
import { JSX } from 'react'
import { Footer } from './parts/footer'
export const MarketingLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="pt-20 flex-1 w-full flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
