/**
 * Seeds PT / FR / ES / DE translations of the core marketing content.
 * English stays the source of truth; anything not translated falls back to it.
 * Run with: npx tsx --env-file=.env src/seed-translations.ts (stop the dev server first)
 */
import { getPayload } from 'payload'
import config from './payload.config'

type Loc = 'pt' | 'fr' | 'es' | 'de'

// ---------------------------------------------------------------- Homepage
const homepage: Record<Loc, Record<string, unknown>> = {
  pt: {
    hero: {
      headline: 'Experiências Autênticas no Douro',
      subheadline:
        'Cruzeiros no Douro em pequenos grupos e privados, a partir do Porto e de Vila Nova de Gaia, com anfitriões locais que conhecem o rio pessoalmente.',
      primaryCta: 'Reservar',
      secondaryCta: 'Ver as experiências',
      mobileStickyCta: 'Ver disponibilidade',
    },
    campaign: {
      badgeText:
        'Oferta de abertura — preços especiais de lançamento, com sabores locais e algumas pequenas surpresas a bordo.',
      offerTitle: 'Oferta de Abertura',
      offerBody:
        'Para celebrar o lançamento, todos os cruzeiros têm preços especiais, sabores locais e algumas pequenas surpresas a bordo.',
    },
    experiencesSection: {
      title: 'Escolha a sua experiência no Douro',
      lead: 'Cruzeiros partilhados até 12 pessoas, ou o barco inteiro só para o seu grupo.',
      sharedLabel: 'Cruzeiros Partilhados',
      sharedTag: 'Por pessoa · pequenos grupos até 12 pessoas',
      privateLabel: 'Cruzeiros Privados',
      privateTag: 'Por barco · o seu grupo, o seu momento, o nosso rio',
    },
    route: {
      title: 'Da marina até às pontes',
      lead: 'Siga o percurso — da Afurada até ao coração do Porto e de volta. Toque numa paragem para explorar.',
      stops: [
        { stop: 'Douro Marina / Afurada' },
        { stop: 'Ponte da Arrábida' },
        { stop: 'Massarelos' },
        { stop: 'Alfândega' },
        { stop: 'Ribeira' },
        { stop: 'Ponte D. Luís I' },
        { stop: 'Cais de Gaia' },
        { stop: 'Vistas do Porto e de Vila Nova de Gaia' }
      ],
      note: 'O percurso pode variar consoante as condições do rio, meteorológicas e de segurança.',
    },
    boat: {
      headline: 'Conforto, teca e vistas abertas',
      specs: [
        { label: 'Pessoas', value: 'Até 12' },
        { label: 'Tripulação', value: 'Skipper + anfitrião' },
        { label: 'Assentos', value: 'Sofá acolchoado' },
        { label: 'Época', value: 'Capotas para todo o tempo' }
      ],
      body: 'Um barco robusto e confortável, pensado para o Douro, com sofás acolchoados, detalhes em teca e capotas que prolongam a época. Pequeno por opção — para que cada convidado tenha espaço, vistas e a atenção dos anfitriões.',
    },
    included: {
      title: 'O que está incluído',
      intro:
        'Cada experiência inclui uma bebida de boas-vindas, bebidas selecionadas, sabores locais e algumas pequenas surpresas a bordo.',
      items: [
        { item: 'Bebida de boas-vindas: Porto Tónico ou alternativa sem álcool' },
        { item: 'Bebidas selecionadas' },
        { item: 'Sabores locais ou pequenas iguarias portuguesas' },
        { item: 'Pequenas surpresas de lançamento a bordo' },
        { item: 'Skipper e anfitrião' },
        { item: 'Mantas' },
        { item: 'Seguro' },
        { item: 'Recomendações locais' },
        { item: 'Ambiente de grupo pequeno' },
      ],
    },
    boutique: {
      headline: 'Uma pequena boutique flutuante',
      body: 'Uma pequena boutique flutuante de coisas feitas aqui, encontradas aqui e que vale a pena levar para casa. Uma seleção cuidada de produtos portugueses, achados locais e pequenos objetos de design.',
    },
    founders: {
      headline: 'Feito por duas pessoas que conhecem este rio pessoalmente.',
      body: 'A Douro Wonders foi criada por Inês Veloso e António Ferrer para partilhar o Douro com mais cuidado, detalhe e conhecimento local. O António traz a experiência marítima, a navegação e a segurança. A Inês molda a experiência do cliente, a comunicação, a direção criativa e os pequenos detalhes que tornam o momento pensado.',
      ines: {
        role: 'Experiência do cliente e direção criativa',
        bio: 'A Inês molda a experiência do cliente, a comunicação, a direção criativa e os pequenos detalhes que tornam o momento pensado. Com um doutoramento em Belas-Artes, experiência internacional em turismo marítimo na Austrália e certificações marítimas internacionais (STCW, LROCP, Coxswain Grade 1), traz fotografia, direção de arte e um acolhimento genuíno a cada cruzeiro.',
      },
      antonio: {
        role: 'Skipper — navegação e segurança',
        bio: 'O António é responsável pela operação marítima, navegação e segurança. Skipper experiente no Douro desde 2019, conhece o rio pessoalmente — as suas pontes, as suas histórias e os seus recantos mais tranquilos — e traz esse conhecimento local profundo a cada partida.',
      },
    },
    faqSection: { title: 'Perguntas frequentes' },
  },
  fr: {
    hero: {
      headline: 'Expériences authentiques sur le Douro',
      subheadline:
        'Croisières sur le Douro en petit groupe et privées, au départ de Porto et Vila Nova de Gaia, avec des hôtes locaux qui connaissent le fleuve personnellement.',
      primaryCta: 'Réserver',
      secondaryCta: 'Découvrir les expériences',
      mobileStickyCta: 'Voir les disponibilités',
    },
    campaign: {
      badgeText:
        'Offre d’ouverture — tarifs spéciaux de lancement, avec des saveurs locales et quelques petites surprises à bord.',
      offerTitle: 'Offre d’ouverture',
      offerBody:
        'Pour célébrer le lancement, chaque croisière bénéficie de tarifs spéciaux, de saveurs locales et de quelques petites surprises à bord.',
    },
    experiencesSection: {
      title: 'Choisissez votre expérience sur le Douro',
      lead: 'Croisières partagées jusqu’à 12 personnes, ou le bateau entier pour votre groupe.',
      sharedLabel: 'Croisières partagées',
      sharedTag: 'Par personne · petits groupes jusqu’à 12 personnes',
      privateLabel: 'Croisières privées',
      privateTag: 'Par bateau · votre groupe, votre moment, notre fleuve',
    },
    route: {
      title: 'De la marina aux ponts',
      lead: 'Suivez le parcours — d’Afurada jusqu’au cœur de Porto et retour. Touchez une étape pour l’explorer.',
      stops: [
        { stop: 'Douro Marina / Afurada' },
        { stop: 'Ponte da Arrábida' },
        { stop: 'Massarelos' },
        { stop: 'Alfândega' },
        { stop: 'Ribeira' },
        { stop: 'Ponte D. Luís I' },
        { stop: 'Cais de Gaia' },
        { stop: 'Vues sur Porto et Vila Nova de Gaia' }
      ],
      note: 'L’itinéraire peut varier selon les conditions du fleuve, la météo et la sécurité.',
    },
    boat: {
      headline: 'Confort, teck et vues dégagées',
      specs: [
        { label: 'Invités', value: 'Jusqu’à 12' },
        { label: 'Équipage', value: 'Skipper + hôte' },
        { label: 'Assises', value: 'Salon rembourré' },
        { label: 'Saison', value: 'Capotes toutes saisons' }
      ],
      body: 'Un bateau robuste et confortable, adapté au Douro, avec des assises rembourrées, des détails en teck chaleureux et des capotes qui prolongent la saison. Petit par choix — pour que chaque invité ait de l’espace, de la vue et l’attention des hôtes.',
    },
    included: {
      title: 'Ce qui est inclus',
      intro:
        'Chaque expérience comprend une boisson de bienvenue, des boissons sélectionnées, des saveurs locales et quelques petites surprises à bord.',
      items: [
        { item: 'Boisson de bienvenue : Porto Tonic ou alternative sans alcool' },
        { item: 'Boissons sélectionnées' },
        { item: 'Saveurs locales ou petites bouchées portugaises' },
        { item: 'Petites surprises de lancement à bord' },
        { item: 'Skipper et hôte' },
        { item: 'Couvertures' },
        { item: 'Assurance' },
        { item: 'Recommandations locales' },
        { item: 'Ambiance de petit groupe' },
      ],
    },
    boutique: {
      headline: 'Une petite boutique flottante',
      body: 'Une petite boutique flottante de choses faites ici, trouvées ici et qui méritent d’être emportées. Une sélection de produits portugais, de trouvailles locales et de petits objets de design.',
    },
    founders: {
      headline: 'Créé par deux personnes qui connaissent ce fleuve personnellement.',
      body: 'Douro Wonders a été créé par Inês Veloso et António Ferrer pour partager le Douro avec plus de soin, de détail et de connaissance locale. António apporte l’expérience maritime, la navigation et la sécurité. Inês façonne l’expérience client, la communication, la direction créative et les petits détails qui rendent le moment réfléchi.',
      ines: {
        role: 'Expérience client et direction créative',
        bio: 'Inês façonne l’expérience client, la communication, la direction créative et les petits détails qui rendent le moment réfléchi. Titulaire d’un doctorat en Beaux-Arts, forte d’une expérience internationale dans le tourisme maritime en Australie et de certifications maritimes internationales (STCW, LROCP, Coxswain Grade 1), elle apporte la photographie, la direction artistique et un accueil sincère à chaque croisière.',
      },
      antonio: {
        role: 'Skipper — navigation et sécurité',
        bio: 'António est responsable de l’opération maritime, de la navigation et de la sécurité. Skipper expérimenté sur le Douro depuis 2019, il connaît le fleuve personnellement — ses ponts, ses histoires et ses recoins plus discrets — et apporte cette connaissance locale à chaque départ.',
      },
    },
    faqSection: { title: 'Questions fréquentes' },
  },
  es: {
    hero: {
      headline: 'Experiencias auténticas en el Duero',
      subheadline:
        'Cruceros por el Duero en grupos pequeños y privados, desde Oporto y Vila Nova de Gaia, con anfitriones locales que conocen el río personalmente.',
      primaryCta: 'Reservar',
      secondaryCta: 'Ver las experiencias',
      mobileStickyCta: 'Ver disponibilidad',
    },
    campaign: {
      badgeText:
        'Oferta de apertura — precios especiales de lanzamiento, con sabores locales y algunas pequeñas sorpresas a bordo.',
      offerTitle: 'Oferta de apertura',
      offerBody:
        'Para celebrar el lanzamiento, todos los cruceros tienen precios especiales, sabores locales y algunas pequeñas sorpresas a bordo.',
    },
    experiencesSection: {
      title: 'Elige tu experiencia en el Duero',
      lead: 'Cruceros compartidos hasta 12 personas, o el barco entero para tu grupo.',
      sharedLabel: 'Cruceros compartidos',
      sharedTag: 'Por persona · grupos pequeños de hasta 12 personas',
      privateLabel: 'Cruceros privados',
      privateTag: 'Por barco · tu grupo, tu momento, nuestro río',
    },
    route: {
      title: 'De la marina a los puentes',
      lead: 'Sigue el recorrido — desde Afurada hasta el corazón de Oporto y de vuelta. Toca una parada para explorarla.',
      stops: [
        { stop: 'Douro Marina / Afurada' },
        { stop: 'Ponte da Arrábida' },
        { stop: 'Massarelos' },
        { stop: 'Alfândega' },
        { stop: 'Ribeira' },
        { stop: 'Ponte D. Luís I' },
        { stop: 'Cais de Gaia' },
        { stop: 'Vistas de Oporto y Vila Nova de Gaia' }
      ],
      note: 'La ruta puede variar según las condiciones del río, meteorológicas y de seguridad.',
    },
    boat: {
      headline: 'Comodidad, teca y vistas abiertas',
      specs: [
        { label: 'Personas', value: 'Hasta 12' },
        { label: 'Tripulación', value: 'Patrón + anfitrión' },
        { label: 'Asientos', value: 'Salón acolchado' },
        { label: 'Temporada', value: 'Capotas para todo tiempo' }
      ],
      body: 'Un barco robusto y cómodo, pensado para el Duero, con asientos acolchados, detalles cálidos en teca y capotas que alargan la temporada. Pequeño por elección — para que cada invitado tenga espacio, vistas y la atención de los anfitriones.',
    },
    included: {
      title: 'Qué incluye',
      intro:
        'Cada experiencia incluye una bebida de bienvenida, bebidas seleccionadas, sabores locales y algunas pequeñas sorpresas a bordo.',
      items: [
        { item: 'Bebida de bienvenida: Porto Tonic o alternativa sin alcohol' },
        { item: 'Bebidas seleccionadas' },
        { item: 'Sabores locales o pequeños bocados portugueses' },
        { item: 'Pequeñas sorpresas de lanzamiento a bordo' },
        { item: 'Patrón y anfitrión' },
        { item: 'Mantas' },
        { item: 'Seguro' },
        { item: 'Recomendaciones locales' },
        { item: 'Ambiente de grupo pequeño' },
      ],
    },
    boutique: {
      headline: 'Una pequeña boutique flotante',
      body: 'Una pequeña boutique flotante de cosas hechas aquí, encontradas aquí y que merece la pena llevarse. Una selección cuidada de productos portugueses, hallazgos locales y pequeños objetos de diseño.',
    },
    founders: {
      headline: 'Creado por dos personas que conocen este río personalmente.',
      body: 'Douro Wonders fue creado por Inês Veloso y António Ferrer para compartir el Duero con más cuidado, detalle y conocimiento local. António aporta la experiencia marítima, la navegación y la seguridad. Inês da forma a la experiencia del cliente, la comunicación, la dirección creativa y los pequeños detalles que hacen que el momento se sienta pensado.',
      ines: {
        role: 'Experiencia del cliente y dirección creativa',
        bio: 'Inês da forma a la experiencia del cliente, la comunicación, la dirección creativa y los pequeños detalles que hacen que el momento se sienta pensado. Con un doctorado en Bellas Artes, experiencia internacional en turismo marítimo en Australia y certificaciones marítimas internacionales (STCW, LROCP, Coxswain Grade 1), aporta fotografía, dirección de arte y una hospitalidad genuina a cada crucero.',
      },
      antonio: {
        role: 'Patrón — navegación y seguridad',
        bio: 'António es responsable de la operación marítima, la navegación y la seguridad. Patrón experimentado en el Duero desde 2019, conoce el río personalmente — sus puentes, sus historias y sus rincones más tranquilos — y aporta ese profundo conocimiento local a cada salida.',
      },
    },
    faqSection: { title: 'Preguntas frecuentes' },
  },
  de: {
    hero: {
      headline: 'Authentische Douro-Erlebnisse',
      subheadline:
        'Douro-Bootsfahrten in kleinen Gruppen und privat, ab Porto und Vila Nova de Gaia, mit lokalen Gastgebern, die den Fluss persönlich kennen.',
      primaryCta: 'Jetzt buchen',
      secondaryCta: 'Erlebnisse entdecken',
      mobileStickyCta: 'Verfügbarkeit prüfen',
    },
    campaign: {
      badgeText:
        'Eröffnungsangebot — spezielle Einführungspreise, mit lokalen Spezialitäten und ein paar kleinen Überraschungen an Bord.',
      offerTitle: 'Eröffnungsangebot',
      offerBody:
        'Zur Eröffnung fahren alle Touren zu speziellen Einführungspreisen, mit lokalen Spezialitäten und ein paar kleinen Überraschungen an Bord.',
    },
    experiencesSection: {
      title: 'Wählen Sie Ihr Douro-Erlebnis',
      lead: 'Gemeinsame Fahrten für bis zu 12 Gäste, oder das ganze Boot privat für Ihre Gruppe.',
      sharedLabel: 'Gemeinsame Fahrten',
      sharedTag: 'Pro Person · kleine Gruppen bis 12 Gäste',
      privateLabel: 'Private Fahrten',
      privateTag: 'Pro Boot · Ihre Gruppe, Ihr Moment, unser Fluss',
    },
    route: {
      title: 'Vom Hafen zu den Brücken',
      lead: 'Folgen Sie der Route — von Afurada ins Herz von Porto und zurück. Tippen Sie auf eine Station.',
      stops: [
        { stop: 'Douro Marina / Afurada' },
        { stop: 'Ponte da Arrábida' },
        { stop: 'Massarelos' },
        { stop: 'Alfândega' },
        { stop: 'Ribeira' },
        { stop: 'Ponte D. Luís I' },
        { stop: 'Cais de Gaia' },
        { stop: 'Blick auf Porto und Vila Nova de Gaia' }
      ],
      note: 'Die Route kann je nach Fluss-, Wetter- und Sicherheitsbedingungen variieren.',
    },
    boat: {
      headline: 'Komfort, Teak und freier Blick',
      specs: [
        { label: 'Gäste', value: 'Bis zu 12' },
        { label: 'Crew', value: 'Skipper + Gastgeber' },
        { label: 'Sitze', value: 'Gepolsterte Lounge' },
        { label: 'Saison', value: 'Allwetter-Verdecks' }
      ],
      body: 'Ein robustes und komfortables Boot, gemacht für den Douro, mit gepolsterten Sitzen, warmen Teakdetails und Verdecks, die die Saison verlängern. Bewusst klein — damit jeder Gast Platz, Aussicht und die Aufmerksamkeit der Gastgeber hat.',
    },
    included: {
      title: 'Was inklusive ist',
      intro:
        'Jedes Erlebnis beinhaltet ein Begrüßungsgetränk, ausgewählte Getränke, lokale Spezialitäten und ein paar kleine Überraschungen an Bord.',
      items: [
        { item: 'Begrüßungsgetränk: Porto Tonic oder alkoholfreie Alternative' },
        { item: 'Ausgewählte Getränke' },
        { item: 'Lokale Spezialitäten oder kleine portugiesische Häppchen' },
        { item: 'Kleine Überraschungen an Bord' },
        { item: 'Skipper und Gastgeber' },
        { item: 'Decken' },
        { item: 'Versicherung' },
        { item: 'Lokale Empfehlungen' },
        { item: 'Atmosphäre einer kleinen Gruppe' },
      ],
    },
    boutique: {
      headline: 'Eine kleine schwimmende Boutique',
      body: 'Eine kleine schwimmende Boutique mit Dingen, die hier gemacht und hier gefunden wurden und die es wert sind, mitgenommen zu werden. Eine kuratierte Auswahl portugiesischer Produkte, lokaler Funde und kleiner Designobjekte.',
    },
    founders: {
      headline: 'Gemacht von zwei Menschen, die diesen Fluss persönlich kennen.',
      body: 'Douro Wonders wurde von Inês Veloso und António Ferrer gegründet, um den Douro mit mehr Sorgfalt, Detail und lokalem Wissen zu teilen. António bringt die maritime Erfahrung, Navigation und Sicherheit ein. Inês gestaltet das Gästeerlebnis, die Kommunikation, die kreative Leitung und die kleinen Details, die den Moment durchdacht machen.',
      ines: {
        role: 'Gästeerlebnis und kreative Leitung',
        bio: 'Inês gestaltet das Gästeerlebnis, die Kommunikation, die kreative Leitung und die kleinen Details, die den Moment durchdacht machen. Mit einem Doktortitel in Bildender Kunst, internationaler Erfahrung im maritimen Tourismus in Australien und internationalen Seefahrtszertifikaten (STCW, LROCP, Coxswain Grade 1) bringt sie Fotografie, Art Direction und echte Gastfreundschaft in jede Fahrt.',
      },
      antonio: {
        role: 'Skipper — Navigation und Sicherheit',
        bio: 'António ist für den maritimen Betrieb, die Navigation und die Sicherheit verantwortlich. Als erfahrener Skipper auf dem Douro seit 2019 kennt er den Fluss persönlich — seine Brücken, seine Geschichten und seine ruhigeren Ecken — und bringt dieses lokale Wissen zu jeder Abfahrt.',
      },
    },
    faqSection: { title: 'Häufige Fragen' },
  },
}

// ------------------------------------------------------------- Experiences
type ExpT = {
  title: string
  subtitle: string
  duration: string
  sharedCopy: string
  sharedCta: string
  privateSubtitle: string
  privateCopy: string
  privateCta: string
  languages: string
}

const experiences: Record<'day-cruise' | 'sunset-cruise', Record<Loc, ExpT>> = {
  'day-cruise': {
    pt: {
      title: 'Cruzeiro Diurno Partilhado',
      subtitle: 'Porto: Cruzeiro Diurno no Douro em Pequeno Grupo',
      duration: '90 minutos',
      sharedCopy:
        'Descubra o Porto a partir do Douro num cruzeiro em pequeno grupo com anfitriões locais, com vistas icónicas do rio, histórias autênticas, uma bebida de boas-vindas e sabores locais escolhidos a dedo a bordo.',
      sharedCta: 'Reservar Cruzeiro Diurno',
      privateSubtitle: 'Cruzeiro Diurno Privado no Douro',
      privateCopy:
        'As suas pessoas, o seu momento, o nosso rio. Reserve o barco em privado para uma experiência no Douro pensada para o seu grupo, com bebidas, sabores locais e os detalhes que a tornam sua.',
      privateCta: 'Reservar Cruzeiro Diurno Privado',
      languages: 'Inglês, Francês, Português, Espanhol, Alemão',
    },
    fr: {
      title: 'Croisière de jour partagée',
      subtitle: 'Porto : croisière de jour sur le Douro en petit groupe',
      duration: '90 minutes',
      sharedCopy:
        'Découvrez Porto depuis le Douro lors d’une croisière en petit groupe avec des hôtes locaux : vues emblématiques du fleuve, histoires authentiques, boisson de bienvenue et saveurs locales choisies avec soin à bord.',
      sharedCta: 'Réserver la croisière de jour',
      privateSubtitle: 'Croisière de jour privée sur le Douro',
      privateCopy:
        'Vos proches, votre moment, notre fleuve. Réservez le bateau en privé pour une expérience sur le Douro pensée pour votre groupe, avec boissons, saveurs locales et les détails qui la rendent vôtre.',
      privateCta: 'Réserver la croisière de jour privée',
      languages: 'Anglais, français, portugais, espagnol, allemand',
    },
    es: {
      title: 'Crucero de día compartido',
      subtitle: 'Oporto: crucero de día por el Duero en grupo pequeño',
      duration: '90 minutos',
      sharedCopy:
        'Descubre Oporto desde el Duero en un crucero en grupo pequeño con anfitriones locales, con vistas icónicas del río, historias auténticas, una bebida de bienvenida y sabores locales escogidos a bordo.',
      sharedCta: 'Reservar crucero de día',
      privateSubtitle: 'Crucero de día privado por el Duero',
      privateCopy:
        'Tu gente, tu momento, nuestro río. Reserva el barco en privado para una experiencia en el Duero pensada para tu grupo, con bebidas, sabores locales y los detalles que la hacen tuya.',
      privateCta: 'Reservar crucero de día privado',
      languages: 'Inglés, francés, portugués, español, alemán',
    },
    de: {
      title: 'Gemeinsame Tagesfahrt',
      subtitle: 'Porto: Douro-Tagesfahrt in kleiner Gruppe',
      duration: '90 Minuten',
      sharedCopy:
        'Entdecken Sie Porto vom Douro aus auf einer Fahrt in kleiner Gruppe mit lokalen Gastgebern — mit den bekanntesten Flussblicken, echten Geschichten, einem Begrüßungsgetränk und sorgfältig ausgewählten lokalen Spezialitäten an Bord.',
      sharedCta: 'Tagesfahrt buchen',
      privateSubtitle: 'Private Douro-Tagesfahrt',
      privateCopy:
        'Ihre Menschen, Ihr Moment, unser Fluss. Buchen Sie das Boot privat für ein Douro-Erlebnis, das auf Ihre Gruppe zugeschnitten ist — mit Getränken, lokalen Spezialitäten und den Details, die es zu Ihrem machen.',
      privateCta: 'Private Tagesfahrt buchen',
      languages: 'Englisch, Französisch, Portugiesisch, Spanisch, Deutsch',
    },
  },
  'sunset-cruise': {
    pt: {
      title: 'Cruzeiro Pôr do Sol Partilhado',
      subtitle: 'Porto: Cruzeiro ao Pôr do Sol no Douro em Pequeno Grupo',
      duration: '2 horas',
      sharedCopy:
        'Viva o Douro na sua hora mais bonita, com boa companhia, a luz do fim de tarde, bebidas selecionadas e sabores locais enquanto o Porto e Gaia mudam de cor vistos do rio.',
      sharedCta: 'Reservar Cruzeiro Pôr do Sol',
      privateSubtitle: 'Cruzeiro Pôr do Sol Privado no Douro',
      privateCopy:
        'Um cruzeiro privado ao pôr do sol no Douro para o seu grupo, com conhecimento local, bom gosto, bebidas selecionadas, sabores locais e as melhores vistas de fim de tarde do Porto e de Vila Nova de Gaia.',
      privateCta: 'Reservar Cruzeiro Pôr do Sol Privado',
      languages: 'Inglês, Francês, Português, Espanhol, Alemão',
    },
    fr: {
      title: 'Croisière coucher de soleil partagée',
      subtitle: 'Porto : croisière au coucher du soleil sur le Douro en petit groupe',
      duration: '2 heures',
      sharedCopy:
        'Vivez le Douro à sa plus belle heure, en bonne compagnie, avec la lumière du soir, des boissons sélectionnées et des saveurs locales pendant que Porto et Gaia changent de couleur depuis le fleuve.',
      sharedCta: 'Réserver la croisière coucher de soleil',
      privateSubtitle: 'Croisière coucher de soleil privée sur le Douro',
      privateCopy:
        'Une croisière privée au coucher du soleil sur le Douro pour votre groupe, avec connaissance locale, bon goût, boissons sélectionnées, saveurs locales et les plus belles vues du soir sur Porto et Vila Nova de Gaia.',
      privateCta: 'Réserver la croisière coucher de soleil privée',
      languages: 'Anglais, français, portugais, espagnol, allemand',
    },
    es: {
      title: 'Crucero al atardecer compartido',
      subtitle: 'Oporto: crucero al atardecer por el Duero en grupo pequeño',
      duration: '2 horas',
      sharedCopy:
        'Vive el Duero en su hora más bonita, con buena compañía, la luz del atardecer, bebidas seleccionadas y sabores locales mientras Oporto y Gaia cambian de color desde el río.',
      sharedCta: 'Reservar crucero al atardecer',
      privateSubtitle: 'Crucero al atardecer privado por el Duero',
      privateCopy:
        'Un crucero privado al atardecer por el Duero para tu grupo, con conocimiento local, buen gusto, bebidas seleccionadas, sabores locales y las mejores vistas del atardecer de Oporto y Vila Nova de Gaia.',
      privateCta: 'Reservar crucero al atardecer privado',
      languages: 'Inglés, francés, portugués, español, alemán',
    },
    de: {
      title: 'Gemeinsame Sonnenuntergangsfahrt',
      subtitle: 'Porto: Douro-Sonnenuntergangsfahrt in kleiner Gruppe',
      duration: '2 Stunden',
      sharedCopy:
        'Erleben Sie den Douro zu seiner schönsten Stunde — in guter Gesellschaft, im Abendlicht, mit ausgewählten Getränken und lokalen Spezialitäten, während Porto und Gaia vom Fluss aus die Farbe wechseln.',
      sharedCta: 'Sonnenuntergangsfahrt buchen',
      privateSubtitle: 'Private Douro-Sonnenuntergangsfahrt',
      privateCopy:
        'Eine private Sonnenuntergangsfahrt auf dem Douro für Ihre Gruppe — mit lokalem Wissen, gutem Geschmack, ausgewählten Getränken, lokalen Spezialitäten und den besten Abendblicken auf Porto und Vila Nova de Gaia.',
      privateCta: 'Private Sonnenuntergangsfahrt buchen',
      languages: 'Englisch, Französisch, Portugiesisch, Spanisch, Deutsch',
    },
  },
}

// --------------------------------------------------------------------- FAQ
// Indexed by the English question, in the order they were seeded.
const faqs: Record<Loc, Array<{ q: string; a: string }>> = {
  pt: [
    {
      q: 'Onde é o ponto de encontro?',
      a: 'Douro Marina | Afurada, Rua da Praia 430, Gate B, 4400-354 Vila Nova de Gaia, Porto, Portugal.',
    },
    { q: 'Com que antecedência devo chegar?', a: 'Por favor, chegue 10 minutos antes da partida.' },
    {
      q: 'O que está incluído?',
      a: 'Cada experiência inclui uma bebida de boas-vindas, bebidas selecionadas, sabores locais, skipper e anfitrião, mantas, seguro, recomendações locais e algumas pequenas surpresas a bordo.',
    },
    {
      q: 'A comida está incluída?',
      a: 'Sim. A comida é incluída sob a forma de sabores locais ou pequenas iguarias, não como uma refeição completa.',
    },
    {
      q: 'As bebidas estão incluídas?',
      a: 'Sim. Está incluída uma bebida de boas-vindas, com Porto Tónico ou uma alternativa sem álcool. As bebidas selecionadas também fazem parte da experiência a bordo.',
    },
    {
      q: 'O que acontece se as condições meteorológicas ou do rio não forem seguras?',
      a: 'Se a experiência tiver de ser cancelada por razões de segurança, meteorológicas, do rio ou operacionais, os clientes poderão remarcar ou receber reembolso.',
    },
    { q: 'As crianças podem participar?', a: 'Sim, as crianças podem participar acompanhadas por um adulto.' },
    {
      q: 'Posso reservar o barco em privado?',
      a: 'Sim. Pode reservar um Cruzeiro Diurno Privado ou um Cruzeiro Pôr do Sol Privado.',
    },
    {
      q: 'Posso pedir extras para uma ocasião especial?',
      a: 'Sim. Para ocasiões especiais ou detalhes personalizados, fale connosco antes de reservar. Dizemos-lhe o que é possível.',
    },
    {
      q: 'São permitidos animais de estimação?',
      a: 'Os animais só podem ser aceites quando for seguro, legal e operacionalmente adequado. Contacte-nos antes de reservar.',
    },
    {
      q: 'O percurso é sempre o mesmo?',
      a: 'O percurso pode variar consoante as condições do rio, meteorológicas e de segurança.',
    },
  ],
  fr: [
    {
      q: 'Où se trouve le point de rendez-vous ?',
      a: 'Douro Marina | Afurada, Rua da Praia 430, Gate B, 4400-354 Vila Nova de Gaia, Porto, Portugal.',
    },
    { q: 'À quelle heure dois-je arriver ?', a: 'Merci d’arriver 10 minutes avant le départ.' },
    {
      q: 'Qu’est-ce qui est inclus ?',
      a: 'Chaque expérience comprend une boisson de bienvenue, des boissons sélectionnées, des saveurs locales, un skipper et un hôte, des couvertures, l’assurance, des recommandations locales et quelques petites surprises à bord.',
    },
    {
      q: 'La nourriture est-elle incluse ?',
      a: 'Oui. La nourriture est incluse sous forme de saveurs locales ou de petites bouchées, et non comme un repas complet.',
    },
    {
      q: 'Les boissons sont-elles incluses ?',
      a: 'Oui. Une boisson de bienvenue est incluse, avec Porto Tonic ou une alternative sans alcool. Des boissons sélectionnées font également partie de l’expérience à bord.',
    },
    {
      q: 'Que se passe-t-il si la météo ou les conditions du fleuve ne sont pas sûres ?',
      a: 'Si l’expérience doit être annulée pour des raisons de sécurité, de météo, de fleuve ou d’exploitation, les clients pourront choisir un report ou un remboursement.',
    },
    { q: 'Les enfants peuvent-ils participer ?', a: 'Oui, les enfants peuvent participer accompagnés d’un adulte.' },
    {
      q: 'Puis-je réserver le bateau en privé ?',
      a: 'Oui. Vous pouvez réserver une croisière de jour privée ou une croisière au coucher du soleil privée.',
    },
    {
      q: 'Puis-je demander des extras pour une occasion spéciale ?',
      a: 'Oui. Pour les occasions spéciales ou les demandes particulières, parlez-nous avant de réserver. Nous vous dirons ce qui est possible.',
    },
    {
      q: 'Les animaux sont-ils autorisés ?',
      a: 'Les animaux ne peuvent être acceptés que lorsque cela est sûr, légal et opérationnellement approprié. Merci de nous contacter avant de réserver.',
    },
    {
      q: 'L’itinéraire est-il toujours le même ?',
      a: 'L’itinéraire peut varier selon les conditions du fleuve, la météo et la sécurité.',
    },
  ],
  es: [
    {
      q: '¿Dónde es el punto de encuentro?',
      a: 'Douro Marina | Afurada, Rua da Praia 430, Gate B, 4400-354 Vila Nova de Gaia, Oporto, Portugal.',
    },
    { q: '¿Con cuánta antelación debo llegar?', a: 'Por favor, llega 10 minutos antes de la salida.' },
    {
      q: '¿Qué incluye?',
      a: 'Cada experiencia incluye una bebida de bienvenida, bebidas seleccionadas, sabores locales, patrón y anfitrión, mantas, seguro, recomendaciones locales y algunas pequeñas sorpresas a bordo.',
    },
    {
      q: '¿La comida está incluida?',
      a: 'Sí. La comida se incluye como sabores locales o pequeños bocados, no como una comida completa.',
    },
    {
      q: '¿Las bebidas están incluidas?',
      a: 'Sí. Se incluye una bebida de bienvenida, con Porto Tonic o una alternativa sin alcohol. Las bebidas seleccionadas también forman parte de la experiencia a bordo.',
    },
    {
      q: '¿Qué pasa si el tiempo o las condiciones del río no son seguras?',
      a: 'Si la experiencia debe cancelarse por motivos de seguridad, meteorológicos, del río u operativos, los clientes podrán reprogramar o recibir un reembolso.',
    },
    { q: '¿Pueden participar niños?', a: 'Sí, los niños pueden participar acompañados de un adulto.' },
    {
      q: '¿Puedo reservar el barco en privado?',
      a: 'Sí. Puedes reservar un crucero de día privado o un crucero al atardecer privado.',
    },
    {
      q: '¿Puedo pedir extras para una ocasión especial?',
      a: 'Sí. Para ocasiones especiales o detalles personalizados, habla con nosotros antes de reservar. Te diremos qué es posible.',
    },
    {
      q: '¿Se permiten mascotas?',
      a: 'Las mascotas solo pueden aceptarse cuando sea seguro, legal y operativamente apropiado. Contáctanos antes de reservar.',
    },
    {
      q: '¿La ruta es siempre la misma?',
      a: 'La ruta puede variar según las condiciones del río, meteorológicas y de seguridad.',
    },
  ],
  de: [
    {
      q: 'Wo ist der Treffpunkt?',
      a: 'Douro Marina | Afurada, Rua da Praia 430, Gate B, 4400-354 Vila Nova de Gaia, Porto, Portugal.',
    },
    { q: 'Wie früh sollte ich da sein?', a: 'Bitte kommen Sie 10 Minuten vor der Abfahrt.' },
    {
      q: 'Was ist inklusive?',
      a: 'Jedes Erlebnis beinhaltet ein Begrüßungsgetränk, ausgewählte Getränke, lokale Spezialitäten, Skipper und Gastgeber, Decken, Versicherung, lokale Empfehlungen und ein paar kleine Überraschungen an Bord.',
    },
    {
      q: 'Ist Essen inbegriffen?',
      a: 'Ja. Essen ist als kleine lokale Spezialitäten oder Häppchen enthalten, nicht als vollständige Mahlzeit.',
    },
    {
      q: 'Sind Getränke inbegriffen?',
      a: 'Ja. Ein Begrüßungsgetränk ist enthalten, mit Porto Tonic oder einer alkoholfreien Alternative. Ausgewählte Getränke gehören ebenfalls zum Erlebnis an Bord.',
    },
    {
      q: 'Was passiert, wenn Wetter oder Flussbedingungen nicht sicher sind?',
      a: 'Muss das Erlebnis aus Sicherheits-, Wetter-, Fluss- oder Betriebsgründen abgesagt werden, können Gäste zwischen einer Umbuchung und einer Rückerstattung wählen.',
    },
    { q: 'Können Kinder mitfahren?', a: 'Ja, Kinder können in Begleitung eines Erwachsenen mitfahren.' },
    {
      q: 'Kann ich das Boot privat buchen?',
      a: 'Ja. Sie können eine private Tagesfahrt oder eine private Sonnenuntergangsfahrt buchen.',
    },
    {
      q: 'Kann ich Extras für einen besonderen Anlass anfragen?',
      a: 'Ja. Für besondere Anlässe oder individuelle Wünsche sprechen Sie vor der Buchung mit uns. Wir sagen Ihnen, was möglich ist.',
    },
    {
      q: 'Sind Haustiere erlaubt?',
      a: 'Haustiere können nur akzeptiert werden, wenn es sicher, rechtlich zulässig und betrieblich möglich ist. Bitte kontaktieren Sie uns vor der Buchung.',
    },
    {
      q: 'Ist die Route immer gleich?',
      a: 'Die Route kann je nach Fluss-, Wetter- und Sicherheitsbedingungen variieren.',
    },
  ],
}

// --------------------------------------------------------------- Site SEO
const seo: Record<Loc, { title: string; description: string; arrivalNote: string }> = {
  pt: {
    title: 'Douro Wonders | Experiências Autênticas no Douro',
    description:
      'Cruzeiros premium no Douro em pequenos grupos e privados, a partir do Porto e de Vila Nova de Gaia, com conhecimento local, bom gosto, bebidas selecionadas e sabores portugueses.',
    arrivalNote: 'Por favor, chegue 10 minutos antes da partida.',
  },
  fr: {
    title: 'Douro Wonders | Expériences authentiques sur le Douro',
    description:
      'Croisières premium sur le Douro en petit groupe et privées, au départ de Porto et Vila Nova de Gaia, avec connaissance locale, bon goût, boissons sélectionnées et saveurs portugaises.',
    arrivalNote: 'Merci d’arriver 10 minutes avant le départ.',
  },
  es: {
    title: 'Douro Wonders | Experiencias auténticas en el Duero',
    description:
      'Cruceros premium por el Duero en grupos pequeños y privados, desde Oporto y Vila Nova de Gaia, con conocimiento local, buen gusto, bebidas seleccionadas y sabores portugueses.',
    arrivalNote: 'Por favor, llega 10 minutos antes de la salida.',
  },
  de: {
    title: 'Douro Wonders | Authentische Douro-Erlebnisse',
    description:
      'Premium-Douro-Fahrten in kleinen Gruppen und privat, ab Porto und Vila Nova de Gaia — mit lokalem Wissen, gutem Geschmack, ausgewählten Getränken und portugiesischen Spezialitäten.',
    arrivalNote: 'Bitte kommen Sie 10 Minuten vor der Abfahrt.',
  },
}

async function run() {
  const payload = await getPayload({ config })
  const langs: Loc[] = ['pt', 'fr', 'es', 'de']

  // English FAQs, in seeded order, so translations line up by index
  const enFaqs = await payload.find({ collection: 'faqs', sort: 'order', limit: 50, locale: 'en' })

  for (const locale of langs) {
    await payload.updateGlobal({ slug: 'homepage', locale, data: homepage[locale] })
    await payload.updateGlobal({
      slug: 'site-settings',
      locale,
      data: {
        seo: { title: seo[locale].title, description: seo[locale].description },
        meetingPoint: { arrivalNote: seo[locale].arrivalNote },
      },
    })

    for (const [slug, byLocale] of Object.entries(experiences)) {
      const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1 })
      const doc = res.docs[0]
      if (!doc) continue
      const tr = byLocale[locale]
      await payload.update({
        collection: 'experiences',
        id: doc.id,
        locale,
        data: {
          title: tr.title,
          subtitle: tr.subtitle,
          duration: tr.duration,
          shared: { shortCopy: tr.sharedCopy, ctaLabel: tr.sharedCta },
          private: { subtitle: tr.privateSubtitle, shortCopy: tr.privateCopy, ctaLabel: tr.privateCta },
          details: { languages: tr.languages },
        },
      })
    }

    const list = faqs[locale]
    for (let i = 0; i < enFaqs.docs.length && i < list.length; i++) {
      await payload.update({
        collection: 'faqs',
        id: enFaqs.docs[i].id,
        locale,
        data: { question: list[i].q, answer: list[i].a },
      })
    }

    payload.logger.info(`Translated: ${locale}`)
  }

  // English also gets German added to the spoken languages
  for (const slug of Object.keys(experiences)) {
    const res = await payload.find({ collection: 'experiences', where: { slug: { equals: slug } }, limit: 1 })
    if (res.docs[0]) {
      await payload.update({
        collection: 'experiences',
        id: res.docs[0].id,
        locale: 'en',
        data: { details: { languages: 'English, French, Portuguese, Spanish, German' } },
      })
    }
  }

  payload.logger.info('Translations seed complete')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
