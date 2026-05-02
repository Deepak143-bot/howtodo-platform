import './globals.css'
import { Kalam, Lora, Inter } from 'next/font/google'

const kalam = Kalam({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-kalam' })
const lora = Lora({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-lora' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kalam.variable} ${lora.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased bg-[#f6f5ef]">{children}</body>
    </html>
  )
}
