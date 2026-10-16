import { tt as __exportAll } from "./errors_C8cQnSfQ.mjs";
import { C as createComponent, S as createAstro, a as Fragment, d as maybeRenderHead, f as renderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_DSKvYReI.mjs";
import "./compiler_MK_MV47C.mjs";
import { t as supabase } from "./supabase_SjCGlPtN.mjs";
/* empty css                 */
//#region src/components/EpisodeList.astro
createAstro("https://astro.build");
var $$EpisodeList = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$EpisodeList;
	const { episodes, seriesSlug, seasonNumber } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="mt-5 space-y-3">${episodes.length === 0 ? renderTemplate`<p class="rounded-xl border border-white/10 bg-zinc-900 p-5 text-sm text-zinc-400">No published episodes in this season yet.</p>` : episodes.map((episode) => renderTemplate`<a${addAttribute(`/title/${encodeURIComponent(seriesSlug)}/season/${seasonNumber}/episode/${episode.episode_number}/`, "href")} class="flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900 p-4 transition hover:border-violet-400/40 hover:bg-zinc-800"><div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 font-black text-violet-300">${String(episode.episode_number).padStart(2, "0")}</div><div class="min-w-0 flex-1"><h3 class="truncate font-semibold">${episode.title}</h3>${episode.description && renderTemplate`<p class="mt-1 line-clamp-2 text-sm text-zinc-400">${episode.description}</p>`}</div>${episode.duration_minutes && renderTemplate`<span class="shrink-0 text-xs text-zinc-500">${episode.duration_minutes} min</span>`}<span class="text-violet-300">→</span></a>`)}</div>`;
}, "E:/Desktop/cineverse/src/components/EpisodeList.astro", void 0);
//#endregion
//#region src/pages/series/[slug].astro
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
	const slug = Astro.params.slug ?? "";
	const { data: series, error } = await supabase.from("media").select("*").eq("slug", slug).eq("media_type", "series").eq("is_published", true).maybeSingle();
	if (error) console.error("Series query failed:", error.message);
	let seasons = [];
	let selectedSeason = null;
	let episodes = [];
	if (series) {
		const { data } = await supabase.from("seasons").select("id, season_number, title").eq("series_id", series.id).eq("is_published", true).order("season_number", { ascending: true });
		seasons = data ?? [];
		const requestedSeason = Number(Astro.url.searchParams.get("season"));
		selectedSeason = seasons.find((s) => s.season_number === requestedSeason) ?? seasons[0] ?? null;
		if (selectedSeason) {
			const { data: episodeRows } = await supabase.from("episodes").select("id, episode_number, title, description, duration_minutes").eq("season_id", selectedSeason.id).eq("is_published", true).order("episode_number", { ascending: true });
			episodes = episodeRows ?? [];
		}
	}
	const title = series ? `${series.title} — CineVerse` : "Series Not Found — CineVerse";
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#09090b"><title>${title}</title><meta name="description"${addAttribute(series?.description ?? "Explore TV series on CineVerse.", "content")}>${renderHead($$result)}</head><body class="min-h-screen bg-zinc-950 text-zinc-100"><header class="border-b border-white/10 bg-zinc-950/90"><nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"><a href="/" class="text-xl font-black"><span class="text-violet-400">CINE</span>VERSE</a><a href="/" class="text-sm text-zinc-300 hover:text-white">← Back to Home</a></nav></header>${!series ? renderTemplate`<main class="mx-auto max-w-3xl px-4 py-24 text-center"><h1 class="text-3xl font-black">Series not found</h1><p class="mt-3 text-zinc-400">This series may not exist or may not be published.</p><a href="/" class="mt-7 inline-block rounded-lg bg-violet-500 px-5 py-3 font-bold">Browse Titles</a></main>` : renderTemplate`<main class="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12"><section class="grid gap-7 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/50 to-zinc-900 p-6 md:grid-cols-[220px_1fr] md:p-9"><div>${series.poster_url ? renderTemplate`<img${addAttribute(series.poster_url, "src")}${addAttribute(`${series.title} poster`, "alt")} fetchpriority="high" class="mx-auto w-full max-w-[220px] rounded-2xl border border-white/10">` : renderTemplate`<div class="flex aspect-[2/3] items-center justify-center rounded-2xl bg-zinc-800 p-4 text-center">${series.title}</div>`}</div><div class="flex flex-col justify-center"><p class="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">TV Series</p><h1 class="mt-3 text-3xl font-black md:text-5xl">${series.title}</h1><div class="mt-5 flex flex-wrap gap-2">${series.imdb_rating != null && renderTemplate`<span class="rounded-lg bg-yellow-500/10 px-3 py-2 text-sm font-bold text-yellow-400">★ IMDb ${series.imdb_rating}/10</span>`}${series.release_year && renderTemplate`<span class="rounded-lg border border-white/10 px-3 py-2 text-sm">${series.release_year}</span>`}${series.language && renderTemplate`<span class="rounded-lg border border-white/10 px-3 py-2 text-sm">${series.language}</span>`}${series.country && renderTemplate`<span class="rounded-lg border border-white/10 px-3 py-2 text-sm">${series.country}</span>`}</div><p class="mt-6 whitespace-pre-line text-sm leading-7 text-zinc-300">${series.description || "Description is not available yet."}</p></div></section><section class="mt-12"><h2 class="text-2xl font-black">Episodes & Seasons</h2><p class="mt-2 text-sm text-zinc-400">Select a season to explore its episodes.</p>${seasons.length > 0 ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<div class="mt-6 flex flex-wrap gap-3">${seasons.map((season) => renderTemplate`<a${addAttribute(`/series/${encodeURIComponent(slug)}/?season=${season.season_number}`, "href")}${addAttribute(selectedSeason?.id === season.id ? "page" : void 0, "aria-current")}${addAttribute(["rounded-lg border px-4 py-3 text-sm font-bold transition", selectedSeason?.id === season.id ? "border-violet-400 bg-violet-500 text-white" : "border-white/10 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"], "class:list")}>${season.title || `Season ${season.season_number}`}</a>`)}</div>${selectedSeason && renderTemplate`<div class="mt-7"><h3 class="text-xl font-bold">${selectedSeason.title || `Season ${selectedSeason.season_number}`}</h3>${renderComponent($$result, "EpisodeList", $$EpisodeList, {
		"episodes": episodes,
		"seriesSlug": slug,
		"seasonNumber": selectedSeason.season_number
	})}</div>`}` })}` : renderTemplate`<p class="mt-5 rounded-xl border border-white/10 bg-zinc-900 p-6 text-sm text-zinc-400">No published seasons available yet.</p>`}</section></main>`}<footer class="mt-16 border-t border-white/10 px-4 py-8 text-center text-xs text-zinc-500">© ${(/* @__PURE__ */ new Date()).getFullYear()} CineVerse</footer></body></html>`;
}, "E:/Desktop/cineverse/src/pages/series/[slug].astro", void 0);
var $$file = "E:/Desktop/cineverse/src/pages/series/[slug].astro";
var $$url = "/series/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/series/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
