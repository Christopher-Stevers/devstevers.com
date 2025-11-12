import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Seeding Contentful with starter content...");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  // Create socials
  const socials = [
    { label: "GitHub", url: "https://github.com/Christopher-Stevers" },
    { label: "Twitter", url: "https://twitter.com/Christo28120856" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/christopherstevers/",
    },
  ];

  const socialEntries = [];
  for (const s of socials) {
    const entry = await env.createEntry("social", {
      fields: {
        label: { "en-US": s.label },
        url: { "en-US": s.url },
      },
    });
    await entry.publish();
    socialEntries.push(entry);
    console.log(`✓ Created social: ${s.label}`);
  }

  // Create sample projects
  const projectTitles = [
    "Kanbeano",
    "Soul Runner",
    "Whirl Creek Farm",
    "Scribo",
    "Ration Cost Calculator",
  ];

  const projEntries = [];
  for (const t of projectTitles) {
    const entry = await env.createEntry("project", {
      fields: {
        title: { "en-US": t },
        linkUrl: { "en-US": "" },
        repoUrl: { "en-US": "" },
      },
    });
    await entry.publish();
    projEntries.push(entry);
    console.log(`✓ Created project: ${t}`);
  }

  // Create site settings
  const site = await env.createEntry("siteSettings", {
    fields: {
      title: { "en-US": "Christopher Stevers" },
      tagline: { "en-US": "I develop websites." },
      email: { "en-US": "christopherstevers@protonmail.com" },
      intro: {
        "en-US": `Since starting my development journey I've worked with a range of technologies and platforms. I love building products that make a real impact and getting to collaborate with people who are passionate about their craft.`,
      },
      skillsFrontend: {
        "en-US": [
          "HTML",
          "CSS",
          "JavaScript",
          "React.js",
          "Next.js",
          "Nuxt.js",
          "SCSS",
          "Tailwind CSS",
          "Astro",
        ],
      },
      skillsBackend: {
        "en-US": [
          "Node.js",
          "MongoDB",
          "PostgreSQL",
          "Prisma",
          "Express",
          "WordPress",
          "Git",
          "GitHub",
        ],
      },
      socials: {
        "en-US": socialEntries.map((e) => ({
          sys: { type: "Link", linkType: "Entry", id: e.sys.id },
        })),
      },
      projects: {
        "en-US": projEntries.map((e) => ({
          sys: { type: "Link", linkType: "Entry", id: e.sys.id },
        })),
      },
      aboutTitle: { "en-US": "Behind the Screen" },
      aboutBody: {
        "en-US": `Hi, I'm Chris Stevers, a full stack web developer from Southwestern Ontario.\n\nI began my coding journey learning C++ in high school, but fell in love with web development. I've since worked on everything from simple static sites to complex applications with real-time data processing.\n\nWhen I'm not coding, you can find me gaming, reading sci-fi novels, or exploring new tech trends.`,
      },
    },
  });
  await site.publish();
  console.log("✓ Created site settings");

  // Create sample experience
  const experience = await env.createEntry("experience", {
    fields: {
      jobTitle: { "en-US": "Full Stack AI Engineer" },
      company: { "en-US": "OpenQ Labs" },
      location: { "en-US": "Germany (Remote)" },
      startDate: { "en-US": "Feb 2023" },
      endDate: { "en-US": null },
      duration: { "en-US": "+1 year" },
      responsibilities: {
        "en-US": [
          "Built and scaled developer analytics platforms that process large-scale GitHub data to generate actionable insights, improving visibility into technology adoption and enabling data-driven decisions.",
          "Redesigned event-driven data pipelines and Kafka topics to handle concurrent ingestion of high-volume repositories, reducing latency and improving throughput across distributed services.",
          "Implemented synchronization and evaluation systems in Go and TypeScript to ensure consistent and reliable GitHub data across MongoDB and PostgreSQL databases.",
          "Developed AI systems for natural-language analytics, enhancing product capabilities in intelligent querying and real-time reasoning while maintaining privacy and performance.",
          "Automated multi-environment deployments with Helm and GitHub Actions, deploying services across GKE and AWS for scalable, reliable releases across production and staging environments.",
        ],
      },
      technologies: {
        "en-US": [
          "TypeScript",
          "Go",
          "Next.js",
          "tRPC",
          "React Query",
          "Node.js",
          "Kafka",
          "PostgreSQL",
          "MongoDB",
          "Prisma",
          "Docker",
          "Helm",
          "Kubernetes",
        ],
      },
    },
  });
  await experience.publish();
  console.log("✓ Created experience entry");

  console.log("\n✔ Seeding complete! Your site is now ready to display.");
}

run().catch((e) => {
  console.error("Error seeding Contentful:", e.message);
  process.exit(1);
});
