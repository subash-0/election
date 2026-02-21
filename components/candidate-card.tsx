'use client'

import React, { cloneElement, isValidElement } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, User, GraduationCap, MapPin, 
  Briefcase, CheckCircle2, Hash, Shield, 
  Map, Landmark, FileText 
} from 'lucide-react'
import Image from 'next/image'

interface Candidate {
  CandidateID: number
  CandidateName: string
  AGE_YR: number
  Gender: string
  PoliticalPartyName: string
  DistrictName: string
  StateName: string
  QUALIFICATION: string
  ADDRESS: string
  EXPERIENCE: string
  SymbolName: string
  ConstName?: number
}

interface CandidateCardProps {
  candidate: Candidate
  selected?: boolean
  onSelect?: () => void
}

/**
 * Reusable row for consistent data presentation
 */
function DetailRow({ 
  icon, 
  label, 
  value, 
  isMuted = false 
}: { 
  icon: React.ReactNode, 
  label: string, 
  value: string | number, 
  isMuted?: boolean 
}) {
  return (
    <div className="flex gap-3 items-start group/row">
      <div className="mt-0.5 p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-primary group-hover/row:bg-primary group-hover/row:text-white transition-colors shrink-0">
        {isValidElement(icon) 
          ? cloneElement(icon as React.ReactElement<any>, { className: "w-3.5 h-3.5" }) 
          : icon}
      </div>
      <div className="overflow-hidden min-w-0 flex-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">
          {label}
        </p>
        <p className={`text-xs font-semibold leading-snug break-words ${
          isMuted ? 'text-slate-500' : 'text-slate-900 dark:text-slate-100'
        }`}>
          {value || 'जानकारी उपलब्ध छैन'}
        </p>
      </div>
    </div>
  )
}

export function CandidateCard({
  candidate,
  selected = false,
  onSelect,
}: CandidateCardProps) {
  // Define party theme colors
  const partyThemes: Record<string, string> = {
    'नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेनिनवादी)': 'border-red-500 from-red-500/10 text-red-700',
    'नेपाली काँग्रेस': 'border-blue-500 from-blue-500/10 text-blue-700',
    'राष्ट्रिय स्वतन्त्र पार्टी': 'border-green-500 from-green-500/10 text-green-700',
    'नेपाली कम्युनिष्ट पार्टी': 'border-orange-500 from-orange-500/10 text-orange-700',
  }

  const currentTheme = partyThemes[candidate.PoliticalPartyName] || 'border-slate-300 from-slate-500/10 text-slate-600'

  return (
    <Card
      className={`relative group overflow-hidden transition-all duration-300 border-t-4 shadow-sm
        ${selected ? 'ring-2 ring-primary shadow-xl bg-primary/5 scale-[1.01]' : 'hover:shadow-lg'}
        ${currentTheme.split(' ')[0]} 
      `}
    >
      {/* Decorative Gradient Header */}
      <div className={`absolute top-0 left-0 w-full h-20 bg-gradient-to-b ${currentTheme.split(' ')[1]} to-transparent opacity-60`} />

      <CardContent className="relative p-5">
        {/* Top Meta Info */}
        <div className="flex justify-between items-center mb-4">
          <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400">
            <Hash className="w-3 h-3" /> {candidate.CandidateID}
          </span>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase py-0 px-2">
            {candidate.SymbolName}
          </Badge>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <Image
              src={`https://result.election.gov.np/Images/Candidate/${candidate.CandidateID}.jpg`}
              alt={candidate.CandidateName}
              width={80}
              height={80}
              className="relative w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-1">
              {candidate.CandidateName}
            </h3>
            <div className="flex items-center gap-1.5">
              <Shield className={`w-3.5 h-3.5 ${currentTheme.split(' ')[2]}`} />
              <p className={`text-xs font-bold truncate ${currentTheme.split(' ')[2]}`}>
                {candidate.PoliticalPartyName}
              </p>
            </div>
          </div>
        </div>

        {/* Quick-Glance Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">उमेर</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{candidate.AGE_YR}</p>
          </div>
          <div className="text-center border-x border-slate-200 dark:border-slate-700 px-1">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">लिङ्ग</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{candidate.Gender}</p>
          </div>
          <div className="text-center">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">प्रदेश</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{candidate.StateName}</p>
          </div>
        </div>

        {/* Detailed Information List */}
        <div className="space-y-4">
          <DetailRow icon={<GraduationCap />} label="योग्यता" value={candidate.QUALIFICATION} />
          
          <DetailRow icon={<Briefcase />} label="अनुभव" value={candidate.EXPERIENCE} />
          
          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <DetailRow 
              icon={<Landmark />} 
              label="निर्वाचन क्षेत्र" 
              value={`${candidate.DistrictName} ${candidate.ConstName ? `- ${candidate.ConstName}` : ''}`} 
            />
            <DetailRow 
              icon={<MapPin />} 
              label="ठेगाना" 
              value={candidate.ADDRESS} 
              isMuted 
            />
          </div>
        </div>

        {/* Comparison Toggle Action */}
        {onSelect && (
          <button
            onClick={onSelect}
            className={`mt-6 w-full flex items-center justify-center gap-2 rounded-xl cursor-pointer py-3 text-xs font-black uppercase tracking-widest transition-all
              ${selected 
                ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2' 
                : 'bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary hover:text-primary'}
            `}
          >
            {selected ? (
              <><CheckCircle2 className="w-4 h-4" /> Selected for comparison</>
            ) : (
              'Add to compare'
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}