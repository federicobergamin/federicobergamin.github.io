/* posts-manifest.js
 * Metadata for every post under misc/posts/. This is the single source of
 * truth that both the feed (misc/index.html) and each post page read from
 * — a post's own folder only needs its slug wired into its index.html
 * (see misc/_post-template/), everything else lives here.
 *
 * See misc/README.md for the full "how to publish a post" walkthrough.
 *
 * Fields:
 *   slug     - must match the folder name under misc/posts/
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
window.MISC_POSTS = [
	{
		slug: "bikepacking",
		title: "The slow way home: bikepacking from Copenhagen to Onara",
		subtitle: "A collection of thoughts looking back on my bike trip from Copenhagen to Italy.",
		date: "2026-10-09",
		// cover: "",
		tags: ["cycling", "bikepacking", "gravel"],
		draft: false
	},
	// {
	// 	slug: "diffusion-models-tour",
	// 	title: "A five-minute tour of diffusion models",
	// 	subtitle: "Forward noising, the score function, and why running time backwards actually works.",
	// 	date: "2026-09-13",
	// 	cover: "cover.jpg",
	// 	tags: ["machine learning", "generative models"],
	// 	draft: false
	// },
	// {
	// 	slug: "hello-substack",
	// 	title: "Hello, Substack-style blogging",
	// 	subtitle: "A short demo post showing off math, figures, and captions.",
	// 	date: "2026-09-12",
	// 	cover: "cover.svg",
	// 	tags: ["meta"],
	// 	draft: false
	// }
	
];
