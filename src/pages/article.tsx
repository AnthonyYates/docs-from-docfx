import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/Components/Navbar/Navbar'
import ArticlePage from '@/Components/ArticlePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const test = "<Testing></Testing>";
  return (
    <ArticlePage />
    )
}
