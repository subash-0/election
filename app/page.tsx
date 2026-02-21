'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { CandidateFilters } from '@/components/candidate-filters'
import { CandidateCard } from '@/components/candidate-card'
import candidates from '@/lib/candidates.json'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'

interface Filters {
  searchTerm: string
  province: string
  district: string
  party: string
  gender: string
  qualification: string
  chetra: number
  ageRange: [number, number]
}

export default function Home() {
  const router = useRouter()

  const [filters, setFilters] = useState<Filters>({
    searchTerm: "",
    province: "",
    district: "",
    party: "",
    gender: "",
    qualification: "",
    chetra: 0,
    ageRange: [20, 90],
  })

  const [visibleCount, setVisibleCount] = useState(20)
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([])

  // Toggle selection (max 2)
  const toggleCandidateSelection = (id: number) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      if (prev.length === 2) return prev
      return [...prev, id]
    })
  }

  // Unique values
  const parties = useMemo(() => [...new Set(candidates.map(c => c.PoliticalPartyName))].sort(), [])
  const provinces = useMemo(() => [...new Set(candidates.map(c => c.StateName))].sort(), [])
  const qualifications = useMemo(() => [...new Set(candidates.map(c => c.QUALIFICATION??''))].sort(), [])

  // Districts filtered by selected province
 const districts = useMemo(() => {
  if (!filters.province) 
    return [...new Set(candidates.map(c => c.DistrictName.trim()))].sort();

  return [...new Set(
    candidates
      .filter(c => c.StateName?.trim() === filters.province?.trim()) // trim spaces
      .map(c => c.DistrictName.trim())
  )].sort();
}, [filters.province]);

  // Filter candidates
const filteredCandidates = useMemo(() => {
  return candidates.filter((c) => {
    const normalize = (str?: string) => str?.normalize().trim().toLowerCase() || '';

    const matchesSearch =
      filters.searchTerm === '' ||
      normalize(c.CandidateName).includes(normalize(filters.searchTerm));

    const matchesProvince =
      filters.province === '' ||
      normalize(c.StateName) === normalize(filters.province);

    const matchesDistrict =
      filters.district === '' ||
      normalize(c.DistrictName) === normalize(filters.district);

    const matchesParty =
      filters.party === '' ||
      normalize(c.PoliticalPartyName) === normalize(filters.party);

    const matchesGender =
      filters.gender === '' || c.Gender === filters.gender;

    const matchesQualification =
      filters.qualification === '' ||
      normalize(c.QUALIFICATION??'') === normalize(filters.qualification);

    const matchesChetra =
      filters.chetra === 0 || c.ConstName === filters.chetra;

    const matchesAge =
      c.AGE_YR >= filters.ageRange[0] && c.AGE_YR <= filters.ageRange[1];

    return (
      matchesSearch &&
      matchesProvince &&
      matchesDistrict &&
      matchesParty &&
      matchesGender &&
      matchesQualification &&
      matchesChetra &&
      matchesAge
    );
  });
}, [filters]);

  const visibleCandidates = filteredCandidates.slice(0, visibleCount)

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">

        {/* Hero Section */}
        <section className="border-b border-border px-2 md:px-8 sm:px-4 lg:px-12 bg-gradient-to-br from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">आफ्नो उम्मेदवार खोज्नुहोस्</h1>
            <p className="text-foreground/70 mb-6">खोज्नुहोस्, विश्लेषण गर्नुहोस् र अब तुलना पनि गर्नुहोस्।</p>
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold inline-block">
              {filteredCandidates.length} उम्मेदवार फेला परे
            </div>
          </div>
        </section>

        {/* Candidates Section */}
        <section className="py-16 container mx-auto px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Filters */}
            <div>
              <CandidateFilters
                filters={filters}
                setFilters={setFilters}
                parties={parties}
                districts={districts}
                provinces={provinces}
                qualifications={qualifications}
                candidates={candidates}
              />
            </div>

            {/* Candidate Grid */}
            <div className="lg:col-span-3">
              {visibleCandidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleCandidates.map(candidate => (
                    <CandidateCard
                      key={candidate.CandidateID}
                      candidate={candidate}
                      selected={selectedCandidates.includes(candidate.CandidateID)}
                      onSelect={() => toggleCandidateSelection(candidate.CandidateID)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">कोही उम्मेदवार फेला परेन</div>
              )}

              {visibleCount < filteredCandidates.length && (
                <div className="mt-8 text-center cursor-pointer">
                  <Button onClick={() => setVisibleCount(prev => prev + 20)} className='w-fit cursor-pointer'>थप उम्मेदवारहरू</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Sticky Compare Button */}
        {selectedCandidates.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-card border border-border shadow-xl rounded-xl p-4 z-50 w-64">
            <p className="text-sm mb-3 text-foreground/70">{selectedCandidates.length}/2 उम्मेदवार चयन गरिएको</p>
            <Button
              disabled={selectedCandidates.length !== 2}
              className="w-full cursor-pointer"
              onClick={() => router.push(`/compare?c1=${selectedCandidates[0]}&c2=${selectedCandidates[1]}`)}
            >
              तुलना गर्नुहोस्
            </Button>
          </div>
        )}

        <Footer />
      </main>
    </>
  )
}