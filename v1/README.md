This is a [Next.js](https://nextjs.org/) project.

## Developing

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Adding New Adhoc Stories
New stories, or "adhocs" can be added in the `/adhocs` directory. One json file per story, with the following structure:

```json
{
  "title": "Adhoc Story Title",
  "blanks": [
    { "id": 0, "blankType": "adjective" },
    { "id": 1, "blankType": "noun" },
    { "id": 2, "blankType": "verb" }
  ],
  "story": "This is a story of the very {0} {1} that could {2} when it was cold outside."
}
```

The `"id"` of each blank will replace the blank in the story of the format `{#}`.

## Deploy

This app is deployed on Vercel. Any pushes to `main` are automatically deployed to https://adhoc.lessread.me/