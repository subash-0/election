'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GenderChart,
  BarChartComponent,
  HorizontalBarChart,
  StackedBarChart,
} from '@/components/analytics-charts';
import {
  getGenderAnalysis,
  getAgeGroupAnalysis,
  getEducationAnalysis,
  getPartyAnalysis,
  getPartyAgeAnalysis,
  getProvinceEducationAnalysis,
  getPartyEducationAnalysis,
  getSummaryStats,
} from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';

export default function AnalysisPage() {
  const genderData = getGenderAnalysis();
  const ageData = getAgeGroupAnalysis();
  const educationData = getEducationAnalysis();
  const partyData = getPartyAnalysis();
  const partyAgeData = getPartyAgeAnalysis();
  const provinceEducationData = getProvinceEducationAnalysis();
  const partyEducationData = getPartyEducationAnalysis();
  const stats = getSummaryStats();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border  px-2 md:px-8 sm:px-4 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              विस्तृत विश्लेषण
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              चुनाव उम्मेदवारहरूको गहिराइमा विश्लेषण - लिङ्ग, उमेर, शिक्षा, दल र प्रदेशद्वारा
            </p>
          </div>
        </section>

        {/* Summary Stats */}
        <section className="border-b border-border px-2 md:px-8 sm:px-4 lg:px-12 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-foreground/70 text-sm mb-2">कुल उम्मेदवार</p>
                <p className="text-2xl font-bold text-primary">{stats.totalCandidates}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-foreground/70 text-sm mb-2">औसत उमेर</p>
                <p className="text-2xl font-bold text-accent">{stats.avgAge} वर्ष</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-foreground/70 text-sm mb-2">कुल दलहरू</p>
                <p className="text-2xl font-bold text-primary">{stats.totalParties}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="text-foreground/70 text-sm mb-2">कुल प्रदेशहरू</p>
                <p className="text-2xl font-bold text-accent">{stats.totalProvinces}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Tabs */}
        <section className="py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="gender" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8 h-auto">
                <TabsTrigger value="gender" className="text-xs md:text-sm">
                  लिङ्ग
                </TabsTrigger>
                <TabsTrigger value="age" className="text-xs md:text-sm">
                  उमेर समूह
                </TabsTrigger>
                <TabsTrigger value="education" className="text-xs md:text-sm">
                  शिक्षा
                </TabsTrigger>
                <TabsTrigger value="party" className="text-xs md:text-sm">
                  दलहरू
                </TabsTrigger>
                <TabsTrigger value="partyage" className="text-xs md:text-sm">
                  दल & उमेर
                </TabsTrigger>
                <TabsTrigger value="partyedu" className="text-xs md:text-sm">
                  दल & शिक्षा
                </TabsTrigger>
                <TabsTrigger value="provinceedu" className="text-xs md:text-sm">
                  प्रदेश & शिक्षा
                </TabsTrigger>
              </TabsList>

              {/* Gender Analysis */}
              <TabsContent value="gender" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <GenderChart
                    data={genderData}
                    title="उम्मेदवार लिङ्ग वितरण"
                    description="पुरुष र महिला उम्मेदवारहरूको तुलनात्मक विश्लेषण"
                  />
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">लिङ्ग विवरण</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {genderData.map((item, idx) => (
                        <div key={idx} className="pb-4 border-b border-border last:border-b-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-foreground">{item.name}</span>
                            <span className="text-primary font-bold">{item.value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-foreground/60 min-w-fit">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-border text-sm text-foreground/70">
                        <p>महिला उम्मेदवारहरूको प्रतिनिधित्व {stats.femalePercentage}% छ।</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Age Group Analysis */}
              <TabsContent value="age" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <BarChartComponent
                    data={ageData}
                    title="उमेर समूहमा वितरण"
                    description="विभिन्न उमेर समूहमा उम्मेदवारहरूको संख्या"
                    xKey="name"
                    yKey="value"
                  />
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">उमेर समूह विश्लेषण</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {ageData.map((item, idx) => (
                        <div key={idx} className="pb-4 border-b border-border last:border-b-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-foreground">{item.name}</span>
                            <span className="text-primary font-bold">{item.value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-accent h-full rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-foreground/60 min-w-fit">
                              {item.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Education Analysis */}
              <TabsContent value="education" className="space-y-6">
                <HorizontalBarChart
                  data={educationData}
                  title="शीर्ष १० शैक्षणिक योग्यताहरू"
                  description="उम्मेदवारहरूको सबैभन्दा सामान्य शैक्षणिक योग्यताहरू"
                />
              </TabsContent>

              {/* Party Analysis */}
              <TabsContent value="party" className="space-y-6">
                <div className="space-y-8">
                  <BarChartComponent
                    data={partyData.slice(0, 12)}
                    title="शीर्ष १२ राजनीतिक दलहरू"
                    description="सबैभन्दा बढी उम्मेदवार भएको दलहरू"
                    xKey="name"
                    yKey="value"
                  />
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">दल विवरण</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {partyData.slice(0, 8).map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center pb-3 border-b border-border last:border-b-0">
                            <span className="text-foreground text-sm">{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-primary font-semibold">{item.value}</span>
                              <span className="text-foreground/60 text-sm min-w-fit">
                                {item.percentage}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Party and Age Analysis */}
              <TabsContent value="partyage" className="space-y-6">
                <StackedBarChart
                  data={partyAgeData}
                  title="दलहरू र उमेर समूहको विश्लेषण"
                  description="प्रमुख दलहरूमा विभिन्न उमेर समूहको वितरण"
                  categories={['20-30', '30-40', '40-50', '50-60', '60+']}
                />
              </TabsContent>

              {/* Party Education Analysis */}
              <TabsContent value="partyedu" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">दल र शिक्षा विश्लेषण</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {partyEducationData.map((party, partyIdx) => (
                        <div key={partyIdx} className="pb-6 border-b border-border last:border-b-0 last:pb-0">
                          <h3 className="font-semibold text-foreground mb-4 text-primary">{party.party}</h3>
                          <div className="space-y-3 ml-4">
                            {party.educations.map((edu, eduIdx) => (
                              <div key={eduIdx} className="pb-2">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-foreground/80 text-sm">{edu.education}</span>
                                  <span className="text-primary font-semibold text-sm">{edu.count}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                                    <div
                                      className="bg-accent h-full rounded-full"
                                      style={{
                                        width: `${(edu.count / (party.educations[0]?.count || 1)) * 100}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs text-foreground/60 min-w-fit">
                                    {((edu.count / (party.educations[0]?.count || 1)) * 100).toFixed(0)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">सारांश</CardTitle>
                    </CardHeader>
                    <CardContent className="text-foreground/70 space-y-3 text-sm">
                      <p>यो विश्लेषणले विभिन्न राजनीतिक दलहरूमा उम्मेदवारहरूको शैक्षणिक योग्यताको वितरण देखाउँछ।</p>
                      <p>प्रत्येक दलको लागि, सबैभन्दा सामान्य शैक्षणिक योग्यताहरू र तिनको विस्तारण देखाइएको छ।</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Province Education Analysis */}
              <TabsContent value="provinceedu" className="space-y-6">
                <div className="space-y-8">
                  {provinceEducationData.map((province, idx) => (
                    <Card key={idx} className="border-border">
                      <CardHeader>
                        <CardTitle className="text-lg">{province.province}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {province.educations.map((edu, eduIdx) => (
                            <div key={eduIdx} className="pb-3 border-b border-border last:border-b-0">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-foreground text-sm">{edu.education}</span>
                                <span className="text-primary font-semibold">{edu.count}</span>
                              </div>
                              <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-accent h-full rounded-full"
                                  style={{
                                    width: `${(edu.count / province.educations[0].count) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
