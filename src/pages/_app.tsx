import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter, Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={`${inter.variable} font-sans`}>
    <Component {...pageProps} />
  </main>
}
