// Photos shown in the homepage "Gallery" slideshow, in display order.
//
// To add a photo: drop the image file into gallery/ (or anywhere in the
// site) and add an entry below. Paths are relative to the site root, since
// the slideshow lives on index.html.
//
// Fields:
//   src     - image path, relative to the site root
//   caption - text under the photo (trusted inline HTML, so links work)
//   alt     - optional alt text; falls back to the caption with tags removed
//
// Tip: keep images around 1600px on the long side so the homepage stays fast
// (on macOS: `sips -Z 1600 photo.jpg`).
window.GALLERY = [
	{
		src: 'gallery/bike_italian_border.jpg',
		caption: 'Crossing into Italy on the <a href="misc/posts/bikepacking/">bike trip from Copenhagen to Onara</a>.',
		alt: 'Bike at the Italian border'
	},
	{
		src: 'imgs/defense.jpg',
		caption: 'PhD defense at DTU, June 2024.'
	}
];
