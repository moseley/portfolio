Collect the following fields to add a new project to the portfolio.

Required fields: Project, Role, Description
Optional fields: Client, Partners (comma-separated list), Tags (comma-separated list), Cover Photo path, Slideshow Photo paths (comma-separated), Color (hex)

If any required fields are missing from the user's message, show an elicitation form widget to collect them all at once.

Once all required fields are available, add the project to the matching client's `projects` array in `content/work.ts` using this format:

```ts
{
  slug: "...",
  name: "...",
  partners: "...",                     // omit if not provided
  role: "...",
  website: { href: "...", label: "..." }, // omit if not provided
  tags: ["...", "..."],
  body: "...",
  screenshots: [
    { src: "/projects/<client>/<file>", alt: "<Client> - <Project> homepage" },
  ],
  draft: true,                          // omit for completed projects
},
```

Partners and tags should be trimmed. Screenshot paths should be split on newlines or commas and trimmed. Use the client's slug in the screenshot path and write an accurate alt text.

After inserting, confirm the new entry and remind the user to add their photo files to `public/projects/` if applicable.
