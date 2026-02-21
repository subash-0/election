import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KnowYourCandidate - आफ्नो उम्मेदवार जान्नुहोस्',
  description: 'चुनाव उम्मेदवारहरूलाई दल, जिल्ला, योग्यता अनुसार खोज्नुहोस्',
  generator: 'Subash Kumar Yadav',
  icons: {
    icon: [
      { url: '/icon.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.png' },
    ],
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne">
      <head>
        {/* Google Font for Nepali / Devanagari */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}