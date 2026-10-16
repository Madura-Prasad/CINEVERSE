import { tt as __exportAll } from "./errors_C8cQnSfQ.mjs";
import { C as createComponent, S as createAstro, a as Fragment, d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_DSKvYReI.mjs";
import { t as renderScript } from "./script_Bp649g-o.mjs";
import "./compiler_MK_MV47C.mjs";
import { t as supabase } from "./supabase_SjCGlPtN.mjs";
//#region src/components/MovieSection.astro
createAstro("https://astro.build");
var $$MovieSection = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MovieSection;
	const { heading, items, mediaType = "movie" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="movie-grid" data-astro-cid-jaynrlh2>${items.map((item) => {
		const categoryNames = (item.media_categories ?? []).map((relation) => relation.category?.name).filter((name) => Boolean(name));
		const categorySlugs = (item.media_categories ?? []).map((relation) => relation.category?.slug).filter((slug) => Boolean(slug));
		const categoryData = [...categoryNames, ...categorySlugs].map((value) => value.toLowerCase()).join("|");
		return renderTemplate`<a class="movie-card group"${addAttribute(mediaType === "series" ? `/series/${encodeURIComponent(item.slug)}/` : `/title/${encodeURIComponent(item.slug)}/`, "href")}${addAttribute(item.title.toLowerCase(), "data-title")}${addAttribute(item.release_year ?? "", "data-year")}${addAttribute(item.imdb_rating ?? "", "data-rating")}${addAttribute(categoryData, "data-category")}${addAttribute(item.media_type ?? "", "data-type")}${addAttribute(item.created_at ?? "", "data-created-at")} data-astro-cid-jaynrlh2><div class="poster-wrap" data-astro-cid-jaynrlh2>${item.poster_url ? renderTemplate`<img${addAttribute(item.poster_url, "src")}${addAttribute(`${item.title} poster`, "alt")} loading="lazy" decoding="async" data-astro-cid-jaynrlh2>` : renderTemplate`<div class="poster-placeholder" data-astro-cid-jaynrlh2><span data-astro-cid-jaynrlh2>CINEVERSE</span><strong data-astro-cid-jaynrlh2>${item.title}</strong></div>`}<span class="video-type" data-astro-cid-jaynrlh2>${item.video_type || item.media_type || "HD"}</span>${item.imdb_rating !== null && item.imdb_rating !== void 0 && renderTemplate`<span class="rating" data-astro-cid-jaynrlh2>★ ${Number(item.imdb_rating).toFixed(1)}</span>`}</div><div class="card-meta" data-astro-cid-jaynrlh2><h3 data-astro-cid-jaynrlh2>${item.title}</h3><div class="card-details" data-astro-cid-jaynrlh2><span data-astro-cid-jaynrlh2>${item.release_year ?? "Year N/A"}</span>${categoryNames.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<span aria-hidden="true" data-astro-cid-jaynrlh2>·</span><span class="card-category" data-astro-cid-jaynrlh2>${categoryNames[0]}</span>` })}`}</div></div></a>`;
	})}</div>`;
}, "E:/Desktop/cineverse/src/components/MovieSection.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const mediaFields = `
  id,
  slug,
  title,
  poster_url,
  backdrop_url,
  video_type,
  media_type,
  imdb_rating,
  release_year,
  created_at,
  media_categories (
    category:categories (
      id,
      name,
      slug
    )
  )
`;
	const [{ data: moviesData, error: moviesError }, { data: seriesData, error: seriesError }, { data: topMoviesData, error: topMoviesError }, { data: topSeriesData, error: topSeriesError }] = await Promise.all([
		supabase.from("media").select(mediaFields).eq("media_type", "movie").eq("is_published", true).order("created_at", { ascending: false }).limit(24),
		supabase.from("media").select(mediaFields).eq("media_type", "series").eq("is_published", true).order("created_at", { ascending: false }).limit(24),
		supabase.from("media").select(mediaFields).eq("media_type", "movie").eq("is_published", true).not("imdb_rating", "is", null).order("imdb_rating", { ascending: false }).limit(12),
		supabase.from("media").select(mediaFields).eq("media_type", "series").eq("is_published", true).not("imdb_rating", "is", null).order("imdb_rating", { ascending: false }).limit(12)
	]);
	if (moviesError) console.error("Movies query:", moviesError);
	if (seriesError) console.error("Series query:", seriesError);
	if (topMoviesError) console.error("Top movies query:", topMoviesError);
	if (topSeriesError) console.error("Top series query:", topSeriesError);
	const movies = moviesData ?? [];
	const series = seriesData ?? [];
	const topMovies = topMoviesData ?? [];
	const topSeries = topSeriesData ?? [];
	const allMedia = [
		...movies,
		...series,
		...topMovies,
		...topSeries
	];
	const years = [...new Set(allMedia.map((item) => item.release_year).filter((year) => year !== null && year !== void 0))].sort((a, b) => b - a);
	const categoryMap = /* @__PURE__ */ new Map();
	for (const item of allMedia) for (const relation of item.media_categories ?? []) {
		const category = relation.category;
		if (category?.name) categoryMap.set(category.slug || category.name.toLowerCase(), category.name);
	}
	const categories = [...categoryMap.entries()].sort((a, b) => a[1].localeCompare(b[1]));
	return renderTemplate`<html lang="en" data-astro-cid-lcdefpme><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Discover movies and TV series on CineVerse. Explore popular titles, release years, genres and IMDb ratings."><meta name="theme-color" content="#09090f"><title>CineVerse | Movies & TV Series</title>${renderHead($$result)}</head><body data-astro-cid-lcdefpme><header class="site-header" data-astro-cid-lcdefpme><a class="brand" href="/" data-astro-cid-lcdefpme><span class="brand-icon" data-astro-cid-lcdefpme>C</span><span data-astro-cid-lcdefpme>CINE<span class="brand-accent" data-astro-cid-lcdefpme>VERSE</span></span></a><nav class="main-nav" aria-label="Main navigation" data-astro-cid-lcdefpme><a class="nav-link active" href="/" data-astro-cid-lcdefpme>Home</a><a class="nav-link" href="#movies" data-astro-cid-lcdefpme>Movies</a><a class="nav-link" href="#series" data-astro-cid-lcdefpme>TV Series</a><a class="nav-link" href="#top-movies" data-astro-cid-lcdefpme>Top Rated</a></nav></header><main data-astro-cid-lcdefpme><section class="hero" data-astro-cid-lcdefpme><div class="hero-content" data-astro-cid-lcdefpme><span class="hero-label" data-astro-cid-lcdefpme><span class="live-dot" data-astro-cid-lcdefpme></span>YOUR CINEMATIC UNIVERSE</span><h1 data-astro-cid-lcdefpme>Discover your next<span class="gradient-text" data-astro-cid-lcdefpme>favorite story.</span></h1><p data-astro-cid-lcdefpme>Explore movies and TV series, discover hidden gems, and find your next unforgettable watch.</p><a class="hero-button" href="#browse" data-astro-cid-lcdefpme>Explore Collection<span aria-hidden="true" data-astro-cid-lcdefpme>→</span></a></div><div class="hero-decoration" aria-hidden="true" data-astro-cid-lcdefpme><div class="orbit orbit-one" data-astro-cid-lcdefpme></div><div class="orbit orbit-two" data-astro-cid-lcdefpme></div><div class="orbit orbit-three" data-astro-cid-lcdefpme></div><div class="orbit-core" data-astro-cid-lcdefpme>C</div></div></section><div class="browse-layout" id="browse" data-astro-cid-lcdefpme><aside class="filter-sidebar" data-astro-cid-lcdefpme><div class="sidebar-heading" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><span class="eyebrow" data-astro-cid-lcdefpme>DISCOVER</span><h2 data-astro-cid-lcdefpme>Filters</h2></div><span class="filter-icon" aria-hidden="true" data-astro-cid-lcdefpme>☷</span></div><div class="filter-field search-field" data-astro-cid-lcdefpme><label for="search-filter" data-astro-cid-lcdefpme>Search titles</label><div class="search-input-wrap" data-astro-cid-lcdefpme><span aria-hidden="true" data-astro-cid-lcdefpme>⌕</span><input id="search-filter" type="search" placeholder="Search movies..." autocomplete="off" data-astro-cid-lcdefpme></div></div><div class="filter-field" data-astro-cid-lcdefpme><label for="type-filter" data-astro-cid-lcdefpme>Content type</label><select id="type-filter" data-astro-cid-lcdefpme><option value="all" data-astro-cid-lcdefpme>All content</option><option value="movie" data-astro-cid-lcdefpme>Movies</option><option value="series" data-astro-cid-lcdefpme>TV Series</option></select></div><div class="filter-field" data-astro-cid-lcdefpme><label for="year-filter" data-astro-cid-lcdefpme>Release year</label><select id="year-filter" data-astro-cid-lcdefpme><option value="all" data-astro-cid-lcdefpme>All years</option>${years.map((year) => renderTemplate`<option${addAttribute(String(year), "value")} data-astro-cid-lcdefpme>${year}</option>`)}</select></div><div class="filter-field" data-astro-cid-lcdefpme><label for="category-filter" data-astro-cid-lcdefpme>Category</label><select id="category-filter" data-astro-cid-lcdefpme><option value="all" data-astro-cid-lcdefpme>All categories</option>${categories.map(([slug, name]) => renderTemplate`<option${addAttribute(slug, "value")} data-astro-cid-lcdefpme>${name}</option>`)}</select></div><div class="filter-field" data-astro-cid-lcdefpme><label for="rating-filter" data-astro-cid-lcdefpme>Minimum IMDb rating</label><select id="rating-filter" data-astro-cid-lcdefpme><option value="0" data-astro-cid-lcdefpme>Any rating</option><option value="5" data-astro-cid-lcdefpme>5.0+</option><option value="6" data-astro-cid-lcdefpme>6.0+</option><option value="7" data-astro-cid-lcdefpme>7.0+</option><option value="8" data-astro-cid-lcdefpme>8.0+</option><option value="9" data-astro-cid-lcdefpme>9.0+</option></select></div><div class="filter-field" data-astro-cid-lcdefpme><label for="sort-filter" data-astro-cid-lcdefpme>Sort by</label><select id="sort-filter" data-astro-cid-lcdefpme><option value="featured" data-astro-cid-lcdefpme>Featured order</option><option value="newest" data-astro-cid-lcdefpme>Newest added</option><option value="oldest" data-astro-cid-lcdefpme>Oldest added</option><option value="rating-desc" data-astro-cid-lcdefpme>IMDb: High to Low</option><option value="rating-asc" data-astro-cid-lcdefpme>IMDb: Low to High</option><option value="year-desc" data-astro-cid-lcdefpme>Release Year: Newest</option><option value="year-asc" data-astro-cid-lcdefpme>Release Year: Oldest</option><option value="title-asc" data-astro-cid-lcdefpme>Title: A–Z</option><option value="title-desc" data-astro-cid-lcdefpme>Title: Z–A</option></select></div><button class="clear-button" id="clear-filters" type="button" data-astro-cid-lcdefpme><span aria-hidden="true" data-astro-cid-lcdefpme>↺</span>Clear All Filters</button></aside><div class="catalog-content" data-astro-cid-lcdefpme><div class="catalog-toolbar" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><span class="eyebrow" data-astro-cid-lcdefpme>YOUR COLLECTION</span><h2 data-astro-cid-lcdefpme>Explore titles</h2></div><span class="results-count" id="results-count" aria-live="polite" data-astro-cid-lcdefpme>Loading titles...</span></div><p class="filter-status" id="filter-status" aria-live="polite" data-astro-cid-lcdefpme></p><section class="movie-section" id="movies" data-astro-cid-lcdefpme><div class="section-heading" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><span class="eyebrow" data-astro-cid-lcdefpme>FRESHLY ADDED</span><h2 data-astro-cid-lcdefpme>Latest Movies</h2></div><span class="section-number" data-astro-cid-lcdefpme></span></div>${renderComponent($$result, "MovieSection", $$MovieSection, {
		"heading": "",
		"items": movies,
		"data-astro-cid-lcdefpme": true
	})}</section><section class="movie-section" id="series" data-astro-cid-lcdefpme><div class="section-heading" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><span class="eyebrow" data-astro-cid-lcdefpme>BINGE-WORTHY STORIES</span><h2 data-astro-cid-lcdefpme>Latest TV Series</h2></div><span class="section-number" data-astro-cid-lcdefpme></span></div>${renderComponent($$result, "MovieSection", $$MovieSection, {
		"heading": "Latest TV Series",
		"items": series,
		"mediaType": "series",
		"data-astro-cid-lcdefpme": true
	})}</section><section class="movie-section" id="top-movies" data-astro-cid-lcdefpme><div class="section-heading" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><span class="eyebrow" data-astro-cid-lcdefpme>AUDIENCE FAVORITES</span><h2 data-astro-cid-lcdefpme>Top Rated Movies</h2></div><span class="section-number" data-astro-cid-lcdefpme></span></div>${renderComponent($$result, "MovieSection", $$MovieSection, {
		"heading": "",
		"items": topMovies,
		"data-astro-cid-lcdefpme": true
	})}</section><section class="movie-section" id="top-series" data-astro-cid-lcdefpme><div class="section-heading" data-astro-cid-lcdefpme><div data-astro-cid-lcdefpme><span class="eyebrow" data-astro-cid-lcdefpme>HIGHLY RATED</span><h2 data-astro-cid-lcdefpme>Top Rated TV Series</h2></div><span class="section-number" data-astro-cid-lcdefpme></span></div>${renderComponent($$result, "MovieSection", $$MovieSection, {
		"heading": "Top Rated TV Series",
		"items": topSeries,
		"mediaType": "series",
		"data-astro-cid-lcdefpme": true
	})}</section><div class="no-results" id="no-results" hidden data-astro-cid-lcdefpme><div class="no-results-icon" data-astro-cid-lcdefpme>⌕</div><h3 data-astro-cid-lcdefpme>No titles found</h3><p data-astro-cid-lcdefpme>Try changing your filters or using another search term.</p><button class="clear-button" id="empty-clear" type="button" data-astro-cid-lcdefpme>Clear Filters</button></div></div></div></main><footer class="site-footer" data-astro-cid-lcdefpme><a class="brand footer-brand" href="/" data-astro-cid-lcdefpme><span class="brand-icon" data-astro-cid-lcdefpme>C</span><span data-astro-cid-lcdefpme>CINE<span class="brand-accent" data-astro-cid-lcdefpme>VERSE</span></span></a><p data-astro-cid-lcdefpme>Discover stories. Explore worlds.</p><span class="copyright" data-astro-cid-lcdefpme>© ${(/* @__PURE__ */ new Date()).getFullYear()} CineVerse</span></footer></body></html>${renderScript($$result, "E:/Desktop/cineverse/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/Desktop/cineverse/src/pages/index.astro", void 0);
var $$file = "E:/Desktop/cineverse/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
