/* posts-manifest.js
 * Metadata for every post under blog/posts/. This is the single source of
 * truth that both the feed (blog/index.html) and each post page read from
 * — a post's own folder only needs its slug wired into its index.html
 * (see blog/_post-template/), everything else lives here.
 *
 * See blog/README.md for the full "how to publish a post" walkthrough
 * (same workflow as misc/README.md, just under blog/ and window.NOTES_POSTS).
 *
 * Fields:
 *   slug     - must match the folder name under blog/posts/
 *   title    - post title
 *   subtitle - one-line subtitle/excerpt shown on the feed and post header
 *   date     - "YYYY-MM-DD", used for sorting and display
 *   cover    - filename of the cover image, relative to the post's own
 *              folder (omit if there isn't one); shown at the top of the
 *              post page, not on the feed
 *   tags     - optional list of short labels, shown as coloured pills on
 *              the feed and used for the filter buttons above it
 *   draft    - optional; set to true to hide from the feed (visible again
 *              by adding ?draft=1 to the URL, for previewing before publish)
 */
window.NOTES_POSTS = [
	// {
	// 	slug: "test-note",
	// 	title: "Test note",
	// 	subtitle: "Checking that the blog-post style works under Notes.",
	// 	date: "2026-09-18",
	// 	draft: true
	// },
	{
		slug: "diffusion-flow-matching",
		title: "Relation between the vector field and the score function for generative modelling",
		subtitle: "Understanding the connection between diffusion and flow matching.",
		date: "2024-10-01",
		tags: ["diffusion", "flow matching"],
		draft: false
	}
];
