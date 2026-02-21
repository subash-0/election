'use client'

import { useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import * as Slider from '@radix-ui/react-slider'

interface Filters {
  searchTerm: string
  party: string
  district: string
  gender: string
  qualification: string
  chetra: number
  ageRange: [number, number]
}

interface CandidateFiltersProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  parties: string[]
  districts: string[]
  qualifications: string[]
  candidates: {
    CandidateID: number
    CandidateName: string
    PoliticalPartyName: string
    DistrictName: string
    ConstName: number
    Gender: string
    QUALIFICATION: string
    AGE_YR: number
  }[]
}

export function CandidateFilters({
  filters,
  setFilters,
  parties,
  districts,
  qualifications,
  candidates,
}: CandidateFiltersProps) {
  const handleReset = () => {
    setFilters({
      searchTerm: '',
      party: '',
      district: '',
      gender: '',
      qualification: '',
      chetra: 0,
      ageRange: [20, 70],
    })
  }

  // Get unique constituencies for the selected district
  const availableChetras = useMemo(() => {
    if (!filters.district) return []
    const chetras = candidates
      .filter(c => c.DistrictName === filters.district)
      .map(c => c.ConstName)
    return Array.from(new Set(chetras)).sort((a, b) => a - b)
  }, [filters.district, candidates])

  return (
    <div className="bg-card border-b border-border md:sticky top-16 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Name Search */}
          <div className="w-full">
            <label className="text-sm font-medium text-foreground/70 mb-2 block">
              नाम खोज्नुहोस्
            </label>
            <Input
              placeholder="उम्मेदवारको नाम..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
              className="h-10 font-[Noto_Sans_Devanagari]"
                
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {/* Party */}
            <div>
              <label className="text-xs font-medium text-foreground/70 mb-2 block">
                राजनीतिक दल
              </label>
              <select
                value={filters.party}
                onChange={(e) =>
                  setFilters({ ...filters, party: e.target.value })
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">सबै दल</option>
                {parties.map((party) => (
                  <option key={party} value={party}>
                    {party}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-xs font-medium text-foreground/70 mb-2 block">
                जिल्ला
              </label>
              <select
                value={filters.district}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    district: e.target.value,
                    chetra: 0, // reset constituency when district changes
                  })
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">सबै जिल्ला</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Constituency / Chetra */}
            <div>
              <label className="text-xs font-medium text-foreground/70 mb-2 block">
                निर्वाचन क्षेत्र
              </label>
              <select
                value={filters.chetra || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    chetra: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                disabled={!filters.district}
              >
                <option value="">सबै</option>
                {availableChetras.map((chetra) => (
                  <option key={chetra} value={chetra}>
                    {chetra}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="text-xs font-medium text-foreground/70 mb-2 block">
                लिङ्ग
              </label>
              <select
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">सबै</option>
                <option value="पुरुष">पुरुष</option>
                <option value="महिला">महिला</option>
              </select>
            </div>

            {/* Qualification */}
            <div>
              <label className="text-xs font-medium text-foreground/70 mb-2 block">
                योग्यता
              </label>
              <select
                value={filters.qualification}
                onChange={(e) =>
                  setFilters({ ...filters, qualification: e.target.value })
                }
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">सबै योग्यता</option>
                {qualifications.map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full h-10"
              >
                <X className="w-4 h-4 mr-2" />
                रिसेट
              </Button>
            </div>
          </div>

          {/* Age Range Slider */}
          <div className="bg-secondary/20 rounded-lg p-4 border border-border">
            <label className="text-sm font-medium text-foreground/70 mb-3 block">
              उमेर दायरा:{' '}
              <span className="ml-2 font-semibold text-foreground">
                {filters.ageRange[0]} – {filters.ageRange[1]} वर्ष
              </span>
            </label>

            <Slider.Root
              min={20}
              max={70}
              step={1}
              value={filters.ageRange}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  ageRange: value as [number, number],
                })
              }
              className="relative flex items-center select-none touch-none w-full h-5"
            >
              <Slider.Track className="bg-border relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-primary rounded-full h-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-background border-2 border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <Slider.Thumb className="block w-5 h-5 bg-background border-2 border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40" />
            </Slider.Root>

            <div className="flex justify-between text-xs text-foreground/60 mt-2">
              <span>20</span>
              <span>70</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}