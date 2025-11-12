import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Adding markdown field to About Body in Site Settings...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    let siteSettings = await env.getContentType("siteSettings");
    console.log("✓ Found Site Settings content type");
    
    const aboutBodyField = siteSettings.fields.find(f => f.id === "aboutBody");
    
    if (!aboutBodyField) {
      console.log("⚠ aboutBody field not found. Adding it...");
      
      // Get all site settings entries and unpublish them
      const entries = await env.getEntries({
        content_type: "siteSettings",
        limit: 1000,
      });
      
      if (entries.items.length > 0) {
        console.log(`Found ${entries.items.length} site settings entry(ies)`);
        for (const entry of entries.items) {
          try {
            if (entry.sys.publishedVersion) {
              await entry.unpublish();
            }
          } catch (e) {
            console.log(`  ⚠ Could not unpublish entry ${entry.sys.id}: ${e.message}`);
          }
        }
      }
      
      // Unpublish content type
      if (siteSettings.sys.publishedVersion) {
        siteSettings = await siteSettings.unpublish();
        console.log("✓ Unpublished content type");
      }
      
      // Add aboutBody field
      siteSettings.fields.push({
        id: "aboutBody",
        name: "About Body",
        type: "Text",
        required: false,
      });
      console.log("✓ Added aboutBody field");
      
      // Update and publish content type
      const updated = await siteSettings.update();
      await updated.publish();
      console.log("✓ Updated and published content type\n");
    } else {
      // Field exists, check if it needs to be updated to support markdown
      console.log("✓ aboutBody field exists");
      
      // Check if we need to update the field to support markdown better
      // For now, Text field can handle markdown, but we might want to add a markdown field
      const hasMarkdownField = siteSettings.fields.some(f => f.id === "aboutMarkdown");
      
      if (!hasMarkdownField) {
        console.log("Adding aboutMarkdown field for better markdown support...");
        
        // Get all site settings entries and unpublish them
        const entries = await env.getEntries({
          content_type: "siteSettings",
          limit: 1000,
        });
        
        if (entries.items.length > 0) {
          for (const entry of entries.items) {
            try {
              if (entry.sys.publishedVersion) {
                await entry.unpublish();
              }
            } catch (e) {
              console.log(`  ⚠ Could not unpublish entry ${entry.sys.id}: ${e.message}`);
            }
          }
        }
        
        // Unpublish content type
        if (siteSettings.sys.publishedVersion) {
          siteSettings = await siteSettings.unpublish();
          console.log("✓ Unpublished content type");
        }
        
        // Add aboutMarkdown field
        siteSettings.fields.push({
          id: "aboutMarkdown",
          name: "About Markdown",
          type: "Text",
          widgetId: "markdown",
          required: false,
        });
        console.log("✓ Added aboutMarkdown field");
        
        // Update and publish content type
        const updated = await siteSettings.update();
        await updated.publish();
        console.log("✓ Updated and published content type\n");
      } else {
        console.log("✓ aboutMarkdown field already exists\n");
      }
    }
    
    console.log("✔ About section markdown support added successfully!");
    console.log("\nYou can now add markdown content with inline images to the About section in Contentful.");
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

