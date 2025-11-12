import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Updating site settings to link to new project entries...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    // Get all project entries
    const projects = await env.getEntries({
      content_type: "project",
      limit: 1000,
    });

    console.log(`Found ${projects.items.length} project entries`);
    
    // Get site settings
    const siteSettings = await env.getEntries({
      content_type: "siteSettings",
      limit: 1,
    });

    if (siteSettings.items.length === 0) {
      console.log("⚠ No site settings found. Run contentful:seed first.");
      return;
    }

    // Fetch fresh version to avoid conflicts
    const site = await env.getEntry(siteSettings.items[0].sys.id);
    
    // Unpublish if published
    if (site.sys.publishedVersion) {
      await site.unpublish();
      // Fetch again after unpublishing
      const freshSite = await env.getEntry(site.sys.id);
      
      // Update projects field with new entry IDs
      freshSite.fields.projects = {
        "en-US": projects.items.map((entry) => ({
          sys: { type: "Link", linkType: "Entry", id: entry.sys.id },
        })),
      };

      const updated = await freshSite.update();
      await updated.publish();
    } else {
      // Update projects field with new entry IDs
      site.fields.projects = {
        "en-US": projects.items.map((entry) => ({
          sys: { type: "Link", linkType: "Entry", id: entry.sys.id },
        })),
      };

      const updated = await site.update();
      await updated.publish();
    }
    
    console.log(`✓ Updated site settings with ${projects.items.length} project references`);
    console.log("\n✔ Site settings update complete!");
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

