---
name: add-work-project
description: >-
  Automates the process of adding a new case study (project) to the website
  when a folder of images is uploaded to public/. Supports multi-phase Client Growth
  Journeys (Website -> E-Commerce/CRM -> AI Tool/IoT Automation) and smart image classification.
---

# Add Work Project Skill

Use this skill when the user requests to create or add a new case study/project from an uploaded folder of assets under `public/`.

---

## Workflow Steps

### 1. Locate and Analyze the Source Folder
* Find the uploaded folder directly under the `public/` directory (e.g., `public/susmita-nursery/`).
* **Smart Asset Identification**: Inspect all images inside the uploaded directory to classify them by file name or aspect ratio/UI content:
  * **Cover / Hero Image** (`cover.png`/`.jpg`): Wide landscape orientation or branded mockup card preview.
  * **Desktop / Web Storefront Image** (`desktop.png`/`.jpg`): Aspect ratio ~16:9 showing public website / e-commerce storefront.
  * **Mobile App / Responsive View** (`mobile.png`/`.jpg`): Portrait aspect ratio (~9:19) showing mobile app UI, chat drawer, or responsive view.
  * **Dashboard / Analytics / AI Internal Tool Image** (`analytics.png`/`dashboard.png`): Admin panel, CRM pipeline, data matrix, or AI image generator tool.
* If filenames are generic (e.g. `IMG_001.jpg`, `screenshot_2.png`), analyze visual dimensions & UI elements to classify and rename them into standard target filenames (`cover.png`, `desktop.png`, `mobile.png`, `analytics.png`).

### 2. Extract Context & Multi-Phase Storyline
* Check if there is an MD file (e.g., `context.md`, `readme.md`, `notes.txt`) in the folder.
* If a markdown/context file exists, read its contents for:
  * Client name, project year, and target industry.
  * Problems faced and key measurable results.
  * **Evolution Journey**: Has the project evolved across multiple phases? (e.g., Phase 1: Brand Website $\rightarrow$ Phase 2: E-Commerce & CRM $\rightarrow$ Phase 3: AI Internal Tool / IoT Telemetry).
* If no markdown file exists, extract context from the user's conversation prompt or prompt the user for key highlights.

### 3. Generate Structured Case Study JSON
Generate a structured JSON configuration for the project matching our full schema and write to `contents/work/<slug>.json`:

```json
{
  "slug": "url-friendly-slug",
  "category": "real-world",
  "title": "Project Title",
  "subtitle": "High-level summary line highlighting the core business value.",
  "client": "Client Name",
  "service": "AI-Powered Business Websites",
  "year": "2026",
  "summary": "Executive summary paragraph explaining the client, scope, and technical achievements.",
  "image": "/work/<slug>/cover.png",
  "accentColor": "blue",
  "tags": ["Next.js", "Tailwind CSS", "Supabase", "AI Tools"],
  "metrics": [
    { "value": "+40%", "label": "Key Outcome Metric 1" },
    { "value": "4x", "label": "Key Outcome Metric 2" },
    { "value": "100%", "label": "Key Outcome Metric 3" }
  ],
  "challenge": [
    "Paragraph 1 detailing the operational pain point or client challenge.",
    "Paragraph 2 expanding on the scale or stakes involved."
  ],
  "solution": [
    "Paragraph 1 describing the engineering approach and system architecture.",
    "Paragraph 2 explaining how custom tools or automation were implemented."
  ],
  "results": [
    "Outcome bullet 1 with measurable impact.",
    "Outcome bullet 2 with operational time saved.",
    "Outcome bullet 3 with user adoption or revenue growth."
  ],
  "journey": [
    {
      "phase": "Phase 01 — Web Foundation",
      "title": "Custom Website & CMS",
      "description": "High-converting brand web presence with an intuitive CMS for zero-friction content management."
    },
    {
      "phase": "Phase 02 — Commercial Scale",
      "title": "E-Commerce & CRM Engine",
      "description": "Scaled storefront with payment processing, inventory sync, and custom lead CRM."
    },
    {
      "phase": "Phase 03 — AI Internal Tool",
      "title": "Automated Catalog Generator",
      "description": "Custom AI tool converting 1 raw plant photo into 4 studio-ready product mockups automatically."
    }
  ],
  "mockups": [
    {
      "title": "Phase 01: Brand Web Storefront",
      "description": "High-resolution desktop landing view with custom typography and search filters.",
      "type": "desktop",
      "badge": "Phase 01 — Web",
      "image": "/work/<slug>/desktop.png"
    },
    {
      "title": "Phase 02: Mobile Checkout & CRM",
      "description": "Mobile responsive interface and client onboarding chat drawer.",
      "type": "mobile",
      "badge": "Phase 02 — Mobile",
      "image": "/work/<slug>/mobile.png"
    },
    {
      "title": "Phase 03: AI Internal Tool Dashboard",
      "description": "Admin workspace featuring AI image generation, cataloging, and automated lead scoring.",
      "type": "analytics",
      "badge": "Phase 03 — AI Tool",
      "image": "/work/<slug>/analytics.png"
    }
  ]
}
```

* Field guidelines:
  * **`category`**: `"real-world"` for client work; `"skill-display"` for Egostix Media Labs prototypes.
  * **`service`**: Pick one of `"AI-Powered Business Websites"`, `"AI Internal Tools for SMBs"`, `"AI Workflow Automation"`, or `"Creator Infrastructure"`.
  * **`accentColor`**: Default to `"blue"` (Egostix Media theme).

### 4. Move & Normalize Image Assets
* Create the target directory: `public/work/<slug>/`.
* Move and rename the images from the source folder to `public/work/<slug>/`:
  * Cover image $\rightarrow$ `cover.png` (or `.jpg`)
  * Desktop mockup $\rightarrow$ `desktop.png`
  * Mobile mockup $\rightarrow$ `mobile.png`
  * Dashboard / Analytics mockup $\rightarrow$ `analytics.png`
* Delete the empty source folder from `public/` to maintain clean workspace hygiene.

### 5. Verification & TypeScript Check
* Execute `npx tsc --noEmit` to verify type safety across the project.
* Confirm to the user that the case study has been created, JSON integrated into `contents/work/<slug>.json`, images stored in `public/work/<slug>/`, and TypeScript check passed.
