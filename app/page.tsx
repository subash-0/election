'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/navbar'
import { CandidateFilters } from '@/components/candidate-filters'
import { CandidateCard } from '@/components/candidate-card'
import { GenderChart, BarChartComponent } from '@/components/analytics-charts'
import { getGenderAnalysis, getAgeGroupAnalysis, getPartyAnalysis } from '@/lib/analytics'
import candidates from '@/lib/candidates.json'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'

interface Filters {
  searchTerm: string
  party: string
  district: string
  gender: string
  qualification: string
  chetra: number
  ageRange: [number, number]
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    party: '',
    district: '',
    gender: '',
    qualification: '',
    chetra: 0,
    ageRange: [20, 70],
  })

  const [visibleCount, setVisibleCount] = useState(20)

  // Unique values
  const parties = useMemo(
    () => [...new Set(candidates.map((c) => c.PoliticalPartyName))].sort(),
    []
  )
  const districts = useMemo(
    () => [...new Set(candidates.map((c) => c.DistrictName))].sort(),
    []
  )
  const qualifications = useMemo(
    () => [...new Set(candidates.map((c) => c.QUALIFICATION))].sort(),
    []
  )

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      const matchesSearch =
        filters.searchTerm === '' ||
        c.CandidateName.toLowerCase().includes(filters.searchTerm.toLowerCase())

      const matchesParty = filters.party === '' || c.PoliticalPartyName === filters.party
      const matchesDistrict = filters.district === '' || c.DistrictName === filters.district
      const matchesGender = filters.gender === '' || c.Gender === filters.gender
      const matchesQualification = filters.qualification === '' || c.QUALIFICATION === filters.qualification
      const matchesChetra = filters.chetra === 0 || c.ConstName === filters.chetra
      const matchesAge = c.AGE_YR >= filters.ageRange[0] && c.AGE_YR <= filters.ageRange[1]

      return matchesSearch && matchesParty && matchesDistrict && matchesGender && matchesQualification && matchesChetra && matchesAge
    })
  }, [filters])

  const visibleCandidates = filteredCandidates.slice(0, visibleCount)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border px-2 md:px-8 sm:px-4 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                आफ्नो उम्मेदवार खोज्नुहोस्
              </h1>
              <p className="text-lg text-foreground/70 mb-8">
                चुनाव उम्मेदवारहरूलाई राजनीतिक दल, जिल्ला, योग्यता र अन्य आधारमा खोज्नुहोस्। सचेत निर्णय लिनुहोस्।
              </p>
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                  {filteredCandidates.length} उम्मेदवार फेला परे
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Candidates Section */}
        <section className="py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Filters */}
              <div className="lg:col-span-1">
                <CandidateFilters
                  filters={filters}
                  setFilters={setFilters}
                  parties={parties}
                  districts={districts}
                  qualifications={qualifications}
                  candidates={candidates}
                />
              </div>

              {/* Candidates Grid */}
              <div className="lg:col-span-3">
                {visibleCandidates.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {visibleCandidates.map((candidate) => (
                      <CandidateCard key={candidate.CandidateID} candidate={candidate} />
                    ))}
                  </div>
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <div className="inline-block p-12 bg-secondary rounded-lg">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        कोही उम्मेदवार फेला परेन
                      </h3>
                      <p className="text-foreground/70">
                        अरु उम्मेदवार खोज्न आफ्नो फिल्टरलाई समायोजन गर्नुहोस्
                      </p>
                    </div>
                  </div>
                )}

                {/* Load More */}
                {visibleCount < filteredCandidates.length && (
                  <div className="mt-6 text-center">
                    <Button onClick={() => setVisibleCount(prev => prev + 20)}>
                      थप उम्मेदवारहरू देखाउनुहोस्
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Statistics & Charts Section */}
        <section className="bg-secondary/30 border-t border-border py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              चुनाव तथ्याङ्क र विश्लेषण
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">
                  {candidates.length}
                </div>
                <p className="text-foreground/70">कुल उम्मेदवार</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-4xl font-bold text-accent mb-2">
                  {[...new Set(candidates.map((c) => c.PoliticalPartyName))].length}
                </div>
                <p className="text-foreground/70">राजनीतिक दल</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-4xl font-bold text-primary mb-2">
                  {[...new Set(candidates.map((c) => c.DistrictName))].length}
                </div>
                <p className="text-foreground/70">जिल्ला</p>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="text-4xl font-bold text-accent mb-2">
                  {candidates.filter((c) => c.Gender === 'महिला').length}
                </div>
                <p className="text-foreground/70">महिला उम्मेदवार</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GenderChart data={getGenderAnalysis()} title="लिङ्ग वितरण" description="पुरुष र महिला उम्मेदवारहरूको अनुपात" />
              <BarChartComponent data={getAgeGroupAnalysis()} title="उमेर समूह वितरण" description="विभिन्न उमेर समूहमा उम्मेदवारहरूको वितरण" xKey="name" yKey="value" />
              <BarChartComponent data={getPartyAnalysis().slice(0, 10)} title="शीर्ष १० दलहरू" description="सबैभन्दा बढी उम्मेदवार भएको दलहरू" xKey="name" yKey="value" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}