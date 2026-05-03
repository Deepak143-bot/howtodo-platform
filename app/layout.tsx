import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Caveat, Inter } from 'next/font/google'
import Script from 'next/script'

const marker = Caveat({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap'
})

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T8L8GLM7');
            `}
          </Script>
        </head>
        <body className={`${inter.variable} ${marker.variable} font-sans bg-[#f6f5ef] text-black antialiased`}>
          <style>{`
            /* Strict font locking to prevent messy bleeding */
            body, input, p, span, div, button { font-family: ${inter.style.fontFamily}, sans-serif; }
            .font-marker { font-family: ${marker.style.fontFamily}, cursive !important; }
          `}</style>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T8L8GLM7" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
