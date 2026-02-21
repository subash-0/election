'use client'

import React, { cloneElement, isValidElement } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import candidates from '@/lib/candidates.json'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeftRight, Share2, RefreshCw, User, GraduationCap, 
  MapPin, Briefcase, Users, Home, Fingerprint, Landmark, Heart
} from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

export default function CompareContent() {
  const params = useSearchParams()
  const router = useRouter()

  const c1 = Number(params.get('c1'))
  const c2 = Number(params.get('c2'))

  const A = candidates.find(c => c.CandidateID === c1)
  const B = candidates.find(c => c.CandidateID === c2)

  if (!A || !B) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <Landmark className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold mb-4 text-slate-600">उम्मेदवारहरू फेला परेनन्</h2>
        <Button onClick={() => router.push('/')} variant="default" className="rounded-full px-8">होममा फर्कनुहोस्</Button>
      </div>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('तुलना लिंक कपी गरिएको!',{
     style: {
      background: '#FF8C00',
      color: '#fff',
     }
    })
  }
    

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-grow py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* शीर्षक सेक्सन */}
          <div className="text-center mb-16">
            <Badge className="mb-4 px-5 py-1 rounded-full bg-white border-slate-200 text-slate-500 shadow-sm font-bold uppercase tracking-widest text-[10px]">
              निर्वाचन २०८२ • प्रत्यक्ष तुलना
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 italic">
              COMPARE <span className="text-primary not-italic font-black ml-4">तुलना</span>
            </h1>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6" />
          </div>

          {/* VS हिरो सेक्सन */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mb-20 items-center">
            {/* VS सर्कल ओभरले */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic shadow-[0_0_30px_rgba(0,0,0,0.3)] border-4 border-white rotate-12">
                VS
              </div>
            </div>

            <CandidateHeroCard candidate={A} color="blue" side="left" />
            <CandidateHeroCard candidate={B} color="red" side="right" />
          </div>

          {/* तुलना विवरण तालिका */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
            <div className="bg-slate-50/80 p-6 border-b border-slate-100 flex items-center justify-center gap-3">
              <ArrowLeftRight className="w-5 h-5 text-primary" />
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">विस्तृत तुलना (Detailed Specs)</h3>
            </div>
            
            <div className="divide-y divide-slate-100 pb-4">
              <CompareRow icon={<User />} label="उमेर" left={`${A.AGE_YR} वर्ष`} right={`${B.AGE_YR} वर्ष`} />
              <CompareRow icon={<GraduationCap />} label="शिक्षा" left={A.QUALIFICATION} right={B.QUALIFICATION} />
              <CompareRow icon={<Briefcase />} label="अनुभव" left={A.EXPERIENCE || 'खुलाइएको छैन'} right={B.EXPERIENCE || 'खुलाइएको छैन'} />
              <CompareRow icon={<Users />} label="बुवाको नाम" left={A.FATHER_NAME} right={B.FATHER_NAME} />
              <CompareRow icon={<Heart />} label="पति/पत्नी" left={A.SPOUCE_NAME || '-'} right={B.SPOUCE_NAME || '-'} />
              <CompareRow icon={<Fingerprint />} label="नागरिकता जिल्ला" left={A.CTZDIST} right={B.CTZDIST} />
              <CompareRow icon={<MapPin />} label="निर्वाचन क्षेत्र" left={`${A.DistrictName} - ${A.ConstName}`} right={`${B.DistrictName} - ${B.ConstName}`} />
              <CompareRow icon={<Home />} label="स्थायी ठेगाना" left={A.ADDRESS} right={B.ADDRESS} />
            </div>
          </div>

          {/* एक्सन बटनहरू */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16">
            <Button size="lg" className="w-full sm:w-auto px-8 cursor-pointer rounded-full font-black uppercase tracking-widest gap-2 h-14 shadow-lg shadow-primary/25" onClick={() => router.push('/')}>
              <RefreshCw className="w-4 h-4" /> नयाँ तुलना गर्नुहोस्
            </Button>
            <Button size="lg" variant="outline" className="w-full cursor-pointer sm:w-auto px-8 rounded-full font-black uppercase tracking-widest gap-2 h-14 border-2 bg-white" onClick={handleCopy}>
              <Share2 className="w-4 h-4" /> लिंक कपी गर्नुहोस्
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ================= हिरो कार्ड कम्पोनेन्ट ================= */

function CandidateHeroCard({ candidate, color, side }: { candidate: any, color: 'blue' | 'red', side: 'left' | 'right' }) {
  const isBlue = color === 'blue'
  return (
    <Card className="relative overflow-hidden border-none shadow-none bg-transparent group">
      <CardContent className="p-0">
        <div className={`relative flex flex-col items-center ${side === 'left' ? 'md:items-end md:pr-12' : 'md:items-start md:pl-12'}`}>
          
          {/* उम्मेदवारको फोटो */}
          <div className="relative mb-8">
            <div className={`absolute inset-0 rounded-[3rem] blur-3xl opacity-20 transition-opacity group-hover:opacity-40 ${isBlue ? 'bg-blue-600' : 'bg-red-600'}`} />
            <div className="relative w-48 h-48 md:w-60 md:h-60">
                <Image
                    src={`https://result.election.gov.np/Images/Candidate/${candidate.CandidateID}.jpg`}
                    alt={candidate.CandidateName}
                    fill
                    className="object-cover rounded-[3rem] border-4 border-white shadow-2xl ring-1 ring-slate-100"
                />
                {/* फ्लोटिंग चुनाव चिन्ह */}
                <div className={`absolute -bottom-4 ${side === 'left' ? '-left-4' : '-right-4'} bg-white p-4 rounded-2xl shadow-xl border border-slate-100 text-center min-w-[90px]`}>
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1 leading-none">चिन्ह</p>
                    <p className="text-xl font-black text-primary leading-none">{candidate.SymbolName}</p>
                </div>
            </div>
          </div>

          {/* नाम र पार्टी विवरण */}
          <div className={`${side === 'left' ? 'md:text-right' : 'md:text-left'} text-center`}>
            <p className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-600 mb-3">उम्मेदवार</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-3 tracking-tighter">
              {candidate.CandidateName}
            </h2>
            <Badge variant="secondary" className={`text-sm py-1.5 px-6 rounded-full font-bold shadow-sm border ${isBlue ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
              {candidate.PoliticalPartyName}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ================= तुलना रो (Row) कम्पोनेन्ट ================= */

function CompareRow({ label, left, right, icon }: { label: string, left: any, right: any, icon: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-11 items-stretch group transition-all duration-300 border-b border-slate-50 last:border-none">
      {/* बाँया विवरण */}
      <div className="md:col-span-5 p-2 md:p-4 flex items-center justify-center md:justify-end text-center md:text-right">
        <span className="text-sm md:text-lg font-bold text-slate-700 group-hover:text-primary transition-colors duration-300">
          {left || '-'}
        </span>
      </div>
      
      {/* बीचको लेबल र आइकन */}
      <div className="md:col-span-1 flex flex-col items-center justify-center bg-slate-50/50 md:bg-white border-x border-slate-50 relative py-4 md:py-0">
        <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 z-10">
          {isValidElement(icon) ? cloneElement(icon as any, { className: "w-4 h-4" }) : icon}
        </div>
        <span className="hidden md:block absolute bottom-1 text-[12px] mt-4 font-black uppercase tracking-tighter text-slate-500 group-hover:text-primary/50 transition-colors">
          {label}
        </span>
        <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
            {label}
        </span>
      </div>

      {/* दाँया विवरण */}
      <div className="md:col-span-5 p-6 md:p-8 flex items-center justify-center md:justify-start text-center md:text-left">
        <span className="text-sm md:text-lg font-bold text-slate-700 group-hover:text-primary transition-colors duration-300">
          {right || '-'}
        </span>
      </div>
    </div>
  )
}