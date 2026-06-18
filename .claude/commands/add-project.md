Collect the following fields to add a new project to the portfolio.

Required fields: Project, Role, Description
Optional fields: Client, Partners (comma-separated list), Tags (comma-separated list), Cover Photo path, Slideshow Photo paths (comma-separated), Color (hex)

If any required fields are missing from the user's message, show an elicitation form widget to collect them all at once.

Once all required fields are available, append a new entry to the `projects` const array in `components/projects.tsx` using this format:

```ts
{
  id: <highest existing id + 1>,
  client: "...",                      // omit entire line if not provided
  project: "...",                     // required
  partners: ["...", "..."],           // omit entire line if not provided
  role: "...",                        // required
  year: "<current year>",             // auto-fill
  color: "...",                       // use "#3b82f6" as default if omitted
  thumbnail: "...",                   // omit entire line if no cover photo
  thumbnailPosition: "center center", // include only when thumbnail is set
  images: ["...", "..."],             // use cover photo as first image if slideshow is empty; omit if no photos at all
  description: "...",                 // required
  tags: ["...", "..."],               // omit entire line if not provided
},
```

Partners and tags should be split on commas and trimmed. Slideshow photo paths should be split on newlines or commas and trimmed. If only a cover photo is provided with no slideshow photos, set `images` to `[coverPhoto]`.

After inserting, confirm the new entry and remind the user to add their photo files to `public/projects/` if applicable.
