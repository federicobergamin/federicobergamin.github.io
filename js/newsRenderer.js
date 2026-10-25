// Renders window.NEWS entries (see news/news-data.js) as a <ul>, shared by
// the homepage's "Random News" preview and the full news/index.html list.
//
// options:
//   limit    - only show the N most recent entries (omit for the full list)
//   basePath - prefix substituted for the `{{base}}` placeholder in each
//              entry's html, so the same data renders correctly from pages
//              at different depths ('' at the site root, '../' from news/)
//   moreHref - when set (together with limit), appends an "All news" link
const NewsRenderer = {
	render: function(entries, container, options) {
		options = options || {};
		const basePath = options.basePath || '';
		const list = options.limit ? entries.slice(0, options.limit) : entries;

		const ul = document.createElement('ul');
		list.forEach(function(entry) {
			const li = document.createElement('li');
			li.innerHTML = entry.html.split('{{base}}').join(basePath);
			ul.appendChild(li);
		});

		if (options.moreHref && options.limit) {
			const li = document.createElement('li');
			li.className = 'news-more';
			li.innerHTML = '<a href="' + options.moreHref + '">All news</a>';
			ul.appendChild(li);
		}

		container.innerHTML = '';
		container.appendChild(ul);
	}
};
