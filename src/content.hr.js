// Croatian overlay for team members — translated fields only, keyed by slug.
// Structural/asset fields (photo, years, stack icons, email/social links) live
// once in content.js and are shared across locales; only what's actually
// rendered gets translated here (experience/education/languages are currently
// unused — see ExperienceTimeline.vue / EducationSection.vue — so they're
// skipped rather than translated speculatively).
//
// `intro` (real members) and the first `about.paragraphs` entry (Oleg, Danijel)
// embed the auto-incrementing years-of-experience number, so they're functions
// of `years` merged in by content.js — same reason `stats[0]` omits `value`.
export default {
  'josip-lukacevic': {
    role: 'Viši softverski inženjer',
    eyebrow: 'Osnivač i vodeći inženjer · Full-Stack · Barcelona',
    tagline: 'Moj posao je da timovi isporučuju.',
    intro: (years) =>
      `${years}+ godina u web inženjerstvu — najprije kao razvojni programer, zatim kao voditelj inženjerskog tima, a najnovije kao suosnivač i CTO startupa. Kroz jCode preuzimam izradu web stranica, web i mobilnih aplikacija od početka do kraja.`,
    bio: 'Osnivač jCodea. Josip je vodio web inženjerstvo velikih razmjera — kao voditelj tima iza platforme i web trgovine globalnog esports brenda, a zatim kao CTO i suosnivač AI SaaS proizvoda. Ostaje aktivno uključen kroz cijeli stack i preuzima odgovornost za isporuku od početka do kraja.',

    stats: [
      { label: 'godina u web inženjerstvu' },
      { value: '5.5', label: 'godina vođenja web inženjerskog tima' },
      { value: 'Milijuni', label: 'korisnika kroz proizvode koje je isporučio' },
    ],

    about: {
      title: 'Engineering manager koji nikad nije prestao biti inženjer',
      paragraphs: [
        'Josip je praktičan tehnički voditelj s više od desetljeća iskustva kroz cijeli web stack. Karijeru je izgradio ostajući blizu samog posla — arhitektura, code review, teške procjene — dok istovremeno brine o cjelini: roadmapu, isporuci i ljudima koji sve to grade. Rijetka je to kombinacija koja mu omogućuje da vodi tim bez gubitka inženjerskog osjećaja za to kako softver zaista nastaje.',
        'Prošao je put od developera do engineering managera do suosnivača i CTO-a — put koji je izgradio i osnivački osjećaj vlasništva i pragmatičan, na isporuku usmjeren pristup radu. Jednako se lako sporazumijeva s rukovodstvom kao i s junior developerima, odluke temelji na dokazima, a ne na egu, i brzo mijenja mišljenje čim netko ponudi bolju ideju.',
      ],
      callout: (years) =>
        `Fokusiran je na tehničko vođenje i isporuku — pretvaranje ideje u proizvod koji stvarno radi, a zatim održavanje njegove brzine i pouzdanosti. Kroz ${years}+ godina to je radio kao developer, engineering manager i osnivač.`,
    },

    strengths: [
      { title: 'Vođenje tima', desc: 'Zapošljavanje, planiranje sprintova, code review, upravljanje QA-om i pravovremena isporuka — sve od početka do kraja.' },
      { title: 'Upravljanje dionicima', desc: 'Jedinstvena tehnička kontaktna točka između rukovodstva, kreativnih timova i vanjskih partnera.' },
      { title: 'Praktičan inženjerski rad', desc: 'Vue.js, Node.js, PHP/Laravel, Shopify, AWS/Cloudflare — mogu odblokirati developera i preispitati procjenu.' },
      { title: 'Rad na daljinu', desc: '7+ godina vođenja i isporuke s raspoređenim timovima kroz američke i europske vremenske zone.' },
      { title: 'Iskustvo osnivača', desc: 'Kao CTO izgradio i lansirao AI SaaS proizvod od početka do kraja — roadmap, arhitektura, sigurnost, isporuka.' },
      { title: 'AI u produkciji', desc: 'Integracija AI modela u stvarne proizvode, uz svakodnevno korištenje AI alata u vlastitom radu.' },
    ],

    // Positional — matches content.js josip.skillGroups order (label only; items/featured stay put).
    skillGroups: [
      { label: 'Vođenje i isporuka' },
      { label: 'Frontend' },
      { label: 'Backend' },
      { label: 'E-trgovina i CMS' },
      { label: 'Cloud i DevOps' },
      { label: 'Podaci i integracije' },
      { label: 'AI' },
    ],
  },

  'oleg-kalysh': {
    role: 'Viši softverski inženjer',
    eyebrow: 'Viši softverski inženjer · Full-Stack · Vue i Node',
    tagline: 'Gradim brz, pouzdan softver koji se skalira.',
    intro: (years) =>
      `${years}+ godina izrade skalabilnih web platformi, desktop aplikacija i real-time sustava — u područjima sigurnosti i identiteta, SaaS-a, marketplaceova i komunikacije u stvarnom vremenu. Jak u JavaScript/TypeScript, Vue.js i Node.js.`,
    bio: 'Oleg preuzima teže dijelove posla — real-time sustave, cross-platform desktop aplikacije i backend sustave s velikim opterećenjem. Isporučio je biometrijsku sigurnost na uređajima u produkciji i sučelja s intenzivnom upotrebom WebSocketa, a performanse i pouzdanost pod opterećenjem uzima krajnje ozbiljno.',

    stats: [
      { label: 'godina komercijalnog iskustva' },
      { value: '50+', label: 'uređaja na kojima radi njegov desktop klijent' },
      { value: '41%', label: 'brže učitavanje stranice nakon prelaska na Vue.js' },
      { value: '10k+', label: 'API zahtjeva dnevno, stabilno' },
    ],

    about: {
      title: 'Full-stack inženjer za real-time sustave i sustave s velikim opterećenjem',
      paragraphs: [
        'Oleg je full-cycle inženjer kojeg privlače teži dijelovi softvera — real-time sustavi, cross-platform desktop aplikacije i backendi koji moraju ostati brzi i pouzdani pod velikim opterećenjem. Kreće se sigurno kroz cijeli stack, od arhitekture i sučelja do API-ja, optimizacije performansi i cloud infrastrukture.',
        (years) =>
          `Kroz ${years}+ godina rada u produktnim tvrtkama i inženjerskim timovima isporučio je sve od skalabilnih web platformi do sigurnosnih i biometrijskih sustava. Metodičan je i usmjeren na rezultate, s navikom mjerenja vlastitog rada — te iskrenim fokusom na pouzdanost, brzinu i iskustvo ljudi koji se na to oslanjaju svaki dan.`,
      ],
      callout: 'Duboko iskustvo u komunikaciji u stvarnom vremenu (WebSockets), Electron desktop aplikacijama, cloud infrastrukturi i optimizaciji performansi sučelja — s mjerljivim poboljšanjima pouzdanosti, brzine i korisničkog iskustva.',
    },

    strengths: [
      { title: 'Full-cycle razvoj', desc: 'Arhitektura, frontend i backend, performanse i cloud deployment — sve od početka do kraja.' },
      { title: 'Real-time sustavi', desc: 'WebSockets, live razmjena poruka i komunikacija visoke frekvencije i opterećenja.' },
      { title: 'Desktop i hardver', desc: 'Cross-platform Electron klijenti koji integriraju SDK-ove senzora i biometrijske uređaje.' },
      { title: 'Optimizacija performansi', desc: 'Smanjio vrijeme učitavanja stranice za 41%+ prelaskom s WordPressa na Vue.js i optimizacijom sučelja.' },
      { title: 'Backend u velikim razmjerima', desc: 'NestJS servisi i REST/GraphQL API-ji nad Postgresom i Mongom, koji dnevno opslužuju tisuće zahtjeva.' },
      { title: 'Sigurnost i identitet', desc: 'Tijekovi biometrijske verifikacije i siguran prijenos podataka između desktop klijenata i backend servisa.' },
    ],

    // Positional — matches content.js oleg.skillGroups order.
    skillGroups: [
      { label: 'Osnovno' },
      { label: 'Frontend' },
      { label: 'Backend' },
      { label: 'Baze podataka' },
      { label: 'Cloud i DevOps' },
      { label: 'Alati' },
    ],
  },

  'danijel-popic': {
    role: 'Viši mobilni programer',
    eyebrow: 'Viši mobilni programer · Android · iOS · Node.js',
    tagline: 'Mobilne aplikacije na kojima poslovanje počiva, izrađene da traju.',
    intro: (years) =>
      `${years}+ godina izrade Android i iOS aplikacija — POS sustavi za maloprodaju, platforma za taxi usluge i poslovne aplikacije — uz iskustvo vođenja tima, Node.js backend razvoja i AWS DevOpsa.`,
    bio: 'Danijel izrađuje native mobilne aplikacije na koje se poslovanja svakodnevno oslanjaju — POS sustave koji rade u Hrvatskoj i Sloveniji i kompleksnu taxi platformu. Vodio je Android timove, preuzeo backend razvoj za globalni brend, i pet godina predavao ovu struku.',

    stats: [
      { label: 'godina u mobilnom razvoju' },
      { value: '3', label: 'vođena inženjerska tima' },
      { value: '5.0', label: 'prosjek ocjena — diplomirao kao najbolji u razredu' },
      { value: '5 godina', label: 'predavanja Android razvoja' },
    ],

    about: {
      title: 'Mobilni inženjer koji izrađuje i vodi',
      paragraphs: [
        (years) =>
          `Danijel je mobilni inženjer i team lead koji izrađuje softver na kojem poslovanja svakodnevno počivaju. Kroz ${years}+ godina isporučio je native Android i iOS aplikacije od arhitekture sve do objave u trgovini — POS i poslovne sustave koji se koriste u maloprodaji, ugostiteljstvu i industriji, te kompleksnu platformu za taxi usluge.`,
        'Njegov opseg ide daleko izvan same aplikacije, s praktičnim iskustvom u Node.js backendima i AWS infrastrukturi, a vodio je inženjerske timove i projekte u nekoliko tvrtki. Pet godina predavanja Android razvoja oblikovalo je njegov način rada — strukturiran, pouzdan i darežljiv sa znanjem — a to se vidi i u kodu koji isporučuje i u timovima koje vodi.',
      ],
      callout: 'Jak u native mobilnom razvoju (Android i iOS), Node.js backendima i AWS infrastrukturi — s iskustvom vođenja timova i isporuke produkcijskih aplikacija na koje se poslovanja svakodnevno oslanjaju.',
    },

    strengths: [
      { title: 'Native mobilni razvoj', desc: 'Android i iOS aplikacije u Kotlinu, Javi i Swiftu — od arhitekture do objave na App Store i Play Store.' },
      { title: 'Vođenje tima', desc: 'Vodio Android timove i projekte u nekoliko tvrtki; mentorira developere i isporučuje na vrijeme.' },
      { title: 'Backend i DevOps', desc: 'Node.js backend servisi i AWS infrastruktura — potpuna isporuka izvan same aplikacije.' },
      { title: 'Poslovni sustavi', desc: 'POS i blagajnički sustavi te ERP aplikacije koje se koriste u maloprodaji, ugostiteljstvu, nabavi i industriji.' },
      { title: 'Pouzdanost u produkciji', desc: 'Aplikacije na koje se poslovanja u Hrvatskoj i Sloveniji svakodnevno oslanjaju.' },
      { title: 'Podučavanje i mentorstvo', desc: 'Pet godina predavanja Android razvoja — strukturiran pristup i darežljivost sa znanjem.' },
    ],

    // Positional — matches content.js danijel.skillGroups order.
    skillGroups: [
      { label: 'Osnovno' },
      { label: 'Mobilne tehnologije' },
      { label: 'Backend i cloud' },
      { label: 'Ostalo' },
    ],
  },

  // Placeholder seats — mirrors content.js's placeholderMember() factory shape.
  // `intro` is a function of `focus` here (not years — these have none yet).
  'backend-engineer': placeholderMemberHr({ role: 'Backend inženjer', focus: 'API-je, baze podataka i infrastrukturu' }),
  'product-designer': placeholderMemberHr({ role: 'Produktni dizajner', focus: 'UX i vizualni dizajn' }),
}

function placeholderMemberHr({ role, focus }) {
  return {
    role,
    eyebrow: `${role} · jCode`,
    tagline: 'Ovdje ide kratki osobni slogan.',
    intro: () =>
      `Dvije do tri rečenice biografije za ovog člana tima — njegov fokus (${focus}), iskustvo, i što donosi klijentskim projektima. Zamijenite ovaj privremeni tekst stvarnim sadržajem.`,
    about: {
      title: 'O ovom članu tima',
      paragraphs: [
        'Kratki uvodni paragraf o ovoj osobi — pozadina, vrsta posla koju voli, i kako pristupa projektima.',
        'Drugi paragraf s malo više detalja: značajni projekti, snage, ili osobna napomena. Neka ostane ljudski.',
      ],
      callout: null,
    },
    strengths: [
      { title: 'Snaga jedan', desc: 'Opišite ključnu snagu koju ovaj član tima donosi studiju.' },
      { title: 'Snaga dva', desc: 'Opišite još jedno područje u kojem se ističe.' },
      { title: 'Snaga tri', desc: 'Još jedna — alat, domena, ili način rada.' },
    ],
    skillGroups: [{ label: 'Osnovne vještine' }, { label: 'Također radi s' }],
  }
}
