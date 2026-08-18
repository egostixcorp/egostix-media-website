---
name: add-work-project
description: >-
  Automates the process of adding a new case study (project) to the website
  when a folder of images is uploaded to public/.
---

# Add Work Project Skill

Use this skill when the user requests to create or add a new case study/project from an uploaded folder of assets under `public/`.

---

## Workflow Steps

### 1. Locate and Analyze the Source Folder
* Find the uploaded folder directly under the `public/` directory (e.g., `public/rocks/`).
* Verify the images inside this folder:
  * A cover image (typically named `cover` or similar).
  * Desktop/laptop mockup images (typically named `desktop` or similar).
  * Mobile mockup images (typically named `mobile` or similar).

### 2. Extract context
* Check if there is an MD file (e.g., `context.md`, `readme.md`) in the folder.
* If a markdown/context file exists, read its contents.
* If no markdown file exists, ask the user to provide a brief text context or answers regarding the project name, client, service, and metrics.

### 3. Generate Project Metadata & Copy
Generate a structured JSON configuration for the project matching our schema:
* **`slug`**: URL-friendly string derived from the project title (e.g., `rocks-platform`).
* **`category`**: Map to either `"real-world"` or `"skill-display"`.
* **`title`**: Deselect any placeholder names, keep it professional.
* **`subtitle`**: Concise high-level summary.
* **`client`**: Client name (default to "Egostix Media Labs" if it is a skill display).
* **`service`**: One of the standard vertical services (e.g., `"AI-Powered Business Websites"`, `"AI Internal Tools for SMBs"`, `"AI Workflow Automation"`, `"Creator Infrastructure"`).
* **`year`**: Project year (e.g., `"2026"`).
* **`summary`**: Introductory paragraph.
* **`image`**: Point to `"/work/<slug>/cover.png"` (or `.jpg`).
* **`accentColor`**: Always default to `"blue"` (Egostix Media brand theme).
* **`tags`**: List of technologies used (e.g., Next.js, Tailwind CSS, OpenAI API, LangChain).
* **`metrics`**: Array of 3 objects with `value` and `label`.
* **`challenge`**: Array of 2 paragraphs explaining the problem.
* **`solution`**: Array of 2-3 paragraphs describing the engineering solution.
* **`results`**: Array of 2-3 outcome bullet points.
* **`mockups`**: Array mapping the uploaded mockup images:
  * **`title`**: Name of the view.
  * **`description`**: Annotation describing what the view displays.
  * **`type`**: `"desktop"`, `"mobile"`, or `"analytics"`.
  * **`badge`**: Context badge (e.g., `"Internal Ops"`, `"Client Portal"`).
  * **`image`**: Point to `"/work/<slug>/<filename>"` (e.g., `"/work/rocks-platform/desktop.png"`).

### 4. Move and Rename Assets
* Create the target directory: `public/work/<slug>/`.
* Move and rename the images from the source folder to the target directory using clean, standard names:
  * Cover image -> `cover.png` (or `.jpg`/`.webp` depending on source).
  * Desktop mockup -> `desktop.png` (or `desktop-1.png`).
  * Mobile mockup -> `mobile.png` (or `mobile-1.png`).
* Delete the empty source folder from `public/` to maintain directory hygiene.

### 5. Write Project Configuration File
* Write the structured JSON case study to `contents/work/<slug>.json`.

### 6. Verification
* Validate the TypeScript compiler by running `npx tsc --noEmit`.
* Confirm to the user that the new case study has been generated and integrated.
