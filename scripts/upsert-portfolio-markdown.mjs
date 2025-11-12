import "dotenv/config";
import contentfulManagement from "contentful-management";

const client = contentfulManagement.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

// Portfolio project data with markdown content
const portfolioProjects = [
  {
    title: "Kanbeano",
    description: "A modern kanban board application built for efficient task management and team collaboration. Features drag-and-drop functionality, real-time updates, and customizable workflows to help teams stay organized and productive.",
    markdown: `# Kanbeano

A modern kanban board application built for efficient task management and team collaboration.

## Overview

Kanbeano is a full-featured project management tool that brings the power of kanban methodology to your workflow. Built with modern web technologies, it provides a seamless experience for teams of all sizes.

![Kanbeano Dashboard](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Key Features

- **Drag-and-Drop Interface**: Intuitive card movement between columns
- **Real-Time Collaboration**: See updates from team members instantly
- **Customizable Workflows**: Adapt the board to your team's process
- **Task Assignments**: Assign tasks to team members with due dates
- **Activity Tracking**: Monitor project progress and team productivity

## Technology Stack

Built with **React** and **TypeScript** for a type-safe, maintainable codebase. The backend uses **Node.js** with **Express** for API endpoints, and **MongoDB** for flexible data storage. Real-time updates are powered by **WebSocket** connections.

![Architecture Diagram](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Development Highlights

The application features a responsive design that works seamlessly across desktop and mobile devices. The real-time synchronization ensures all team members stay up-to-date with the latest changes.`,
    technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express", "WebSocket"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Soul Runner",
    description: "An immersive endless runner game with dynamic obstacles and power-ups. Built with game development best practices, featuring smooth animations, responsive controls, and an engaging progression system.",
    markdown: `# Soul Runner

An immersive endless runner game with dynamic obstacles and power-ups.

## Game Overview

Soul Runner is a fast-paced endless runner that combines classic arcade gameplay with modern web technologies. Players navigate through procedurally generated levels, collecting power-ups and avoiding obstacles.

![Soul Runner Gameplay](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Gameplay Features

- **Smooth Controls**: Responsive touch and keyboard input
- **Dynamic Obstacles**: Procedurally generated challenges
- **Power-Up System**: Collect boosts to enhance gameplay
- **Score Tracking**: Compete for high scores
- **Progressive Difficulty**: Game speed increases over time

## Technical Implementation

Developed using **JavaScript** with **HTML5 Canvas** for rendering. The game engine handles collision detection, sprite animation, and audio management through the **Web Audio API**. **CSS3** animations provide smooth transitions and visual effects.

![Game Engine Architecture](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Performance Optimizations

The game uses efficient rendering techniques to maintain 60 FPS on a wide range of devices. Object pooling minimizes garbage collection, and sprite batching reduces draw calls.`,
    technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Web Audio API"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Whirl Creek Farm",
    description: "A comprehensive farm management platform designed to help agricultural businesses track inventory, manage orders, and streamline operations. Features intuitive dashboards and real-time data synchronization.",
    markdown: `# Whirl Creek Farm

A comprehensive farm management platform for agricultural businesses.

## Platform Overview

Whirl Creek Farm is a complete farm management solution that helps agricultural businesses track inventory, manage orders, and streamline daily operations. The platform provides real-time insights into farm productivity and resource management.

![Farm Dashboard](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Core Features

- **Inventory Management**: Track crops, livestock, and supplies
- **Order Processing**: Streamline order fulfillment workflows
- **Analytics Dashboard**: Visualize farm performance metrics
- **Resource Planning**: Optimize resource allocation
- **Mobile Access**: Manage operations on-the-go

## Technology Stack

Built with **Next.js** and **TypeScript** for a robust, scalable application. **PostgreSQL** provides reliable data storage with **Prisma** as the ORM for type-safe database queries. The UI is styled with **Tailwind CSS** for a modern, responsive design.

![Database Schema](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Business Impact

The platform has helped farms reduce administrative overhead by 40% and improve inventory accuracy. Real-time data synchronization ensures all team members have access to the latest information.`,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Scribo",
    description: "A collaborative writing platform that enables real-time document editing and team collaboration. Features version control, commenting, and seamless sharing capabilities for writers and content teams.",
    markdown: `# Scribo

A collaborative writing platform for real-time document editing and team collaboration.

## Platform Overview

Scribo brings Google Docs-like collaboration to your writing workflow. Multiple users can edit documents simultaneously with real-time synchronization, making it perfect for content teams, writers, and collaborative projects.

![Scribo Editor](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Key Features

- **Real-Time Editing**: Multiple users can edit simultaneously
- **Version Control**: Track changes and revert to previous versions
- **Commenting System**: Add comments and suggestions
- **Markdown Support**: Write in Markdown with live preview
- **Sharing & Permissions**: Control who can view or edit documents

## Technical Architecture

The frontend is built with **React** for a responsive user interface. The backend uses **Node.js** with **Express** for API endpoints, and **MongoDB** for document storage. Real-time synchronization is powered by **Socket.io**, enabling instant updates across all connected clients.

![Real-Time Sync Flow](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Collaboration Features

The platform uses operational transformation to handle concurrent edits without conflicts. Users see each other's cursors and selections in real-time, creating a seamless collaborative experience.`,
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "Markdown"],
    linkUrl: "",
    repoUrl: "",
  },
  {
    title: "Ration Cost Calculator",
    description: "A specialized tool for calculating and optimizing feed rations for livestock operations. Helps farmers make data-driven decisions about feed costs, nutritional requirements, and budget planning.",
    markdown: `# Ration Cost Calculator

A specialized tool for calculating and optimizing feed rations for livestock operations.

## Application Overview

The Ration Cost Calculator helps farmers and livestock managers make data-driven decisions about feed costs and nutritional requirements. The tool calculates optimal feed rations based on animal requirements, available feed ingredients, and budget constraints.

![Calculator Interface](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Key Features

- **Feed Formulation**: Calculate optimal feed rations
- **Cost Analysis**: Compare costs across different feed combinations
- **Nutritional Tracking**: Ensure animals receive proper nutrition
- **Data Visualization**: Charts and graphs for cost trends
- **Export Reports**: Generate PDF reports for record-keeping

## Technology Stack

The frontend is built with **Vue.js** for a reactive user interface. The backend uses **Python** with **Flask** for API endpoints and calculation logic. **SQLite** provides lightweight data storage, and **Chart.js** powers the data visualization components.

![Cost Analysis Chart](https://media.discordapp.net/attachments/515324368633593866/1371976398754807860/image.png?ex=6915b1d7&is=69146057&hm=03edc1162f798d5642dba415cd24aab8023a370da34bee8b84b94862847f0a35&=&format=webp&quality=lossless)

## Business Value

Farmers using the calculator have reported average feed cost savings of 15-20% through optimized ration planning. The tool helps identify cost-effective feed combinations while maintaining nutritional requirements.`,
    technologies: ["Vue.js", "Python", "Flask", "SQLite", "Chart.js"],
    linkUrl: "",
    repoUrl: "",
  },
];

async function run() {
  console.log("Upserting portfolio projects with markdown content...\n");
  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment(ENV_ID);

  try {
    // Get all existing project entries
    const existingProjects = await env.getEntries({
      content_type: "project",
      limit: 1000,
    });

    console.log(`Found ${existingProjects.items.length} existing project(s)\n`);

    for (const projectData of portfolioProjects) {
      // Find existing project by title
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
        existing.fields.markdown = { "en-US": projectData.markdown };
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
        console.log(`  ✓ Updated with markdown content\n`);
      } else {
        console.log(`Creating: ${projectData.title}`);
        const newEntry = await env.createEntry("project", {
          fields: {
            title: { "en-US": projectData.title },
            description: { "en-US": projectData.description },
            markdown: { "en-US": projectData.markdown },
            technologies: { "en-US": projectData.technologies },
            linkUrl: { "en-US": projectData.linkUrl || "" },
            repoUrl: { "en-US": projectData.repoUrl || "" },
          },
        });
        await newEntry.publish();
        console.log(`  ✓ Created with markdown content\n`);
      }
    }

    console.log("✔ Portfolio markdown upsert complete!");
    console.log("\nAll projects now have markdown content with inline images.");
  } catch (e) {
    console.error("\n❌ Error:", e.message);
    if (e.errors) {
      console.error("Details:", JSON.stringify(e.errors, null, 2));
    }
    if (e.message.includes("markdown")) {
      console.error("\n⚠ The markdown field may not exist in Contentful.");
      console.error("Run: pnpm run contentful:add-markdown-field");
    }
    process.exit(1);
  }
}

run().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});

