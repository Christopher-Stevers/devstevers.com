import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Updating Project content type to include description and technologies...");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    let project = await env.getContentType("project");
    
    // Check if fields already exist
    const hasDescription = project.fields.some(f => f.id === "description");
    const hasTechnologies = project.fields.some(f => f.id === "technologies");

    if (hasDescription && hasTechnologies) {
      console.log("✓ Description and technologies fields already exist");
      console.log("\n✔ Content type is up to date!");
      return;
    }

    // Try to unpublish if published (may fail if entries exist)
    if (project.sys.publishedVersion) {
      try {
        project = await project.unpublish();
        console.log("✓ Unpublished Project content type");
      } catch (e) {
        if (e.message.includes("has entries")) {
          console.log("⚠ Content type has entries, cannot unpublish automatically");
          console.log("⚠ Please manually unpublish the content type in Contentful, then run this script again");
          console.log("   Or run: pnpm run contentful:upsert-portfolio (it will work if fields exist)");
          process.exit(1);
        }
        throw e;
      }
    }

    // Add description field if it doesn't exist
    if (!hasDescription) {
      project.fields.push({
        id: "description",
        name: "Description",
        type: "Text",
        required: false,
      });
      console.log("✓ Added description field");
    }

    // Add technologies field if it doesn't exist
    if (!hasTechnologies) {
      project.fields.push({
        id: "technologies",
        name: "Technologies",
        type: "Array",
        items: { type: "Symbol" },
        required: false,
      });
      console.log("✓ Added technologies field");
    }

    // Update and publish
    const updated = await project.update();
    await updated.publish();
    console.log("✓ Updated and published Project content type");
    
    console.log("\n✔ Content type update complete!");
  } catch (e) {
    console.error("Error updating content type:", e.message);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

