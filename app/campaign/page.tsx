import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Target, Users, Megaphone, BarChart3 } from 'lucide-react'

export default function Campaign() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background ">
        {/* Hero Section */}
        <section className="border-b border-border px-2 md:px-8 sm:px-4 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              अभियान जानकारी र दिशानिर्देश
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              अभियान नियमहरू, उम्मेदवारको जिम्मेवारी र चुनाव प्रक्रियाको बारेमा जान्नुहोस्
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="guidelines" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="guidelines">दिशानिर्देश</TabsTrigger>
                <TabsTrigger value="responsibilities">जिम्मेवारी</TabsTrigger>
                <TabsTrigger value="regulations">नियमहरू</TabsTrigger>
                <TabsTrigger value="timeline">समयसूची</TabsTrigger>
              </TabsList>

              {/* Guidelines */}
              <TabsContent value="guidelines" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Target,
                      title: 'अभियान उद्देश्य',
                      description:
                        'उम्मेदवारहरूले आफ्नो नीति, दृष्टिकोण र योग्यता मतदाताहरूलाई प्रस्तुत गर्नमा ध्यान केन्द्रित गर्नुपर्छ। अभियानहरूले व्यक्तिगत आक्रमणभन्दा वस्तुगत मुद्दाहरूमा जोर दिनुपर्छ।',
                    },
                    {
                      icon: Users,
                      title: 'जनसम्पर्क',
                      description:
                        'टाउन हलहरू, बहसहरू र जनसभाहरूमार्फत मतदाताहरूसँग जुर्नुहोस्। प्रश्नको स्पष्टतापूर्वक उत्तर दिनुहोस् र समुदायको चिन्ताहरूको समाधान गर्नुहोस्।',
                    },
                    {
                      icon: Megaphone,
                      title: 'संचार मानक',
                      description:
                        'सबै अभियान संचार सत्य र तथ्यपूर्ण हुनुपर्छ। गलत जानकारी फैलाउन वा अभिहीन दावी गर्न वर्जित छ।',
                    },
                    {
                      icon: BarChart3,
                      title: 'पारदर्शिता',
                      description:
                        'अभियान वित्तमा पारदर्शिता राख्नुहोस् र वित्तपोषणका सबै स्रोतहरू घोषणा गर्नुहोस्। खर्चमा नियमित अपडेट अनिवार्य छ।',
                    },
                  ].map((item, i) => (
                    <Card key={i} className="border-border">
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <item.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">
                              {item.title}
                            </h3>
                            <p className="text-foreground/70 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Responsibilities */}
              <TabsContent value="responsibilities" className="space-y-6">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">
                      उम्मेदवार जिम्मेवारी
                    </h3>
                    <div className="space-y-4">
                      {[
                        'सबै चुनाव कानून र नियमहरूको पालना गर्नुहोस्',
                        'शैक्षणिक योग्यता र प्रमाणपत्रहरू प्रकट गर्नुहोस्',
                        'अभियान वित्तपोषण स्रोत र खर्चहरू रिपोर्ट गर्नुहोस्',
                        'निष्पक्ष र शान्तिपूर्ण अभियानहरूमा भाग लिनुहोस्',
                        'विरोधीहरूको अधिकार र मर्यादालाई सम्मान गर्नुहोस्',
                        'आफ्नो पृष्ठभूमिको बारेमा सटीक जानकारी प्रदान गर्नुहोस्',
                        'सबै अभियान गतिविधिहरूमा नैतिक मानकहरू राख्नुहोस्',
                        'चुनाव अधिकारीहरू र अधिकारहरूसँग सहयोग गर्नुहोस्',
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 pt-1">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <p className="text-foreground/70">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Regulations */}
              <TabsContent value="regulations" className="space-y-6">
                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        अभियान अवधि नियमहरू
                      </h3>
                      <div className="space-y-3 text-foreground/70">
                        <p>
                          • अभियान अवधि आधिकारिक घोषणा मितिमा सुरु हुन्छ र मतदान दिनको २४ घन्टा अघि समाप्त हुन्छ
                        </p>
                        <p>
                          • सबै अभियान सामग्रीमा उम्मेदवारको नाम, दल र चुनाव चिन्ह समावेश हुनुपर्छ
                        </p>
                        <p>
                          • अभियान खर्च चुनाव अधिकारीहरूद्वारा तोकिएको सीमा अतिक्रम गर्न सक्दैन
                        </p>
                        <p>
                          • अभियान उद्देश्यको लागि सरकारी संसाधनको प्रयोग कड़ाईसँग वर्जित छ
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        निषेधित गतिविधिहरू
                      </h3>
                      <div className="space-y-3 text-foreground/70">
                        <p>
                          • मतदाताहरूलाई उपहार, पैसा वा अनुग्रह वितरण
                        </p>
                        <p>
                          • जात, धर्म वा जातीयतामा आधारित हिंसा वा घृणाको उकसाहट
                        </p>
                        <p>
                          • झुठा आरोपहरूको माध्यमबाट विरोधीहरूको अपमान
                        </p>
                        <p>
                          • अन्य उम्मेदवारहरूको अभियान गतिविधिहरूमा बाधा
                        </p>
                        <p>
                          • धार्मिक वा पवित्र स्थानहरूको अभियान उद्देश्यमा प्रयोग
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Timeline */}
              <TabsContent value="timeline" className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      date: 'चरण १',
                      title: 'नामावली दाखिला',
                      description: 'उम्मेदवारहरू आफ्नो नामावली कागजपत्र चुनाव अधिकारीहरूलाई जमा गर्छन्',
                    },
                    {
                      date: 'चरण २',
                      title: 'जाँच र फिर्ता',
                      description: 'चुनाव अधिकारीहरू नामावलीहरू सत्यापन गर्छन् र आवश्यक परेमा उम्मेदवारहरू फिर्ता लिन सक्छन्',
                    },
                    {
                      date: 'चरण ३',
                      title: 'अभियान अवधि',
                      description: 'आधिकारिक अभियान गतिविधिहरू सुरु हुन्छन् र उम्मेदवारहरूले आफ्नो नीतिहरू प्रचार गर्छन्',
                    },
                    {
                      date: 'चरण ४',
                      title: 'मतदान दिन',
                      description: 'मतदाताहरू आफ्नो मत दिन्छन् र चुनाव परिणाम गणना गरिन्छ',
                    },
                  ].map((phase, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold flex-shrink-0">
                          {i + 1}
                        </div>
                        {i !== 3 && (
                          <div className="w-1 h-20 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <p className="text-sm font-semibold text-primary mb-1">
                          {phase.date}
                        </p>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {phase.title}
                        </h4>
                        <p className="text-foreground/70">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-secondary/30 border-t border-border py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              बारम्बार सोधिने प्रश्नहरू
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  q: 'मेरो नामावली कसरी दाखिला गर्न सक्छु?',
                  a: 'उम्मेदवारहरूले आधिकारिक चुनाव आयोग वेबसाइट वा तोकिएको नामावली अवधिमा तोकिएको चुनाव कार्यालयमा आफ्नो नामावली दाखिला गर्न सक्छन्।',
                },
                {
                  q: 'उमेरको आवश्यकता के छ?',
                  a: 'उम्मेदवारहरू प्रान्तीय चुनावहरूको लागि कम्तिमा २५ वर्ष र स्थानीय चुनावहरूको लागि २१ वर्षको हुनुपर्छ।',
                },
                {
                  q: 'के मैले मतदान दिनमा अभियान गर्न सक्छु?',
                  a: 'होइन, मतदान दिनको २४ घन्टा अगलदेखि गणना प्रक्रिया पूरा नभएसम्म अभियान गतिविधिहरू कड़ाईसँग वर्जित छन्।',
                },
                {
                  q: 'अभियान वित्तपोषण कसरी नियमित छ?',
                  a: 'अभियान खर्च तोकिएको रकमसम्म सीमित छ। सबै दान घोषणा गरी चुनाव अधिकारीहरूलाई रिपोर्ट गर्नुपर्छ।',
                },
              ].map((faq, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-foreground mb-3">
                      {faq.q}
                    </h4>
                    <p className="text-foreground/70 text-sm">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
