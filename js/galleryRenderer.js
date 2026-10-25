// Renders window.GALLERY entries (see gallery/gallery-data.js) as a
// one-photo-at-a-time slideshow with Prev/Next buttons, a caption and a
// counter. Also supports left/right arrow keys (while the slideshow has
// focus) and swiping on touch screens. Neighbouring photos are preloaded
// so switching feels instant.
const GalleryRenderer = {
	render: function(slides, container) {
		if (!slides || !slides.length) {
			container.closest('section').style.display = 'none';
			return;
		}

		container.innerHTML =
			'<figure class="slideshow-card">' +
				'<div class="slideshow-viewport" tabindex="0" aria-label="Photo gallery, use arrow keys to browse">' +
					'<img class="slideshow-image" alt="">' +
				'</div>' +
				'<figcaption class="slideshow-caption"></figcaption>' +
			'</figure>' +
			'<div class="slideshow-controls">' +
				'<button type="button" class="slideshow-button" data-step="-1">&larr; Prev</button>' +
				'<button type="button" class="slideshow-button" data-step="1">Next &rarr;</button>' +
				'<span class="slideshow-counter"></span>' +
			'</div>';

		const viewport = container.querySelector('.slideshow-viewport');
		const image = container.querySelector('.slideshow-image');
		const caption = container.querySelector('.slideshow-caption');
		const counter = container.querySelector('.slideshow-counter');
		const cache = {};
		let current = 0;

		const preload = function(src) {
			if (!cache[src]) {
				cache[src] = new Image();
				cache[src].src = src;
			}
		};

		const show = function(index) {
			current = (index + slides.length) % slides.length;
			const slide = slides[current];

			image.classList.add('is-loading');
			preload(slide.src);
			const done = function() {
				if (slides[current] !== slide) return;
				image.src = slide.src;
				image.classList.remove('is-loading');
			};
			if (cache[slide.src].complete) done();
			else cache[slide.src].onload = cache[slide.src].onerror = done;

			caption.innerHTML = slide.caption || '';
			image.alt = slide.alt || caption.textContent;
			counter.textContent = (current + 1) + ' / ' + slides.length;

			if (slides.length > 1) {
				preload(slides[(current + 1) % slides.length].src);
				preload(slides[(current - 1 + slides.length) % slides.length].src);
			}
		};

		container.querySelectorAll('.slideshow-button').forEach(function(button) {
			button.addEventListener('click', function() {
				show(current + Number(button.dataset.step));
			});
		});

		viewport.addEventListener('keydown', function(e) {
			if (e.key === 'ArrowLeft') show(current - 1);
			if (e.key === 'ArrowRight') show(current + 1);
		});

		let touchX = null;
		viewport.addEventListener('touchstart', function(e) {
			touchX = e.touches[0].clientX;
		}, { passive: true });
		viewport.addEventListener('touchend', function(e) {
			if (touchX === null) return;
			const dx = e.changedTouches[0].clientX - touchX;
			if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
			touchX = null;
		});

		if (slides.length < 2) container.querySelector('.slideshow-controls').style.display = 'none';
		show(0);
	}
};
