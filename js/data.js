/* =====================================================================
   PLAYER ONE — PORTFOLIO DATA FILE
   ---------------------------------------------------------------------
   ✅ THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Replace the values below with your own details. Keep the structure
   (keys, commas, brackets, quotes) exactly as it is.
   Read HANDBOOK.pdf for a field-by-field guide.
   ===================================================================== */

window.PORTFOLIO = {

  /* ---------- 1. SITE SETTINGS ---------- */
  settings: {
    siteTitle: "YASHRAJ — Player One",          // Browser tab title
    siteDescription: "B.Tech CSE-AI student portfolio — projects, skills and journey.",
    theme: "synthwave",        // "synthwave" | "matrix" | "sunset" | "ocean"
    bootScreen: true,          // Show the "press start" intro screen
    customCursor: true,        // Neon cursor on desktop
    soundDefault: false,       // Start with retro sounds ON or OFF
    crtDefault: false,         // Start with CRT scanline effect ON or OFF
    bootLines: [               // Lines typed on the intro screen
      "Initializing PLAYER_ONE.exe",
      "Loading skill tree ........ OK",
      "Compiling quests .......... OK",
      "Syncing GitHub commits .... OK",
      "Calibrating caffeine ...... 99%"
    ]
  },

  /* ---------- 2. PLAYER (YOU) ---------- */
  player: {
    name: "YASHRAJ",
    handle: "yashraj.dev",                       // Short brand / username shown in the top bar
    avatar: "assets/images/avatar-sample.svg",
    classTitles: [                             // Typed one after another in the hero
      "Code Wizard 🧙",
      "Full-Stack Apprentice",
      "DSA Grinder",
      "Hackathon Rookie"
    ],
    intro: "1nd-year B.Tech CSE AI student who turns caffeine into code. I build small things that solve real campus problems — and I'm levelling up one semester at a time.",
    college: "ABC Institute of Technology",
    branch: "B.Tech — Computer Science & Engg. in AI",
    year: 2,                                   // Current year of study (1–4) → shown as LV
    semester: 4,                               // Current semester (1–8) → XP bar
    totalSemesters: 8,
    cgpa: "8.72",
    batch: "2024 – 2028",
    location: "Pune, India",
    status: "Open to internships & hackathon teams",
    statusOnline: true,                        // Green dot (true) / amber dot (false)
    resume: "assets/resume.pdf",               // Put your PDF inside /assets
    email: "aarav.mehta@example.com",
    attributes: [                              // RPG stats (0–100) on the character card
      { label: "Logic", value: 82 },
      { label: "Creativity", value: 90 },
      { label: "Teamwork", value: 88 },
      { label: "Debugging", value: 71 },
      { label: "Caffeine", value: 99 }
    ],
    lore: [                                    // Fun facts shown as chips
      "☕ 3 chai/day minimum",
      "🌙 Night-owl coder",
      "🎮 Speedrunner at heart",
      "🏏 Weekend cricketer",
      "📚 Reads sci-fi"
    ]
  },

  /* ---------- 3. SOCIAL LINKS ----------
     icon: github | linkedin | x | instagram | leetcode | codechef |
           hackerrank | codeforces | youtube | medium | mail | web     */
  socials: [
    { name: "GitHub", url: "https://github.com/yashraj-max", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/your-username", icon: "linkedin" },
    { name: "LeetCode", url: "https://leetcode.com/your-username", icon: "leetcode" },
    { name: "X", url: "https://x.com/your-username", icon: "x" },
    { name: "Instagram", url: "https://instagram.com/your-username", icon: "instagram" }
  ],

  /* ---------- 4. SECTION LABELS (rename or hide any section) ---------- */
  sections: {
    profile: { show: true, nav: "Profile", icon: "👾", title: "Player Profile", subtitle: "" },
    skills: { show: true, nav: "Skills", icon: "🌳", title: "Skill Tree", subtitle: "Every skill starts at LV 1. Here's where mine stand right now." },
    loadout: { show: true, nav: "Loadout", icon: "🎒", title: "Inventory & Loadout", subtitle: "The tools I equip daily — and the ones still loading." },
    quests: { show: true, nav: "Quests", icon: "⚔️", title: "Quest Log", subtitle: "Projects I've shipped, broken, fixed and shipped again." },
    journey: { show: true, nav: "Journey", icon: "🗺️", title: "World Map", subtitle: "Eight semesters. Eight levels. Here's my run so far." },
    achievements: { show: true, nav: "Trophies", icon: "🏆", title: "Trophy Room", subtitle: "Certificates, hackathons and badges unlocked along the way." },
    guilds: { show: true, nav: "Guilds", icon: "🛡️", title: "Guilds & Side Quests", subtitle: "Clubs, volunteering and everything beyond the classroom." },
    contact: { show: true, nav: "Contact", icon: "📡", title: "Join My Party", subtitle: "Internship, hackathon, collab or just a hello — send a signal." }
  },

  /* ---------- 5. PLAYER STATS (animated counters) ---------- */
  stats: [
    { label: "Quests Completed", value: 9, suffix: "", icon: "⚔️" },
    { label: "Problems Solved", value: 320, suffix: "+", icon: "🧩" },
    { label: "Hackathons", value: 4, suffix: "", icon: "⚡" },
    { label: "Certifications", value: 7, suffix: "", icon: "📜" },
    { label: "GitHub Commits", value: 540, suffix: "+", icon: "🟩" }
  ],

  /* ---------- 6. SKILL TREE ----------
     level: 0–100   |   status: "unlocked" or "learning"
     icon: an image URL (devicon) OR an emoji                         */
  skills: [
    {
      category: "Languages", icon: "💬",
      items: [
        { name: "C", level: 85, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "C++", level: 80, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { name: "Python", level: 75, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Java", level: 62, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "JavaScript", level: 70, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Rust", level: 15, status: "learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" }
      ]
    },
    {
      category: "Web Dev", icon: "🌐",
      items: [
        { name: "HTML5", level: 90, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", level: 84, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Tailwind", level: 60, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "React", level: 40, status: "learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Node.js", level: 35, status: "learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "MySQL", level: 58, status: "unlocked", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      category: "CS Core", icon: "🧠",
      items: [
        { name: "Data Structures", level: 78, status: "unlocked", icon: "🧱" },
        { name: "Algorithms", level: 70, status: "unlocked", icon: "♟️" },
        { name: "OOP", level: 80, status: "unlocked", icon: "🧬" },
        { name: "DBMS", level: 55, status: "unlocked", icon: "🗄️" },
        { name: "Operating Systems", level: 30, status: "learning", icon: "⚙️" },
        { name: "Computer Networks", level: 10, status: "learning", icon: "📶" }
      ]
    },
    {
      category: "Soft Skills", icon: "🤝",
      items: [
        { name: "Teamwork", level: 90, status: "unlocked", icon: "🤝" },
        { name: "Communication", level: 80, status: "unlocked", icon: "🎙️" },
        { name: "Problem Solving", level: 85, status: "unlocked", icon: "💡" },
        { name: "Leadership", level: 65, status: "unlocked", icon: "🚩" },
        { name: "Time Mgmt.", level: 70, status: "unlocked", icon: "⏳" },
        { name: "Public Speaking", level: 45, status: "learning", icon: "🎤" }
      ]
    }
  ],

  /* ---------- 7. INVENTORY (tools you use) ----------
     rarity: common | rare | epic | legendary                         */
  inventory: [
    { name: "VS Code", rarity: "legendary", note: "Main weapon. Never unequipped.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    { name: "Git", rarity: "epic", note: "Time-travel for code.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", rarity: "epic", note: "My public save-file.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Linux", rarity: "rare", note: "Ubuntu on dual-boot.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Figma", rarity: "rare", note: "Wireframes before code.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Postman", rarity: "common", note: "Poking APIs politely.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "Arduino", rarity: "rare", note: "1st-year workshop favourite.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
    { name: "Firebase", rarity: "common", note: "Quick backends for hackathons.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
    { name: "Canva", rarity: "common", note: "Posters for club events.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
    { name: "Notion", rarity: "common", note: "Second brain for notes.", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" }
  ],

  /* ---------- 8. CURRENTLY LEARNING ---------- */
  learning: [
    { name: "React + Next.js", progress: 45, eta: "Sem 4" },
    { name: "DSA — Graphs & DP", progress: 60, eta: "Ongoing" },
    { name: "Machine Learning Basics", progress: 20, eta: "Summer break" }
  ],

  /* ---------- 9. QUESTS (PROJECTS) ----------
     type: "main" (major project) | "side" (mini project)
     status: "Completed" | "In Progress"
     difficulty: 1–5 stars  |  xp: any number (just for fun)        */
  quests: [
    {
      title: "CampusQ — Canteen Queue App",
      type: "main", status: "Completed", difficulty: 4, xp: 1200,
      date: "Mar 2026", team: "Team of 3 · Frontend Lead",
      image: "assets/images/quest-1.svg",
      summary: "A web app that lets students pre-order canteen food and skip the lunch-break queue.",
      objective: "Lunch breaks are 40 minutes; the canteen queue alone took 25. We wanted students to order ahead and pick up when it's ready.",
      highlights: [
        "Built a responsive ordering UI with live order-status updates",
        "Used Firebase Auth + Firestore for real-time order tracking",
        "Piloted with 120+ students during the college tech fest"
      ],
      learnings: ["Real-time databases", "Working in a team with Git branches", "Talking to real users"],
      tech: ["HTML", "CSS", "JavaScript", "Firebase"],
      links: { code: "https://github.com/your-username/campusq", live: "https://example.com" }
    },
    {
      title: "Smart Attendance (Face Recognition)",
      type: "main", status: "In Progress", difficulty: 5, xp: 1500,
      date: "Ongoing", team: "Team of 4 · ML & Backend",
      image: "assets/images/quest-2.svg",
      summary: "Classroom attendance in 10 seconds using a webcam and face recognition.",
      objective: "Roll call wastes ~8 minutes of every lecture. The goal: mark attendance automatically from one class photo.",
      highlights: [
        "Face detection with OpenCV, recognition using face_recognition lib",
        "Flask API that exports attendance to Excel",
        "Currently improving accuracy in low-light classrooms"
      ],
      learnings: ["Basics of computer vision", "REST APIs with Flask", "Handling messy real-world data"],
      tech: ["Python", "OpenCV", "Flask"],
      links: { code: "https://github.com/your-username/smart-attendance", live: "" }
    },
    {
      title: "Unbeatable Tic-Tac-Toe AI",
      type: "side", status: "Completed", difficulty: 3, xp: 600,
      date: "Nov 2025", team: "Solo",
      image: "assets/images/quest-3.svg",
      summary: "A console + web Tic-Tac-Toe that never loses, powered by the Minimax algorithm.",
      objective: "Understand recursion and game trees by building an AI that plays perfectly.",
      highlights: ["Implemented Minimax with alpha-beta pruning", "Ported the C++ logic to a JavaScript web version"],
      learnings: ["Recursion", "Game theory basics", "Optimisation with pruning"],
      tech: ["C++", "JavaScript"],
      links: { code: "https://github.com/your-username/tictactoe-ai", live: "https://example.com" }
    },
    {
      title: "SkyCast Weather Dashboard",
      type: "side", status: "Completed", difficulty: 2, xp: 400,
      date: "Aug 2025", team: "Solo",
      image: "assets/images/quest-4.svg",
      summary: "A clean weather dashboard with 5-day forecasts and city search.",
      objective: "My first project using a public API and async JavaScript.",
      highlights: ["Fetched data from OpenWeather API", "Dynamic backgrounds based on weather"],
      learnings: ["fetch() and Promises", "Working with JSON", "API keys & rate limits"],
      tech: ["HTML", "CSS", "JavaScript", "API"],
      links: { code: "https://github.com/your-username/skycast", live: "https://example.com" }
    },
    {
      title: "Smart Dustbin (Arduino)",
      type: "side", status: "Completed", difficulty: 2, xp: 350,
      date: "Feb 2025", team: "Team of 2 · 1st-year workshop",
      image: "assets/images/quest-5.svg",
      summary: "A touch-free dustbin whose lid opens automatically when you come close.",
      objective: "First-year engineering workshop project — make an everyday object smarter.",
      highlights: ["Ultrasonic sensor + servo motor", "Won 2nd place in the department expo"],
      learnings: ["Embedded C basics", "Circuits & sensors", "Presenting to judges"],
      tech: ["Arduino", "C", "Sensors"],
      links: { code: "https://github.com/your-username/smart-dustbin", live: "" }
    },
    {
      title: "Library Management System",
      type: "side", status: "Completed", difficulty: 3, xp: 500,
      date: "Apr 2025", team: "Solo · Semester mini project",
      image: "assets/images/quest-6.svg",
      summary: "A Java + MySQL desktop app to issue, return and track library books.",
      objective: "Semester 2 OOP mini project — apply classes, inheritance and JDBC.",
      highlights: ["CRUD operations with JDBC", "Fine calculation for late returns"],
      learnings: ["OOP in practice", "SQL queries & joins", "Swing UI"],
      tech: ["Java", "MySQL", "OOP"],
      links: { code: "https://github.com/your-username/library-system", live: "" }
    }
  ],

  /* ---------- 10. JOURNEY (SEMESTERS AS LEVELS) ----------
     status: "done" | "current" | "locked"                           */
  journey: [
    {
      level: 1, title: "The Awakening", period: "Sem 1 · Aug–Dec 2024", status: "done",
      boss: "Engineering Mathematics", sgpa: "8.4",
      highlights: ["Wrote my first C program", "Joined the coding club", "Survived 8 AM labs"]
    },
    {
      level: 2, title: "Tutorial Island", period: "Sem 2 · Jan–May 2025", status: "done",
      boss: "Programming in C", sgpa: "8.9",
      highlights: ["Built the Arduino Smart Dustbin", "First hackathon (and first all-nighter)", "Learnt Git"]
    },
    {
      level: 3, title: "The Data Dungeon", period: "Sem 3 · Aug–Dec 2025", status: "done",
      boss: "Data Structures", sgpa: "8.8",
      highlights: ["300+ DSA problems", "Tic-Tac-Toe AI", "NPTEL Java – Elite"]
    },
    {
      level: 4, title: "Web Wilderness", period: "Sem 4 · Jan–May 2026", status: "current",
      boss: "DBMS & OS", sgpa: "—",
      highlights: ["Shipping CampusQ", "Learning React", "Hunting a summer internship"]
    },
    { level: 5, title: "Internship Arc", period: "Sem 5 · 2026", status: "locked", boss: "???", sgpa: "", highlights: [] },
    { level: 6, title: "The Specialisation", period: "Sem 6 · 2027", status: "locked", boss: "???", sgpa: "", highlights: [] },
    { level: 7, title: "Capstone Citadel", period: "Sem 7 · 2027", status: "locked", boss: "???", sgpa: "", highlights: [] },
    { level: 8, title: "Final Boss: Placement", period: "Sem 8 · 2028", status: "locked", boss: "???", sgpa: "", highlights: [] }
  ],

  /* ---------- 11. ACHIEVEMENTS / CERTIFICATES ----------
     rarity: common | rare | epic | legendary  |  locked: true = goal not yet achieved */
  achievements: [
    {
      title: "Smart India Hackathon", issuer: "Internal Round — Qualified", date: "Sep 2025", rarity: "legendary", icon: "🚀",
      description: "Our team cleared the college-level round of SIH with a campus-safety app idea.", link: "https://example.com"
    },
    {
      title: "NPTEL Java — Elite", issuer: "NPTEL · IIT Kharagpur", date: "Oct 2025", rarity: "epic", icon: "☕",
      description: "Scored 82% in the 12-week Programming in Java course.", link: "https://example.com"
    },
    {
      title: "5★ Problem Solving", issuer: "HackerRank", date: "Jul 2025", rarity: "epic", icon: "⭐",
      description: "Reached 5 stars in Problem Solving on HackerRank.", link: "https://example.com"
    },
    {
      title: "Dept. Expo — 2nd Place", issuer: "Mechatronics Expo 2025", date: "Mar 2025", rarity: "rare", icon: "🥈",
      description: "Smart Dustbin project secured 2nd place among 40 first-year teams.", link: ""
    },
    {
      title: "Hacktoberfest Contributor", issuer: "DigitalOcean", date: "Oct 2025", rarity: "rare", icon: "🎃",
      description: "Merged 4 pull requests into open-source repositories.", link: "https://example.com"
    },
    {
      title: "Python for Everybody", issuer: "Coursera", date: "Jun 2025", rarity: "common", icon: "🐍",
      description: "Completed the 5-course Python specialisation.", link: "https://example.com"
    },
    {
      title: "First Internship", issuer: "Coming soon…", date: "", rarity: "legendary", icon: "💼", locked: true,
      description: "Target: Summer 2026.", link: ""
    },
    {
      title: "Knight on LeetCode", issuer: "Coming soon…", date: "", rarity: "epic", icon: "🛡️", locked: true,
      description: "Target: 1850+ contest rating.", link: ""
    }
  ],

  /* ---------- 12. GUILDS / CLUBS / EXTRA-CURRICULAR ---------- */
  guilds: [
    {
      name: "Coding Club", role: "Core Member · Event Lead", period: "2024 – Present", icon: "💻",
      description: "Organised 2 coding contests for 300+ juniors and run weekly DSA sessions."
    },
    {
      name: "Google Developer Group on Campus", role: "Web Team Member", period: "2025 – Present", icon: "🌈",
      description: "Helped build the club website and hosted a Git & GitHub workshop."
    },
    {
      name: "TechFest — Tech Team", role: "Volunteer", period: "Feb 2025", icon: "🎪",
      description: "Managed registrations portal and on-ground tech support for 2,000+ attendees."
    },
    {
      name: "NSS", role: "Volunteer", period: "2024 – 2025", icon: "🌱",
      description: "Taught basic computer skills to school students in a nearby village."
    }
  ],

  /* ---------- 13. CONTACT ---------- */
  contact: {
    heading: "Ready Player Two?",
    message: "I'm currently looking for summer internships, open-source mentorships and hackathon teammates. My inbox is always open — I reply faster than my code compiles.",
    formAction: "",       // Optional: paste a Formspree URL (https://formspree.io/f/xxxx). Empty = opens email app.
    phone: ""             // Optional: "+91 98xxxxxx10" — leave empty to hide
  },

  /* ---------- 14. FOOTER ---------- */
  footer: {
    note: "Built with HTML, CSS, JS & way too much chai.",
    year: "2026"
  }
};
