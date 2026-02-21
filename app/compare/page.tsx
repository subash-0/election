'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import candidates from '@/lib/candidates.json'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeftRight, 
  Share2, 
  RefreshCw, 
  User, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Users, 
  Home, 
  Fingerprint 
} from 'lucide-react'

export default function ComparePage() {
  const params = useSearchParams()
  const router = useRouter()

  const c1 = Number(params.get('c1'))
  const c2 = Number(params.get('c2'))

  const A = candidates.find(c => c.CandidateID === c1)
  const B = candidates.find(c => c.CandidateID === c2)

  if (!A || !B) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h2 className="text-xl font-semibold mb-4 text-slate-600">उम्मेदवारहरू फेला परेनन्</h2>
        <Button onClick={() => router.push('/')}>होममा फर्कनुहोस्</Button>
      </div>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('तुलना लिंक कपी गरिएको!')
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER SECTION */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary bg-primary/5">
              निर्वाचन २०८२  • प्रत्यक्ष तुलना
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              उम्मेदवार <span className="text-primary">तुलना</span>
            </h1>
            <p className="text-slate-500 max-w-lg mx-auto">
              तपाईंको क्षेत्रका उम्मेदवारहरूको योग्यता र विवरणलाई सहजै दाँज्नुहोस्।
            </p>
          </div>

          {/* VS HERO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center mb-12">
            <div className="md:col-span-5">
              <CandidateHeroCard candidate={A} side="left" />
            </div>
            
            <div className="md:col-span-1 flex justify-center z-10 -my-6 md:my-0">
              <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-black italic shadow-2xl border-4 border-white">
                VS
              </div>
            </div>

            <div className="md:col-span-5">
              <CandidateHeroCard candidate={B} side="right" />
            </div>
          </div>

          {/* DETAILED COMPARISON TABLE */}
          <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/80 border-b py-4">
              <h3 className="text-center font-bold text-slate-700">विस्तृत विवरण (Detailed Profile)</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <CompareRow icon={<User className="w-4 h-4" />} label="उमेर" left={`${A.AGE_YR} वर्ष`} right={`${B.AGE_YR} वर्ष`} />
                <CompareRow icon={<ArrowLeftRight className="w-4 h-4" />} label="लिङ्ग" left={A.Gender} right={B.Gender} />
                <CompareRow icon={<GraduationCap className="w-4 h-4" />} label="शिक्षा" left={A.QUALIFICATION} right={B.QUALIFICATION} />
                <CompareRow icon={<Users className="w-4 h-4" />} label="बुवाको नाम" left={A.FATHER_NAME} right={B.FATHER_NAME} />
                <CompareRow icon={<Users className="w-4 h-4" />} label="पति/पत्नी" left={A.SPOUCE_NAME || '-'} right={B.SPOUCE_NAME || '-'} />
                <CompareRow icon={<Fingerprint className="w-4 h-4" />} label="नागरिकता जिल्ला" left={A.CTZDIST} right={B.CTZDIST} />
                <CompareRow icon={<Home className="w-4 h-4" />} label="ठेगाना" left={A.ADDRESS} right={B.ADDRESS} />
                <CompareRow icon={<MapPin className="w-4 h-4" />} label="क्षेत्र" left={`${A.DistrictName}`} right={`${B.DistrictName}`} />
                <CompareRow icon={<Briefcase className="w-4 h-4" />} label="अनुभव" left={A.EXPERIENCE || 'खुलाइएको छैन'} right={B.EXPERIENCE || 'खुलाइएको छैन'} />
              </div>
            </CardContent>
          </Card>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <Button size="lg" className="w-full sm:w-auto gap-2 font-bold shadow-lg shadow-primary/20" onClick={() => router.push('/')}>
              <RefreshCw className="w-4 h-4" /> नयाँ तुलना गर्नुहोस्
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 bg-white" onClick={handleCopy}>
              <Share2 className="w-4 h-4" /> लिंक कपी गर्नुहोस्
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/* ================= HELPER COMPONENTS ================= */

function CandidateHeroCard({ candidate, side }: { candidate: any, side: 'left' | 'right' }) {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl border-none ${
      side === 'left' ? 'bg-gradient-to-br from-white to-blue-50/30' : 'bg-gradient-to-bl from-white to-red-50/30'
    }`}>
      <div className={`absolute top-0 h-1.5 w-full ${side === 'left' ? 'bg-blue-500' : 'bg-red-500'}`} />
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-2 border-4 border-white shadow-md">
            <span className="text-xs font-bold text-slate-400 uppercase">चिन्ह</span>
            <span className="absolute mt-6 font-black text-slate-700">{candidate.SymbolName}</span>
          </div>
          
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
              {candidate.CandidateName}
            </h2>
            <p className="text-primary font-bold mt-1 text-sm uppercase tracking-wider">
              {candidate.PoliticalPartyName}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-white/80 shadow-sm border-slate-100 italic">
              ID: {candidate.CandidateID}
            </Badge>
            <Badge variant="secondary" className="bg-white/80 shadow-sm border-slate-100">
              {candidate.StateName}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CompareRow({ label, left, right, icon }: { label: string, left: any, right: any, icon: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center group hover:bg-slate-50/50 transition-colors">
      <div className="p-4 text-center md:text-right font-medium text-slate-700 md:pr-12">
        {left}
      </div>
      
      <div className="bg-slate-50 md:bg-transparent py-2 md:py-4 flex flex-col items-center justify-center gap-1 border-y md:border-y-0 border-slate-100">
        <span className="text-primary/40 group-hover:text-primary transition-colors">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
      </div>

      <div className="p-4 text-center md:text-left font-medium text-slate-700 md:pl-12">
        {right}
      </div>
    </div>
  )
}