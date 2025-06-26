import { MarketingHeader } from '@/shared/components/layout/header/marketing-header'
import Footer from '@/shared/components/layout/footer'

export default function MarketingLayout({
                                          children,
                                        }: {
  children: React.ReactNode
}) {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}