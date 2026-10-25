// Publications data for publications/index.html, rendered by
// js/publicationsRenderer.js. `authors` and `venue` are trusted inline-HTML
// strings (they already contain <u>/<sup>/<i> markup), same trust model as
// the rest of this hand-authored site.
window.PUBLICATIONS = {
	conference: [
		{
			title: '"Kinetic Langevin Diffusion for Crystalline Materials Generation."',
			authors: '{F. Cornet, <u>F. Bergamin</u>}<sup>*</sup>, A. Bhowmik, J.M. García-Lastra, J. Frellsen, M.N. Schmidt',
			venue: 'In <i>International Conference on Machine Learning (ICML), 2025</i>',
			links: [
				{ label: 'arXiv', href: 'https://arxiv.org/abs/2507.03602' },
				{ label: 'Code', href: 'https://github.com/frcnt/kldm' },
				{ label: 'Poster', href: 'Files/ICML_Poster_v4.0.pdf' }
			]
		},
		{
			title: '"On conditional diffusion models for PDE simulations."',
			authors: '{A. Shysheya, C. Diaconu, <u>F. Bergamin</u>}<sup>*</sup>, P. Perdikaris, J.M. Hernández-Lobato, R.E. Turner, E. Mathieu',
			venue: 'In <i>Advances in Neural Information Processing Systems (NeurIPS), 2024</i>',
			links: [
				{ label: 'arXiv', href: 'https://arxiv.org/abs/2410.16415' },
				{ label: 'Code', href: 'https://github.com/cambridge-mlg/pdediff' },
				{ label: 'Poster', href: 'Files/neurips2024_poster.pdf' }
			]
		},
		{
			title: '"Riemannian Laplace approximations for Bayesian neural networks."',
			authors: '<u>F. Bergamin</u>, P. Moreno-Muñoz, S. Hauberg and G. Arvanitidis',
			venue: 'In <i>Advances in Neural Information Processing Systems (NeurIPS), 2023</i>',
			links: [
				{ label: 'arXiv', href: 'https://arxiv.org/abs/2306.07158' },
				{ label: 'Code', href: 'https://github.com/federicobergamin/riemannian-laplace-approximation' },
				{ label: 'Poster', href: 'Files/neurips2023_poster.pdf' }
			]
		},
		{
			title: '"Model-agnostic out-of-distribution detection using combined statistical tests."',
			authors: '{<u>F. Bergamin</u>, P-A. Mattei}<sup>*</sup>, J.D. Havtorn, H. Senetaire, H. Schmutz, L. Maaløe, S. Hauberg, J. Frellsen',
			venue: '<i>Proceedings of the 25th International Conference on Artificial Intelligence and Statistics (AISTATS), 2022.</i>',
			links: [
				{ label: 'arXiv', href: 'https://arxiv.org/abs/2203.01097' },
				{ label: 'Code', href: 'https://github.com/federicobergamin/model-agnostic-ood' },
				{ label: 'Poster', href: 'Files/aistats_poster.pdf' }
			]
		}
	],
	workshop: [
		{
			title: '"Kinetic Langevin Diffusion for Crystalline Materials Generation."',
			authors: '{F. Cornet, <u>F. Bergamin</u>}<sup>*</sup>, A. Bhowmik, J.M. García-Lastra, J. Frellsen, M.N. Schmidt',
			venue: 'In Workshop on AI for Accelerated Materials Design<br><i>AI4MAT @ ICLR, 2025</i>',
			links: [
				{ label: 'pdf', href: 'https://openreview.net/forum?id=Mttf1RoKKM#discussion' }
			]
		},
		{
			title: '"Guided Autoregressive Diffusion Models with Applications to PDE Simulation."',
			authors: '{<u>F. Bergamin</u>, C. Diaconu, A. Shysheya}<sup>*</sup>, P. Perdikaris, J.M. Hernández-Lobato, R.E. Turner, E. Mathieu',
			venue: 'In Workshop on AI4DifferentialEquations in Science<br><i>AI4DiffEqtnsInSci @ ICLR, 2024</i>',
			links: [
				{ label: 'pdf', href: 'https://openreview.net/forum?id=1avNKFEIOL&referrer=%5Bthe%20profile%20of%20Federico%20Bergamin%5D(%2Fprofile%3Fid%3D~Federico_Bergamin1)' }
			]
		}
	],
	thesis: [
		{
			title: '"Advances in Deep Generative Models, Approximate Inference, and their Applications."',
			authors: '<u>F. Bergamin</u>',
			venue: '<i>PhD Thesis, Technical University of Denmark (DTU), 2024</i>',
			links: [
				{ label: 'PDF', href: 'https://github.com/federicobergamin/PhD_Thesis' }
			]
		}
	]
};
