export const totalPages = 6

export const sectionPages = {
  home: 1,
  services: 2,
  resume: 4,
  skills: 5,
  contact: 6,
} as const

export const profile = {
  name: "Miriam Darwish",
  role: "PMO Consultant",
  tagline: "PMO | Project Coordinator | 6+ Years of Experience",
  yearsOfExperience: "6+ Years of Experience",
  location: "Taastrup, 2630 Denmark",
  phone: "+45 537 537 37",
  email: "miriamdarwish@hotmail.com",
  linkedinUrl: "https://linkedin.com/in/miriamdarwish",
  linkedinLabel: "linkedin.com/in/miriamdarwish",
  summary:
    "Results-driven Project Management Officer with over 6 years of experience supporting complex, global projects in fast-paced environments. Skilled in risk management, governance, milestone tracking, and stakeholder coordination. Known for enabling project success through structured support, clear communication, and proactive problem solving.",
  coverLetter: [
    "Results-driven Project Management Officer with over 6 years of experience supporting complex, global projects in fast-paced environments.",
    "Skilled in risk management, governance, milestone tracking, and stakeholder coordination, with a strong record of keeping teams aligned and stakeholders informed.",
    "Known for enabling project success through structured support, clear communication, proactive problem solving, and well-maintained project documentation.",
  ],
  contactIntro:
    "Open to discussing PMO, project coordination, and stakeholder support opportunities across international teams and fast-paced delivery environments.",
} as const

export const profileLinks = {
  email: `mailto:${profile.email}`,
  phone: "tel:+4553753737",
} as const

export const areasOfExpertise = [
  {
    title: "Project & Portfolio Management",
    description:
      "Supporting end-to-end coordination, milestone tracking, and delivery follow-through across complex project portfolios.",
  },
  {
    title: "Risk & Issue Management",
    description:
      "Identifying risks early, managing dependencies, and helping teams remove blockers before they affect delivery.",
  },
  {
    title: "Stakeholder Communication",
    description:
      "Creating clear updates, facilitating cross-functional communication, and keeping sponsors and teams aligned.",
  },
  {
    title: "Financial Operations & Budget Control",
    description:
      "Bringing structure to project administration, reporting, and budget-related coordination work.",
  },
  {
    title: "Resource Planning & Allocation",
    description:
      "Aligning project demand with available capacity to improve efficiency and delivery predictability.",
  },
  {
    title: "Governance & Compliance",
    description:
      "Standardizing documentation and governance practices to support consistent, compliant project execution.",
  },
] as const

export const experiences = [
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
] as const

export const circularSkills = [
  { name: "Project Management", percentage: 90 },
  { name: "Risk Management", percentage: 85 },
  { name: "Stakeholder Communication", percentage: 88 },
  { name: "Governance", percentage: 82 },
] as const

export const barSkills = [
  { name: "MS Project & Jira", percentage: 85 },
  { name: "Microsoft Office", percentage: 95 },
  { name: "Confluence & SharePoint", percentage: 80 },
  { name: "Oracle P2P & ServiceNow", percentage: 75 },
] as const

export const technologyGroups = [
  {
    category: "Microsoft Office",
    tools: ["Excel", "Outlook", "Word", "Power Point", "Visio"],
  },
  {
    category: "Collaboration",
    tools: ["Confluence", "SharePoint"],
  },
  {
    category: "Project Management",
    tools: ["MS Project", "Jira"],
  },
  {
    category: "Enterprise",
    tools: ["Oracle P2P", "ServiceNow"],
  },
] as const

export const personalSkills = [
  "Clear Communication Skills",
  "Organisational Skills",
  "Adaptable in International Environments",
  "Proactive Problem Solving",
  "Attention to Detail",
  "Collaboration & Teamwork",
] as const

export const languages = ["Dutch", "English"] as const

export const certifications = [
  {
    name: "IPMA (PMO)",
    issuer: "International Project Management Association",
  },
] as const

export const education = {
  degree: "Bachelor of Tourism Management",
  school: "InHolland in Amsterdam, Netherlands",
  year: "2018",
} as const

export const internships = [
  "Customer Service Representative, Admin/Marketing Barrio-Life | 2015",
  "Management Assistant, TicketSpy | 2010",
  "Personal Assistant, Acupunctuur Kliniek | 2009",
] as const
