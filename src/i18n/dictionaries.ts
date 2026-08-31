import type { Locale } from './config'

/**
 * Interface strings. Editorial content (headlines, product copy, FAQs, posts)
 * is translated in the CMS — these are only the fixed labels around it.
 */
export type Dictionary = {
  nav: {
    experiences: string
    boat: string
    included: string
    route: string
    faq: string
    about: string
    blog: string
    specialOccasions: string
    dayCruise: string
    sunsetCruise: string
    bookNow: string
  }
  hero: {
    sharedCruise: string
    privateCruise: string
    perPerson: string
    perBoat: string
    from: string
    eyebrow: string
  }
  trust: { freeCancellation: string; welcomeDrink: string; dailyDepartures: string }
  hero_notes: { shared: string; private: string }
  boatCard: { title: string; sub: string }
  sections: {
    experiences: string
    onboard: string
    route: string
    theBoat: string
    about: string
    boutique: string
    goodToKnow: string
    meetingPoint: string
    contact: string
    gallery: string
    blog: string
  }
  faqSections: {
    booking: string
    meetingPoint: string
    gettingHere: string
    onboard: string
    guests: string
    weather: string
  }
  detail: {
    duration: string
    departures: string
    checkAvailability: string
    freeCancellation: string
    freeCancellationNote: string
    localHosts: string
    localHostsNote: string
    languages: string
    smallGroup: string
    smallGroupNote: string
    highlights: string
    fullDescription: string
    itinerary: string
    includes: string
    meetingPoint: string
    importantInfo: string
    notSuitable: string
    notAllowed: string
    knowBefore: string
    routeNote: string
    sharedRate: string
    privateRate: string
    customDetails: string
    speakWithUs: string
    openInMaps: string
    orPrivateTitle: string
    orPrivateCta: string
    orSharedTitle: string
    orSharedCta: string
    readFullDescription: string
    viewFullRoute: string
    reviews: string
    leaveReview: string
    viewAllPhotos: string
  }
  homeSpecialOccasions: {
    eyebrow: string
    title: string
    occasionsLabel: string
    extrasLabel: string
    closingLine: string
    cta: string
  }
  homeAbout: {
    eyebrow: string
    title: string
    intro: string
    cta: string
  }
  homeReviews: {
    eyebrow: string
    title: string
    cta: string
    tripadvisorCta: string
  }
  privateEnquiry: {
    eyebrow: string
    title: string
    moreLink: string
    ctaButton: string
    body: string
    perk1: string
    perk2: string
    perk3: string
    eventsNote: string
    cruise: string
    cruiseDay: string
    cruiseSunset: string
    cruiseUnsure: string
    date: string
    guests: string
    guestsPlaceholder: string
    occasion: string
    occasionPlaceholder: string
    extras: string
    extrasPlaceholder: string
    messagePlaceholder: string
    consent: string
    send: string
    sentTitle: string
    sentBody: string
  }
  contact: {
    title: string
    lead: string
    email: string
    whatsapp: string
    phone: string
    sendMessage: string
    name: string
    subject: string
    message: string
    namePlaceholder: string
    emailPlaceholder: string
    phoneOptional: string
    phonePlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
    send: string
    sending: string
    sentTitle: string
    sentBody: string
    error: string
    privacy: string
    privacyLink: string
    consent: string
  }
  footer: {
    tagline: string
    callCost: string
    madeBy: string
    meetingPoint: string
    contact: string
    bookings: string
    contactForm: string
    faq: string
    cancellation: string
    privacy: string
    terms: string
    livro: string
  }
  blog: {
    title: string
    lead: string
    readMore: string
    readingTime: string
    backToBlog: string
    relatedCta: string
    publishedOn: string
  }
  routeMap: { day: string; sunset: string }
  cookies: { text: string; learnMore: string; essential: string; acceptAll: string }
  common: { getDirections: string; bookNow: string; upTo12: string; language: string; menu: string; close: string }
}

const en: Dictionary = {
  nav: {
    experiences: 'Experiences',
    boat: 'The Boat',
    included: "What's Included",
    route: 'Route',
    faq: 'FAQ',
    about: 'About',
    blog: 'Blog',
    specialOccasions: 'Special Occasions',
    dayCruise: 'Day Cruise',
    sunsetCruise: 'Sunset Cruise',
    bookNow: 'Book Now',
  },
  hero: { sharedCruise: 'Shared cruise', privateCruise: 'Private cruise', perPerson: 'per person', perBoat: 'per boat', from: 'from', eyebrow: 'The Douro — No.01' },
  trust: {
    freeCancellation: 'Free cancellation up to 24h',
    welcomeDrink: 'Welcome Porto Tonic included',
    dailyDepartures: 'Daily departures · Douro Marina, Afurada',
  },
  hero_notes: { shared: 'Join a small group of up to 12', private: 'The whole boat for your group' },
  boatCard: { title: 'Meet Wondy, our boat', sub: 'Cushioned lounge · up to 12 guests' },
  sections: {
    experiences: 'Experiences',
    onboard: 'On board',
    route: 'The Route',
    theBoat: 'The Boat',
    about: 'About',
    boutique: 'Onboard Boutique',
    goodToKnow: 'Good to know',
    meetingPoint: 'Meeting Point',
    contact: 'Contact',
    gallery: 'Gallery',
    blog: 'Blog',
  },
  faqSections: {
    booking: 'Authentic Experience & Booking',
    meetingPoint: 'Meeting point',
    gettingHere: 'Getting here',
    onboard: 'Onboard',
    guests: 'Guests & accessibility',
    weather: 'Weather & seasonality',
  },
  detail: {
    duration: 'Duration',
    departures: 'Departures',
    checkAvailability: 'Check availability for starting times',
    freeCancellation: 'Free cancellation',
    freeCancellationNote: 'Cancel up to 24 hours in advance for a full refund',
    localHosts: 'Local hosts on board',
    localHostsNote: 'Hosted by locals who know the river personally',
    languages: 'Languages',
    smallGroup: 'Small group',
    smallGroupNote: 'Up to 12 guests — or book the whole boat privately',
    highlights: 'Highlights',
    fullDescription: 'Full description',
    itinerary: 'Itinerary',
    includes: 'Includes',
    meetingPoint: 'Meeting point',
    importantInfo: 'Important information',
    notSuitable: 'Not suitable for',
    notAllowed: 'Not allowed',
    knowBefore: 'Know before you go',
    routeNote: 'For reference only. The route may vary depending on river, weather and safety conditions.',
    sharedRate: 'Shared cruise · per person',
    privateRate: 'Private cruise · whole boat',
    customDetails: 'For special occasions or custom details,',
    speakWithUs: 'speak with us before booking',
    openInMaps: 'Open in Google Maps',
    orPrivateTitle: 'Or have a private experience — just for your group',
    orPrivateCta: 'See the private cruise',
    orSharedTitle: 'Prefer to share it with others?',
    orSharedCta: 'See the shared cruise',
    readFullDescription: 'Read full description',
    viewFullRoute: 'View full route & landmarks',
    reviews: 'reviews',
    leaveReview: 'Leave a review on Tripadvisor',
    viewAllPhotos: 'View all',
  },
  homeSpecialOccasions: {
    eyebrow: 'Private Experiences',
    title: 'Special Occasions',
    occasionsLabel: 'Occasions',
    extrasLabel: 'Optional Extras',
    closingLine: "Have something else in mind? Tell us what you're planning and we'll see what we can arrange.",
    cta: 'Plan Something Special',
  },
  homeAbout: {
    eyebrow: 'Hosted by Locals',
    title: 'Meet the people behind Douro Wonders',
    intro:
      'Douro Wonders was created by Inês Veloso and António Ferrer to share the river they know personally — combining maritime experience, local knowledge and genuine hosting.',
    cta: 'Our Story',
  },
  homeReviews: {
    eyebrow: 'Guest Stories',
    title: 'What guests say about Douro Wonders',
    cta: 'Read our Google reviews',
    tripadvisorCta: 'or on Tripadvisor',
  },
  privateEnquiry: {
    eyebrow: 'Private cruise',
    title: 'Prefer it just for you?',
    moreLink: 'Planning something special?',
    ctaButton: 'Plan something special',
    body: 'The whole boat, exclusively for your group — at your own pace, with personal touches, to make the river yours for an afternoon or an evening.',
    perk1: 'The whole boat, just your group',
    perk2: 'Flexible timing, within availability',
    perk3: 'Add extras — flowers, cake, a photographer and more',
    eventsNote: 'Planning a proposal, a wedding toast or another celebration onboard? Tell us below and we’ll help you plan it.',
    cruise: 'Which cruise?',
    cruiseDay: 'Day Cruise',
    cruiseSunset: 'Sunset Cruise',
    cruiseUnsure: 'Not sure yet',
    date: 'Preferred date',
    guests: 'Number of guests',
    guestsPlaceholder: 'e.g. 8',
    occasion: 'Occasion',
    occasionPlaceholder: 'Proposal, birthday, anniversary…',
    extras: 'Optional extras',
    extrasPlaceholder: 'Flowers, cake, photographer…',
    messagePlaceholder: 'Anything else we should know?',
    consent: 'I agree to be contacted by Douro Wonders about my private enquiry. I have read the',
    send: 'Send enquiry',
    sentTitle: 'Enquiry sent — thank you!',
    sentBody: 'We’ll get back to you with private cruise options, usually within a day.',
  },
  contact: {
    title: 'Questions, or something special in mind?',
    lead: 'For special occasions or custom details, speak with us before booking. We’ll tell you what’s possible.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    sendMessage: 'Send us a message',
    name: 'Name',
    subject: 'Subject',
    message: 'Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    phoneOptional: 'Phone / WhatsApp (optional)',
    phonePlaceholder: '+351 900 000 000',
    subjectPlaceholder: 'e.g. Birthday on board, group of 8…',
    messagePlaceholder: 'Tell us how we can help…',
    send: 'Send Message',
    sending: 'Sending…',
    sentTitle: 'Message sent — thank you!',
    sentBody: 'We’ll get back to you as soon as possible, usually within a day.',
    error: 'Something went wrong. Please try again or email us directly.',
    privacy: 'By sending this message you agree to our',
    privacyLink: 'privacy policy',
    consent: 'I agree to be contacted by Douro Wonders about my enquiry. I have read the',
  },
  footer: {
    tagline:
      'Small-group and private Douro River cruises from Porto and Vila Nova de Gaia, hosted by locals who know the river personally.',
    madeBy: 'Made by',
    callCost: 'Call cost to the national mobile network',
    meetingPoint: 'Meeting Point',
    contact: 'Contact',
    bookings: 'Bookings & Info',
    contactForm: 'Contact Form',
    faq: 'FAQ',
    cancellation: 'Cancellation Policy',
    privacy: 'Privacy',
    terms: 'Terms',
    livro: 'Livro de Reclamações',
  },
  blog: {
    title: 'Douro & Porto Guides',
    lead: 'Local knowledge, river stories and practical guides from the people who host every cruise.',
    readMore: 'Read more',
    readingTime: 'min read',
    backToBlog: 'Back to all articles',
    relatedCta: 'Ready to see it from the river?',
    publishedOn: 'Published',
  },
  routeMap: { day: 'Day Cruise', sunset: 'Sunset Cruise' ,
  },
  cookies: {
    text: 'We use essential cookies to make the website and the Bókun booking system work. With your consent, we may also use analytics cookies to understand how the site is used.',
    learnMore: 'Learn more',
    essential: 'Essential only',
    acceptAll: 'Accept all',
  },
  common: { getDirections: 'Get Directions', bookNow: 'Book Now', upTo12: 'Up to 12 guests', language: 'Language', menu: 'Menu', close: 'Close' },
}

const pt: Dictionary = {
  nav: {
    experiences: 'Experiências',
    boat: 'O Barco',
    included: 'O que inclui',
    route: 'Percurso',
    faq: 'FAQ',
    about: 'Sobre nós',
    blog: 'Blog',
    specialOccasions: 'Ocasiões Especiais',
    dayCruise: 'Cruzeiro Diurno',
    sunsetCruise: 'Cruzeiro Pôr do Sol',
    bookNow: 'Reservar',
  },
  hero: { sharedCruise: 'Passeio partilhado', privateCruise: 'Passeio privado', perPerson: 'por pessoa', perBoat: 'por embarcação', from: 'desde', eyebrow: 'O Douro — No.01' },
  trust: {
    freeCancellation: 'Cancelamento gratuito até 24h antes',
    welcomeDrink: 'Porto Tónico de boas-vindas incluído',
    dailyDepartures: 'Partidas diárias · Douro Marina, Afurada',
  },
  hero_notes: { shared: 'Junte-se a um grupo pequeno até 12 pessoas', private: 'A embarcação toda para o seu grupo' },
  boatCard: { title: 'Conheça a Wondy, a nossa embarcação', sub: 'Sofás confortáveis · até 12 pessoas' },
  sections: {
    experiences: 'Experiências',
    onboard: 'A bordo',
    route: 'O Percurso',
    theBoat: 'A Wondy',
    about: 'Sobre nós',
    boutique: 'Boutique a Bordo',
    goodToKnow: 'Bom saber',
    meetingPoint: 'Ponto de Encontro',
    contact: 'Contacto',
    gallery: 'Galeria',
    blog: 'Blog',
  },
  faqSections: {
    booking: 'Experiência Autêntica & Reserva',
    meetingPoint: 'Ponto de encontro',
    gettingHere: 'Como chegar',
    onboard: 'A bordo',
    guests: 'Hóspedes e acessibilidade',
    weather: 'Meteorologia e época',
  },
  detail: {
    duration: 'Duração',
    departures: 'Partidas',
    checkAvailability: 'Consulte a disponibilidade para ver os horários',
    freeCancellation: 'Cancelamento gratuito',
    freeCancellationNote: 'Cancele até 24 horas antes e receba reembolso total',
    localHosts: 'Anfitriões locais a bordo',
    localHostsNote: 'Recebido por locais que conhecem o rio pessoalmente',
    languages: 'Idiomas',
    smallGroup: 'Grupo pequeno',
    smallGroupNote: 'Até 12 pessoas — ou reserve a embarcação inteira',
    highlights: 'Destaques',
    fullDescription: 'Descrição completa',
    itinerary: 'Itinerário',
    includes: 'Inclui',
    meetingPoint: 'Ponto de encontro',
    importantInfo: 'Informações importantes',
    notSuitable: 'Não recomendado para',
    notAllowed: 'Não permitido',
    knowBefore: 'Antes de embarcar',
    routeNote:
      'Apenas para referência. O percurso pode variar consoante as condições do rio, meteorológicas e de segurança.',
    sharedRate: 'Passeio partilhado · por pessoa',
    privateRate: 'Passeio privado · embarcação inteira',
    customDetails: 'Para ocasiões especiais ou detalhes personalizados,',
    speakWithUs: 'fale connosco antes de reservar',
    openInMaps: 'Abrir no Google Maps',
    orPrivateTitle: 'Ou tenha uma experiência privada — só para o seu grupo',
    orPrivateCta: 'Ver o cruzeiro privado',
    orSharedTitle: 'Prefere partilhar com outros?',
    orSharedCta: 'Ver o cruzeiro partilhado',
    readFullDescription: 'Ler a descrição completa',
    viewFullRoute: 'Ver percurso completo e pontos de interesse',
    reviews: 'avaliações',
    leaveReview: 'Deixe uma avaliação no Tripadvisor',
    viewAllPhotos: 'Ver todas',
  },
  homeSpecialOccasions: {
    eyebrow: 'Experiências Privadas',
    title: 'Ocasiões Especiais',
    occasionsLabel: 'Ocasiões',
    extrasLabel: 'Extras Opcionais',
    closingLine: 'Tem outra ideia em mente? Diga-nos o que está a planear e veremos o que podemos organizar.',
    cta: 'Planeie Algo Especial',
  },
  homeAbout: {
    eyebrow: 'Anfitriões Locais',
    title: 'Conheça quem está por trás da Douro Wonders',
    intro:
      'A Douro Wonders foi criada por Inês Veloso e António Ferrer para partilhar o rio que conhecem pessoalmente — combinando experiência marítima, conhecimento local e uma hospitalidade genuína.',
    cta: 'A Nossa História',
  },
  homeReviews: {
    eyebrow: 'Histórias de Hóspedes',
    title: 'O que dizem sobre a Douro Wonders',
    cta: 'Ver as nossas reviews no Google',
    tripadvisorCta: 'ou no Tripadvisor',
  },
  privateEnquiry: {
    eyebrow: 'Cruzeiro privado',
    title: 'Prefere só para si?',
    moreLink: 'A planear algo especial?',
    ctaButton: 'Planear algo especial',
    body: 'A embarcação toda, exclusivamente para o seu grupo — ao seu ritmo, com toques pessoais, para fazer do rio seu por uma tarde ou uma noite.',
    perk1: 'A embarcação toda, só para o seu grupo',
    perk2: 'Horário flexível, consoante disponibilidade',
    perk3: 'Acrescente extras — flores, bolo, fotógrafo e mais',
    eventsNote: 'A planear um pedido de casamento, um brinde ou outra celebração a bordo? Diga-nos abaixo e ajudamos a planear.',
    cruise: 'Que cruzeiro?',
    cruiseDay: 'Cruzeiro Diurno',
    cruiseSunset: 'Cruzeiro Pôr do Sol',
    cruiseUnsure: 'Ainda não sei',
    date: 'Data preferida',
    guests: 'Número de convidados',
    guestsPlaceholder: 'ex.: 8',
    occasion: 'Ocasião',
    occasionPlaceholder: 'Pedido de casamento, aniversário…',
    extras: 'Extras opcionais',
    extrasPlaceholder: 'Flores, bolo, fotógrafo…',
    messagePlaceholder: 'Mais alguma coisa que devamos saber?',
    consent: 'Concordo em ser contactado(a) pela Douro Wonders sobre o meu pedido privado. Li a',
    send: 'Enviar pedido',
    sentTitle: 'Pedido enviado — obrigado!',
    sentBody: 'Entraremos em contacto com opções de cruzeiro privado, normalmente dentro de um dia.',
  },
  contact: {
    title: 'Dúvidas, ou algo especial em mente?',
    lead: 'Para ocasiões especiais ou detalhes personalizados, fale connosco antes de reservar. Dizemos-lhe o que é possível.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    phone: 'Telefone',
    sendMessage: 'Envie-nos uma mensagem',
    name: 'Nome',
    subject: 'Assunto',
    message: 'Mensagem',
    namePlaceholder: 'O seu nome',
    emailPlaceholder: 'oseu@email.com',
    phoneOptional: 'Telefone / WhatsApp (opcional)',
    phonePlaceholder: '+351 900 000 000',
    subjectPlaceholder: 'ex.: Aniversário a bordo, grupo de 8…',
    messagePlaceholder: 'Diga-nos como podemos ajudar…',
    send: 'Enviar mensagem',
    sending: 'A enviar…',
    sentTitle: 'Mensagem enviada — obrigado!',
    sentBody: 'Respondemos assim que possível, normalmente dentro de um dia.',
    error: 'Algo correu mal. Tente novamente ou envie-nos um email.',
    privacy: 'Ao enviar esta mensagem concorda com a nossa',
    privacyLink: 'política de privacidade',
    consent: 'Concordo em ser contactado(a) pela Douro Wonders sobre o meu pedido. Li a',
  },
  footer: {
    tagline:
      'Cruzeiros no Douro em pequenos grupos e privados, a partir do Porto e de Vila Nova de Gaia, com anfitriões locais que conhecem o rio pessoalmente.',
    madeBy: 'Feito por',
    callCost: 'Custo de chamada para a rede móvel nacional',
    meetingPoint: 'Ponto de Encontro',
    contact: 'Contacto',
    bookings: 'Reservas e Informação',
    contactForm: 'Formulário de contacto',
    faq: 'Perguntas frequentes',
    cancellation: 'Política de cancelamento',
    privacy: 'Privacidade',
    terms: 'Termos',
    livro: 'Livro de Reclamações',
  },
  blog: {
    title: 'Guias do Douro e do Porto',
    lead: 'Conhecimento local, histórias do rio e guias práticos de quem recebe em cada cruzeiro.',
    readMore: 'Ler mais',
    readingTime: 'min de leitura',
    backToBlog: 'Ver todos os artigos',
    relatedCta: 'Pronto para ver do rio?',
    publishedOn: 'Publicado a',
  },
  routeMap: { day: 'Passeio Diurno', sunset: 'Passeio ao Pôr do Sol' ,
  },
  cookies: {
    text: 'Utilizamos cookies essenciais para o funcionamento do site e do sistema de reservas Bókun. Com o seu consentimento, podemos também usar cookies de análise para perceber como o site é utilizado.',
    learnMore: 'Saber mais',
    essential: 'Apenas essenciais',
    acceptAll: 'Aceitar todos',
  },
  common: { getDirections: 'Como chegar', bookNow: 'Reservar', upTo12: 'Até 12 pessoas', language: 'Idioma', menu: 'Menu', close: 'Fechar' },
}

const fr: Dictionary = {
  nav: {
    experiences: 'Expériences',
    boat: 'Le Bateau',
    included: 'Ce qui est inclus',
    route: 'Itinéraire',
    faq: 'FAQ',
    about: 'À propos',
    blog: 'Blog',
    specialOccasions: 'Occasions Spéciales',
    dayCruise: 'Croisière de jour',
    sunsetCruise: 'Croisière au coucher du soleil',
    bookNow: 'Réserver',
  },
  hero: { sharedCruise: 'Croisière partagée', privateCruise: 'Croisière privée', perPerson: 'par personne', perBoat: 'par bateau', from: 'à partir de', eyebrow: 'Le Douro — No.01' },
  trust: {
    freeCancellation: 'Annulation gratuite jusqu’à 24h avant',
    welcomeDrink: 'Porto Tonic de bienvenue inclus',
    dailyDepartures: 'Départs quotidiens · Douro Marina, Afurada',
  },
  hero_notes: { shared: 'Rejoignez un petit groupe de 12 personnes maximum', private: 'Le bateau entier pour votre groupe' },
  boatCard: { title: 'Découvrez Wondy, notre bateau', sub: 'Salon confortable · jusqu’à 12 personnes' },
  sections: {
    experiences: 'Expériences',
    onboard: 'À bord',
    route: 'L’Itinéraire',
    theBoat: 'Le Bateau',
    about: 'À propos',
    boutique: 'Boutique à bord',
    goodToKnow: 'Bon à savoir',
    meetingPoint: 'Point de rendez-vous',
    contact: 'Contact',
    gallery: 'Galerie',
    blog: 'Blog',
  },
  faqSections: {
    booking: 'Expérience Authentique & Réservation',
    meetingPoint: 'Point de rendez-vous',
    gettingHere: 'Comment venir',
    onboard: 'À bord',
    guests: 'Invités et accessibilité',
    weather: 'Météo et saison',
  },
  detail: {
    duration: 'Durée',
    departures: 'Départs',
    checkAvailability: 'Consultez les disponibilités pour voir les horaires',
    freeCancellation: 'Annulation gratuite',
    freeCancellationNote: 'Annulez jusqu’à 24 heures avant pour un remboursement intégral',
    localHosts: 'Hôtes locaux à bord',
    localHostsNote: 'Accueilli par des locaux qui connaissent le fleuve personnellement',
    languages: 'Langues',
    smallGroup: 'Petit groupe',
    smallGroupNote: 'Jusqu’à 12 personnes — ou réservez le bateau entier',
    highlights: 'Points forts',
    fullDescription: 'Description complète',
    itinerary: 'Itinéraire',
    includes: 'Inclus',
    meetingPoint: 'Point de rendez-vous',
    importantInfo: 'Informations importantes',
    notSuitable: 'Non adapté aux',
    notAllowed: 'Non autorisé',
    knowBefore: 'À savoir avant de partir',
    routeNote:
      'À titre indicatif. L’itinéraire peut varier selon les conditions du fleuve, la météo et la sécurité.',
    sharedRate: 'Croisière partagée · par personne',
    privateRate: 'Croisière privée · bateau entier',
    customDetails: 'Pour les occasions spéciales ou les demandes particulières,',
    speakWithUs: 'parlez-nous avant de réserver',
    openInMaps: 'Ouvrir dans Google Maps',
    orPrivateTitle: 'Ou optez pour une expérience privée — rien que pour votre groupe',
    orPrivateCta: 'Voir la croisière privée',
    orSharedTitle: 'Vous préférez la partager avec d’autres ?',
    orSharedCta: 'Voir la croisière partagée',
    readFullDescription: 'Lire la description complète',
    viewFullRoute: "Voir l'itinéraire complet et les sites remarquables",
    reviews: 'avis',
    leaveReview: 'Laisser un avis sur Tripadvisor',
    viewAllPhotos: 'Tout voir',
  },
  homeSpecialOccasions: {
    eyebrow: 'Expériences Privées',
    title: 'Occasions spéciales',
    occasionsLabel: 'Occasions',
    extrasLabel: 'Extras en option',
    closingLine:
      'Vous avez autre chose en tête ? Dites-nous ce que vous prévoyez et nous verrons ce que nous pouvons organiser.',
    cta: 'Planifiez quelque chose de spécial',
  },
  homeAbout: {
    eyebrow: 'Un accueil local',
    title: "Rencontrez l'équipe derrière Douro Wonders",
    intro:
      "Douro Wonders a été créée par Inês Veloso et António Ferrer pour partager le fleuve qu'ils connaissent personnellement — alliant expérience maritime, connaissance locale et un accueil authentique.",
    cta: 'Notre histoire',
  },
  homeReviews: {
    eyebrow: 'Témoignages',
    title: 'Ce que disent nos clients de Douro Wonders',
    cta: 'Voir nos avis Google',
    tripadvisorCta: 'ou sur Tripadvisor',
  },
  privateEnquiry: {
    eyebrow: 'Croisière privée',
    title: 'Préférez-vous en exclusivité ?',
    moreLink: 'Vous préparez quelque chose de spécial ?',
    ctaButton: 'Organiser quelque chose de spécial',
    body: 'Le bateau entier, exclusivement pour votre groupe — à votre rythme, avec des touches personnelles, pour vous approprier le fleuve le temps d’un après-midi ou d’une soirée.',
    perk1: 'Le bateau entier, rien que pour votre groupe',
    perk2: 'Horaire flexible, selon disponibilité',
    perk3: 'Ajoutez des extras — fleurs, gâteau, photographe et plus',
    eventsNote: 'Vous préparez une demande en mariage, un toast de mariage ou une autre célébration à bord ? Dites-le-nous ci-dessous, nous vous aiderons à l’organiser.',
    cruise: 'Quelle croisière ?',
    cruiseDay: 'Croisière de jour',
    cruiseSunset: 'Croisière au coucher du soleil',
    cruiseUnsure: 'Pas encore sûr(e)',
    date: 'Date souhaitée',
    guests: 'Nombre d’invités',
    guestsPlaceholder: 'ex. 8',
    occasion: 'Occasion',
    occasionPlaceholder: 'Demande en mariage, anniversaire…',
    extras: 'Extras optionnels',
    extrasPlaceholder: 'Fleurs, gâteau, photographe…',
    messagePlaceholder: 'Autre chose que nous devrions savoir ?',
    consent: 'J’accepte d’être contacté(e) par Douro Wonders au sujet de ma demande privée. J’ai lu la',
    send: 'Envoyer la demande',
    sentTitle: 'Demande envoyée — merci !',
    sentBody: 'Nous vous recontacterons avec des options de croisière privée, généralement sous un jour.',
  },
  contact: {
    title: 'Des questions, ou une idée particulière ?',
    lead: 'Pour les occasions spéciales ou les demandes particulières, parlez-nous avant de réserver. Nous vous dirons ce qui est possible.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    sendMessage: 'Envoyez-nous un message',
    name: 'Nom',
    subject: 'Sujet',
    message: 'Message',
    namePlaceholder: 'Votre nom',
    emailPlaceholder: 'vous@exemple.com',
    phoneOptional: 'Téléphone / WhatsApp (facultatif)',
    phonePlaceholder: '+351 900 000 000',
    subjectPlaceholder: 'ex. : Anniversaire à bord, groupe de 8…',
    messagePlaceholder: 'Dites-nous comment nous pouvons vous aider…',
    send: 'Envoyer le message',
    sending: 'Envoi…',
    sentTitle: 'Message envoyé — merci !',
    sentBody: 'Nous vous répondrons dès que possible, généralement sous un jour.',
    error: 'Une erreur est survenue. Réessayez ou envoyez-nous un email.',
    privacy: 'En envoyant ce message, vous acceptez notre',
    privacyLink: 'politique de confidentialité',
    consent: 'J’accepte d’être contacté(e) par Douro Wonders au sujet de ma demande. J’ai lu la',
  },
  footer: {
    tagline:
      'Croisières sur le Douro en petit groupe et privées, au départ de Porto et Vila Nova de Gaia, avec des hôtes locaux qui connaissent le fleuve personnellement.',
    madeBy: 'Réalisé par',
    callCost: 'Coût d’appel vers le réseau mobile national',
    meetingPoint: 'Point de rendez-vous',
    contact: 'Contact',
    bookings: 'Réservations et infos',
    contactForm: 'Formulaire de contact',
    faq: 'FAQ',
    cancellation: 'Politique d’annulation',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    livro: 'Livre de réclamations',
  },
  blog: {
    title: 'Guides du Douro et de Porto',
    lead: 'Connaissances locales, histoires du fleuve et guides pratiques par ceux qui accueillent chaque croisière.',
    readMore: 'Lire la suite',
    readingTime: 'min de lecture',
    backToBlog: 'Voir tous les articles',
    relatedCta: 'Prêt à le voir depuis le fleuve ?',
    publishedOn: 'Publié le',
  },
  routeMap: { day: 'Croisière de jour', sunset: 'Croisière coucher de soleil' ,
  },
  cookies: {
    text: 'Nous utilisons des cookies essentiels au fonctionnement du site et du système de réservation Bókun. Avec votre consentement, nous pouvons aussi utiliser des cookies d’analyse.',
    learnMore: 'En savoir plus',
    essential: 'Essentiels uniquement',
    acceptAll: 'Tout accepter',
  },
  common: { getDirections: 'Itinéraire', bookNow: 'Réserver', upTo12: 'Jusqu’à 12 personnes', language: 'Langue', menu: 'Menu', close: 'Fermer' },
}

const es: Dictionary = {
  nav: {
    experiences: 'Experiencias',
    boat: 'El Barco',
    included: 'Qué incluye',
    route: 'Ruta',
    faq: 'FAQ',
    about: 'Nosotros',
    blog: 'Blog',
    specialOccasions: 'Ocasiones Especiales',
    dayCruise: 'Crucero Diurno',
    sunsetCruise: 'Crucero Atardecer',
    bookNow: 'Reservar',
  },
  hero: { sharedCruise: 'Crucero compartido', privateCruise: 'Crucero privado', perPerson: 'por persona', perBoat: 'por barco', from: 'desde', eyebrow: 'El Duero — No.01' },
  trust: {
    freeCancellation: 'Cancelación gratuita hasta 24h antes',
    welcomeDrink: 'Porto Tonic de bienvenida incluido',
    dailyDepartures: 'Salidas diarias · Douro Marina, Afurada',
  },
  hero_notes: { shared: 'Únete a un grupo pequeño de hasta 12 personas', private: 'El barco entero para tu grupo' },
  boatCard: { title: 'Conoce a Wondy, nuestro barco', sub: 'Salón acolchado · hasta 12 personas' },
  sections: {
    experiences: 'Experiencias',
    onboard: 'A bordo',
    route: 'La Ruta',
    theBoat: 'El Barco',
    about: 'Nosotros',
    boutique: 'Boutique a bordo',
    goodToKnow: 'Bueno saber',
    meetingPoint: 'Punto de encuentro',
    contact: 'Contacto',
    gallery: 'Galería',
    blog: 'Blog',
  },
  faqSections: {
    booking: 'Experiencia Auténtica y Reserva',
    meetingPoint: 'Punto de encuentro',
    gettingHere: 'Cómo llegar',
    onboard: 'A bordo',
    guests: 'Huéspedes y accesibilidad',
    weather: 'Clima y temporada',
  },
  detail: {
    duration: 'Duración',
    departures: 'Salidas',
    checkAvailability: 'Consulta la disponibilidad para ver los horarios',
    freeCancellation: 'Cancelación gratuita',
    freeCancellationNote: 'Cancela hasta 24 horas antes y recibe el reembolso completo',
    localHosts: 'Anfitriones locales a bordo',
    localHostsNote: 'Recibido por locales que conocen el río personalmente',
    languages: 'Idiomas',
    smallGroup: 'Grupo pequeño',
    smallGroupNote: 'Hasta 12 personas — o reserva el barco entero',
    highlights: 'Destacados',
    fullDescription: 'Descripción completa',
    itinerary: 'Itinerario',
    includes: 'Incluye',
    meetingPoint: 'Punto de encuentro',
    importantInfo: 'Información importante',
    notSuitable: 'No apto para',
    notAllowed: 'No permitido',
    knowBefore: 'Antes de embarcar',
    routeNote:
      'Solo como referencia. La ruta puede variar según las condiciones del río, meteorológicas y de seguridad.',
    sharedRate: 'Crucero compartido · por persona',
    privateRate: 'Crucero privado · barco entero',
    customDetails: 'Para ocasiones especiales o detalles personalizados,',
    speakWithUs: 'habla con nosotros antes de reservar',
    openInMaps: 'Abrir en Google Maps',
    orPrivateTitle: 'O ten una experiencia privada — solo para tu grupo',
    orPrivateCta: 'Ver el crucero privado',
    orSharedTitle: '¿Prefieres compartirlo con otros?',
    orSharedCta: 'Ver el crucero compartido',
    readFullDescription: 'Leer la descripción completa',
    viewFullRoute: 'Ver la ruta completa y los puntos de interés',
    reviews: 'reseñas',
    leaveReview: 'Deja una reseña en Tripadvisor',
    viewAllPhotos: 'Ver todas',
  },
  homeSpecialOccasions: {
    eyebrow: 'Experiencias Privadas',
    title: 'Ocasiones especiales',
    occasionsLabel: 'Ocasiones',
    extrasLabel: 'Extras opcionales',
    closingLine: '¿Tienes otra idea en mente? Cuéntanos qué estás planeando y veremos qué podemos organizar.',
    cta: 'Planifica algo especial',
  },
  homeAbout: {
    eyebrow: 'Anfitriones locales',
    title: 'Conoce a las personas detrás de Douro Wonders',
    intro:
      'Douro Wonders fue creada por Inês Veloso y António Ferrer para compartir el río que conocen personalmente — combinando experiencia marítima, conocimiento local y una hospitalidad genuina.',
    cta: 'Nuestra historia',
  },
  homeReviews: {
    eyebrow: 'Historias de huéspedes',
    title: 'Lo que dicen sobre Douro Wonders',
    cta: 'Ver nuestras reseñas en Google',
    tripadvisorCta: 'o en Tripadvisor',
  },
  privateEnquiry: {
    eyebrow: 'Crucero privado',
    title: '¿Prefieres solo para ti?',
    moreLink: '¿Planeando algo especial?',
    ctaButton: 'Planear algo especial',
    body: 'El barco entero, exclusivamente para tu grupo — a tu ritmo, con toques personales, para hacer del río tuyo durante una tarde o una noche.',
    perk1: 'El barco entero, solo para tu grupo',
    perk2: 'Horario flexible, según disponibilidad',
    perk3: 'Añade extras — flores, tarta, fotógrafo y más',
    eventsNote: '¿Estás planeando una pedida de mano, un brindis de boda u otra celebración a bordo? Cuéntanoslo abajo y te ayudamos a planificarlo.',
    cruise: '¿Qué crucero?',
    cruiseDay: 'Crucero Diurno',
    cruiseSunset: 'Crucero Atardecer',
    cruiseUnsure: 'Aún no lo sé',
    date: 'Fecha preferida',
    guests: 'Número de invitados',
    guestsPlaceholder: 'p. ej. 8',
    occasion: 'Ocasión',
    occasionPlaceholder: 'Pedida de mano, cumpleaños…',
    extras: 'Extras opcionales',
    extrasPlaceholder: 'Flores, tarta, fotógrafo…',
    messagePlaceholder: '¿Algo más que debamos saber?',
    consent: 'Acepto ser contactado/a por Douro Wonders sobre mi solicitud privada. He leído la',
    send: 'Enviar solicitud',
    sentTitle: 'Solicitud enviada — ¡gracias!',
    sentBody: 'Te responderemos con opciones de crucero privado, normalmente en un día.',
  },
  contact: {
    title: '¿Preguntas, o algo especial en mente?',
    lead: 'Para ocasiones especiales o detalles personalizados, habla con nosotros antes de reservar. Te diremos qué es posible.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    phone: 'Teléfono',
    sendMessage: 'Envíanos un mensaje',
    name: 'Nombre',
    subject: 'Asunto',
    message: 'Mensaje',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@ejemplo.com',
    phoneOptional: 'Teléfono / WhatsApp (opcional)',
    phonePlaceholder: '+351 900 000 000',
    subjectPlaceholder: 'p. ej.: Cumpleaños a bordo, grupo de 8…',
    messagePlaceholder: 'Cuéntanos cómo podemos ayudarte…',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sentTitle: 'Mensaje enviado — ¡gracias!',
    sentBody: 'Te responderemos lo antes posible, normalmente en un día.',
    error: 'Algo salió mal. Inténtalo de nuevo o escríbenos un email.',
    privacy: 'Al enviar este mensaje aceptas nuestra',
    privacyLink: 'política de privacidad',
    consent: 'Acepto ser contactado/a por Douro Wonders sobre mi solicitud. He leído la',
  },
  footer: {
    tagline:
      'Cruceros por el Duero en grupos pequeños y privados, desde Oporto y Vila Nova de Gaia, con anfitriones locales que conocen el río personalmente.',
    madeBy: 'Hecho por',
    callCost: 'Coste de llamada a la red móvil nacional',
    meetingPoint: 'Punto de encuentro',
    contact: 'Contacto',
    bookings: 'Reservas e información',
    contactForm: 'Formulario de contacto',
    faq: 'Preguntas frecuentes',
    cancellation: 'Política de cancelación',
    privacy: 'Privacidad',
    terms: 'Términos',
    livro: 'Libro de reclamaciones',
  },
  blog: {
    title: 'Guías del Duero y Oporto',
    lead: 'Conocimiento local, historias del río y guías prácticas de quienes reciben en cada crucero.',
    readMore: 'Leer más',
    readingTime: 'min de lectura',
    backToBlog: 'Ver todos los artículos',
    relatedCta: '¿Listo para verlo desde el río?',
    publishedOn: 'Publicado el',
  },
  routeMap: { day: 'Crucero de día', sunset: 'Crucero al atardecer' ,
  },
  cookies: {
    text: 'Usamos cookies esenciales para el funcionamiento del sitio y del sistema de reservas Bókun. Con tu consentimiento, también podemos usar cookies de análisis.',
    learnMore: 'Saber más',
    essential: 'Solo esenciales',
    acceptAll: 'Aceptar todas',
  },
  common: { getDirections: 'Cómo llegar', bookNow: 'Reservar', upTo12: 'Hasta 12 personas', language: 'Idioma', menu: 'Menú', close: 'Cerrar' },
}

const de: Dictionary = {
  nav: {
    experiences: 'Erlebnisse',
    boat: 'Das Boot',
    included: 'Inklusive',
    route: 'Route',
    faq: 'FAQ',
    about: 'Über uns',
    blog: 'Blog',
    specialOccasions: 'Besondere Anlässe',
    dayCruise: 'Day Cruise',
    sunsetCruise: 'Sunset Cruise',
    bookNow: 'Buchen',
  },
  hero: { sharedCruise: 'Gemeinsame Fahrt', privateCruise: 'Private Fahrt', perPerson: 'pro Person', perBoat: 'pro Boot', from: 'ab', eyebrow: 'Der Douro — Nr.01' },
  trust: {
    freeCancellation: 'Kostenlose Stornierung bis 24 Std. vorher',
    welcomeDrink: 'Porto Tonic zur Begrüßung inklusive',
    dailyDepartures: 'Tägliche Abfahrten · Douro Marina, Afurada',
  },
  hero_notes: { shared: 'Kleine Gruppe mit bis zu 12 Gästen', private: 'Das ganze Boot für Ihre Gruppe' },
  boatCard: { title: 'Das ist Wondy, unser Boot', sub: 'Gepolsterte Lounge · bis zu 12 Gäste' },
  sections: {
    experiences: 'Erlebnisse',
    onboard: 'An Bord',
    route: 'Die Route',
    theBoat: 'Das Boot',
    about: 'Über uns',
    boutique: 'Boutique an Bord',
    goodToKnow: 'Gut zu wissen',
    meetingPoint: 'Treffpunkt',
    contact: 'Kontakt',
    gallery: 'Galerie',
    blog: 'Blog',
  },
  faqSections: {
    booking: 'Authentisches Erlebnis & Buchung',
    meetingPoint: 'Treffpunkt',
    gettingHere: 'Anreise',
    onboard: 'An Bord',
    guests: 'Gäste & Barrierefreiheit',
    weather: 'Wetter & Saison',
  },
  detail: {
    duration: 'Dauer',
    departures: 'Abfahrten',
    checkAvailability: 'Verfügbarkeit prüfen für die Startzeiten',
    freeCancellation: 'Kostenlose Stornierung',
    freeCancellationNote: 'Bis 24 Stunden vorher stornieren und volle Rückerstattung erhalten',
    localHosts: 'Lokale Gastgeber an Bord',
    localHostsNote: 'Begleitet von Einheimischen, die den Fluss persönlich kennen',
    languages: 'Sprachen',
    smallGroup: 'Kleine Gruppe',
    smallGroupNote: 'Bis zu 12 Gäste — oder buchen Sie das ganze Boot',
    highlights: 'Highlights',
    fullDescription: 'Ausführliche Beschreibung',
    itinerary: 'Routenverlauf',
    includes: 'Inklusive',
    meetingPoint: 'Treffpunkt',
    importantInfo: 'Wichtige Informationen',
    notSuitable: 'Nicht geeignet für',
    notAllowed: 'Nicht erlaubt',
    knowBefore: 'Vor der Fahrt',
    routeNote:
      'Nur zur Orientierung. Die Route kann je nach Fluss-, Wetter- und Sicherheitsbedingungen variieren.',
    sharedRate: 'Gemeinsame Fahrt · pro Person',
    privateRate: 'Private Fahrt · ganzes Boot',
    customDetails: 'Für besondere Anlässe oder individuelle Wünsche',
    speakWithUs: 'sprechen Sie vor der Buchung mit uns',
    openInMaps: 'In Google Maps öffnen',
    orPrivateTitle: 'Oder eine private Fahrt — nur für Ihre Gruppe',
    orPrivateCta: 'Private Fahrt ansehen',
    orSharedTitle: 'Lieber mit anderen teilen?',
    orSharedCta: 'Gemeinsame Fahrt ansehen',
    readFullDescription: 'Vollständige Beschreibung lesen',
    viewFullRoute: 'Vollständige Route & Sehenswürdigkeiten ansehen',
    reviews: 'Bewertungen',
    leaveReview: 'Bewertung auf Tripadvisor hinterlassen',
    viewAllPhotos: 'Alle ansehen',
  },
  homeSpecialOccasions: {
    eyebrow: 'Private Erlebnisse',
    title: 'Besondere Anlässe',
    occasionsLabel: 'Anlässe',
    extrasLabel: 'Optionale Extras',
    closingLine:
      'Haben Sie etwas anderes im Sinn? Erzählen Sie uns, was Sie planen, und wir sehen, was sich einrichten lässt.',
    cta: 'Planen Sie etwas Besonderes',
  },
  homeAbout: {
    eyebrow: 'Lokale Gastgeber',
    title: 'Lernen Sie die Menschen hinter Douro Wonders kennen',
    intro:
      'Douro Wonders wurde von Inês Veloso und António Ferrer gegründet, um den Fluss, den sie persönlich kennen, zu teilen — mit maritimer Erfahrung, lokalem Wissen und echter Gastfreundschaft.',
    cta: 'Unsere Geschichte',
  },
  homeReviews: {
    eyebrow: 'Gästestimmen',
    title: 'Was Gäste über Douro Wonders sagen',
    cta: 'Unsere Google-Bewertungen ansehen',
    tripadvisorCta: 'oder auf Tripadvisor',
  },
  privateEnquiry: {
    eyebrow: 'Private Fahrt',
    title: 'Lieber ganz für sich allein?',
    moreLink: 'Planen Sie etwas Besonderes?',
    ctaButton: 'Etwas Besonderes planen',
    body: 'Das ganze Boot, exklusiv für Ihre Gruppe — in Ihrem eigenen Tempo, mit persönlichen Akzenten, um den Fluss für einen Nachmittag oder Abend ganz für sich zu haben.',
    perk1: 'Das ganze Boot, nur für Ihre Gruppe',
    perk2: 'Flexible Zeiten, je nach Verfügbarkeit',
    perk3: 'Extras hinzufügen — Blumen, Torte, Fotograf und mehr',
    eventsNote: 'Planen Sie einen Heiratsantrag, einen Hochzeitstoast oder eine andere Feier an Bord? Schreiben Sie es uns unten, wir helfen bei der Planung.',
    cruise: 'Welche Fahrt?',
    cruiseDay: 'Day Cruise',
    cruiseSunset: 'Sunset Cruise',
    cruiseUnsure: 'Noch unsicher',
    date: 'Wunschtermin',
    guests: 'Anzahl der Gäste',
    guestsPlaceholder: 'z. B. 8',
    occasion: 'Anlass',
    occasionPlaceholder: 'Heiratsantrag, Geburtstag…',
    extras: 'Optionale Extras',
    extrasPlaceholder: 'Blumen, Torte, Fotograf…',
    messagePlaceholder: 'Sonst noch etwas, das wir wissen sollten?',
    consent: 'Ich stimme der Kontaktaufnahme durch Douro Wonders bezüglich meiner privaten Anfrage sowie der',
    send: 'Anfrage senden',
    sentTitle: 'Anfrage gesendet — vielen Dank!',
    sentBody: 'Wir melden uns mit Optionen für eine private Fahrt, meist innerhalb eines Tages.',
  },
  contact: {
    title: 'Fragen oder etwas Besonderes geplant?',
    lead: 'Für besondere Anlässe oder individuelle Wünsche sprechen Sie vor der Buchung mit uns. Wir sagen Ihnen, was möglich ist.',
    email: 'E-Mail',
    whatsapp: 'WhatsApp',
    phone: 'Telefon',
    sendMessage: 'Schreiben Sie uns',
    name: 'Name',
    subject: 'Betreff',
    message: 'Nachricht',
    namePlaceholder: 'Ihr Name',
    emailPlaceholder: 'sie@beispiel.com',
    phoneOptional: 'Telefon / WhatsApp (optional)',
    phonePlaceholder: '+351 900 000 000',
    subjectPlaceholder: 'z. B. Geburtstag an Bord, Gruppe von 8…',
    messagePlaceholder: 'Sagen Sie uns, wie wir helfen können…',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    sentTitle: 'Nachricht gesendet — vielen Dank!',
    sentBody: 'Wir melden uns so schnell wie möglich, meist innerhalb eines Tages.',
    error: 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder schreiben Sie uns eine E-Mail.',
    privacy: 'Mit dem Senden dieser Nachricht stimmen Sie unserer',
    privacyLink: 'Datenschutzerklärung zu',
    consent: 'Ich stimme der Kontaktaufnahme durch Douro Wonders bezüglich meiner Anfrage sowie der',
  },
  footer: {
    tagline:
      'Douro-Bootsfahrten in kleinen Gruppen und privat, ab Porto und Vila Nova de Gaia, mit lokalen Gastgebern, die den Fluss persönlich kennen.',
    madeBy: 'Umgesetzt von',
    callCost: 'Anrufkosten ins nationale Mobilfunknetz',
    meetingPoint: 'Treffpunkt',
    contact: 'Kontakt',
    bookings: 'Buchung & Infos',
    contactForm: 'Kontaktformular',
    faq: 'FAQ',
    cancellation: 'Stornierungsbedingungen',
    privacy: 'Datenschutz',
    terms: 'AGB',
    livro: 'Beschwerdebuch',
  },
  blog: {
    title: 'Douro- und Porto-Guides',
    lead: 'Lokales Wissen, Geschichten vom Fluss und praktische Guides von denen, die jede Fahrt begleiten.',
    readMore: 'Weiterlesen',
    readingTime: 'Min. Lesezeit',
    backToBlog: 'Alle Artikel ansehen',
    relatedCta: 'Bereit, es vom Fluss aus zu sehen?',
    publishedOn: 'Veröffentlicht am',
  },
  routeMap: { day: 'Tagesfahrt', sunset: 'Sonnenuntergangsfahrt' ,
  },
  cookies: {
    text: 'Wir verwenden essenzielle Cookies, damit die Website und das Bókun-Buchungssystem funktionieren. Mit Ihrer Einwilligung nutzen wir auch Analyse-Cookies.',
    learnMore: 'Mehr erfahren',
    essential: 'Nur essenzielle',
    acceptAll: 'Alle akzeptieren',
  },
  common: { getDirections: 'Route planen', bookNow: 'Buchen', upTo12: 'Bis zu 12 Gäste', language: 'Sprache', menu: 'Menü', close: 'Schließen' },
}

const dictionaries: Record<Locale, Dictionary> = { en, pt, fr, es, de }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale] ?? en
