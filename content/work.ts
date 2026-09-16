export type Screenshot = {
  src: string;
  alt: string;
  /** Served before the mp4 when present — smaller for Chrome/Firefox. */
  srcWebm?: string;
  /** First frame, shown until playback starts and whenever autoplay is blocked. */
  poster?: string;
};

export type Project = {
  slug: string;
  name: string;
  partners?: string;
  role?: string;
  website?: { href: string; label: string };
  demo?: { href: string; label: string };
  tags: string[];
  body: string | string[];
  /** Gallery frame shape. Defaults to 16/10 (3/2 on mobile) for website captures. */
  aspect?: "16/9" | "16/10" | "9/16" | "4/3";
  /** "contain" letterboxes/pillarboxes media with a dark background instead of cropping. */
  objectFit?: "contain";
  /** "fit" shows the full image at its natural height instead of cropping to the frame. */
  displayMode?: "fit";
  screenshots: Screenshot[];
  draft?: boolean;
};

export type Client = {
  slug: string;
  name: string;
  /** Override the label shown in the row heading. Defaults to name. */
  title?: string;
  discipline: string;
  /** Override the image shown in the row hover thumbnail. Defaults to the first screenshot. */
  cardImage?: string;
  projects: Project[];
};

export const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

/** A still safe to hand `next/image` — the poster when the asset is a video. */
export const stillFor = (shot: Screenshot) =>
  isVideo(shot.src) ? (shot.poster ?? "") : shot.src;

const screenshot = (
  src: string,
  client: string,
  project: string,
  page = "homepage",
): Screenshot => ({
  src,
  alt: `${client} - ${project} ${page}`,
});

// TODO: replace with the actual Velodea job title, then delete this note.
const VELODEA = "Web Developer";

export const work: Client[] = [
  {
    slug: "comtac-training",
    name: "Comtac Training",
    discipline: "Web App",
    cardImage: "/projects/comtac/comtac-training-homepage.png",
    projects: [
      {
        slug: "firefighter-training",
        name: "Firefighter Training Simulation",
        role: "Full-Stack Web Developer",
        website: {
          href: "https://www.comtactraining.com",
          label: "comtactraining.com",
        },
        tags: [
          "Web App Development",
          "Simulation",
          "Voice Interaction",
          "E-Learning",
        ],
        body: [
          "Comtac's firefighter training app puts trainees in command of a live incident without a human on the other end. Starting with a 360-degree structure walkthrough, the trainee calls in a size-up, directs arriving units, and works through the scenario verbally, with a dispatcher and incoming crews respond in real audio, keeping the incident moving in real time. At the end of each session, a self-evaluation and scored review let the trainee measure their performance against the call.",
          "I built the web app end to end. The pipeline captures mic audio and transcribes it with ElevenLabs, sends the transcript to the OpenAI API to generate contextually appropriate dispatcher and unit responses, then synthesizes them back to speech through ElevenLabs. Incident video and the 360-degree walkthroughs are hosted and streamed through Mux; voice recordings are stored on Amazon S3; session data, self-evaluations and scores are saved for post-session review. The platform integrates with Stripe for recurring subscription payments.",
        ],
        aspect: "16/9",
        screenshots: [
          {
            src: "/projects/comtac/comtac-sim.mp4",
            srcWebm: "/projects/comtac/comtac-sim.webm",
            poster: "/projects/comtac/simulation.webp",
            alt: "Comtac: Firefighter Training Simulation: size-up prompts turning green as the trainee reports conditions at a structure fire",
          },
          {
            src: "/projects/comtac/comtac-training-homepage.png",
            alt: "Comtac Training: homepage",
          },
          {
            src: "/projects/comtac/peer-review.png",
            alt: "Comtac Training: peer review",
          },
        ],
      },
    ],
  },
  {
    slug: "hacker-dojo",
    name: "Hacker Dojo × S.U.A.S",
    title: "Hackathon",
    discipline: "Hackathon",
    cardImage: "/projects/hackathon/veterans-hackathon-certificate.png",
    projects: [
      {
        slug: "veteran-innovation-hackathon",
        name: "Veteran Innovation Hackathon",
        website: { href: "https://github.com/moseley/suasqrf", label: "github.com/moseley/suasqrf" },
        demo: { href: "https://suasqrf.vercel.app/", label: "suasqrf.vercel.app" },
        tags: ["Hackathon", "Veteran Innovation", "Award"],
        body: [
          "The Veteran Innovation Hackathon was a 3-day event at Hacker Dojo in Mountain View bringing together veterans, engineers, designers, and community builders to co-create solutions to the challenges veterans face when navigating the support systems built for them. Teams heard directly from veterans about their lived experiences, then built working prototypes aimed at making it faster and simpler to find and connect with the right resources.",
          "I built the Next.js application, designed around a single principle: when a veteran needs help right now, every second counts. The entire experience distills to three choices (Ride, Meal, and Emergency Shelter) connecting them to immediate support without friction. Our team took first place.",
        ],
        aspect: "4/3",
        objectFit: "contain",
        screenshots: [
          {
            src: "/projects/hackathon/suasqrf-walkthrough.webm",
            alt: "S.U.A.S QRF app walkthrough",
            poster: "/projects/hackathon/suasqrf-walkthrough-poster.jpg",
          },
          {
            src: "/projects/hackathon/veterans-hackathon-certificate.png",
            alt: "2026 Veteran Innovation Hackathon Winner certificate",
          },
          {
            src: "/projects/hackathon/team.jpg",
            alt: "Hackathon team photo",
          },
        ],
      },
    ],
  },
  {
    slug: "shell",
    name: "Shell",
    discipline: "Campaigns",
    projects: [
      {
        slug: "eco-marathon",
        name: "Eco-marathon",

        role: "Lead Engineer",
        tags: [
          "Web App Development",
          "Event Platform",
          "Sustainability",
          "On-site Support",
        ],
        body: [
          "Shell Eco-marathon is one of the world's leading energy-efficiency engineering programmes for students, giving high school and university teams a platform to design and build ultra-efficient vehicles and race them in competition across regional events in the Americas, Europe, and Asia.",
          "In partnership with Publicis, I built the global registration system for competing teams, a social media hub aggregating coverage across the events, and the press lodging and check-in system. I also provided on-site support at the Americas and Europe events.",
        ],
        screenshots: [
          screenshot(
            "/projects/shell/eco-marathon.png",
            "Shell",
            "Eco-marathon",
          ),
        ],
      },
      {
        slug: "passionate-experts",
        name: "Passionate Experts",

        role: "Interactive Developer",
        tags: [
          "Interactive Experience",
          "Brand Campaign",
          "ActionScript",
          "Video",
        ],
        body: [
          "Passionate Experts was Shell's consumer campaign for nitrogen-enriched V-Power, built as a facility visitors walked through rather than a page they scrolled. From a central lobby, users moved between a laboratory, a garage, a lounge and a test bay, each making a different part of the case for how the fuel keeps deposits off critical engine parts. Two lab-coated hosts guided the tour in live-action video.",
          "I programmed the interactivity in ActionScript: the room-to-room navigation, the hotspots that triggered each host segment, and jumbotron playback.",
        ],
        screenshots: [
          screenshot(
            "/projects/shell/passionate-experts/lobby.webp",
            "Shell",
            "Passionate Experts",
            "virtual lobby",
          ),
        ],
      },
      {
        slug: "v-power-v-zine",
        name: "V-Power V-zine",
        role: "Web Developer",
        tags: ["Email Development", "Editorial", "Campaign"],
        body: [
          "The Shell V-Power V-zine was a premium lifestyle publication for V-Power fuel, targeting car enthusiasts and Shell loyalty club members. Managed by Edelman via shellvzine.com, each issue read like editorial car journalism: behind-the-scenes access to Shell's Scuderia Ferrari F1 partnership, high-performance vehicle features, fuel science explainers, and exclusive sweepstakes and rewards for loyalty members.",
          "I built a CMS for managing each issue's images and copy, rendering them into both an HTML email and a plain-text version for deliverability, as well as a full web archive. I also built the bulk email sending and statistics platform.",
        ],
        screenshots: [
          screenshot(
            "/projects/shell/v-power-v-zine/spotlight-2.webp",
            "Shell",
            "V-Power V-zine",
            "December 2010 issue",
          ),
        ],
      },
    ],
  },
  {
    slug: "maserati",
    name: "Maserati",
    discipline: "Campaigns",
    projects: [
      {
        slug: "concierge",
        name: "Concierge",

        role: "Digital Campaign Developer",
        tags: ["Email Development", "Print-to-Digital"],
        body: [
          "The Maserati Concierge was a lead-generation microsite for the GranTurismo and Quattroporte lines, running as a companion to print advertising in Robb Report. Built to move a reader to a dealer visit in three screens, it opens on a full-bleed intro, asks the visitor to select the models they want to see as a multi-select so the request carries real intent, then collects contact and address details for a V.I.P. test drive request routed to their nearest authorized dealer.",
          "I translated the PSD designs to HTML and built the site's functionality. Submitted contacts fed a back-end dashboard where lead data could be exported as Excel spreadsheets and distributed to the appropriate dealerships.",
        ],
        screenshots: [
          screenshot(
            "/projects/maserati/concierge/intro.webp",
            "Maserati",
            "Concierge",
            "GranTurismo intro",
          ),
          screenshot(
            "/projects/maserati/concierge/model-select.webp",
            "Maserati",
            "Concierge",
            "model selection",
          ),
          screenshot(
            "/projects/maserati/concierge/vip-request.webp",
            "Maserati",
            "Concierge",
            "V.I.P. test drive request",
          ),
        ],
      },
      {
        slug: "tri-state-dealers",
        name: "Tri-State Dealers",

        role: "Digital Campaign Developer",
        tags: ["Landing Pages", "Event Registration"],
        body: [
          "Tri-State Maserati Dealers was a co-op site for ten dealerships across New York, New Jersey and Connecticut, sharing one campaign rather than running ten. A mapped dealer locator directs visitors to their nearest showroom, a model carousel covers the current line with pricing, and a single inquiry form captures intent (preferred model, purchase or lease, timeframe and current vehicle) before routing the lead to the appropriate dealer.",
          "I built the site, including a Google Maps API integration for the dealer locator that identified the nearest dealership by zip code. Submitted inquiries were automatically routed to the closest location, and a back-end dashboard provided full contact export options for each dealership.",
        ],
        screenshots: [
          screenshot(
            "/projects/maserati/tri-state-dealers/home.webp",
            "Maserati",
            "Tri-State Dealers",
          ),
        ],
      },
      {
        slug: "campaign-emails-microsites",
        name: "Campaign Emails & Microsites",

        role: "Digital Campaign Developer",
        tags: ["Email Development", "Event Registration", "CMS", "Microsites"],
        body: [
          "Maserati's U.S. email campaigns were invitations to test drives, vehicle launches and branded experiences. Each campaign paired an HTML email with a dedicated microsite built on a matching template, carrying the creative consistently from inbox to landing page. The emails were hand-coded with HTML tables for precise cross-client rendering, always accompanied by a plain-text version for deliverability. Each microsite included a registration form that collected attendee details for the event promoter.",
          "I built the emails and their companion microsites. The emails were constructed using HTML tables to ensure reliable formatting across email clients. Each microsite ran on a CMS that applied the campaign template to the content, and the registration forms fed an export system that delivered attendee contact data directly to the event promoter.",
        ],
        screenshots: [
          screenshot(
            "/projects/maserati/winter.png",
            "Maserati",
            "Campaign Emails & Microsites",
            "Winter Revel Event microsite",
          ),
          screenshot(
            "/projects/maserati/dealer-email/granturismo.webp",
            "Maserati",
            "Campaign Emails & Microsites",
            "GranTurismo email",
          ),
          screenshot(
            "/projects/maserati/dealer-email/ghibli.webp",
            "Maserati",
            "Campaign Emails & Microsites",
            "Ghibli email",
          ),
        ],
      },
    ],
  },
  {
    slug: "hawker-beechcraft",
    name: "Hawker Beechcraft",
    discipline: "Website",
    projects: [
      {
        slug: "journey",
        name: "Journey",

        role: "Full-Stack Web Developer",
        tags: [
          "Web Development",
          "Content Platform",
          "Personalization",
          "Dynamic Grid Layout",
        ],
        body: [
          "Journey is Beechcraft's content hub, a single destination that brought together press releases, technical documents, videos, employee spotlights, customer stories and campaign material that had previously lived in silos or been published once and moved on. Rather than asking visitors to search, the site surfaced content relevant to each person through a recommendation system, presenting it in a dynamic grid where size and placement reflected each item's type and prominence.",
          "I built the site and its back-end systems. The recommendation engine observed the content each visitor engaged with and used that signal to build an audience profile, surfacing more appropriate material on return visits without requiring an account. An API integration pulled tagged Instagram posts into the content stream, held behind a staff approval step before going live. Users could also submit their own stories through a Share Your Story form, which fed the same approval workflow before appearing on the site.",
        ],
        screenshots: [
          screenshot(
            "/projects/hawker-beechcraft/journey.png",
            "Hawker Beechcraft",
            "Journey",
            "overview",
          ),
          screenshot(
            "/projects/hawker-beechcraft/journey/share-your-story.webp",
            "Hawker Beechcraft",
            "Journey",
            "Share Your Story submissions",
          ),
          screenshot(
            "/projects/hawker-beechcraft/journey/detail.webp",
            "Hawker Beechcraft",
            "Journey",
            "article detail",
          ),
        ],
      },
      {
        slug: "corporate-rebrand",
        name: "Corporate Rebrand",

        role: "Web Developer",
        tags: ["Web Development", "Product Marketing", "Brand Refresh", "Aviation"],
        body: [
          "When Hawker Beechcraft split into two independent brands, Beechcraft needed a full marketing presence built to the new identity. The site covered every aircraft in the lineup, with dedicated pages for interior, flight deck, exterior, performance, specifications, and gallery for each model. A range map let visitors enter their departure airport and see the aircraft's reach overlaid on a map.",
          "I built the CMS that powered the site, which allowed the team to author and manage all of those pages without touching code. My focus was the marketing front end. The primary challenge was fidelity to the new Beechcraft style guide, matching typography, color, and layout precisely across a large and varied page set.",
        ],
        screenshots: [
          screenshot(
            "/projects/hawker-beechcraft/corporate/home.webp",
            "Hawker Beechcraft",
            "Corporate Rebrand",
          ),
          screenshot(
            "/projects/hawker-beechcraft/corporate/baron-g58.webp",
            "Hawker Beechcraft",
            "Corporate Rebrand",
            "Baron G58 overview",
          ),
          screenshot(
            "/projects/hawker-beechcraft/corporate/air-ambulance.webp",
            "Hawker Beechcraft",
            "Corporate Rebrand",
            "Special Missions air ambulance",
          ),
        ],
      },
      {
        slug: "china-site",
        name: "China Site",
        role: "Web Developer",
        tags: ["Web Development", "Localization", "Aviation"],
        body: [
          "The Hawker Beechcraft China site was a localized version of the main marketing site for the Chinese market, presenting the aircraft available in that region in Simplified Chinese. The design matched the U.S. site exactly, carrying over the same layout, typography, and visual identity so the two properties read as a single brand across markets.",
          "I was responsible for the front-end build, replicating the U.S. site's design in Simplified Chinese. A significant part of the project was navigating the hosting requirements: the site had to be served from within China, which introduced considerable complexity in setting up a compliant server environment.",
        ],
        screenshots: [
          screenshot(
            "/projects/hawker-beechcraft/cn.png",
            "Hawker Beechcraft",
            "China Site",
          ),
        ],
      },
      {
        slug: "flightpath",
        name: "FlightPath",
        role: "Web Developer",
        tags: ["Email Development", "Customer Newsletter", "Aviation"],
        body: [
          "FlightPath was the Hawker Beechcraft Global Customer Support magazine, published quarterly and mailed to customers. The microsite presented each issue as a digital flipbook, with the current issue featured on the homepage alongside a summary of its top stories and a browsable archive of past issues. Readers could also subscribe, share with a friend, or request more information directly from the site.",
          "Each quarter I built the companion email that went out to the customer list, highlighting the lead stories from that issue and driving readers to the microsite. I also built and maintained the microsite itself, updating it with each new issue.",
        ],
        screenshots: [
          screenshot(
            "/projects/hawker-beechcraft/flightpath.png",
            "Hawker Beechcraft",
            "FlightPath",
          ),
        ],
      },
    ],
  },
  {
    slug: "elac",
    name: "ELAC",
    discipline: "Website",
    projects: [
      {
        slug: "debut",
        name: "Debut",
        role: "Web Developer",
        tags: ["Web Development", "CMS", "Cloud Infrastructure", "Localization"],
        body: [
          "Founded in Kiel, Germany in 1926, ELAC has spent nearly a century refining a single pursuit: the best possible sound. Known for landmark innovations like the JET folded-ribbon tweeter, the brand holds a respected place among audiophiles worldwide. The Debut site served as the marketing platform for their speaker lineup, presented in both English and German to reach their international audience.",
          "I built the CMS that the team used to manage and publish speaker product pages across both languages. I was also responsible for the cloud infrastructure, setting up AWS Elastic Load Balancing with auto-scaling EC2 instances to keep the site highly available under variable traffic, including the spikes that came with new product announcements.",
        ],
        draft: true,
        screenshots: [screenshot("/projects/elac/elac-homepage.png", "ELAC", "Debut")],
      },
    ],
  },
  // {
  //   slug: "oh-wow",
  //   name: "Oh Wow Marketing",
  //   discipline: "Website",
  //   projects: [
  //     {
  //       slug: "bracket",
  //       name: "Bracket",
  //       role: "Web Developer",
  //       tags: ["Web Development"],
  //       body: "",
  //       draft: true,
  //       screenshots: [screenshot("/projects/jw/bracket.jpg", "JW", "Bracket")],
  //     },
  //   ],
  // },
  {
    slug: "reza",
    name: "REZA Investment Group",
    discipline: "Web App",
    projects: [
      {
        slug: "corporate-site",
        name: "Corporate Site & REZAnet",

        role: VELODEA,
        tags: [
          "Web Development",
          "Web App",
          "Salesforce Integration",
          "Document Management",
          "Commercial Real Estate",
        ],
        body: [
          "REZA Investment Group brokers retail investment property across the Western U.S., including regional malls, neighborhood centers, power centers, urban and lifestyle retail. The public site presents the firm's services, featured opportunities, and closing announcements, and serves as the entry point to REZAnet: a gated marketplace where registered brokers and investors access the firm's live inventory. Inside REZAnet, users browse current opportunities and download due diligence documents, with some files requiring a signed NDA before access is granted.",
          "The platform was deeply integrated with Salesforce, which served as the content source of truth. Property listings, documents, and user data all flowed through the Salesforce API, and every user action on the site was tracked back to the CRM so the sales team always had current activity data for follow-up. I built all of the Salesforce API integrations, the document management and NDA workflow, and the front-end theme.",
        ],
        screenshots: [
          screenshot(
            "/projects/reza/website/home.webp",
            "REZA Investment Group",
            "Corporate Site",
          ),
          screenshot(
            "/projects/reza/rezanet/marketplace.webp",
            "REZA Investment Group",
            "REZAnet",
            "property marketplace",
          ),
        ],
      },
    ],
  },
  {
    slug: "clarke-marine-garvey",
    name: "Clarke Marine Garvey",
    discipline: "Website",
    projects: [
      {
        slug: "insurance-site",
        name: "Insurance Services",

        role: VELODEA,
        tags: ["Web Development", "Lead Capture", "Insurance", "Forms"],
        body: [
          "Clarke Marine Garvey is a Costa Mesa insurance brokerage writing commercial, health and life, and personal lines, including the marine and collector-vehicle policies its name points at. With more than forty coverage types spanning ocean marine, surety bonds, COBRA administration, and jewelry, the site organizes the full product range into four navigable paths so visitors can quickly find what they need.",
          "I built the site theme and its two lead-capture flows: a contact portal that collects name, phone, email, and coverage topic and routes the inquiry to the appropriate party, and a claim form that lets policyholders start the claims process online rather than by phone.",
        ],
        screenshots: [
          screenshot(
            "/projects/clarke-marine-garvey/website/home.webp",
            "Clarke Marine Garvey",
            "Insurance Services",
          ),
          screenshot(
            "/projects/clarke-marine-garvey/website/personal-insurance.webp",
            "Clarke Marine Garvey",
            "Insurance Services",
            "personal insurance",
          ),
          screenshot(
            "/projects/clarke-marine-garvey/website/claim-form.webp",
            "Clarke Marine Garvey",
            "Insurance Services",
            "claim form",
          ),
        ],
      },
    ],
  },
  /* --- projects below Clarke Marine: restore when ready ---
  {
    slug: "run-racing",
    name: "Run Racing",
    discipline: "Events",
    projects: [
      {
        slug: "corporate-site",
        name: "Corporate Site",

        role: VELODEA,
        tags: ["Web Development", "Events", "Social Integration"],
        body: "Run Racing produces and manages endurance events across Southern California, from the Long Beach International City Marathon to the Orange County Heart Run & Walk. The site works two audiences at once: runners looking for their next race, and organizations shopping for someone to run theirs. It splits them at the homepage into an events track and an event-management services track, pulls the company's Facebook feed in as a live news stream so race announcements land without a CMS update, and captures runner signups by name, email and zip code for future event mailings. I built the site.",
        screenshots: [
          screenshot(
            "/projects/run-racing/website/home.webp",
            "Run Racing",
            "Corporate Site",
          ),
        ],
      },
      {
        slug: "holiday-half-marathon",
        name: "Holiday Half Marathon",

        role: VELODEA,
        tags: ["Event Site", "Web Development"],
        body: "The Holiday Half Marathon is Run Racing's own December event at the Fairplex in Pomona: a half marathon, 5K and kids' run drawing around 7,500 participants, billed as the San Gabriel Valley's premier health and fitness event. It gets a standalone site rather than a page on the parent, because a race sells on atmosphere: the photo strip of runners in Santa hats and tutus, the finish-line video, the collectible snowflake medals struck for each distance. Race details and course information live here through the season, and the site carries the photo and video recap afterward. I built the event site.",
        screenshots: [
          screenshot(
            "/projects/run-racing/holiday-half/event.webp",
            "Run Racing",
            "Holiday Half Marathon",
            "event site",
          ),
        ],
      },
    ],
  },
  {
    slug: "ast",
    name: "AST Basketball",
    discipline: "Website",
    projects: [
      {
        slug: "training-site",
        name: "Training & Scheduling",

        role: VELODEA,
        tags: ["Web Development", "Scheduling", "Youth Sports"],
        body: "AST Basketball trains youth players out of a 3,000 square foot gym near Old Town Pasadena, from six-year-olds learning fundamentals to eighteen-year-olds preparing for college ball. The site's real work is the schedule: a week, month and day calendar covering personalized training slots, beginner and intermediate group classes, advanced sessions and Saturday clinics, colour-coded by type so a parent can find the right slot at a glance. Class descriptions, facility details and summer camp information sit alongside it, and clinic pricing and reservation details stay pinned to a sidebar across the site. I built the site and its scheduling calendar.",
        screenshots: [
          screenshot(
            "/projects/ast/website/home.webp",
            "AST Basketball",
            "Training & Scheduling",
          ),
          screenshot(
            "/projects/ast/website/schedule.webp",
            "AST Basketball",
            "Training & Scheduling",
            "class schedule calendar",
          ),
          screenshot(
            "/projects/ast/website/classes.webp",
            "AST Basketball",
            "Training & Scheduling",
            "class listings",
          ),
        ],
      },
    ],
  },
  {
    slug: "minifarmbox",
    name: "MiniFarmBox",
    discipline: "E-commerce",
    projects: [
      {
        slug: "garden-store",
        name: "Garden Kit Store",

        role: VELODEA,
        tags: ["E-commerce", "Web Development", "Content Marketing"],
        body: "MiniFarmBox sells cedar raised garden beds, rolling planters, standing gardens, drip irrigation kits and organic seed, bringing the farmer's market to your own back yard. The store has to sell a physical product that arrives as a kit and then keep the buyer succeeding with it, so alongside the catalog and checkout it carries planting menus, growing tips and an installations gallery, plus a beginners' guide to organic gardening offered in exchange for an email address. Category and quick-pick selectors and product search cut into the catalog straight from the homepage. I built the storefront.",
        screenshots: [
          screenshot(
            "/projects/minifarmbox/website/home.webp",
            "MiniFarmBox",
            "Garden Kit Store",
          ),
          screenshot(
            "/projects/minifarmbox/website/products.webp",
            "MiniFarmBox",
            "Garden Kit Store",
            "product catalog",
          ),
        ],
      },
    ],
  },
  {
    slug: "jardin-seeds",
    name: "Jardin Seeds",
    discipline: "E-commerce",
    projects: [
      {
        slug: "seed-store",
        name: "Specialty Seed Collections",

        role: VELODEA,
        tags: ["E-commerce", "Subscription", "Web Development"],
        body: "Jardin sells specialty heirloom and open-pollinated seed as curated collections rather than loose packets: ten themed boxes covering chef's gardens, cooking herbs, heirloom tomatoes, hot and sweet peppers, Asian and Mediterranean vegetables, high-protein crops and a children's collection. Buyers take a single collection or the full seed library. The site also runs a seed-of-the-month club customized to the subscriber's climate zone, and offers a printed catalog in exchange for an address. I built the site and its store.",
        screenshots: [
          screenshot(
            "/projects/jardin-seeds/website/home.webp",
            "Jardin Seeds",
            "Specialty Seed Collections",
          ),
          screenshot(
            "/projects/jardin-seeds/website/collections.webp",
            "Jardin Seeds",
            "Specialty Seed Collections",
            "seed collections",
          ),
        ],
      },
    ],
  },
  {
    slug: "canary100",
    name: "Canary 100",
    discipline: "Website",
    projects: [
      {
        slug: "product-site",
        name: "Radiation Detector",

        role: VELODEA,
        tags: ["Web Development", "Product Marketing", "E-commerce"],
        body: "The Canary 100 is a keychain-sized alpha radiation detector (named for the canary coal miners carried as an early warning) that chirps faster as it picks up radioactive particles in the environment around you. It was the first affordable consumer product of its kind, and the site had to explain an unfamiliar instrument to people who had never shopped for one: how to use it, how it is manufactured, the lineage behind the name, and an FAQ, alongside an order page carrying pricing, the introductory rate and live stock status. I built the site.",
        screenshots: [
          screenshot(
            "/projects/canary100/website/home.webp",
            "Canary 100",
            "Radiation Detector",
          ),
          screenshot(
            "/projects/canary100/website/about.webp",
            "Canary 100",
            "Radiation Detector",
            "about the product",
          ),
          screenshot(
            "/projects/canary100/website/manufacturing.webp",
            "Canary 100",
            "Radiation Detector",
            "manufacturing",
          ),
        ],
      },
    ],
  },
  {
    slug: "going-organic",
    name: "Going Organic",
    discipline: "Publishing",
    projects: [
      {
        slug: "magazine-site",
        name: "Magazine Site",

        role: VELODEA,
        tags: ["Publishing", "Web Development", "Advertising"],
        body: "Going Organic is a Palm Springs quarterly on sustainable living and ethical consumerism, with Ed Begley Jr. on the cover of the issue the site launched around. It runs as a magazine's whole digital operation: the current issue readable online, an archive reaching back a dozen issues to Spring 2011, a pickup-location finder for the free print edition, and a featured article surfaced on the homepage. Advertising is the business model, so the right rail carries live advertiser placements and a dedicated advertise section sells the program to local businesses. I built the site.",
        screenshots: [
          screenshot(
            "/projects/going-organic/website/home.webp",
            "Going Organic",
            "Magazine Site",
          ),
          screenshot(
            "/projects/going-organic/website/advertise.webp",
            "Going Organic",
            "Magazine Site",
            "advertiser program",
          ),
        ],
      },
    ],
  },
  {
    slug: "going-barefoot",
    name: "Going Barefoot",
    discipline: "Publishing",
    projects: [
      {
        slug: "magazine-site",
        name: "Magazine Site",

        role: VELODEA,
        tags: ["Publishing", "Web Development", "Editorial"],
        body: "Going Barefoot is a companion publication to Going Organic covering earthing, the practice of direct physical contact with the ground, and the health claims made for it. The site's job is persuasion by accumulation: a stories section collecting first-person accounts from people who tried it, a science section for the research, a Q&A with earthing advocate Clint Ober, video testimonials, and the magazine itself readable as an online flipbook. Sponsor placements for grounding products and footwear run alongside the editorial. I built the site.",
        screenshots: [
          screenshot(
            "/projects/going-barefoot/website/home.webp",
            "Going Barefoot",
            "Magazine Site",
          ),
          screenshot(
            "/projects/going-barefoot/website/stories.webp",
            "Going Barefoot",
            "Magazine Site",
            "reader stories",
          ),
        ],
      },
    ],
  },
  {
    slug: "genuine-draft",
    name: "Genuine Draft Horse Ranch",
    discipline: "Website",
    projects: [
      {
        slug: "ranch-site",
        name: "Venue & Film Locations",

        role: VELODEA,
        tags: ["Web Development", "Venue Marketing", "Galleries"],
        body: "Genuine Draft Horse Ranch sits on five acres in a Morongo Valley canyon, twenty minutes from Palm Springs, and rents itself out three ways: as a party and wedding venue, as a working ranch attraction with draft horses and carriage rides, and as a film location. The site handles all three from one navigation. The film locations section details each shootable space (saloon, barn, courtyard, bed and breakfast, surrounding mountains) at the dimensions and character a location scout actually needs, each with its own gallery, and a reservations path runs alongside. I built the site.",
        screenshots: [
          screenshot(
            "/projects/genuine-draft/website/home.webp",
            "Genuine Draft Horse Ranch",
            "Venue & Film Locations",
          ),
          screenshot(
            "/projects/genuine-draft/website/film-locations.webp",
            "Genuine Draft Horse Ranch",
            "Venue & Film Locations",
            "film locations",
          ),
        ],
      },
    ],
  },
  {
    slug: "carolwood-pacific",
    name: "Carolwood Pacific",
    discipline: "Nonprofit",
    projects: [
      {
        slug: "historical-society",
        name: "Historical Society",

        role: VELODEA,
        tags: ["Web Development", "Nonprofit", "Membership"],
        body: "The Carolwood Pacific Historical Society preserves Walt Disney's personal railroad legacy: the one-eighth scale live-steam railroad he built in his Holmby Hills backyard, and the barn beside it that now stands open to the public in Griffith Park. The site is the society's public face and its membership engine at once: the history for visitors who arrive curious, a calendar of barn open days, a store, a switch yard section and a join path. The design leans period throughout, built around letterpress-era wood type and Disney's own handwriting. I built the site.",
        screenshots: [
          screenshot(
            "/projects/carolwood-pacific/website/home.webp",
            "Carolwood Pacific",
            "Historical Society",
          ),
        ],
      },
    ],
  },
  {
    slug: "sarges",
    name: "Sarge's Community Base",
    discipline: "Nonprofit",
    projects: [
      {
        slug: "nonprofit-site",
        name: "Nonprofit Site",

        role: VELODEA,
        tags: ["Web Development", "Nonprofit", "Fundraising"],
        body: "Sarge's Community Base is a Los Angeles nonprofit running leadership and life-skills programs for at-risk adolescents, founded by a former Marine Corps drill instructor. Its site has to do what a small nonprofit's site always has to do: establish that the organization is real, so it leads with donation, then stacks the evidence behind it: video of the cadets and of local press coverage, the CIIA life-skills curriculum, the annual golf classic and awards dinner, and a long rail of endorsement letters from the Sheriff's Department, the State Senate, the Assembly and the County Board of Supervisors. I built the site.",
        screenshots: [
          screenshot(
            "/projects/sarges/website/home.webp",
            "Sarge's Community Base",
            "Nonprofit Site",
          ),
        ],
      },
    ],
  },
  {
    slug: "hana-snowy",
    name: "Hana Snowy",
    discipline: "Website",
    projects: [
      {
        slug: "pet-salon",
        name: "Pet Salon & Spa",

        role: VELODEA,
        tags: ["Web Development", "Local Business", "Email Capture"],
        body: "Hana Snowy is a pet grooming salon in San Marino serving the San Gabriel Valley. It is a small site doing a small number of things well: what the salon offers, from full bath and grooming down to nail service and teeth brushing; where it is and how to book an appointment; and a mailing list (Hana Snowy's Circle of Friends) that captures the pet's name alongside the owner's, so promotions and first-visit gifts can go out addressed to the animal. I built the site.",
        screenshots: [
          screenshot(
            "/projects/hana-snowy/website/home.webp",
            "Hana Snowy",
            "Pet Salon & Spa",
          ),
        ],
      },
    ],
  },
  {
    slug: "ellys-organics",
    name: "Elly's Organics",
    discipline: "Website",
    projects: [
      {
        slug: "product-site",
        name: "Product Site",

        role: VELODEA,
        tags: ["Web Development", "Product Marketing", "Food & Beverage"],
        body: "Elly's Organics makes organic, sugar-free, gluten-free brownie and cake mix, created by Dr. Annette Deyhle, a marine geochemist who moved from earthquake-zone research at Scripps to the kitchen, after growing up in a household organized around her father's type 1 diabetes. The site sells the product by telling that story at length, because the founder's scientific credentials are the credibility, then makes it actionable with recipes and a where-to-buy list of stockists across the Coachella Valley. I built the site.",
        screenshots: [
          screenshot(
            "/projects/ellys-organics/website/home.webp",
            "Elly's Organics",
            "Product Site",
          ),
        ],
      },
    ],
  },
  --- end commented-out projects */
];
