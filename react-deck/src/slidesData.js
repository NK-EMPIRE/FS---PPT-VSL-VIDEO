import React from 'react';

// Full 22 slides data matching FirstSelfie_VSL_Deck.pptx with all diagrams fixed
export const INITIAL_SLIDES = [
  // SLIDE 01 (Dark)
  {
    id: 1,
    slideNum: "01",
    theme: "dark",
    category: "HOOK & IDENTITY",
    scriptSnippet: "Your first frame to a million faces. The core promise of FirstSelfie.",
    title: "YOUR FIRST FRAME TO A MILLION FACES.",
    subtitle: "The Identity Brand Blueprint for Founders & Experts",
    type: "cover",
    content: {
      logo: "/LOGO/Primary Logo - Transparent (1).png",
      tagline: "YOUR FIRST FRAME TO A MILLION FACES.",
      badge: "VSL PRESENTATION DECK · 2026"
    }
  },

  // SLIDE 02 (Light)
  {
    id: 2,
    slideNum: "02",
    theme: "light",
    category: "PROOF, NOT PROMISES",
    scriptSnippet: "Real accounts. Real growth. Real screenshots. We don't talk theory.",
    title: "PROOF, NOT PROMISES",
    subtitle: "Real accounts. Real growth. Real screenshots.",
    type: "mockups_4",
    cards: [
      {
        id: "s2_c1",
        image: "/vsl_images/slide_02_sh_04.jpg",
        stat: "40.3K followers",
        sub: ">1 Cr views / 30 days",
        label: "@firstselfie.in"
      },
      {
        id: "s2_c2",
        image: "/vsl_images/slide_02_sh_07.jpg",
        stat: "47.2K followers",
        sub: "54.7L views / 30 days",
        label: "@firstselfie.in (Scale)"
      },
      {
        id: "s2_c3",
        image: "/vsl_images/slide_02_sh_10.jpg",
        stat: "195K followers",
        sub: "Client Case Study",
        label: "Client: Tamil Ponnu in London"
      },
      {
        id: "s2_c4",
        image: "/vsl_images/slide_02_sh_13.jpg",
        stat: "16.2K followers",
        sub: "D2C Brand Growth",
        label: "Client: LadyO (Clothing brand)"
      }
    ]
  },

  // SLIDE 03 (Dark) - FIXED DIAGRAM: The Format Lifecycle Wave
  {
    id: 3,
    slideNum: "03",
    theme: "dark",
    category: "MARKET REALITY",
    scriptSnippet: "18 months ago we caught a wave. Then everyone copied it — and the wave died.",
    title: "18 MONTHS AGO WE CAUGHT A WAVE.",
    subtitle: "Then everyone copied it — and the wave died.",
    type: "format_wave",
    takeaway: "Whoever went viral first got copied. Nobody innovates — the format just gets diluted until it dies.",
    phases: [
      {
        step: "PHASE 01",
        title: "Innovation & Virality",
        desc: "FirstSelfie pioneers the signature format. Exponential organic reach, 7M+ views.",
        color: "#FF6B00"
      },
      {
        step: "PHASE 02",
        title: "Copycat Flooding",
        desc: "Within 9 months, dozens of creators copy the surface mechanics without the core engine.",
        color: "#FFAA44"
      },
      {
        step: "PHASE 03",
        title: "Format Fatigue & Death",
        desc: "Audience scrolls past generic clones. The wave dies for copycats; only authentic identity lasts.",
        color: "#888888"
      }
    ]
  },

  // SLIDE 04 (Light)
  {
    id: 4,
    slideNum: "04",
    theme: "light",
    category: "FORMAT IMPACT",
    scriptSnippet: "One content format. A measurable spike in every metric.",
    title: "THE FORMAT THAT CHANGED EVERYTHING",
    subtitle: "One content format. A measurable spike in every metric.",
    type: "mockups_3",
    cards: [
      {
        id: "s4_c1",
        image: "/vsl_images/slide_04_sh_04.jpg",
        stat: "7,000,002 views",
        sub: "1 single reel",
        label: "Viral Reach Spike"
      },
      {
        id: "s4_c2",
        image: "/vsl_images/slide_04_sh_07.jpg",
        stat: "7,902,290 views",
        sub: "1 single reel",
        label: "High Retention Reel"
      },
      {
        id: "s4_c3",
        image: "/vsl_images/slide_04_sh_10.jpg",
        stat: "57,230 followers",
        sub: "+70% in 60 days",
        label: "Follower Acceleration"
      }
    ]
  },

  // SLIDE 05 (Dark)
  {
    id: 5,
    slideNum: "05",
    theme: "dark",
    category: "COMPETITION",
    scriptSnippet: "Bro, they're copying your style. The question isn't whether people will copy you.",
    title: "“BRO, THEY’RE COPYING YOUR STYLE.”",
    subtitle: "Within 9 months of launch, multiple creators had copied our format. We didn't find most of them — our own followers did.",
    type: "quote_highlight",
    punchline: "The question isn't whether people will copy you. It's whether you'll be the one building — or the one copying."
  },

  // SLIDE 06 (Light) - FIXED LAYOUT: Comparison Matrix
  {
    id: 6,
    slideNum: "06",
    theme: "light",
    category: "AGENCY SPECIALIZATION",
    scriptSnippet: "Not just individuals. We've even trained agencies on their own personal branding.",
    title: "NOT JUST INDIVIDUALS",
    subtitle: "We've even trained agencies on their own personal branding.",
    type: "agency_contrast",
    body: "Agencies build brands for their clients all day — but most founders inside those agencies have zero personal brand of their own. We've closed that gap for them too. That's how deep our specialization runs.",
    points: [
      { label: "Agency Reality", text: "Masters of client deliverables, yet their own founders are completely invisible online." },
      { label: "The Bottleneck", text: "Relying strictly on referrals & cold pitches because they lack personal brand leverage." },
      { label: "FirstSelfie Solution", text: "We trained agency founders to build high-authority founder IP that commands top-tier pricing." }
    ]
  },

  // SLIDE 07 (Dark)
  {
    id: 7,
    slideNum: "07",
    theme: "dark",
    category: "THE ARCHITECTURE",
    scriptSnippet: "The system behind all of it: The Three Star Framework.",
    title: "THE SYSTEM BEHIND ALL OF IT",
    subtitle: "The Three Star Framework",
    type: "three_star_pillars",
    pillars: [
      {
        num: "01",
        title: "Creator Codex Method",
        desc: "Strong positioning + a clean system so you're never stuck wondering what to post."
      },
      {
        num: "02",
        title: "Brain-First Engine System",
        desc: "The engine that takes you from 3 hours per script to 15 ideas mapped in 2 days."
      },
      {
        num: "03",
        title: "After-Post APA Matrix",
        desc: "Turn views and analytics into your next move — every single post."
      }
    ]
  },

  // SLIDE 08 (Light)
  {
    id: 8,
    slideNum: "08",
    theme: "light",
    category: "QUALIFYING",
    scriptSnippet: "Who this video is for. This is for you if...",
    title: "WHO THIS VIDEO IS FOR",
    subtitle: "This is for you if...",
    type: "criteria_checklist",
    items: [
      "You want an Identity Brand, not just a personal brand — people follow how you say it, not just what you say.",
      "You're playing the long game: building a team, a real business, not chasing one viral post.",
      "You take action. You're not a procrastinator — you just need the roadmap.",
      "You don't want to burn 6 months and ₹5 lakh figuring this out solo.",
      "You see content as a system that plugs directly into your sales process."
    ]
  },

  // SLIDE 09 (Dark)
  {
    id: 9,
    slideNum: "09",
    theme: "dark",
    category: "TIME & MINDSET",
    scriptSnippet: "This takes 20 minutes. If you can't spend 20 minutes on the thing that grows your business...",
    title: "This takes 20 minutes.",
    subtitle: "If you can't spend 20 minutes on the thing that grows your business, this isn't for you — and that's fine.",
    type: "quote_box",
    quote: "“You don't find time for what matters. You make it — everything else was never a priority to begin with.”"
  },

  // SLIDE 10 (Light) - FIXED DIAGRAM: The Creator Valley J-Curve
  {
    id: 10,
    slideNum: "10",
    theme: "light",
    category: "REALISTIC EXPECTATIONS",
    scriptSnippet: "Set the right expectation. This is not overnight success. It's the Creator Valley.",
    title: "SET THE RIGHT EXPECTATION",
    subtitle: "This is not overnight success. It's the Creator Valley.",
    type: "creator_valley",
    bullets: [
      "There's no shortcut to a winning system on par with global brands — you put in the work.",
      "This is for brand-building, not quick money.",
      "You spend time and effort going down before the hockey-stick up."
    ],
    chartMeta: {
      xAxis: "Effort & Time →",
      yAxis: "Brand Equity & Revenue Potential →",
      dipLabel: "The Creator Valley (Deep Work & Positioning)",
      inflectionLabel: "Format Resonance",
      hockeyStickLabel: "Hockey-Stick Compounding (1 Cr+ Views)"
    }
  },

  // SLIDE 11 (Light) - ENHANCED COMPARISON
  {
    id: 11,
    slideNum: "11",
    theme: "light",
    category: "COLLABORATION MODEL",
    scriptSnippet: "How we work with you: This is NOT Done-For-You. It's Done-With-You.",
    title: "HOW WE WORK WITH YOU",
    subtitle: "This is NOT Done-For-You. It's Done-With-You.",
    type: "dfy_vs_dwy",
    dfy: {
      badge: "TRADITIONAL MODEL",
      title: "Done-For-You",
      bullets: [
        "You say: “take my money, handle it.”",
        "Best for giant businesses at ₹1 Cr+ revenue with existing teams.",
        "Zero interest in building an in-house asset or learning the craft.",
        "High monthly retainers (₹1–3 Lakhs/mo) with disconnected founder voice."
      ]
    },
    dwy: {
      badge: "OUR SPECIALTY ✓ THIS IS US",
      title: "Done-With-You",
      bullets: [
        "Ideal for businesses under ₹1 Cr who can't burn lakhs every month.",
        "Solopreneurs & experts training and managing their own creative team.",
        "₹1 Cr+ businesses that want an authentic in-house content engine with clear SOPs.",
        "You retain 100% IP ownership, authentic voice, and compounding equity."
      ]
    }
  },

  // SLIDE 12 (Dark)
  {
    id: 12,
    slideNum: "12",
    theme: "dark",
    category: "THE MACRO MISSION",
    scriptSnippet: "India hasn't tapped 0.5% of content's potential. Especially for business owners.",
    title: "India hasn't tapped 0.5% of content's potential.",
    subtitle: "Especially for business owners and experts. We built this to close that gap.",
    type: "mission_card",
    image: "/vsl_images/slide_12_sh_01.jpg",
    missionTitle: "The Creatorpreneur Mission",
    missionGoal: "By 2033: 1 Crore Creatorpreneurs, each built toward ₹1 Crore in revenue.",
    note: "You're now part of it."
  },

  // SLIDE 13 (Light)
  {
    id: 13,
    slideNum: "13",
    theme: "light",
    category: "NUMBERS & EVIDENCE",
    scriptSnippet: "Track record. What we actually did, in plain numbers.",
    title: "TRACK RECORD",
    subtitle: "What we actually did, in plain numbers.",
    type: "track_record",
    stats: [
      { num: "2 yrs", desc: "Backend content learning before ever posting" },
      { num: "48 days", desc: "To 50K followers — pure positioning" },
      { num: "1 Cr+", desc: "Views in 30 days, purely educational content" }
    ],
    mockups: [
      { img: "/vsl_images/slide_13_sh_13.jpg", caption: "Profile Dashboard (40.3K Followers)" },
      { img: "/vsl_images/slide_13_sh_15.jpg", caption: "Professional Insights (1.0 Cr Views, 11.0L Interactions)" }
    ],
    footnote: "Actual Instagram dashboards — 30-day views, interactions & follower growth"
  },

  // SLIDE 14 (Dark)
  {
    id: 14,
    slideNum: "14",
    theme: "dark",
    category: "DISQUALIFIERS",
    scriptSnippet: "Let's be blunt. Who this is NOT for.",
    title: "LET'S BE BLUNT",
    subtitle: "Who this is NOT for.",
    type: "disqualifiers",
    items: [
      "You don't want to learn — you just want a magic button.",
      "You want quick results and nothing else.",
      "You want to run the same race as everyone else with zero innovation."
    ]
  },

  // SLIDE 15 (Light) - ENHANCED ROADMAP
  {
    id: 15,
    slideNum: "15",
    theme: "light",
    category: "FUTURE VISION",
    scriptSnippet: "Where this is all heading. This is the future. You decide if you're in it.",
    title: "WHERE THIS IS ALL HEADING",
    subtitle: "This is the future. You decide if you're in it.",
    type: "evolution_timeline",
    stages: [
      {
        year: "2010",
        headline: "Company → Roadmap → Ads",
        desc: "Companies needed advertisements to survive. CAC was cheap; ads did the heavy lifting."
      },
      {
        year: "2025",
        headline: "Founder → Personal Brand",
        desc: "Company founders need personal branding. People buy from people they respect and trust."
      },
      {
        year: "2030",
        headline: "Company → Media Company",
        desc: "Every enduring company becomes a media company. Content is no longer marketing — it's the core engine."
      }
    ],
    caseStudy: "Example: Cookd — a food brand that became a media company. Content IS the business now."
  },

  // SLIDE 16 (Dark) - FIXED DIAGRAM: Founder Burnout Curve
  {
    id: 16,
    slideNum: "16",
    theme: "dark",
    category: "FOUNDER STRUGGLE",
    scriptSnippet: "Sound familiar? You are here. Offline business, tried content, hit burnout.",
    title: "SOUND FAMILIAR?",
    subtitle: "You are here.",
    type: "burnout_curve",
    bullets: [
      "You run an offline business.",
      "You're an expert in your field.",
      "You tried content creation — and you're on the verge of burnout."
    ],
    wallPill: "BURNOUT",
    takeaway: "We pivot you away from this curve — before you hit the wall."
  },

  // SLIDE 17 (Light)
  {
    id: 17,
    slideNum: "17",
    theme: "light",
    category: "PILLAR 01",
    scriptSnippet: "Framework 01: The Creator Codex Method — 7 steps before you shoot a single frame.",
    title: "FRAMEWORK 01",
    subtitle: "The Creator Codex Method — 7 steps before you shoot a single frame.",
    type: "framework_01",
    steps: [
      "Strong positioning — so nobody can copy you",
      "Never get stuck in the “what to post” loop",
      "Clean, conversion-ready profile setup",
      "A repeatable content strategy",
      "+ 3 more proprietary steps covered live on your call"
    ],
    pathTitle: "60-Day Path",
    pathPhases: [
      { phase: "Days 1–15", desc: "Build the foundation (Codex Method)" },
      { phase: "Days 16–60", desc: "Execute — your first 10 videos live" },
      { phase: "After that", desc: "You scale without needing us." }
    ]
  },

  // SLIDE 18 (Dark)
  {
    id: 18,
    slideNum: "18",
    theme: "dark",
    category: "PILLAR 02",
    scriptSnippet: "Framework 02: The Brain-First Engine System.",
    title: "FRAMEWORK 02",
    subtitle: "The Brain-First Engine System",
    type: "engine_grid",
    headline: "3 hours per script → 15 content ideas mapped in 2 days.",
    cards: [
      { stat: "2–5", label: "Reels / day across IG + YouTube" },
      { stat: "Weekly", label: "Regular high-retention carousels" },
      { stat: "2×", label: "20-min long-form videos / week" },
      { stat: "Daily", label: "Structured story conversion sequences" },
      { stat: "3", label: "Communities built, 1,300+ active members" },
      { stat: "Zero", label: "Creative block with automated script pipelines" }
    ]
  },

  // SLIDE 19 (Light)
  {
    id: 19,
    slideNum: "19",
    theme: "light",
    category: "DIFFERENTIATION",
    scriptSnippet: "Unique positioning. The formula behind a winning content format.",
    title: "UNIQUE POSITIONING",
    subtitle: "The formula behind a winning content format.",
    type: "positioning_formula",
    formula: "Content Format + You + Ownership = Winning Asset",
    explanation: "“Rating content” went viral in Tamil and nobody remembers who started it — because nobody owned it. If that creator had claimed it as their signature, the entire trajectory changes."
  },

  // SLIDE 20 (Dark)
  {
    id: 20,
    slideNum: "20",
    theme: "dark",
    category: "PILLAR 03",
    scriptSnippet: "Framework 03: The After-Post APA Matrix. Turn views into leads.",
    title: "FRAMEWORK 03",
    subtitle: "The After-Post APA Matrix",
    type: "apa_matrix",
    kicker: "Views and analytics only matter if you know what to do with them next.",
    warning: "“Format copied by competitors” isn't a risk. It's a certainty. In the next 6–12 months you have two options:",
    options: [
      {
        badge: "OPTION A · THE WINNING PATH",
        title: "Build & own a unique format.",
        desc: "Become the recognized industry leader. Let others copy you — we build and defend it with you."
      },
      {
        badge: "OPTION B · THE COMMODITY TRAP",
        title: "Go it alone.",
        desc: "Fine — but if someone else in your niche builds that winning format first, you'll be the one copying them."
      }
    ]
  },

  // SLIDE 21 (Light) - FIXED DIAGRAM: The 60-Day Sprint Roadmap Architecture
  {
    id: 21,
    slideNum: "21",
    theme: "light",
    category: "THE OFFER",
    scriptSnippet: "This is what we do: The 60-Day Personal Branding Sprint.",
    title: "THIS IS WHAT WE DO",
    subtitle: "The 60-Day Personal Branding Sprint.",
    type: "sprint_architecture",
    phases: [
      {
        num: "01",
        days: "DAYS 1–15",
        name: "Creator Codex",
        bullets: ["Positioning & Niche Moat", "Bio & Offer Redesign", "7-Step Script Formulas"]
      },
      {
        num: "02",
        days: "DAYS 16–45",
        name: "Brain-First Engine",
        bullets: ["15 Content Ideas Mapped", "Shoot & DWY Edit Sprint", "First 10 Live Videos"]
      },
      {
        num: "03",
        days: "DAYS 46–60",
        name: "APA Scale Matrix",
        bullets: ["View-to-Lead Funnel", "Compounding Distribution", "Scale Without Us"]
      }
    ],
    callout: "Full breakdown, pricing & onboarding walkthrough — shown live on your call."
  },

  // SLIDE 22 (Dark)
  {
    id: 22,
    slideNum: "22",
    theme: "dark",
    category: "CLOSING CTA",
    scriptSnippet: "The next wave is coming. Ride it early — or watch someone else succeed first.",
    title: "The next wave is coming.",
    subtitle: "Ride it early — or watch someone else succeed first and jump in late.",
    type: "closing_cta",
    ctaBox: {
      headline: "We take 7–12 clients / month.",
      subtext: "If we're full, you'll be waitlisted."
    },
    closingNote: "If you watched this far, you're already in the top 1% of the Tamil creator space.",
    handle: "@firstselfie · firstselfie.com"
  }
];
