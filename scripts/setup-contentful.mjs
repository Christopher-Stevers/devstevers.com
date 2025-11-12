import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

async function run() {
  console.log("Setting up Contentful content types...");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  // Content type: Social
  let social;
  try {
    social = await env.createContentTypeWithId("social", {
      name: "Social",
      fields: [
        { id: "label", name: "Label", type: "Symbol", required: true },
        { id: "url", name: "URL", type: "Symbol", required: true },
      ],
      displayField: "label",
    });
  } catch (e) {
    console.log("Social content type already exists, fetching...");
    social = await env.getContentType("social");
  }

  // Content type: Project
  let project;
  try {
    project = await env.createContentTypeWithId("project", {
      name: "Project",
      fields: [
        { id: "title", name: "Title", type: "Symbol", required: true },
        { id: "image", name: "Image", type: "Link", linkType: "Asset" },
        { id: "description", name: "Description", type: "Text", required: false },
        { id: "technologies", name: "Technologies", type: "Array", items: { type: "Symbol" }, required: false },
        { id: "linkUrl", name: "Site URL", type: "Symbol" },
        { id: "repoUrl", name: "Repo URL", type: "Symbol" },
      ],
      displayField: "title",
    });
  } catch (e) {
    console.log("Project content type already exists, checking fields...");
    project = await env.getContentType("project");
    
    // Check if we need to add fields (only if content type has no entries or can be unpublished)
    const hasDescription = project.fields.some(f => f.id === "description");
    const hasTechnologies = project.fields.some(f => f.id === "technologies");
    
    if (!hasDescription || !hasTechnologies) {
      console.log("⚠ Project content type exists but is missing description/technologies fields.");
      console.log("⚠ You'll need to add these fields manually in Contentful UI:");
      console.log("   1. Go to Contentful > Content model > Project");
      console.log("   2. Add 'Description' field (Text, Long text)");
      console.log("   3. Add 'Technologies' field (List of short text)");
      console.log("   4. Save and publish the content type");
      console.log("   5. Then run: pnpm run contentful:upsert-portfolio\n");
    }
  }

  // Content type: Experience
  let experience;
  try {
    experience = await env.createContentTypeWithId("experience", {
      name: "Experience",
      fields: [
        { id: "jobTitle", name: "Job Title", type: "Symbol", required: true },
        { id: "company", name: "Company", type: "Symbol", required: true },
        { id: "location", name: "Location", type: "Symbol", required: true },
        { id: "startDate", name: "Start Date", type: "Symbol", required: true },
        { id: "endDate", name: "End Date", type: "Symbol" },
        { id: "duration", name: "Duration", type: "Symbol" },
        {
          id: "responsibilities",
          name: "Responsibilities",
          type: "Array",
          items: { type: "Symbol" },
        },
        {
          id: "technologies",
          name: "Technologies",
          type: "Array",
          items: { type: "Symbol" },
        },
      ],
      displayField: "jobTitle",
    });
  } catch (e) {
    console.log("Experience content type already exists, fetching...");
    experience = await env.getContentType("experience");
  }

  // Content type: Site Settings
  let site;
  try {
    site = await env.createContentTypeWithId("siteSettings", {
      name: "Site Settings",
      fields: [
        { id: "title", name: "Title", type: "Symbol", required: true },
        { id: "tagline", name: "Tagline", type: "Symbol", required: true },
        { id: "email", name: "Email", type: "Symbol", required: true },
        { id: "intro", name: "Intro", type: "Text" },
        {
          id: "skillsFrontend",
          name: "Skills (Frontend)",
          type: "Array",
          items: { type: "Symbol" },
        },
        {
          id: "skillsBackend",
          name: "Skills (Backend)",
          type: "Array",
          items: { type: "Symbol" },
        },
        {
          id: "socials",
          name: "Socials",
          type: "Array",
          items: { type: "Link", linkType: "Entry" },
        },
        {
          id: "projects",
          name: "Projects",
          type: "Array",
          items: { type: "Link", linkType: "Entry" },
        },
        {
          id: "aboutTitle",
          name: "About Title",
          type: "Symbol",
          required: true,
        },
        { id: "aboutBody", name: "About Body", type: "Text" },
      ],
      displayField: "title",
    });
  } catch (e) {
    console.log("Site Settings content type already exists, fetching...");
    site = await env.getContentType("siteSettings");
  }

  // Publish content types if needed
  for (const ct of [social, project, experience, site]) {
    try {
      if (!ct.sys.publishedVersion) {
        await ct.publish();
        console.log(`✓ Published ${ct.name}`);
      } else {
        console.log(`✓ ${ct.name} already published`);
      }
    } catch (e) {
      console.log(`Note: ${ct.name} publish status could not be updated`);
    }
  }

  console.log("✔ Content types ready!");
}

run().catch((e) => {
  console.error("Error setting up Contentful:", e.message);
  process.exit(1);
});
