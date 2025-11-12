import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Upserting site settings to Contentful...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    // Get existing site settings entry
    const existingEntries = await env.getEntries({
      content_type: "siteSettings",
      limit: 1,
    });

    let entry;
    if (existingEntries.items.length > 0) {
      entry = existingEntries.items[0];
      console.log("Found existing site settings entry, updating...");
      
      // Unpublish if published
      if (entry.sys.publishedVersion) {
        await entry.unpublish();
      }
    } else {
      console.log("Creating new site settings entry...");
      entry = await env.createEntry("siteSettings", {
        fields: {
          title: { "en-US": "Christopher Stevers" },
        },
      });
    }

    // Update all fields
    entry.fields.title = { "en-US": "Christopher Stevers" };
    entry.fields.tagline = { "en-US": "I develop data intensive applications" };
    entry.fields.email = { "en-US": "contact@example.com" };
    entry.fields.intro = {
      "en-US": "Welcome to my portfolio. I'm a full-stack developer passionate about building data-intensive applications and scalable systems.",
    };
    entry.fields.skillsFrontend = {
      "en-US": ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS"],
    };
    entry.fields.skillsBackend = {
      "en-US": ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Kafka"],
    };
    entry.fields.aboutTitle = { "en-US": "Behind the Screen" };
    entry.fields.aboutBody = {
      "en-US": "I'm a passionate developer who loves building scalable applications and solving complex problems. With experience in both frontend and backend development, I enjoy creating full-stack solutions that make a difference.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.",
    };

    // Socials and projects will be empty arrays initially - they can be linked later
    entry.fields.socials = { "en-US": [] };
    entry.fields.projects = { "en-US": [] };

    const updated = await entry.update();
    await updated.publish();
    console.log("✓ Site settings upserted and published successfully!\n");

    console.log("Site Settings Summary:");
    console.log(`  Title: ${entry.fields.title["en-US"]}`);
    console.log(`  Tagline: ${entry.fields.tagline["en-US"]}`);
    console.log(`  Email: ${entry.fields.email["en-US"]}`);
    console.log(`  About Title: ${entry.fields.aboutTitle["en-US"]}`);
    console.log(`  Frontend Skills: ${entry.fields.skillsFrontend["en-US"].join(", ")}`);
    console.log(`  Backend Skills: ${entry.fields.skillsBackend["en-US"].join(", ")}`);
    console.log("\n⚠ Note: Socials and Projects are empty. Link them manually in Contentful or use other scripts.");
    console.log("\n✔ Site settings upsert complete!");
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.errors) {
      console.error("Details:", JSON.stringify(e.errors, null, 2));
    }
    if (e.message.includes("Content Type")) {
      console.error("\n⚠ The siteSettings content type may not exist.");
      console.error("Run: pnpm run contentful:setup");
    }
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

