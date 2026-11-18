# Portfolio artwork

The site uses transparent WebP illustrations. The Kerala verandah, fishing net with chai and a cricket ball, and London phone box are original portfolio scenes. The tea leaf and elephant sit on the dividers. The elephant wears a gold Nettipattam.

The new watercolor scenes use architectural references for their silhouettes and the verandah as a style reference.

- [Charminar](https://www.tourism.telangana.gov.in/attractions/charminar) in Hyderabad, with the gateway, corner minarets and a small market awning.
- [Rutland Building](https://www.lboro.ac.uk/about/history/then-now/) at Loughborough University, seen from Fountain Lawn.
- [Chepauk](https://www.hopkins.co.uk/projects/sport/chepauk-stadium/) in Chennai, with the segmented canopies, yellow stands and cricket wicket.

The inline artwork is the source for the desktop stage. Add a phase-specific variant to its art wrapper with a matching attribute such as `data-night-src="img/veranda@night.webp"`. Keep its aspect ratio and transparent outline aligned with the original. For the verandah, keep the roof and palm in the same positions so the two crops line up. The browser uses the base art and tint while a registered variant loads or if loading fails.
