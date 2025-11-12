import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

// Portfolio project data with descriptions and technologies
const portfolioProjects = [
  {
    title: "Kanbeano",
    description: "A modern kanban board application built for efficient task management and team collaboration. Features drag-and-drop functionality, real-time updates, and customizable workflows to help teams stay organized and productive.",
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "WebSocket"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Soul Runner",
    description: "An immersive endless runner game with dynamic obstacles and power-ups. Built with game development best practices, featuring smooth animations, responsive controls, and an engaging progression system.",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Web Audio API"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Whirl Creek Farm",
    description: "A comprehensive farm management platform designed to help agricultural businesses track inventory, manage orders, and streamline operations. Features intuitive dashboards and real-time data synchronization.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Scribo",
    description: "A collaborative writing platform that enables real-time document editing and team collaboration. Features version control, commenting, and seamless sharing capabilities for writers and content teams.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "Markdown"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Ration Cost Calculator",
    description: "A specialized tool for calculating and optimizing feed rations for livestock operations. Helps farmers make data-driven decisions about feed costs, nutritional requirements, and budget planning.",
    technologies: ["Vue.js", "Python", "Flask", "SQLite", "Chart.js"],
    linkUrl: "",
    repoUrl: "",
  },
];

async function run() {
  console.log("Upserting portfolio project descriptions and technologies...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    // Get all existing project entries
    const existingProjects = await env.getEntries({
      content_type: "project",
      limit: 1000,
    });

    console.log(`Found ${existingProjects.items.length} existing project(s)\n`);

    for (const projectData of portfolioProjects) {
      // Find existing project by title
      const existing = existingProjects.items.find(
        (item) => item.fields.title?.["en-US"] === projectData.title
      );

      if (existing) {
        // Update existing entry
        console.log(`Updating: ${projectData.title}`);
        
        // Unpublish if published
        if (existing.sys.publishedVersion) {
          await existing.unpublish();
        }

        // Update fields
        existing.fields.title = { "en-US": projectData.title };
        existing.fields.description = { "en-US": projectData.description };
        existing.fields.technologies = { "en-US": projectData.technologies };
        
        if (projectData.linkUrl) {
          existing.fields.linkUrl = { "en-US": projectData.linkUrl };
        }
        if (projectData.repoUrl) {
          existing.fields.repoUrl = { "en-US": projectData.repoUrl };
        }

        const updated = await existing.update();
        await updated.publish();
        console.log(`  ✓ Updated description and technologies\n`);
      } else {
        // Create new entry
        console.log(`Creating: ${projectData.title}`);
        const newEntry = await env.createEntry("project", {
          fields: {
            title: { "en-US": projectData.title },
            description: { "en-US": projectData.description },
            technologies: { "en-US": projectData.technologies },
            linkUrl: { "en-US": projectData.linkUrl || "" },
            repoUrl: { "en-US": projectData.repoUrl || "" },
          },
        });
        await newEntry.publish();
        console.log(`  ✓ Created with description and technologies\n`);
      }
    }

    console.log("✔ Portfolio copy update complete!");
    console.log("\nNote: You may need to update linkUrl and repoUrl manually in Contentful if you have live links.");
  } catch (e) {
    console.error("Error upserting portfolio copy:", e.message);
    if (e.errors) {
      console.error("Details:", JSON.stringify(e.errors, null, 2));
    }
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

