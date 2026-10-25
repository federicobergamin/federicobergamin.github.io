# Publishing a new post in /blog (Notes)

Same engine as `misc/` (see `misc/README.md`), just under `blog/` and using
`window.NOTES_POSTS` instead of `window.MISC_POSTS`.

1. Copy the template:

   ```
   cp -r blog/_post-template blog/posts/<your-slug>
   ```

2. Write the post:
   - Edit `blog/posts/<your-slug>/content.md`.
   - Plain Markdown — headings, lists, links, code blocks all work.
   - Inline math: `$e^{i\pi} + 1 = 0$`
   - Display math: `$$ \int_0^1 x^2\,dx = \tfrac{1}{3} $$`
   - Image with caption: `![This is the caption](images/plot.png)`
   - Image without caption: `![](images/plot.png)`
   - Resized image: add a width in quotes, as a percentage of the column
     or in pixels: `![Caption](images/plot.png "60%")`,
     `![Caption](images/plot.png "400px")`
   - Swipeable gallery (one photo at a time, Prev/Next buttons, arrow
     keys, swipe on phones), each image's caption in its `[]`:

     ```
     :::gallery
     ![First photo](images/a.jpg)
     ![Second photo](images/b.jpg)
     ![Third photo](images/c.jpg)
     :::
     ```
   - Put images anywhere in that post's folder (`images/` is just a
     convention, not a requirement). Give each image its own paragraph
     (blank line before and after) so it renders as a proper figure.
   - Optional cover image: save it in the post's folder, e.g. `cover.jpg`.

3. In `blog/posts/<your-slug>/index.html`, change `"TEMPLATE-SLUG"` in the
   last `<script>` block to `"<your-slug>"`.

4. Register the post in `blog/posts-manifest.js` — add one entry:

   ```js
   {
     slug: "<your-slug>",     // must match the folder name
     title: "...",
     subtitle: "...",
     date: "YYYY-MM-DD",
     cover: "cover.jpg",       // filename only, or omit if none
     tags: ["..."],            // optional; pills + filter buttons on the feed
     draft: true               // set to false (or remove) to publish
   }
   ```

5. Preview locally. From the `webpage/` root (not from `blog/`) run:

   ```
   python3 -m http.server 8000
   ```

   then visit `http://localhost:8000/blog/` and
   `http://localhost:8000/blog/posts/<your-slug>/`. While `draft: true`,
   add `?draft=1` to either URL to see it anyway.

6. Flip `draft` to `false` (or delete the line) and deploy — just copy the
   files to the host, there's no build step.

## Other notes section

The bottom of `blog/index.html` ("Other notes") is hand-written HTML for
links that don't have their own Markdown post — PDFs, HackMD links, etc.
Add new entries there the same way as the existing ones; it's independent
of the manifest/feed above.

## How it's built

- `blog/posts-manifest.js` is the single source of truth for post metadata
  (title, subtitle, date, cover, draft status) — both the feed and each
  post's header read from it.
- `../js/blogEngine.js` does the actual rendering (shared with `misc/`): it
  builds the feed cards, and on a post page it fetches that post's
  `content.md`, renders it with [marked](https://github.com/markedjs/marked),
  then runs [KaTeX](https://katex.org/)'s auto-render over the result for
  `$...$` / `$$...$$` math, and wraps any lone image in a
  `<figure>`/`<figcaption>`.
- `../blog.css` holds all the feed/post styling (shared with `misc/`).
