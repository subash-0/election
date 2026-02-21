// components/Footer.tsx
'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-2 md:px-8 sm:px-4 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-foreground">KnowYourCandidate</h2>
          <p className="text-sm text-foreground/70">
            आफ्नो उम्मेदवार खोज्नुहोस् र सचेत निर्णय लिनुहोस्।
          </p>
        </div>

        {/* Middle: Links */}
        <div>
            <div className="flex gap-6 text-sm text-foreground/70 mb-4">
          <Link href="/">गृहपृष्ठ</Link>
          <Link href="/analysis">विश्लेषण</Link>
          <Link href="/about">हाम्रोबारे</Link>
          <Link href="/campaign"> जानकारी </Link>
        </div>
        <div className="flex gap-6 text-sm text-foreground/70">
  <a
    href="https://www.linkedin.com/in/subash-kumar-yadav/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-primary transition-colors"
  >
    सम्पर्क
  </a>
</div>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-foreground/50 text-center md:text-right">
          © {new Date().getFullYear()} KnowYourCandidate. सबै अधिकार सुरक्षित।
        </div>
      </div>
    </footer>
  )
}