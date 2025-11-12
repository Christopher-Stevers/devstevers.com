import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Fixing Experience content type...");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    // First, try to get and delete all experience entries
    console.log("Checking for existing experience entries...");
    try {
      const entries = await env.getEntries({ 
        content_type: "experience",
        limit: 1000 
      });
      if (entries.items && entries.items.length > 0) {
        for (const entry of entries.items) {
          try {
            if (entry.sys.publishedVersion) {
              await entry.unpublish();
            }
            await entry.delete();
          } catch (e) {
            // Entry might already be deleted, continue
          }
        }
        console.log(`✓ Deleted ${entries.items.length} experience entries`);
      } else {
        console.log("✓ No existing entries to delete");
      }
    } catch (e) {
      console.log("✓ No entries found or content type doesn't exist yet");
    }
    
    // Get the existing content type (fetch fresh after deleting entries)
    let experience = await env.getContentType("experience");
    
    // Unpublish if published
    if (experience.sys.publishedVersion) {
      experience = await experience.unpublish();
      console.log("✓ Unpublished Experience content type");
    }
    
    // Delete the old responsibilities field if it exists
    const responsibilitiesField = experience.fields.find((f) => f.id === "responsibilities");
    if (responsibilitiesField) {
      experience.fields = experience.fields.filter((f) => f.id !== "responsibilities");
      console.log("✓ Removed old responsibilities field");
    }
    
    // Add the new responsibilities field with Symbol type
    experience.fields.push({
      id: "responsibilities",
      name: "Responsibilities",
      type: "Array",
      items: { type: "Symbol" },
    });
    
    // Update the content type (use the version from the fetched object)
    const updated = await experience.update();
    await updated.publish();
    console.log("✓ Updated and published Experience content type with correct field types");
    
    // Recreate the experience entry
    console.log("\nRecreating experience entry...");
    const newExperience = await env.createEntry("experience", {
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
    await newExperience.publish();
    console.log("✓ Recreated experience entry");
    
    console.log("\n✔ Fix complete! The experience entry is now ready to use.");
  } catch (e) {
    console.error("Error fixing content type:", e.message);
    if (e.message.includes("not found")) {
      console.log("\nThe Experience content type doesn't exist. Run setup-contentful.mjs first.");
    }
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

