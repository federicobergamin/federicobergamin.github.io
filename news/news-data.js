// News items shown on the homepage ("Random News", latest few only) and on
// this page (news/index.html, full list). This is the single source of
// truth for both — add a new item here and it shows up in both places
// automatically, newest first.
//
// `html` is trusted inline HTML (like publications-data.js). Internal links
// use a `{{base}}` placeholder instead of a hardcoded relative path, since
// this same entry is rendered from pages at different depths (the site
// root vs. news/); js/newsRenderer.js swaps it for the right prefix.
window.NEWS = [
	{
		date: '2026-10',
		html: 'Oct 2026: Still in the game, but not a really successful season. I used the summer to recharge and did travel by bike. I wrote a <a href="{{base}}misc/posts/bikepacking/index.html">blog post</a> about it.'
	},
	{
		date: '2025-05',
		html: 'May 2025: The paper below was accepted at ICML. <a href="https://openreview.net/forum?id=7J1kwZY72h">Camera ready</a> is available, <a href="https://github.com/frcnt/kldm">code</a> will be out soon!'
	},
	{
		date: '2025-04',
		html: 'Apr. 2025: Our paper <a href="https://openreview.net/forum?id=Mttf1RoKKM#discussion">"Kinetic Langevin Diffusion for Crystalline Materials Generation"</a> done together with my colleague François was accepted at the AI4MAT workshop @ ICLR.'
	},
	{
		date: '2024-10-30',
		html: 'Oct. 2024: I wanted to understand better the relation between a flow matching and a score-based model. I wrote a short note on this <a href="{{base}}blog/posts/diffusion-flow-matching/index.html"> here</a>.'
	},
	{
		date: '2024-10-01',
		html: 'Oct. 2024: Our work <a href="https://arxiv.org/abs/2410.16415">"On conditional diffusion models for PDE simulations"</a> done together with <a href="https://scholar.google.com/citations?user=Zm8hNeUAAAAJ&hl=en">Sasha</a> and <a href="https://cddcam.github.io/">Cristiana</a> while I was visiting Cambridge has been accepted at NeurIPS! Paper and code are also out now!'
	},
	{
		date: '2024-08',
		html: 'Aug. 2024: I started as a postdoc still at DTU!'
	},
	{
		date: '2024-06',
		html: 'June 2024: I defended my PhD! (Here you can have a  <a href="{{base}}imgs/defense.jpg"> proof</a>). Thanks again to Ole Winther, Matthias Bauer, and Eric Nalisnick for serving as examiners. Thanks also to all my collaborators for the past three years! You can find the thesis <a href="{{base}}documents/PhD_thesis_Bergamin.pdf"> here</a>.'
	}
];
