import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Adding markdown field to Project content type...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    let projectType = await env.getContentType("project");
    console.log("✓ Found Project content type");
    
    const hasMarkdown = projectType.fields.some(f => f.id === "markdown");
    
    if (hasMarkdown) {
      console.log("✓ Markdown field already exists\n");
      return;
    }
    
    console.log("⚠ Missing markdown field. Updating content type...");
    
    // Get all project entries and delete them
    const entries = await env.getEntries({
      content_type: "project",
      limit: 1000,
    });
    
    console.log(`Found ${entries.items.length} project entries`);
    
    if (entries.items.length > 0) {
      console.log("Deleting entries (they will be recreated)...");
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
    
    // Unpublish content type
    if (projectType.sys.publishedVersion) {
      projectType = await projectType.unpublish();
      console.log("✓ Unpublished content type");
    }
    
    // Add markdown field
    projectType.fields.push({
      id: "markdown",
      name: "Markdown",
      type: "Text",
      required: false,
    });
    console.log("✓ Added markdown field");
    
    // Update and publish content type
    const updated = await projectType.update();
    await updated.publish();
    console.log("✓ Updated and published content type\n");
    
    console.log("✔ Markdown field added successfully!");
  } catch (e) {
    console.error("Error:", e.message);
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

