export interface PortfolioItem {
  title: string;
  meta: string;
  description?: string;
  level?: number;
  tags?: string[];
  image?: string;
  gallery?: { src: string; alt: string }[];
  features?: string[];
  links?: { label: string; href: string }[];
}

export interface Screen {
  id: string;
  label: string;
  eyebrow: string;
  title: string[];
  description: string;
  accent: string;
  gradient: string;
  image: string;
  video?: string;
  location: string;
  time: string;
  items?: PortfolioItem[];
}

// Everything personal lives here. Images and optional video paths are relative to public/.
export const portfolio = {
  name: 'Denish Kunjadiya',
  initials: 'DK',
  brand: 'AFTER HOURS',
  role: 'Software Engineer',
  location: 'Gujarat, India',
  timezone: 'Asia/Kolkata',
  email: 'denishkunjadiya02@gmail.com',
  phone: '+91 9054695107',
  phoneHref: 'tel:+919054695107',
  portrait: '/profile/denish-kunjadiya.webp',
  resume: '/Denish-Kunjadiya-Resume.pdf',
  availability: 'Let’s build your next web application',
  contactNote: 'Feel free to reach out by email, phone, or WhatsApp.',
  copyright: '2026',
  startMoney: 1250,
  discoveryReward: 250,
  socials: [
    { label: 'GitHub', href: 'https://github.com/Denishkunjadiya' },
    { label: 'LinkedIn', href: 'https://in.linkedin.com/in/denish-kunjadiya' },
    { label: 'WhatsApp', href: 'https://wa.me/message/OPFGNVHU7PSBH1' },
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~010864920c893fa37c?mp_source=share' },
  ],
  stats: [
    { value: '03+', label: 'YEARS OF EXPERIENCE' },
    { value: 'MERN', label: 'FULL-STACK DEVELOPMENT' },
    { value: '06', label: 'DEVELOPMENT SERVICES' },
  ],
  screens: [
    {
      id: 'hero', label: 'Overview', eyebrow: 'PLAYER ONE · DENISH KUNJADIYA',
      title: ['SOFTWARE ENGINEER.', 'REAL SOLUTIONS.'],
      description: 'I’m Denish, a Software Engineer from Gujarat, India.\nWith 3+ years of experience, I build reliable, scalable software from frontend to backend.',
      accent: '#f39157', gradient: 'linear-gradient(135deg, #342a25, #96583b 60%, #1d2529)',
      image: '/art/hero.webp', location: 'THE ENGINEERING STUDIO', time: 'GOLDEN HOUR',
    },
    {
      id: 'about', label: 'About', eyebrow: 'THE CHARACTER BEHIND THE CURSOR',
      title: ['HELLO, I’M', 'DENISH KUNJADIYA.'],
      description: 'I’m a Software Engineer with 3+ years of experience across frontend and backend development. I specialize in building reliable, high-performance web applications, using React.js, Next.js, TypeScript, Node.js, MongoDB, Express, and Mongoose to turn complex requirements into scalable software.',
      accent: '#b9c79a', gradient: 'linear-gradient(135deg, #202e27, #666c43, #242a24)',
      image: '/art/about.webp', location: 'THE HOME STUDIO', time: 'LATE AFTERNOON',
      items: [
        { title: 'Built around the user', meta: '01 / MY APPROACH', description: 'My commitment to excellence is about delivering optimal results and exceptional user experiences. I bring an understanding of frontend and backend intricacies to complex development challenges.' },
        { title: 'Gujarat, India', meta: '02 / HOME BASE', description: 'I’m Denish Kunjadiya, a Software Engineer with a Bachelor of Computer Applications from Bhakta Kavi Narsinh Mehta University, Junagadh.' },
      ],
    },
    {
      id: 'skills', label: 'Skills', eyebrow: 'THE INVENTORY · ALWAYS UPGRADING',
      title: ['MY STACK.', 'READY TO BUILD.'],
      description: 'The languages, frameworks, libraries, and tools I use across frontend and backend development.',
      accent: '#80cecb', gradient: 'linear-gradient(135deg, #192d36, #32666d, #182333)',
      image: '/art/skills.webp', location: 'THE SYSTEMS LAB', time: 'BLUE HOUR',
      items: [
        { title: 'Languages & frameworks', meta: '01 / THE FOUNDATION', tags: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'React', 'Next.js', 'Vite', 'Bootstrap', 'Tailwind CSS', 'Express.js', 'Babel'] },
        { title: 'Libraries', meta: '02 / THE BUILDING BLOCKS', tags: ['React Router', 'Redux', 'GraphQL', 'Chart.js', 'Material UI', 'Chakra UI', 'Webpack', 'Axios', 'Jest', 'Formik', 'Framer Motion', 'Moment.js', 'Styled Components', 'Mongoose'] },
        { title: 'Tools & technologies', meta: '03 / THE WORKBENCH', tags: ['VS Code', 'MongoDB', 'GitHub', 'Postman', 'Docker', 'Photoshop', 'Figma'] },
      ],
    },
    {
      id: 'projects', label: 'Projects', eyebrow: 'FEATURED MISSION · BUSINESS APPLICATION',
      title: ['LESS TALK.', 'MORE PLAY.'],
      description: 'A real estate CRM built to simplify workflows, improve client relationships, and support everyday business.',
      accent: '#efa6ae', gradient: 'linear-gradient(135deg, #30232d, #945961, #281e2f)',
      image: '/art/projects.webp', location: 'THE BUILD ROOM', time: 'AFTER SUNSET',
      items: [
        {
          title: 'Reak-E-State', meta: '01 / REAL ESTATE CRM',
          description: 'Real Estate CRM is a Customer Relationship Management solution designed exclusively for real estate agents. Streamline your workflow, enhance client interactions, and grow your business with a feature-packed CRM.',
          tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'React Hooks', 'React Icons', 'EmailJS'],
          image: '/projects/real-estate-1.webp',
          gallery: [
            { src: '/projects/real-estate-1.webp', alt: 'Reak-E-State application overview' },
            { src: '/projects/real-estate-2.webp', alt: 'Reak-E-State application screenshot 2' },
            { src: '/projects/real-estate-3.webp', alt: 'Reak-E-State application screenshot 3' },
            { src: '/projects/real-estate-4.webp', alt: 'Reak-E-State application screenshot 4' },
            { src: '/projects/real-estate-5.webp', alt: 'Reak-E-State application screenshot 5' },
          ],
          features: [
            'An intuitive dashboard tailored to real estate professionals.',
            'Powered by the MERN stack for high-performance full-stack development.',
            'Open-source architecture that can be customized to individual requirements.',
            'Responsive layouts for access from any device.',
            'Integrated communication tools for better client relationships.',
          ],
          links: [
            { label: 'Visit live demo', href: 'https://real-estate-crm-demo.vercel.app/default' },
            { label: 'View source code', href: 'https://github.com/Denishkunjadiya/Real-Estate.git' },
          ],
        },
      ],
    },
    {
      id: 'experience', label: 'Experience', eyebrow: 'THE CAMPAIGN SO FAR',
      title: ['FRONT TO BACK.', 'BUILT WITH CARE.'],
      description: '3+ years of software engineering experience, building robust, scalable applications and solving frontend, backend, and integration challenges.',
      accent: '#dec081', gradient: 'linear-gradient(135deg, #302a24, #8d6d41, #202325)',
      image: '/art/experience.webp', location: 'THE ARCHITECTURE ROOM', time: 'TWILIGHT',
      items: [
        { title: 'Software Engineer', meta: '03+ YEARS / FULL STACK', description: 'Engineering high-performance applications with MongoDB, Express.js, React, and Node.js, with attention to reliability, maintainability, and the complete user experience.' },
        { title: 'Frontend development', meta: 'INTERFACES / USER EXPERIENCE', description: 'Building responsive applications with React.js, Next.js, TypeScript, and their libraries, focused on exceptional user experiences.' },
        { title: 'Backend & integrations', meta: 'APIS / APPLICATION LOGIC', description: 'Developing backend applications with Node.js, Express.js, MongoDB, and Mongoose, and connecting systems through RESTful APIs.' },
      ],
    },
    {
      id: 'achievements', label: 'Qualifications', eyebrow: 'EDUCATION · TRAINING · MILESTONES',
      title: ['A SOLID BASE.', 'THE NEXT LEVEL.'],
      description: 'The qualifications behind my work in full-stack web development.',
      accent: '#e9d48b', gradient: 'linear-gradient(135deg, #2b2d23, #777043, #20261f)',
      image: '/art/achievements.webp', location: 'THE LEARNING LIBRARY', time: 'CITY LIGHTS',
      items: [
        { title: 'Bachelor of Computer Applications', meta: '2020 — 2023 / BCA', description: 'Completed my BCA at Bhakta Kavi Narsinh Mehta University, Junagadh, Gujarat, India, in 2023.' },
        { title: 'FullStack Developer Expert', meta: '2023 / UDEMY', description: 'Successfully completed the FullStack Developer Expert program from Udemy, with a focus on MERN stack development.' },
      ],
    },
    {
      id: 'services', label: 'Services', eyebrow: 'PICK YOUR NEXT MISSION',
      title: ['YOUR NEXT IDEA.', 'LET’S BUILD IT.'],
      description: 'Six ways I can help you build, connect, and maintain your web application.',
      accent: '#c3acf0', gradient: 'linear-gradient(135deg, #29263c, #6c5a86, #212132)',
      image: '/art/services.webp', location: 'THE SOLUTIONS STUDIO', time: 'FIRST LIGHT',
      items: [
        { title: 'MERN Stack Development', meta: '01 / FULL-STACK APPLICATIONS', description: 'Full-stack applications using React, Node.js, Express.js, and MongoDB / Mongoose.' },
        { title: 'Front End Development', meta: '02 / WEB INTERFACES', description: 'Frontend applications using Next.js, React.js, and their libraries.' },
        { title: 'API Integration', meta: '03 / CONNECTED SYSTEMS', description: 'RESTful API integrations that connect systems and support efficient workflows.' },
        { title: 'Fix Bugs and Manage Website', meta: '04 / MAINTENANCE', description: 'Bug resolution and website management for reliable functionality and optimal performance.' },
        { title: 'Responsive Design', meta: '05 / EVERY DEVICE', description: 'Flexible layouts that deliver a consistent viewing experience across devices.' },
        { title: 'Backend Development', meta: '06 / SERVER-SIDE LOGIC', description: 'Backend applications using Node.js, Express.js, MongoDB, and their libraries.' },
      ],
    },
    {
      id: 'contact', label: 'Contact', eyebrow: 'NEW MISSION AVAILABLE',
      title: ['GOT A GOOD IDEA?', 'I’M ALL EARS.'],
      description: 'Have a web application in mind? Get in touch to talk about MERN stack development, frontend work, backend systems, or API integrations.',
      accent: '#eca8c0', gradient: 'linear-gradient(135deg, #322536, #8a506f, #202331)',
      image: '/art/contact.webp', location: 'THE COLLABORATION LOUNGE', time: 'NIGHT CALL',
    },
    {
      id: 'outro', label: 'Outro', eyebrow: 'THIS IS JUST THE BEGINNING',
      title: ['STAY CURIOUS.', 'TAKE THE LONG WAY.'],
      description: 'Thanks for exploring my portfolio. I’m Denish Kunjadiya, a Software Engineer from Gujarat, India, with 3+ years of experience. Let’s turn your next idea into software that makes a difference.',
      accent: '#f1b88e', gradient: 'linear-gradient(135deg, #2f2b2c, #a16e55, #1f2d36)',
      image: '/art/outro.webp', location: 'THE NEXT CHAPTER', time: 'A NEW DAY',
    },
  ] satisfies Screen[],
};
