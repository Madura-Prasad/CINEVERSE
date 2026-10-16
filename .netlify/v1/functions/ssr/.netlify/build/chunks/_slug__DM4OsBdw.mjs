import { tt as __exportAll } from "./errors_C8cQnSfQ.mjs";
import { C as createComponent, S as createAstro, f as renderHead, p as addAttribute, u as renderTemplate } from "./server_DSKvYReI.mjs";
import { t as renderScript } from "./script_Bp649g-o.mjs";
import "./compiler_MK_MV47C.mjs";
import { t as supabase } from "./supabase_SjCGlPtN.mjs";
/* empty css                 */
//#region src/pages/title/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = Astro.params.slug;
	const { data: movie, error } = await supabase.from("media").select(`
    id,
    slug,
    title,
    poster_url,
    backdrop_url,
    description,
    imdb_rating,
    video_type,
    duration_minutes,
    release_year,
    language,
    country,
    director
  `).eq("slug", slug ?? "").eq("is_published", true).eq("media_type", "movie").maybeSingle();
	if (error) console.error("Movie query failed:", error.message);
	let genres = [];
	let sources = [];
	if (movie) {
		const [linksResult, sourcesResult] = await Promise.all([supabase.from("media_categories").select("category_id").eq("media_id", movie.id), supabase.from("video_sources").select("id, source_type, quality, label, url").eq("media_id", movie.id).eq("is_active", true).order("sort_order", { ascending: true })]);
		if (linksResult.error) console.error("Category links query failed:", linksResult.error.message);
		if (sourcesResult.error) console.error("Video sources query failed:", sourcesResult.error.message);
		sources = sourcesResult.data ?? [];
		const categoryIds = (linksResult.data ?? []).map((item) => item.category_id);
		if (categoryIds.length > 0) {
			const { data: categoryRows, error: categoryError } = await supabase.from("categories").select("name, slug").in("id", categoryIds);
			if (categoryError) console.error("Categories query failed:", categoryError.message);
			genres = categoryRows ?? [];
		}
	}
	function safeHttpsUrl(value) {
		if (!value) return null;
		try {
			const url = new URL(value.trim());
			if (url.protocol !== "https:") return null;
			return url.href;
		} catch {
			return null;
		}
	}
	function getDirectVideoUrl(value) {
		const safeUrl = safeHttpsUrl(value);
		if (!safeUrl) return null;
		try {
			const url = new URL(safeUrl);
			return /\.mp4$/i.test(url.pathname) ? safeUrl : null;
		} catch {
			return null;
		}
	}
	function getEmbedUrl(value) {
		const safeUrl = safeHttpsUrl(value);
		if (!safeUrl) return null;
		try {
			const url = new URL(safeUrl);
			const host = url.hostname.toLowerCase().replace(/^www\./, "");
			if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
				const videoId = url.searchParams.get("v");
				if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) return `https://www.youtube.com/embed/${videoId}`;
				if (url.pathname.startsWith("/embed/") && /^[a-zA-Z0-9_-]{11}$/.test(url.pathname.split("/")[2] ?? "")) return safeUrl;
				return null;
			}
			if (host === "youtu.be") {
				const videoId = url.pathname.split("/").filter(Boolean)[0];
				if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) return `https://www.youtube.com/embed/${videoId}`;
				return null;
			}
			if (host === "vimeo.com") {
				const videoId = url.pathname.split("/").filter(Boolean)[0];
				if (videoId && /^\d+$/.test(videoId)) return `https://player.vimeo.com/video/${videoId}`;
				return null;
			}
			return safeUrl;
		} catch {
			return null;
		}
	}
	const playable = sources.filter((source) => source.source_type === "player").map((source) => {
		const direct = getDirectVideoUrl(source.url);
		if (direct) return {
			kind: "video",
			url: direct,
			label: source.label,
			quality: source.quality
		};
		const embed = getEmbedUrl(source.url);
		if (embed) return {
			kind: "iframe",
			url: embed,
			label: source.label,
			quality: source.quality
		};
		return null;
	}).filter((item) => item !== null);
	const current = playable[0];
	function defaultQuality(item) {
		return item.quality || (item.kind === "video" ? "MP4 Video" : "Online Player");
	}
	const downloadSources = sources.filter((source) => source.source_type === "download" && safeHttpsUrl(source.url) !== null);
	const pageTitle = movie ? `${movie.title} (${movie.release_year ?? "Movie"}) — CineVerse` : "Movie Not Found — CineVerse";
	const pageDescription = movie?.description ? movie.description.slice(0, 160) : "Explore movie details on CineVerse.";
	const canonicalUrl = movie ? new URL(`/title/${encodeURIComponent(movie.slug)}/`, Astro.site ?? Astro.url.origin).href : null;
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#09090b"><!-- Video files are requested without a referrer, so hotlink protection on the host does not block them. Iframes set their own referrerpolicy. --><meta name="referrer" content="no-referrer"><title>${pageTitle}</title><meta name="description"${addAttribute(pageDescription, "content")}>${canonicalUrl && renderTemplate`<link rel="canonical"${addAttribute(canonicalUrl, "href")}>`}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="min-h-screen bg-zinc-950 font-sans text-zinc-100"><header class="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl"><nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"><a href="/" class="text-xl font-black tracking-tight"><span class="text-violet-400">CINE</span>VERSE</a><a href="/" class="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-400/50 hover:text-white">← Back to Home</a></nav></header>${!movie ? renderTemplate`<main class="mx-auto max-w-3xl px-4 py-28 text-center"><p class="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">404 — Not Found</p><h1 class="mt-4 text-4xl font-black">Movie not found</h1><p class="mt-4 text-zinc-400">This movie does not exist or has not been published yet.</p><a href="/" class="mt-8 inline-flex rounded-xl bg-violet-500 px-6 py-3 font-bold transition hover:bg-violet-400">Browse Movies</a></main>` : renderTemplate`<main class="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12"><!-- Movie hero --><section class="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">${movie.backdrop_url && renderTemplate`<img${addAttribute(movie.backdrop_url, "src")} alt="" fetchpriority="high" decoding="async" class="absolute inset-0 -z-20 h-full w-full object-cover opacity-25">`}<div class="absolute inset-0 -z-10 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/60"></div><div class="grid gap-8 p-6 md:grid-cols-[260px_1fr] md:gap-10 md:p-10"><div>${movie.poster_url ? renderTemplate`<img${addAttribute(movie.poster_url, "src")}${addAttribute(`${movie.title} poster`, "alt")} fetchpriority="high" decoding="async" class="mx-auto w-full max-w-[260px] rounded-2xl border border-white/10 object-cover shadow-2xl">` : renderTemplate`<div class="flex aspect-[2/3] w-full max-w-[260px] items-center justify-center rounded-2xl bg-zinc-800 p-5 text-center text-zinc-400">${movie.title}</div>`}</div><div class="flex flex-col justify-center"><p class="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Movie Details</p><h1 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">${movie.title}${movie.release_year && renderTemplate`<span class="ml-2 text-xl font-medium text-zinc-400 md:text-2xl">(${movie.release_year})</span>`}</h1><div class="mt-5 flex flex-wrap items-center gap-2">${movie.imdb_rating != null && renderTemplate`<span class="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-sm font-bold text-yellow-400">★ IMDb ${movie.imdb_rating}/10</span>`}${movie.video_type && renderTemplate`<span class="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold">${movie.video_type}</span>`}${movie.duration_minutes != null && movie.duration_minutes > 0 && renderTemplate`<span class="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">${Math.floor(movie.duration_minutes / 60)}h${" "}${movie.duration_minutes % 60}m</span>`}</div>${genres.length > 0 && renderTemplate`<div class="mt-5 flex flex-wrap gap-2">${genres.map((genre) => renderTemplate`<span class="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-200">${genre.name}</span>`)}</div>`}<div class="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3"><div><p class="text-xs text-zinc-500">Language</p><p class="mt-1 text-sm font-medium">${movie.language || "Unknown"}</p></div><div><p class="text-xs text-zinc-500">Country</p><p class="mt-1 text-sm font-medium">${movie.country || "Unknown"}</p></div><div><p class="text-xs text-zinc-500">Director</p><p class="mt-1 text-sm font-medium">${movie.director || "Unknown"}</p></div></div><div class="mt-7"><h2 class="text-lg font-bold">Synopsis</h2><p class="mt-2 max-w-3xl whitespace-pre-line text-sm leading-7 text-zinc-300">${movie.description || "Description is not available yet."}</p></div></div></div></section><!-- Movie player --><section id="watch" class="mt-12 scroll-mt-24"><div class="mb-5"><p class="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">Now Playing</p><h2 class="mt-2 text-2xl font-black md:text-3xl">Watch Movie</h2></div>${current ? renderTemplate`<div class="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-violet-950/10"><div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-zinc-900 px-4 py-4 sm:px-5">${playable.length > 1 && renderTemplate`<div class="flex items-center gap-3"><label for="movie-player-select" class="text-sm text-zinc-400">Source</label><select id="movie-player-select" class="max-w-[220px] rounded-lg border border-white/10 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400">${playable.map((item, index) => renderTemplate`<option${addAttribute(item.url, "value")}${addAttribute(item.kind, "data-kind")}${addAttribute(item.label || defaultQuality(item), "data-quality")}${addAttribute(index === 0, "selected")}>${item.label || item.quality || `Player ${index + 1}`}</option>`)}</select></div>`}</div><div id="player-container" class="relative aspect-video w-full bg-black">${current.kind === "video" ? renderTemplate`<video id="movie-video" class="absolute inset-0 h-full w-full bg-black" controls playsinline preload="metadata"${addAttribute(movie.poster_url || void 0, "poster")}${addAttribute(current.url, "src")}>Your browser does not support HTML5 video.</video>` : renderTemplate`<iframe id="movie-player-frame"${addAttribute(current.url, "src")}${addAttribute(`Watch ${movie.title}`, "title")} class="absolute inset-0 h-full w-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`}</div></div>` : renderTemplate`<div class="rounded-2xl border border-white/10 bg-zinc-900 px-6 py-14 text-center"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10"><span class="pl-1 text-2xl text-violet-300">▶</span></div><h3 class="mt-5 text-xl font-bold">Player not available</h3><p class="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">No supported active player sources are available. Add a player row with an https URL to video_sources.</p></div>`}</section><!-- Download links --><section class="mt-12"><div class="mb-5"><h2 class="text-2xl font-black">Download Links</h2><p class="mt-2 text-sm text-zinc-400">Available download sources and qualities.</p></div>${downloadSources.length > 0 ? renderTemplate`<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">${downloadSources.map((source) => renderTemplate`<a${addAttribute(safeHttpsUrl(source.url) ?? "#", "href")} target="_blank" rel="noopener noreferrer nofollow" class="group rounded-xl border border-white/10 bg-zinc-900 p-4 transition hover:border-violet-400/50 hover:bg-zinc-800"><span class="text-xs font-bold uppercase tracking-wider text-violet-300">${source.quality || "Download"}</span><span class="mt-2 block font-bold">${source.label || "Open download link"} ↗</span><span class="mt-1 block text-xs text-zinc-500">Opens in a new tab</span></a>`)}</div>` : renderTemplate`<p class="rounded-xl border border-white/10 bg-zinc-900 p-6 text-sm text-zinc-400">No download links are available yet.</p>`}</section></main>`}<footer class="mt-16 border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-500">© ${(/* @__PURE__ */ new Date()).getFullYear()} CineVerse. All rights reserved.</footer>${renderScript($$result, "E:/Desktop/cineverse/src/pages/title/[slug].astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "E:/Desktop/cineverse/src/pages/title/[slug].astro", void 0);
var $$file = "E:/Desktop/cineverse/src/pages/title/[slug].astro";
var $$url = "/title/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/title/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
