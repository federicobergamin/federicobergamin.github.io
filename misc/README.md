# Publishing a new post in /misc

1. Copy the template:

   ```
   cp -r misc/_post-template misc/posts/<your-slug>
   ```

2. Write the post:
   - Edit `misc/posts/<your-slug>/content.md`.
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

3. Register the post in `misc/posts-manifest.js` — add one entry:

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

4. Preview locally. From the `webpage/` root (not from `misc/`) run:

   ```
   python3 -m http.server 8000
   ```

   then visit `http://localhost:8000/misc/` and
   `http://localhost:8000/misc/posts/<your-slug>/`. While `draft: true`,
   add `?draft=1` to either URL to see it anyway.

5. Flip `draft` to `false` (or delete the line) and deploy — just copy the
   files to the host, there's no build step.

## Known limitation

Opening `misc/index.html` by double-clicking it (`file://`) will still show
the feed (the manifest is a plain `<script>` tag), but opening an individual
post that way will show an empty body — fetching `content.md` requires an
actual HTTP server (step 4 above), which is also how the real deployed site
works.

## How it's built

- `misc/posts-manifest.js` is the single source of truth for post metadata
  (title, subtitle, date, cover, draft status) — both the feed and each
  post's header read from it.
- `../js/blogEngine.js` does the actual rendering: it builds the feed
  cards, and on a post page it fetches that post's `content.md`, renders it
  with [marked](https://github.com/markedjs/marked), then runs
  [KaTeX](https://katex.org/)'s auto-render over the result for `$...$` /
  `$$...$$` math, and wraps any lone image in a `<figure>`/`<figcaption>`.
- `../blog.css` holds all the feed/post styling.
