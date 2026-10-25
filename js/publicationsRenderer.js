// Renders a list of publication entries (see publications/publications-data.js)
// into the pre-existing #papers .paper-row / .paper-title / .paper-authors /
// .paper-venue / .paper-links CSS classes defined in main.css.
const PublicationsRenderer = {
	render: function(entries, container) {
		entries.forEach(function(entry) {
			const row = document.createElement('div');
			row.className = 'paper-row';

			const title = document.createElement('p');
			title.className = 'paper-title';
			title.innerHTML = '<b>' + entry.title + '</b>';
			row.appendChild(title);

			const authors = document.createElement('p');
			authors.className = 'paper-authors';
			authors.innerHTML = entry.authors;
			row.appendChild(authors);

			const venue = document.createElement('p');
			venue.className = 'paper-venue';
			venue.innerHTML = entry.venue;
			row.appendChild(venue);

			const links = document.createElement('p');
			links.className = 'paper-links';
			links.innerHTML = entry.links
				.map(function(link) {
					return '[<a href="' + link.href + '">' + link.label + '</a>]';
				})
				.join(' ');
			row.appendChild(links);

			container.appendChild(row);
		});
	}
};
