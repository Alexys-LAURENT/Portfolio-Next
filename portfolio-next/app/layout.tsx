import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from './components/ThemeProvider'
import './globals.css'
import NavBar from './components/NavBar'
import NextUiProvider from './components/NextUiProvider'
import { ModalProvider } from './context/ModalContext'
import ModalComponent from './components/Modal'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Alexys LAURENT',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NextUiProvider>
            <ModalProvider>
              <NavBar />
              <div className='w-full min-h-sceen flex justify-center bg-bgDark'>
                <div className='w-full max-w-[1500px] px-7'>
                  {children}
                </div>
              </div>
              <ModalComponent />
            </ModalProvider>
          </NextUiProvider>
        </Provider>
      </body>
    </html>
  )
}
