import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="border-b border-border px-2 md:px-8 sm:px-4 lg:px-12 bg-gradient-to-br from-primary/5 via-background to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              KnowYourCandidate को बारेमा
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl">
              यो एक विद्यार्थीको सचेतता पहल हो जसले नेपालभर चुनाव उम्मेदवारहरूलाई अन्वेषण र बुझ्न मदत गर्छ
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">हाम्रो उद्देश्य</h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  KnowYourCandidate चुनाव उम्मेदवारहरूको बारेमा पारदर्शी, सुलभ र व्यापक जानकारी प्रदान गर्न समर्पित छ। हामी मतदाताहरूलाई सचेत निर्णय लिन आवश्यक ज्ञान प्रदान गर्न विश्वास गर्छौं।
                </p>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  हाम्रो प्ल्याटफर्मले योग्यता, अनुभव, स्थान र राजनीतिक सम्बद्धतामा आधारित उम्मेदवारहरू खोज्न, फिल्टर गर्न र तुलना गर्न सहज बनाएको छ।
                </p>
                <ul className="space-y-3">
                  {[
                    'पारदर्शी उम्मेदवार जानकारी',
                    'सहज फिल्टरिङ्ग प्रणाली',
                    'वास्तविक समयमा डेटा अपडेट',
                    'सबै मतदाताहरूको लागि सुलभ',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 border border-border">
                <div className="text-6xl font-bold text-primary/30 mb-4">✓</div>
                <p className="text-foreground/70 leading-relaxed">
                  KnowYourCandidate विभिन्न चुनावहरूमा उम्मेदवारहरूको व्यापक डेटाबेस प्रदान गर्छ, जसले आपलाई राजनीतिक परिदृश्य बुझ्न र सचेत मतदान निर्णय लिन मदत गर्छ।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/30 border-t border-border px-2 md:px-8 sm:px-4 lg:px-12 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              मुख्य विशेषताहरू
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'उन्नत फिल्टरिङ्ग',
                  description:
                    'दल, जिल्ला, लिङ्ग, योग्यता र उमेरमा आधारित उम्मेदवारहरू फिल्टर गर्नुहोस्।',
                },
                {
                  title: 'विस्तृत प्रोफाइलहरू',
                  description:
                    'शिक्षा, अनुभव, स्थान र राजनीतिक दलको सम्बद्धता सहित विस्तृत उम्मेदवार जानकारी।',
                },
                {
                  title: 'सहज तुलना',
                  description:
                    'उम्मेदवारहरूलाई उनीहरूको योग्यता र पृष्ठभूमि जानकारीको आधारमा तुलना गर्नुहोस्।',
                },
              ].map((feature, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 md:py-20 px-2 md:px-8 sm:px-4 lg:px-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                डेटाको बारेमा
              </h2>
              <div className="space-y-6 text-foreground/70 leading-relaxed">
                <p>
                  KnowYourCandidate चुनाव उम्मेदवारको आधिकारिक डेटा एकत्रित गर्छ र सहज फरम्यातमा प्रस्तुत गर्छ। हाम्रो डेटाबेसमा विभिन्न राजनीतिक दलका उम्मेदवारहरूको विस्तृत जानकारी अन्तर्गत छ।
                </p>
                <p>
                  प्रत्येक उम्मेदवार प्रोफाइलमा निम्नलिखित आवश्यक जानकारी अन्तर्गत छ:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• व्यक्तिगत विवरण (नाम, उमेर, लिङ्ग)</li>
                  <li>• शिक्षा र योग्यता</li>
                  <li>• व्यावसायिक अनुभव</li>
                  <li>• राजनीतिक दलको सम्बद्धता</li>
                  <li>• चुनाव चिन्ह</li>
                  <li>• भौगोलिक स्थान र ठेगाना</li>
                </ul>
                <p>
                  हामी सटीक, अद्यावधिक जानकारी राख्न र सबै नागरिकहरूको लागि चुनाव प्रक्रिया अधिक पारदर्शी बनाउन प्रतिबद्ध छौं।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground px-2 md:px-8 sm:px-4 lg:px-12 py-12 md:py-20 border-t border-border mb-0">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">उम्मेदवारहरू अन्वेषण गर्न तयार हुनुहुन्छ?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              आफ्नो पसंदअनुसार उम्मेदवारहरू खोज्न र फिल्टर गर्न हाम्रो गृह पृष्ठ भेट गर्नुहोस्।
            </p>
            <a
              href="/"
              className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              उम्मेदवारहरू अन्वेषण गर्नुहोस्
            </a>
          </div>
        </section>

       <Footer/>
      </main>
    </>
  )
}
