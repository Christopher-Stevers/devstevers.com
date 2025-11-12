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
  console.log("Starting complete portfolio upsert process...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    // Step 1: Get the Project content type
    let projectType = await env.getContentType("project");
    console.log("✓ Found Project content type");
    
    const hasDescription = projectType.fields.some(f => f.id === "description");
    const hasTechnologies = projectType.fields.some(f => f.id === "technologies");
    
    if (!hasDescription || !hasTechnologies) {
      console.log("\n⚠ Missing fields detected. Updating content type...");
      
      // Step 2: Get all project entries and unpublish them
      const entries = await env.getEntries({
        content_type: "project",
        limit: 1000,
      });
      
      console.log(`Found ${entries.items.length} project entries`);
      
      if (entries.items.length > 0) {
        console.log("Deleting entries (they will be recreated with new data)...");
        for (const entry of entries.items) {
          try {
            if (entry.sys.publishedVersion) {
              await entry.unpublish();
            }
            await entry.delete();
          } catch (e) {
            console.log(`  ⚠ Could not delete entry ${entry.sys.id}: ${e.message}`);
          }
        }
        console.log("✓ Deleted all entries");
      }
      
      // Step 3: Unpublish content type
      if (projectType.sys.publishedVersion) {
        try {
          projectType = await projectType.unpublish();
          console.log("✓ Unpublished content type");
        } catch (e) {
          console.log(`⚠ Could not unpublish content type: ${e.message}`);
          console.log("⚠ You may need to manually unpublish in Contentful UI");
          throw e;
        }
      }
      
      // Step 4: Add missing fields
      if (!hasDescription) {
        projectType.fields.push({
          id: "description",
          name: "Description",
          type: "Text",
          required: false,
        });
        console.log("✓ Added description field");
      }
      
      if (!hasTechnologies) {
        projectType.fields.push({
          id: "technologies",
          name: "Technologies",
          type: "Array",
          items: { type: "Symbol" },
          required: false,
        });
        console.log("✓ Added technologies field");
      }
      
      // Step 5: Update and publish content type
      const updated = await projectType.update();
      await updated.publish();
      console.log("✓ Updated and published content type\n");
    } else {
      console.log("✓ Content type already has required fields\n");
    }
    
    // Step 6: Upsert project entries
    console.log("Upserting project entries...\n");
    const existingProjects = await env.getEntries({
      content_type: "project",
      limit: 1000,
    });

    for (const projectData of portfolioProjects) {
      const existing = existingProjects.items.find(
        (item) => item.fields.title?.["en-US"] === projectData.title
      );

      if (existing) {
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
        } else if (!existing.fields.linkUrl) {
          existing.fields.linkUrl = { "en-US": "" };
        }
        
        if (projectData.repoUrl) {
          existing.fields.repoUrl = { "en-US": projectData.repoUrl };
        } else if (!existing.fields.repoUrl) {
          existing.fields.repoUrl = { "en-US": "" };
        }

        const updated = await existing.update();
        await updated.publish();
        console.log(`  ✓ Updated with description and technologies\n`);
      } else {
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

    console.log("✔ Portfolio upsert complete!");
    console.log("\nAll projects now have descriptions and technologies.");
    console.log("You can update linkUrl and repoUrl manually in Contentful if needed.");
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.errors) {
      console.error("Details:", JSON.stringify(e.errors, null, 2));
    }
    console.error("\nIf you see 'Content Type has entries' error:");
    console.error("1. Go to Contentful UI");
    console.error("2. Unpublish all Project entries manually");
    console.error("3. Unpublish the Project content type");
    console.error("4. Run this script again");
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

