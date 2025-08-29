<script lang="ts">
	import { onMount } from 'svelte';
	import { translate, getLocale } from '$lib/i18n.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let { projeto: project } = $derived(data);

	let notFound = $state(false);
	let lightboxOpen = $state(false);
	let currentImageIndex = $state(0);

	let currentLocale = $state(getLocale());

	if (typeof window !== 'undefined') {
		window.addEventListener('localechange', (e) => {
			// @ts-ignore
			currentLocale = e.detail;
		});
	}

	function getStatusBadgeClass(status: string) {
		switch (status) {
			case 'completed':
				return 'badge-success';
			case 'in-progress':
				return 'badge-warning';
			default:
				return 'badge-neutral';
		}
	}

	function formatDate(dateString: string | null) {
		if (!dateString) return translate('projects.ongoing', currentLocale);
		const [year, month] = dateString.split('-');
		const months = {
			pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		};
		return `${months[currentLocale][parseInt(month) - 1]} ${year}`;
	}

	function openLightbox(index: number) {
		currentImageIndex = index;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = 'auto';
	}

	function nextImage() {
		if (project?.images) {
			currentImageIndex = (currentImageIndex + 1) % project.images.length;
		}
	}

	function prevImage() {
		if (project?.images) {
			currentImageIndex =
				currentImageIndex === 0 ? project.images.length - 1 : currentImageIndex - 1;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!lightboxOpen) return;

		switch (event.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowLeft':
				prevImage();
				break;
			case 'ArrowRight':
				nextImage();
				break;
		}
	}

	function getMosaicGridClass(imageCount: number) {
		if (imageCount === 1) return 'aspect-video max-h-80 md:max-h-[50vh] object-cover';
		if (imageCount === 2) return 'grid-cols-1 md:grid-cols-2';
		if (imageCount === 3) return 'grid-cols-1 md:grid-cols-3';
		if (imageCount === 4) return 'aspect-square max-h-60 md:max-h-92 object-cover';
		if (imageCount <= 6) return 'grid-cols-2 md:grid-cols-3';
		return 'aspect-square max-h-60 md:max-h-72 object-cover';
	}
</script>

<svelte:head>
	<title
		>{project
			? translate(project.tituloKey, currentLocale)
			: translate('projects.title', currentLocale)}</title
	>
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen bg-base-100">
	<div class="container mx-auto max-w-6xl px-4 py-8">
		<div class="border-b border-base-200 pb-4">
			<a href="/projetos" class="btn btn-ghost">
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
				{translate('projects.back_to_projects', currentLocale)}
			</a>
		</div>
		{#if notFound}
			<div class="hero min-h-96">
				<div class="hero-content text-center">
					<div class="max-w-md">
						<h1 class="text-5xl font-bold">404</h1>
						<p class="py-6">{translate('projects.not_found', currentLocale)}</p>
						<a href="/projects" class="btn btn-primary">
							{translate('projects.back_to_projects', currentLocale)}
						</a>
					</div>
				</div>
			</div>
		{:else if project}
			<article class="mt-4 space-y-8">
				<header class="space-y-4">
					<div class="flex flex-wrap items-center gap-3">
						<h1 class="text-4xl font-bold text-base-content">
							{translate(project.tituloKey, currentLocale)}
						</h1>
						<div class="badge {getStatusBadgeClass(project.status)} badge-lg">
							{translate(`projects.status.${project.status}`, currentLocale)}
						</div>
					</div>

					<div class="flex flex-wrap items-center gap-4 text-base-content/70">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
							<span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
						</div>
					</div>
				</header>

				{#if project.images && project.images.length > 0}
					<div class="w-full">
						<div class="grid gap-3 {getMosaicGridClass(project.images.length)} w-full">
							{#each project.images as image, index}
								<button
									class="group relative overflow-hidden rounded-lg bg-base-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
									onclick={() => openLightbox(index)}
									type="button"
									aria-label="Open image in lightbox"
								>
									<img
										src={image || '/placeholder.svg'}
										alt="{translate(project.tituloKey, currentLocale)} - Image {index + 1}"
										class="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
										loading={index < 4 ? 'eager' : 'lazy'}
									/>
									<div
										class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
									>
										<div
											class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
										>
											<svg
												class="h-8 w-8 text-white"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
												></path>
											</svg>
										</div>
									</div>
								</button>
							{/each}
						</div>
					</div>
				{/if}

				<div class="flex flex-wrap gap-4">
					{#if project.liveUrl}
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-primary"
							aria-label="View live project"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								></path>
							</svg>
							{translate('projects.view_live', currentLocale)}
						</a>
					{/if}

					{#if project.githubUrl}
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-outline"
							aria-label="View project code on GitHub"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
							{translate('projects.view_code', currentLocale)}
						</a>
					{/if}
				</div>

				<div class="space-y-3">
					<h2 class="text-xl font-semibold">{translate('projects.technologies', currentLocale)}</h2>
					<div class="flex flex-wrap gap-2">
						{#each project.tecnologias as tech}
							<span class="rounded bg-primary/20 px-3 py-1 text-sm text-primary">{tech}</span>
						{/each}
					</div>
				</div>

				<div class="space-y-3">
					<h2 class="text-xl font-semibold">{translate('projects.description', currentLocale)}</h2>
					<div class="prose max-w-none">
						<p class="leading-relaxed text-base-content/80">
							{translate(project.detailedDescKey || project.descKey, currentLocale)}
						</p>
					</div>
				</div>

				{#if project.features && project.features.length > 0}
					<div class="space-y-3">
						<h2 class="text-xl font-semibold">{translate('projects.features', currentLocale)}</h2>
						<ul class="space-y-2">
							{#each project.features as featureKey}
								<li class="flex items-start gap-3">
									<svg
										class="mt-0.5 h-5 w-5 flex-shrink-0 text-success"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span class="text-base-content/80">{translate(featureKey, currentLocale)}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</article>
		{:else}
			<div class="flex min-h-96 items-center justify-center">
				<span class="loading loading-lg loading-spinner"></span>
			</div>
		{/if}
	</div>
</div>

{#if lightboxOpen && project?.images}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-base-200/90 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="lightbox-title"
  >
    <div class="relative max-h-full max-w-full" role="region" aria-label="Image carousel">
      <img
        src={project.images[currentImageIndex] || '/placeholder.svg'}
        alt="{translate(project.tituloKey, currentLocale)} - Image {currentImageIndex + 1}"
        class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
      />

      <button
        class="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-base-200 text-base-content hover:bg-base-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
        onclick={closeLightbox}
        type="button"
        aria-label="Close lightbox"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      {#if project.images.length > 1}
        <button
          class="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-base-200 text-base-content hover:bg-base-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          onclick={prevImage}
          type="button"
          aria-label="Previous image"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          class="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-base-200 text-base-content hover:bg-base-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          onclick={nextImage}
          type="button"
          aria-label="Next image"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
        <div
          class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-base-200/80 px-3 py-1 text-sm text-base-content backdrop-blur-sm"
          aria-live="polite"
        >
          {currentImageIndex + 1} / {project.images.length}
        </div>
      {/if}
    </div>
  </div>
{/if}