import { getExperienceYearsFrom, getExperienceYearsPlusFrom } from "../experience-core"

export const EXPERIENCE_START = {
  year: 2018,
  month: 9,
} as const

const experienceYears = getExperienceYearsFrom(EXPERIENCE_START)
const experienceYearsPlus = getExperienceYearsPlusFrom(EXPERIENCE_START)

const enExperienceLabel = `${experienceYearsPlus} Years of Experience`
const nlExperienceLabel = `${experienceYearsPlus} Jaar Ervaring`
const daExperienceLabel = `${experienceYearsPlus} Ars Erfaring`

const enExperienceOverPhrase = `over ${experienceYears} years of experience`
const nlExperienceOverPhrase = `meer dan ${experienceYears} jaar ervaring`
const daExperienceOverPhrase = `mere end ${experienceYears} ars erfaring`

export const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Expertise",
      resume: "Resume",
      skills: "Skills",
      contact: "Contact",
    },
    sidebar: {
      name: "Name",
      role: "Role",
      email: "Email",
      phone: "Phone",
      searchLabel: "Search",
      searchPlaceholder: "Search...",
      searchHint: "Type e.g. service now",
      searchAriaLabel: "Search resume",
      clearSearchAriaLabel: "Clear search",
      noSuggestions: "No suggestions found.",
    },
    hero: {
      greeting: "Hello. My name is",
      role: "PMO Consultant",
      yearsOfExperience: enExperienceLabel,
      tagline: `PMO | Project Coordinator | ${enExperienceLabel}`,
      summary:
        `A results-driven PMO Consultant with ${enExperienceOverPhrase} supporting complex, global projects in fast-paced environments. Skilled in risk management, governance, milestone tracking, and stakeholder coordination.`,
      downloadCV: "Download CV",
      linkedIn: "LinkedIn",
      email: "Email",
    },
    services: {
      title: "Areas of Expertise",
      intro:
        "A results-driven PMO profile focused on structured project support, clear stakeholder communication, and dependable delivery coordination.",
      body1:
        "The CV centers on hands-on PMO support, strong reporting discipline, cross-functional coordination, risk visibility, and governance follow-through across international project environments.",
      body2: "Core tools include Microsoft Office, Confluence, SharePoint, MS Project, Jira, Oracle P2P, and ServiceNow.",
      ctaDownload: "Download CV",
      ctaExperience: "View Experience",
      cards: [
        {
          title: "Project & Portfolio Management",
          description: "Supporting end-to-end coordination, milestone tracking, and delivery follow-through across complex project portfolios.",
        },
        {
          title: "Risk & Issue Management",
          description: "Identifying risks early, managing dependencies, and helping teams remove blockers before they affect delivery.",
        },
        {
          title: "Stakeholder Communication",
          description: "Creating clear updates, facilitating cross-functional communication, and keeping sponsors and teams aligned.",
        },
        {
          title: "Financial Operations & Budget Control",
          description: "Bringing structure to project administration, reporting, and budget-related coordination work.",
        },
        {
          title: "Resource Planning & Allocation",
          description: "Aligning project demand with available capacity to improve efficiency and delivery predictability.",
        },
        {
          title: "Governance & Compliance",
          description: "Standardizing documentation and governance practices to support consistent, compliant project execution.",
        },
      ],
    },
    experience: {
      title: "Experience",
      coverLetter: "Summary",
      summaryParagraphs: [
        `Results-driven Project Management Officer with ${enExperienceOverPhrase} supporting complex, global projects in fast-paced environments.`,
        "Skilled in risk management, governance, milestone tracking, and stakeholder coordination, with a strong record of keeping teams aligned and stakeholders informed.",
        "Known for enabling project success through structured support, clear communication, proactive problem solving, and well-maintained project documentation.",
      ],
      items: [
        {
          year: "2019",
          period: "2019 - Present",
          title: "Project Management Officer",
          company: "Atradius",
          highlights: [
            "Facilitated cross-functional collaboration with project managers, ensuring on-time and on-budget project delivery.",
            "Optimized resource planning to align project needs with available capacity, enhancing efficiency.",
            "Mitigated risks and managed dependencies, driving project progress and ensuring seamless execution.",
            "Standardized governance frameworks ensuring compliance with project management processes.",
            "Created and shared clear reports to keep stakeholders informed on project updates.",
            "Organized and maintained project documentation to ensure consistency and accessibility.",
          ],
        },
        {
          year: "2018",
          period: "2018 - 2019",
          title: "Project Coordinator",
          company: "Tata Steel",
          highlights: [
            "Designed and coordinated training programs for team members, improving skills and overall performance.",
            "Managed project tasks and dependencies across multiple initiatives, ensuring smooth execution and on-time delivery.",
            "Facilitated cross-department communication, acting as the key liaison for Sales, Marketing, and Supply Chain teams.",
            "Identified and mitigated risks, reduced project delays, and kept stakeholders informed.",
          ],
        },
        {
          year: "2017",
          period: "2017 - 2018",
          title: "Team Leader",
          company: "Hotel Specials",
          highlights: [
            "Implemented quality improvement initiatives, reducing error rates and increasing customer satisfaction scores.",
            "Coached and mentored a team of 10+ advisors, improving performance and team efficiency.",
            "Collaborated with hotel management and internal departments to streamline communication and resolve escalated issues effectively.",
          ],
        },
        {
          year: "2015",
          period: "2015 - 2018",
          title: "Flight Attendant",
          company: "Menzies Schiphol Airport",
          highlights: [
            "Assisted passengers with check-in, boarding, and luggage handling while ensuring compliance with airline procedures.",
          ],
        },
        {
          year: "2012",
          period: "2012 - 2015",
          title: "Commercial Customer Advisor",
          company: "Hotel Specials",
          highlights: [
            "Managed reservations and administrative tasks, ensuring customer satisfaction and achieving a positive feedback rate.",
            "Resolved customer complaints and served as the central communication point for queries.",
          ],
        },
        {
          year: "2010",
          period: "2010 - 2012",
          title: "Management Assistant",
          company: "Tata Steel",
          highlights: [
            "Provided general departmental support by managing agendas, coordinating meetings, handling incoming calls, and welcoming visitors.",
          ],
        },
        {
          year: "2009",
          period: "2009 - 2010",
          title: "Call Center Agent",
          company: "2Contact",
          highlights: [
            "Conducted outbound sales calls to generate revenue through product sales.",
          ],
        },
      ],
    },
    skills: {
      title: "Skills",
      technologies: "Technologies",
      personalSkills: "Personal Skills",
      languages: "Languages",
      certifications: "Certifications",
      education: "Education",
      internships: "Internships",
      circular: [
        { name: "Project Management", percentage: 90 },
        { name: "Risk Management", percentage: 85 },
        { name: "Stakeholder Communication", percentage: 88 },
        { name: "Governance", percentage: 82 },
      ],
      bars: [
        { name: "MS Project & Jira", percentage: 85 },
        { name: "Microsoft Office", percentage: 95 },
        { name: "Confluence & SharePoint", percentage: 80 },
        { name: "Oracle P2P & ServiceNow", percentage: 75 },
      ],
      technologyGroups: [
        { category: "Microsoft Office", tools: ["Excel", "Outlook", "Word", "Power Point", "Visio"] },
        { category: "Collaboration", tools: ["Confluence", "SharePoint"] },
        { category: "Project Management", tools: ["MS Project", "Jira"] },
        { category: "Enterprise", tools: ["Oracle P2P", "ServiceNow"] },
      ],
      personalSkillsList: [
        "Clear Communication Skills",
        "Organisational Skills",
        "Adaptable in International Environments",
        "Proactive Problem Solving",
        "Attention to Detail",
        "Collaboration & Teamwork",
      ],
      languagesList: ["Dutch", "English"],
      certificationsList: [
        {
          name: "IPMA (PMO)",
          issuer: "International Project Management Association",
        },
      ],
      educationItem: {
        degree: "Bachelor of Tourism Management",
        school: "InHolland in Amsterdam, Netherlands",
        year: "2018",
      },
      internshipsList: [
        "Customer Service Representative, Admin/Marketing Barrio-Life | 2015",
        "Management Assistant, TicketSpy | 2010",
        "Personal Assistant, Acupunctuur Kliniek | 2009",
      ],
    },
    contact: {
      title: "Get in touch",
      description:
        "Open to discussing PMO, project coordination, and stakeholder support opportunities across international teams and fast-paced delivery environments.",
      address: "Address",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message...",
        send: "Send",
        sending: "Sending...",
        success: "Thank you for your message. Miriam will get back to you as soon as possible.",
        mailClient: "Your email app is opening with your message prefilled.",
        error: "Your message could not be sent right now. Please try again in a moment.",
        recaptchaNotice: {
          prefix: "This site is protected by reCAPTCHA and the Google",
          privacy: "Privacy Policy",
          and: "and",
          terms: "Terms of Service",
          suffix: "apply.",
        },
        errors: {
          nameRequired: "Please enter your name.",
          nameTooLong: "Name is too long.",
          emailInvalid: "Please enter a valid email address.",
          emailTooLong: "Email is too long.",
          subjectRequired: "Please enter a subject.",
          subjectTooLong: "Subject is too long.",
          messageRequired: "Please enter your message.",
          messageTooLong: "Message is too long.",
          recaptchaFailed: "Security verification failed. Please try again.",
          recaptchaLoadFailed: "Security verification could not be loaded. Please refresh and try again.",
          recaptchaNotConfigured: "Security verification is not configured. Please try again later.",
          emailServiceNotConfigured: "Email service is not configured. Please try again later.",
          smtpAuthDisabled: "Email sign-in is disabled for this mailbox. Please contact support or use direct email.",
          smtpInvalidCredentials: "SMTP credentials are invalid. For Gmail, use an App Password instead of your regular password.",
          sendFailed: "Unable to send your message right now. Please try again later.",
          formInvalid: "Please complete all contact form fields correctly.",
        },
      },
    },
    footer: {
      rights: "All rights reserved.",
      tagline: `PMO Consultant | Project Coordinator | ${enExperienceLabel}`,
    },
  },
  nl: {
    nav: {
      home: "Home",
      services: "Expertise",
      resume: "CV",
      skills: "Vaardigheden",
      contact: "Contact",
    },
    sidebar: {
      name: "Naam",
      role: "Functie",
      email: "E-mail",
      phone: "Telefoon",
      searchLabel: "Zoeken",
      searchPlaceholder: "Zoeken...",
      searchHint: "Typ bijv. service now",
      searchAriaLabel: "Zoek in cv",
      clearSearchAriaLabel: "Zoekveld leegmaken",
      noSuggestions: "Geen suggesties gevonden.",
    },
    hero: {
      greeting: "Hallo, ik ben",
      role: "PMO Consultant",
      yearsOfExperience: nlExperienceLabel,
      tagline: `PMO | Project Coordinator | ${nlExperienceLabel}`,
      summary:
        `Ik ben een resultaatgerichte PMO Consultant met ${nlExperienceOverPhrase} in complexe, internationale projecten. Ik werk sterk in risicobeheer, governance, mijlpaalbewaking en stakeholdercommunicatie.`,
      downloadCV: "Download CV",
      linkedIn: "LinkedIn",
      email: "E-mail",
    },
    services: {
      title: "Expertisegebieden",
      intro:
        "Een sterk PMO-profiel met focus op structuur, duidelijke communicatie en betrouwbare ondersteuning van projecten.",
      body1:
        "Mijn ervaring draait om praktische PMO-ondersteuning, heldere rapportages, goede afstemming tussen teams, risicoinzicht en consistente governance in internationale projectomgevingen.",
      body2: "Ik werk onder andere met Microsoft Office, Confluence, SharePoint, MS Project, Jira, Oracle P2P en ServiceNow.",
      ctaDownload: "Download CV",
      ctaExperience: "Bekijk Ervaring",
      cards: [
        {
          title: "Project- en Portfoliomanagement",
          description: "Ondersteuning van de volledige coordinatie, mijlpaalbewaking en opvolging binnen complexe projectportfolio's.",
        },
        {
          title: "Risico- en Issuemanagement",
          description: "Risico's op tijd signaleren, afhankelijkheden bewaken en teams helpen om blokkades snel weg te nemen.",
        },
        {
          title: "Stakeholdercommunicatie",
          description: "Heldere updates geven, samenwerking tussen teams makkelijker maken en iedereen goed aangesloten houden.",
        },
        {
          title: "Financiele Operaties en Budgetbewaking",
          description: "Structuur brengen in projectadministratie, rapportages en budgetgerelateerde coordinatie.",
        },
        {
          title: "Resourceplanning en Allocatie",
          description: "Projectbehoefte goed afstemmen op beschikbare capaciteit om efficientie en voorspelbaarheid te verbeteren.",
        },
        {
          title: "Governance en Compliance",
          description: "Documentatie en governance helder en consistent houden voor een soepele en correcte projectuitvoering.",
        },
      ],
    },
    experience: {
      title: "Ervaring",
      coverLetter: "Samenvatting",
      summaryParagraphs: [
        `Resultaatgerichte Project Management Officer met ${nlExperienceOverPhrase} in complexe, internationale projecten.`,
        "Sterk in risicobeheer, governance, mijlpaalbewaking en stakeholdercommunicatie, met veel focus op duidelijke samenwerking tussen teams en stakeholders.",
        "Bekend om gestructureerde ondersteuning, heldere communicatie, proactief handelen en goed georganiseerde projectdocumentatie.",
      ],
      items: [
        {
          year: "2019",
          period: "2019 - Heden",
          title: "Project Management Officer",
          company: "Atradius",
          highlights: [
            "Ondersteunde de samenwerking tussen projectmanagers en teams, met focus op levering op tijd en binnen budget.",
            "Verbeterde de resourceplanning door projectbehoeften beter af te stemmen op beschikbare capaciteit.",
            "Hield risico's en afhankelijkheden goed in beeld om de voortgang soepel te laten lopen.",
            "Bracht meer structuur in governance om projectprocessen beter te laten aansluiten.",
            "Maakte duidelijke rapportages zodat stakeholders steeds goed op de hoogte bleven.",
            "Hield projectdocumentatie overzichtelijk, consistent en makkelijk terug te vinden.",
          ],
        },
        {
          year: "2018",
          period: "2018 - 2019",
          title: "Project Coordinator",
          company: "Tata Steel",
          highlights: [
            "Ontwierp en coordineerde trainingsprogramma's om teamleden sterker te maken in hun werk.",
            "Bewaakte projecttaken en afhankelijkheden over meerdere initiatieven tegelijk.",
            "Was de verbindende schakel tussen Sales, Marketing en Supply Chain.",
            "Signaleerde risico's op tijd, hielp vertragingen beperken en hield stakeholders goed geinformeerd.",
          ],
        },
        {
          year: "2017",
          period: "2017 - 2018",
          title: "Team Leader",
          company: "Hotel Specials",
          highlights: [
            "Voerde verbeteringen door die fouten verminderden en de klanttevredenheid verhoogden.",
            "Coachte en begeleidde een team van meer dan 10 adviseurs.",
            "Werkte samen met hotelmanagement en interne teams om communicatie soepel te laten verlopen en escalaties op te lossen.",
          ],
        },
        {
          year: "2015",
          period: "2015 - 2018",
          title: "Flight Attendant",
          company: "Menzies Schiphol Airport",
          highlights: [
            "Ondersteunde passagiers bij check-in, boarding en bagageafhandeling volgens luchtvaartprocedures.",
          ],
        },
        {
          year: "2012",
          period: "2012 - 2015",
          title: "Commercial Customer Advisor",
          company: "Hotel Specials",
          highlights: [
            "Beheerde reserveringen en administratieve taken met focus op klanttevredenheid en positieve feedback.",
            "Loste klachten op en was centraal aanspreekpunt voor vragen.",
          ],
        },
        {
          year: "2010",
          period: "2010 - 2012",
          title: "Management Assistant",
          company: "Tata Steel",
          highlights: [
            "Bood algemene afdelingsondersteuning door agenda's, vergaderingen, telefoongesprekken en ontvangst van bezoekers te coordineren.",
          ],
        },
        {
          year: "2009",
          period: "2009 - 2010",
          title: "Call Center Agent",
          company: "2Contact",
          highlights: [
            "Voerde outbound verkoopgesprekken om omzet te genereren via productverkoop.",
          ],
        },
      ],
    },
    skills: {
      title: "Vaardigheden",
      technologies: "Technologieen",
      personalSkills: "Persoonlijke Vaardigheden",
      languages: "Talen",
      certifications: "Certificeringen",
      education: "Opleiding",
      internships: "Stages",
      circular: [
        { name: "Projectmanagement", percentage: 90 },
        { name: "Risicobeheer", percentage: 85 },
        { name: "Stakeholdercommunicatie", percentage: 88 },
        { name: "Governance", percentage: 82 },
      ],
      bars: [
        { name: "MS Project & Jira", percentage: 85 },
        { name: "Microsoft Office", percentage: 95 },
        { name: "Confluence & SharePoint", percentage: 80 },
        { name: "Oracle P2P & ServiceNow", percentage: 75 },
      ],
      technologyGroups: [
        { category: "Microsoft Office", tools: ["Excel", "Outlook", "Word", "Power Point", "Visio"] },
        { category: "Samenwerking", tools: ["Confluence", "SharePoint"] },
        { category: "Projectmanagement", tools: ["MS Project", "Jira"] },
        { category: "Enterprise", tools: ["Oracle P2P", "ServiceNow"] },
      ],
      personalSkillsList: [
        "Duidelijke Communicatie",
        "Organisatorische Vaardigheden",
        "Snel Schakelen in Internationale Omgevingen",
        "Proactief Problemen Oplossen",
        "Oog voor Detail",
        "Samenwerking & Teamwork",
      ],
      languagesList: ["Nederlands", "Engels"],
      certificationsList: [
        {
          name: "IPMA (PMO)",
          issuer: "International Project Management Association",
        },
      ],
      educationItem: {
        degree: "Bachelor of Tourism Management",
        school: "InHolland in Amsterdam, Nederland",
        year: "2018",
      },
      internshipsList: [
        "Customer Service Representative, Admin/Marketing Barrio-Life | 2015",
        "Management Assistant, TicketSpy | 2010",
        "Personal Assistant, Acupunctuur Kliniek | 2009",
      ],
    },
    contact: {
      title: "Neem contact op",
      description:
        "Open voor gesprekken over PMO, projectcoordinatie en stakeholder support binnen internationale teams en dynamische omgevingen.",
      address: "Adres",
      email: "E-mail",
      phone: "Telefoon",
      linkedin: "LinkedIn",
      form: {
        name: "Naam",
        email: "E-mail",
        subject: "Onderwerp",
        message: "Bericht...",
        send: "Verzenden",
        sending: "Verzenden...",
        success: "Bedankt voor je bericht. Miriam neemt zo snel mogelijk contact met je op.",
        mailClient: "Je mailapp wordt geopend met je bericht alvast ingevuld.",
        error: "Je bericht kon nu niet worden verzonden. Probeer het straks nog een keer.",
        recaptchaNotice: {
          prefix: "Deze site wordt beschermd door reCAPTCHA en het Google",
          privacy: "Privacybeleid",
          and: "en",
          terms: "Servicevoorwaarden",
          suffix: "zijn van toepassing.",
        },
        errors: {
          nameRequired: "Vul je naam in.",
          nameTooLong: "Je naam is te lang.",
          emailInvalid: "Vul een geldig e-mailadres in.",
          emailTooLong: "Je e-mailadres is te lang.",
          subjectRequired: "Vul een onderwerp in.",
          subjectTooLong: "Je onderwerp is te lang.",
          messageRequired: "Vul je bericht in.",
          messageTooLong: "Je bericht is te lang.",
          recaptchaFailed: "Beveiligingscontrole mislukt. Probeer opnieuw.",
          recaptchaLoadFailed: "Beveiligingscontrole kon niet worden geladen. Ververs de pagina en probeer opnieuw.",
          recaptchaNotConfigured: "Beveiligingscontrole is niet geconfigureerd. Probeer het later opnieuw.",
          emailServiceNotConfigured: "E-mailservice is niet geconfigureerd. Probeer het later opnieuw.",
          smtpAuthDisabled: "Inloggen voor deze mailbox is uitgeschakeld. Neem contact op of gebruik direct e-mail.",
          smtpInvalidCredentials: "SMTP-inloggegevens zijn ongeldig. Gebruik voor Gmail een app-wachtwoord in plaats van je normale wachtwoord.",
          sendFailed: "Je bericht kan nu niet worden verzonden. Probeer het later opnieuw.",
          formInvalid: "Vul alle contactvelden correct in.",
        },
      },
    },
    footer: {
      rights: "Alle rechten voorbehouden.",
      tagline: `PMO Consultant | Projectcoordinator | ${nlExperienceLabel}`,
    },
  },
  da: {
    nav: {
      home: "Hjem",
      services: "Ekspertise",
      resume: "CV",
      skills: "Faerdigheder",
      contact: "Kontakt",
    },
    sidebar: {
      name: "Navn",
      role: "Rolle",
      email: "E-mail",
      phone: "Telefon",
      searchLabel: "Sog",
      searchPlaceholder: "Sog...",
      searchHint: "Skriv fx service now",
      searchAriaLabel: "Sog i CV",
      clearSearchAriaLabel: "Ryd sogning",
      noSuggestions: "Ingen forslag fundet.",
    },
    hero: {
      greeting: "Hej, jeg hedder",
      role: "PMO-konsulent",
      yearsOfExperience: daExperienceLabel,
      tagline: `PMO | Projektkoordinator | ${daExperienceLabel}`,
      summary:
        `Jeg er en resultatorienteret PMO-konsulent med ${daExperienceOverPhrase} fra komplekse, internationale projekter. Jeg arbejder staerkt med risikostyring, governance, milepaelsopfolgning og interessentkommunikation.`,
      downloadCV: "Download CV",
      linkedIn: "LinkedIn",
      email: "E-mail",
    },
    services: {
      title: "Kompetenceomrader",
      intro:
        "En staerk PMO-profil med fokus pa struktur, klar kommunikation og stabil projektstotte.",
      body1:
        "Min erfaring handler om praktisk PMO-stotte, tydelig rapportering, godt samarbejde pa tvaers af teams, risikotransparens og stabil governance i internationale projektmiljoer.",
      body2: "Jeg arbejder blandt andet med Microsoft Office, Confluence, SharePoint, MS Project, Jira, Oracle P2P og ServiceNow.",
      ctaDownload: "Download CV",
      ctaExperience: "Se Erfaring",
      cards: [
        {
          title: "Projekt- og Portefoljestyring",
          description: "Stotte til koordinering, milepaelsopfolgning og opfoelgning pa leverancer i komplekse projektportefoljer.",
        },
        {
          title: "Risiko- og Issuehaandtering",
          description: "Finder risici i tide, holder styr pa afhængigheder og hjaelper teams med at fjerne blokeringer hurtigt.",
        },
        {
          title: "Interessentkommunikation",
          description: "Laver klare opdateringer, styrker samarbejdet pa tvaers af teams og holder alle godt orienteret.",
        },
        {
          title: "Finansielle Operationer og Budgetkontrol",
          description: "Skaber struktur i projektadministration, rapportering og budgetrelateret koordinering.",
        },
        {
          title: "Ressourceplanlaegning og Allokering",
          description: "Afstemmer projektbehov med tilgaengelig kapacitet for at skabe mere effektivitet og bedre overblik.",
        },
        {
          title: "Governance og Compliance",
          description: "Holder dokumentation og governance ensartet, sa projekter koerer mere stabilt og korrekt.",
        },
      ],
    },
    experience: {
      title: "Erfaring",
      coverLetter: "Profil",
      summaryParagraphs: [
        `Resultatorienteret Project Management Officer med ${daExperienceOverPhrase} fra komplekse, internationale projekter.`,
        "Staerk inden for risikostyring, governance, milepaelsopfolgning og interessentkommunikation med fokus pa godt samarbejde mellem teams og interessenter.",
        "Kendt for at skabe fremdrift gennem struktur, klar kommunikation, proaktiv tilgang og velholdt projektdokumentation.",
      ],
      items: [
        {
          year: "2019",
          period: "2019 - Nu",
          title: "Project Management Officer",
          company: "Atradius",
          highlights: [
            "Understoettede samarbejdet mellem projektledere og teams med fokus pa levering til tiden og inden for budget.",
            "Forbedrede ressourceplanlaegning, sa behov og kapacitet passede bedre sammen.",
            "Holdt styr pa risici og afhaengigheder for at sikre stabil fremdrift i projekterne.",
            "Skabte mere struktur i governance for at styrke projektprocesserne.",
            "Lavede klare rapporter, sa interessenter altid var opdaterede.",
            "Holdt projektdokumentation overskuelig, ensartet og let at finde.",
          ],
        },
        {
          year: "2018",
          period: "2018 - 2019",
          title: "Project Coordinator",
          company: "Tata Steel",
          highlights: [
            "Designede og koordinerede traeningsforloeb, som styrkede teamets kompetencer og performance.",
            "Holdt styr pa projektopgaver og afhaengigheder pa tvaers af flere initiativer.",
            "Var et vigtigt bindeled mellem Sales, Marketing og Supply Chain.",
            "Fangede risici i tide, begraensede forsinkelser og holdt interessenter godt orienteret.",
          ],
        },
        {
          year: "2017",
          period: "2017 - 2018",
          title: "Team Leader",
          company: "Hotel Specials",
          highlights: [
            "Indfoerte forbedringer, som reducerede fejl og loeftede kundetilfredsheden.",
            "Coachede og stoettede et team pa mere end 10 raadgivere.",
            "Samarbejdede med hotelledelse og interne afdelinger for at fa kommunikationen til at glide bedre og loese eskalationer.",
          ],
        },
        {
          year: "2015",
          period: "2015 - 2018",
          title: "Flight Attendant",
          company: "Menzies Schiphol Airport",
          highlights: [
            "Hjalp passagerer med check-in, boarding og bagagehaandtering i overensstemmelse med luftfartsprocedurer.",
          ],
        },
        {
          year: "2012",
          period: "2012 - 2015",
          title: "Commercial Customer Advisor",
          company: "Hotel Specials",
          highlights: [
            "Haandterede reservationer og administrative opgaver med fokus pa kundetilfredshed og positiv feedback.",
            "Loste klager og fungerede som centralt kontaktpunkt for foresporgsler.",
          ],
        },
        {
          year: "2010",
          period: "2010 - 2012",
          title: "Management Assistant",
          company: "Tata Steel",
          highlights: [
            "Ydede generel afdelingsstotte ved at koordinere agendaer, moder, telefonopkald og modtagelse af besoegende.",
          ],
        },
        {
          year: "2009",
          period: "2009 - 2010",
          title: "Call Center Agent",
          company: "2Contact",
          highlights: [
            "Gennemforte outbound salgsopkald for at skabe omsaetning gennem produktsalg.",
          ],
        },
      ],
    },
    skills: {
      title: "Faerdigheder",
      technologies: "Teknologier",
      personalSkills: "Personlige Faerdigheder",
      languages: "Sprog",
      certifications: "Certificeringer",
      education: "Uddannelse",
      internships: "Praktik",
      circular: [
        { name: "Projektledelse", percentage: 90 },
        { name: "Risikostyring", percentage: 85 },
        { name: "Interessentkommunikation", percentage: 88 },
        { name: "Governance", percentage: 82 },
      ],
      bars: [
        { name: "MS Project & Jira", percentage: 85 },
        { name: "Microsoft Office", percentage: 95 },
        { name: "Confluence & SharePoint", percentage: 80 },
        { name: "Oracle P2P & ServiceNow", percentage: 75 },
      ],
      technologyGroups: [
        { category: "Microsoft Office", tools: ["Excel", "Outlook", "Word", "Power Point", "Visio"] },
        { category: "Samarbejde", tools: ["Confluence", "SharePoint"] },
        { category: "Projektledelse", tools: ["MS Project", "Jira"] },
        { category: "Enterprise", tools: ["Oracle P2P", "ServiceNow"] },
      ],
      personalSkillsList: [
        "Klar Kommunikation",
        "Organisatoriske Faerdigheder",
        "Fleksibel i Internationale Miljoer",
        "Proaktiv Problemlosning",
        "Opmarksomhed pa Detaljer",
        "Samarbejde & Teamwork",
      ],
      languagesList: ["Hollandsk", "Engelsk"],
      certificationsList: [
        {
          name: "IPMA (PMO)",
          issuer: "International Project Management Association",
        },
      ],
      educationItem: {
        degree: "Bachelor of Tourism Management",
        school: "InHolland i Amsterdam, Holland",
        year: "2018",
      },
      internshipsList: [
        "Customer Service Representative, Admin/Marketing Barrio-Life | 2015",
        "Management Assistant, TicketSpy | 2010",
        "Personal Assistant, Acupunctuur Kliniek | 2009",
      ],
    },
    contact: {
      title: "Kom i kontakt",
      description:
        "Aben for en snak om PMO, projektkoordinering og stakeholder support i internationale teams og projekter med tempo pa.",
      address: "Adresse",
      email: "E-mail",
      phone: "Telefon",
      linkedin: "LinkedIn",
      form: {
        name: "Navn",
        email: "E-mail",
        subject: "Emne",
        message: "Besked...",
        send: "Send",
        sending: "Sender...",
        success: "Tak for din besked. Miriam vender tilbage hurtigst muligt.",
        mailClient: "Din mailapp aabnes med beskeden udfyldt.",
        error: "Din besked kunne ikke sendes lige nu. Proev igen lidt senere.",
        recaptchaNotice: {
          prefix: "Denne side er beskyttet af reCAPTCHA og Googles",
          privacy: "Privatlivspolitik",
          and: "og",
          terms: "Servicevilkar",
          suffix: "gaelder.",
        },
        errors: {
          nameRequired: "Indtast dit navn.",
          nameTooLong: "Dit navn er for langt.",
          emailInvalid: "Indtast en gyldig e-mailadresse.",
          emailTooLong: "Din e-mailadresse er for lang.",
          subjectRequired: "Indtast et emne.",
          subjectTooLong: "Dit emne er for langt.",
          messageRequired: "Indtast din besked.",
          messageTooLong: "Din besked er for lang.",
          recaptchaFailed: "Sikkerhedskontrol mislykkedes. Proev igen.",
          recaptchaLoadFailed: "Sikkerhedskontrol kunne ikke indlaeses. Opdater siden og proev igen.",
          recaptchaNotConfigured: "Sikkerhedskontrol er ikke konfigureret. Proev igen senere.",
          emailServiceNotConfigured: "E-mailtjenesten er ikke konfigureret. Proev igen senere.",
          smtpAuthDisabled: "Login for denne mailbox er deaktiveret. Kontakt support eller brug direkte e-mail.",
          smtpInvalidCredentials: "SMTP-loginoplysninger er ugyldige. For Gmail skal du bruge en appadgangskode i stedet for din normale adgangskode.",
          sendFailed: "Din besked kan ikke sendes lige nu. Proev igen senere.",
          formInvalid: "Udfyld venligst alle kontaktfelter korrekt.",
        },
      },
    },
    footer: {
      rights: "Alle rettigheder forbeholdes.",
      tagline: `PMO-konsulent | Projektkoordinator | ${daExperienceLabel}`,
    },
  },
} as const

export type Locale = keyof typeof translations
export type TranslationKeys = (typeof translations)[Locale]

