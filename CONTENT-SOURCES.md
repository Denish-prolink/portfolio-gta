# Personal content migration

Personal details were read from the JavaScript-rendered pages at [Denish Kunjadiya's previous portfolio](https://denish-kunjadiya.vercel.app/). The nine-screen interface and illustrated backgrounds remain the current project's design.

## Sources and destination

- **Homepage:** Name, MERN Stack Developer role, introduction, stated 2+ years of experience, and all six services. These populate Overview, About, Experience, and Services.
- **[About](https://denish-kunjadiya.vercel.app/about):** Complete languages/frameworks, libraries, and tools lists; Gujarat location; BCA at Bhakta Kavi Narsinh Mehta University (2020–2023); and Udemy FullStack Developer Expert program (2023). Education is under Qualifications, with the original internal screen ID retained so saved progress keeps working.
- **[Projects](https://denish-kunjadiya.vercel.app/project) and [project details](https://denish-kunjadiya.vercel.app/project/1):** One published project, spelled “Reak-E-State” on the old site. Imported its description, features, technologies, five screenshots, live-demo link, and source-code link. The repeated “Responsive Design” feature was consolidated.
- **[Contact](https://denish-kunjadiya.vercel.app/contact):** Email, phone, location, LinkedIn, GitHub, WhatsApp, and Upwork links.
- **Public assets:** The portrait, résumé PDF, and five project screenshots were copied locally. Images were optimized to WebP; the résumé was copied unchanged.

## Content choices

- Copy was shortened and lightly edited to fit the current design without adding employers, employment dates, awards, proficiency percentages, or project-count claims.
- The owner's latest update supersedes the old introduction: **Software Engineer** with **3+ years of experience**.
- Experience describes the development work on the old site; it does not invent a company timeline.
- Fiverr, RemoteHub, and Dribbble were labels without profile URLs on the old site. They are omitted from clickable social links pending actual URLs.
- The live-demo and repository URLs are preserved as published; availability of those external destinations is controlled by their hosts.
- Contact uses email, telephone, and social links. The old site's contact-form submission service was not copied or invoked.
- The backgrounds feature a realistic adult 3D game protagonist in contemporary streetwear, with software engineering activities and GTA-inspired coastal city views. Generation prompts are recorded in `PROMPTS.md`.
- Home base is **Yogichowk, Surat, Gujarat 395010**. The decorative minimap opens an embedded Google map for that address; the contact and location links open Google Maps.
- Primary email actions open a pre-addressed Gmail compose page. A standard email-app link and a copy-address button are also available.

All personal content and links remain editable in **src/config.ts**. Local assets are in **public/profile/**, **public/projects/**, and **public/Denish-Kunjadiya-Resume.pdf**.
