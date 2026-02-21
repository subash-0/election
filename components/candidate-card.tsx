'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, User, GraduationCap, MapPin, Briefcase } from 'lucide-react'

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
  SymbolName: string,
  ConstName?: number
}

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const partyColors: Record<string, string> = {
    'नेपाल कम्युनिष्ट पार्टी (एकीकृत मार्क्सवादी लेनिनवादी)': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'नेपाली काँग्रेस': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'नेपाली कम्युनिष्ट पार्टी': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'राष्ट्रिय स्वतन्त्र पार्टी': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }

  const partyColor = partyColors[candidate.PoliticalPartyName] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-foreground leading-tight mb-2">
              {candidate.CandidateName}
            </h3>
            <Badge className={`${partyColor}`}>
              {candidate.PoliticalPartyName}
            </Badge>
          </div>

          {/* Symbol */}
          <div className="text-sm text-foreground/70">
            <p className="font-medium">चुनाव चिन्ह: <span className="text-primary">{candidate.SymbolName}</span></p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground/60 text-xs">उमेर</p>
                <p className="font-medium">{candidate.AGE_YR} वर्ष</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground/60 text-xs">लिङ्ग</p>
                <p className="font-medium">
                  {candidate.Gender === 'पुरुष' ? 'पुरुष' : 'महिला'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground/60 text-xs">योग्यता</p>
                <p className="font-medium text-xs">{candidate.QUALIFICATION}</p>
              </div>
            </div>

            
          </div>
<div className="flex items-start gap-2">
              <Briefcase className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-foreground/60 text-xs">अनुभव</p>
                <p className="font-medium text-xs">{candidate.EXPERIENCE || 'जानकारी उपलब्ध छैन'}</p>
              </div>
            </div>
          {/* Location */}
          <div className="flex items-start gap-2 pt-2 border-t border-border">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-foreground/60 text-xs mb-1">स्थान</p>
              <p className="font-medium">{candidate.DistrictName}</p>
              <p className="text-xs text-foreground/70">{candidate.ADDRESS}</p>
              
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 border-t border-border">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-foreground/60 text-xs mb-1">निर्वाचन क्षेत्र</p>
               <p className="font-medium">{candidate.ConstName ? `${candidate.DistrictName} - ${candidate.ConstName}` : 'जानकारी उपलब्ध छैन'}</p>
              </div>
          </div>

          {/* State */}
          <div className="text-xs text-foreground/60">
            प्रदेश: <span className="font-medium text-foreground">{candidate.StateName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
