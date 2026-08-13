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
    subjectPlaceholder: string
    send: string
    sending: string
    sentTitle: string
    sentBody: string
    error: string
    privacy: string
    privacyLink: string
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
    subjectPlaceholder: 'e.g. Birthday on board, group of 8…',
    send: 'Send Message',
    sending: 'Sending…',
    sentTitle: 'Message sent — thank you!',
    sentBody: 'We’ll get back to you as soon as possible, usually within a day.',
    error: 'Something went wrong. Please try again or email us directly.',
    privacy: 'By sending this message you agree to our',
    privacyLink: 'privacy policy',
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
    boat: 'A Wondy',
    included: 'O que inclui',
    route: 'Percurso',
    faq: 'FAQ',
    about: 'Sobre nós',
    blog: 'Blog',
    bookNow: 'Reservar',
  },
  hero: { sharedCruise: 'Cruzeiro partilhado', privateCruise: 'Cruzeiro privado', perPerson: 'por pessoa', perBoat: 'por embarcação', from: 'desde', eyebrow: 'O Douro — No.01' },
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
    sharedRate: 'Cruzeiro partilhado · por pessoa',
    privateRate: 'Cruzeiro privado · embarcação inteira',
    customDetails: 'Para ocasiões especiais ou detalhes personalizados,',
    speakWithUs: 'fale connosco antes de reservar',
    openInMaps: 'Abrir no Google Maps',
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
    subjectPlaceholder: 'ex.: Aniversário a bordo, grupo de 8…',
    send: 'Enviar mensagem',
    sending: 'A enviar…',
    sentTitle: 'Mensagem enviada — obrigado!',
    sentBody: 'Respondemos assim que possível, normalmente dentro de um dia.',
    error: 'Algo correu mal. Tente novamente ou envie-nos um email.',
    privacy: 'Ao enviar esta mensagem concorda com a nossa',
    privacyLink: 'política de privacidade',
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
    subjectPlaceholder: 'ex. : Anniversaire à bord, groupe de 8…',
    send: 'Envoyer le message',
    sending: 'Envoi…',
    sentTitle: 'Message envoyé — merci !',
    sentBody: 'Nous vous répondrons dès que possible, généralement sous un jour.',
    error: 'Une erreur est survenue. Réessayez ou envoyez-nous un email.',
    privacy: 'En envoyant ce message, vous acceptez notre',
    privacyLink: 'politique de confidentialité',
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
    subjectPlaceholder: 'p. ej.: Cumpleaños a bordo, grupo de 8…',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sentTitle: 'Mensaje enviado — ¡gracias!',
    sentBody: 'Te responderemos lo antes posible, normalmente en un día.',
    error: 'Algo salió mal. Inténtalo de nuevo o escríbenos un email.',
    privacy: 'Al enviar este mensaje aceptas nuestra',
    privacyLink: 'política de privacidad',
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
    subjectPlaceholder: 'z. B. Geburtstag an Bord, Gruppe von 8…',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    sentTitle: 'Nachricht gesendet — vielen Dank!',
    sentBody: 'Wir melden uns so schnell wie möglich, meist innerhalb eines Tages.',
    error: 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder schreiben Sie uns eine E-Mail.',
    privacy: 'Mit dem Senden dieser Nachricht stimmen Sie unserer',
    privacyLink: 'Datenschutzerklärung zu',
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
