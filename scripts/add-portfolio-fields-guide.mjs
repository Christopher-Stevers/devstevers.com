import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Checking Project content type fields...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    const project = await env.getContentType("project");
    
    const hasDescription = project.fields.some(f => f.id === "description");
    const hasTechnologies = project.fields.some(f => f.id === "technologies");

    console.log("Current fields:", project.fields.map(f => f.id).join(", "));
    console.log(`Has description field: ${hasDescription ? "✓" : "✗"}`);
    console.log(`Has technologies field: ${hasTechnologies ? "✓" : "✗"}\n`);

    if (hasDescription && hasTechnologies) {
      console.log("✔ All required fields exist! You can now run:");
      console.log("   pnpm run contentful:upsert-portfolio\n");
      return;
    }

    console.log("⚠ Missing required fields. Please add them manually in Contentful:\n");
    console.log("1. Go to Contentful > Content model > Project");
    console.log("2. Click 'Add field' and add:");
    console.log("   - Field ID: description");
    console.log("   - Name: Description");
    console.log("   - Type: Text (Long text)");
    console.log("   - Required: No\n");
    console.log("3. Click 'Add field' again and add:");
    console.log("   - Field ID: technologies");
    console.log("   - Name: Technologies");
    console.log("   - Type: List of short text, short text");
    console.log("   - Required: No\n");
    console.log("4. Click 'Save' and 'Publish'\n");
    console.log("5. Then run: pnpm run contentful:upsert-portfolio\n");
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

