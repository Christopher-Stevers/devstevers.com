import "dotenv/config";
import { createClient } from "contentful";

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_CDA_TOKEN!;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

export const cda = createClient({ space, accessToken, environment });

export async function getSiteSettings() {
  const res = await cda.getEntries({ content_type: "siteSettings", limit: 1 });
  const item = res.items[0] as any;
  if (!item) throw new Error("No siteSettings entry found");

  const f = item.fields;
  return {
    title: f.title,
    tagline: "I develop data intensive applications",
    email: f.email,
    intro: f.intro,
    skillsFrontend: f.skillsFrontend || [],
    skillsBackend: f.skillsBackend || [],
    socials: (f.socials || []).map((s: any) => ({
      label: s.fields.label,
      url: s.fields.url,
    })),
    projects: (f.projects || []).map((p: any) => ({
      title: p.fields.title,
      imageUrl: p.fields.image ? `https:${p.fields.image.fields.file.url}` : "",
      description: p.fields.description || "",
      markdown: p.fields.markdown || "",
      technologies: p.fields.technologies || [],
      linkUrl: p.fields.linkUrl || "",
      repoUrl: p.fields.repoUrl || "",
      order: p.fields.order || 0,
    })),
    aboutTitle: f.aboutTitle,
    aboutBody: f.aboutBody || "",
    aboutMarkdown: f.aboutMarkdown || f.aboutBody || "", // Use aboutMarkdown if available, fallback to aboutBody
  };
}

export async function getExperiences() {
  try {
    const res = await cda.getEntries({ 
      content_type: "experience",
      order: ["-fields.startDate"] // Order by start date descending (most recent first)
    });
    
    return res.items.map((item: any) => {
      const f = item.fields;
      // Responsibilities and technologies are arrays of Symbol (strings)
      return {
        jobTitle: f.jobTitle || "",
        company: f.company || "",
        location: f.location || "",
        startDate: f.startDate || "",
        endDate: f.endDate || null,
        duration: f.duration || "",
        responsibilities: f.responsibilities || [],
        technologies: f.technologies || [],
      };
    });
  } catch (error: any) {
    // If experience content type doesn't exist yet, return empty array
    console.warn("Experience content type not found in Contentful:", error.message);
    return [];
  }
}