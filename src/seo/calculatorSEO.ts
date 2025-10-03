interface SEOConfig {
  title: string;
  description: string;
  schema: object;
}

export const calculatorSEO: Record<string, SEOConfig> = {
  '/sovkalkylator': {
    title: 'Sömnkalkylator - Beräkna optimal sömntid',
    description: 'Använd vår sömnkalkylator för att beräkna optimal sänggående och uppvakningstid baserat på sömnperioder. Få bättre sömn med vetenskapligt baserade rekommendationer.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Sömnkalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna optimal sömntid och sömnperioder",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/bmikalkylator': {
    title: 'BMI Kalkylator - Beräkna ditt Body Mass Index',
    description: 'Beräkna ditt BMI (Body Mass Index) och få en uppfattning om din kroppsvikt i förhållande till din längd. Gratis och enkel BMI-räknare med hälsorekommendationer.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "BMI Kalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna ditt Body Mass Index (BMI)",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  
  '/kalorikalkylator': {
    title: 'Kalorikalkylator - Beräkna ditt dagliga energibehov',
    description: 'Beräkna ditt dagliga kaloribehov baserat på din aktivitetsnivå, ålder, vikt och längd. Få personliga rekommendationer för viktminskning eller viktökning.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Kalorikalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna dagligt kaloribehov",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/rantakalkylator': {
    title: 'Ränta på ränta kalkylator - Beräkna avkastning',
    description: 'Beräkna hur ditt sparande växer med ränta-på-ränta effekten. Planera ditt långsiktiga sparande och se hur dina pengar kan växa över tid.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Ränta på ränta kalkylator",
      "applicationCategory": "FinanceApplication",
      "description": "Beräkna ränta på ränta effekten",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/lanekalkylator': {
    title: 'Lånekalkylator - Beräkna månadskostnad för lån',
    description: 'Beräkna månadskostnad och total kostnad för ditt lån. Jämför olika lånebelopp, räntor och återbetalningstider för att hitta rätt lånealternativ.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Lånekalkylator",
      "applicationCategory": "FinanceApplication",
      "description": "Beräkna lånekostnader",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/bolanekalkylator': {
    title: 'Bolånekalkylator - Beräkna månadskostnad för bolån',
    description: 'Beräkna månadskostnad och amortering för ditt bolån. Få en tydlig översikt över dina boendekostnader och planera din ekonomi.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Bolånekalkylator",
      "applicationCategory": "FinanceApplication",
      "description": "Beräkna bolånekostnader",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/momskalkylator': {
    title: 'Momskalkylator - Beräkna moms enkelt',
    description: 'Räkna ut moms enkelt med vår momskalkylator. Beräkna pris inklusive och exklusive moms för olika momssatser. Perfekt för företagare och privatpersoner.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Momskalkylator",
      "applicationCategory": "FinanceApplication",
      "description": "Beräkna moms",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/fastekalkylator': {
    title: 'Fastekalkylator - Håll koll på din fasta',
    description: 'Beräkna och håll koll på din fasta med vår fastekalkylator. Lär dig om kroppens olika faser under fastan och optimera dina resultat.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Fastekalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna och följ din fasta",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/agglossningskalkylator': {
    title: 'Ägglossningskalkylator - Beräkna din fertila period',
    description: 'Beräkna din ägglossning och mest fertila period med vår ägglossningskalkylator. Få en tydlig översikt över din menstruationscykel.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Ägglossningskalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna ägglossning och fertil period",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/bmrkalkylator': {
    title: 'BMR Kalkylator - Beräkna din basala ämnesomsättning',
    description: 'Beräkna din basala ämnesomsättning (BMR) och dagliga kaloriförbrukning. Få en personlig analys av ditt energibehov i vila.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "BMR Kalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna basal ämnesomsättning",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/mattomvandlare': {
    title: 'Måttomvandlare - Konvertera mellan olika mått',
    description: 'Konvertera enkelt mellan olika svenska mått för vikt och volym. Perfekt hjälp vid matlagning och bakning.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Måttomvandlare",
      "applicationCategory": "UtilityApplication",
      "description": "Konvertera mellan olika mått",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/amerikanskomvandlare': {
    title: 'Amerikansk måttomvandlare - Konvertera amerikanska mått',
    description: 'Konvertera mellan amerikanska mått och deciliter för exakta matlagningsrecept. Enkel omvandling av cups, ounces och andra amerikanska måttenheter.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Amerikansk måttomvandlare",
      "applicationCategory": "UtilityApplication",
      "description": "Konvertera amerikanska mått",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/deadlinekalkylator': {
    title: 'Deadline Kalkylator - Beräkna projektslutdatum',
    description: 'Beräkna slutdatum för projekt baserat på startdatum och arbetsdagar. Ta hänsyn till helger och lediga dagar i din projektplanering.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Deadline Kalkylator",
      "applicationCategory": "BusinessApplication",
      "description": "Beräkna projektdeadlines",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  },
  '/viktminskningskalkylator': {
    title: 'Viktminskningskalkylator - Beräkna ditt kaloriintag för viktminskning',
    description: 'Beräkna ditt optimala kaloriintag för att nå din målvikt. Få personliga rekommendationer för hälsosam viktminskning baserat på din kroppssammansättning och aktivitetsnivå.',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Viktminskningskalkylator",
      "applicationCategory": "HealthApplication",
      "description": "Beräkna kaloriintag för viktminskning",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "SEK"
      }
    }
  }
};