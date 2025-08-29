<script lang="ts">
	import Animate from '$lib/components/Animate.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { getLocale, translate as t } from '$lib/i18n';
	import { projetos, socialLinks } from '$lib/utils';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import TextAnimation from '$lib/components/TextAnimation.svelte';
	import { ArrowBigRight, ArrowRight } from 'lucide-svelte';
	// import Timeline from '$lib/components/Timeline.svelte';
	import GlowCard from '$lib/components/GlowCard.svelte';

	let currentLocale = $state(getLocale());

	if (typeof window !== 'undefined') {
		window.addEventListener('localechange', (e) => {
			// @ts-ignore
			currentLocale = e.detail;
		});
	}

	const habilidades = [
		'HTML',
		'CSS',
		'JavaScript',
		'TypeScript',
		'Java',
		'Java Spring',
		'React',
		'React Native',
		'Node.js',
		'Svelte',
		'SvelteKit',
		'Tailwind',
		'BootStrap',
		'PostgreSQL',
		'MySQL',
		'Drizzle ORM',
		'Prisma'
	];

	const experiencias = [
		{
			cargoKey: 'experiences.1.role',
			empresaKey: 'experiences.1.company',
			periodoKey: 'experiences.1.period',
			descKey: 'experiences.1.desc'
		},
		{
			cargoKey: 'experiences.2.role',
			empresaKey: 'experiences.2.company',
			periodoKey: 'experiences.2.period',
			descKey: 'experiences.2.desc'
		},
		{
			cargoKey: 'experiences.3.role',
			empresaKey: 'experiences.3.company',
			periodoKey: 'experiences.3.period',
			descKey: 'experiences.3.desc'
		}
	];

	let loading = $state(false);
	let formElement: HTMLFormElement;

	const handleSubmit: SubmitFunction = () => {
		loading = true;

		return async ({ result, update }) => {
			if (result.type === 'success') {
				formElement?.reset();
			}

			await update();
			loading = false;
		};
	};

	const names = ['Breno', 'de', 'Oliveira', 'Brandão'];
</script>

<section class="flex min-h-screen items-center">
	<div class="mx-auto w-full max-w-6xl px-4">
		<Animate>
			<div class="grid items-center gap-12 lg:grid-cols-2">
				<div class="space-y-8 text-center lg:text-left">
					<h1
						class="flex flex-wrap justify-center text-center text-5xl leading-tight font-bold text-base-content lg:justify-start lg:text-left lg:text-5xl"
					>
						{#each names as name, i}
							<Animate delay={i * 0.3}>
								<span class="name-text mr-5" style="animation-delay: {i * 0.2}s">{name}</span>
							</Animate>
						{/each}
					</h1>
					<p class="mx-auto max-w-2xl leading-relaxed text-base-content md:text-lg lg:mx-0">
						{@html t('hero.intro', currentLocale)}
					</p>
				</div>

				<div class="flex justify-center lg:justify-end">
					<div
						class="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-base-100 lg:h-96 lg:w-96"
					>
						<div class="flex h-full w-full items-center justify-center text-lg">
							<!-- {t('profile.photo', currentLocale)} -->
							<img class="h-full w-full object-cover" src="/breno.webp" alt="" />
						</div>
					</div>
				</div>
			</div>
		</Animate>
	</div>
</section>

<section id="sobre" class="flex items-center py-16">
	<div class="mx-auto w-full max-w-6xl px-4">
		<Animate>
			<div class="relative z-10 mx-auto max-w-7xl">
				<div class="mb-16 text-center">
					<h2 class="text-center text-3xl font-bold text-base-content lg:text-left">
						{t('about.title', currentLocale)}
					</h2>
				</div>

				<div class="grid gap-12 lg:grid-cols-2">
					<div class="h-full space-y-6">
						<div
							class="h-full rounded-lg bg-base-200 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
						>
							<div class="mb-6 flex items-center">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary"
								>
									<svg
										class="h-6 w-6 text-base-content"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										></path>
									</svg>
								</div>
								<h3 class="ml-4 text-2xl font-bold text-base-content">
									{t('about.who', currentLocale)}
								</h3>
							</div>
							<p class="mb-4 text-lg leading-relaxed text-base-content">
								{@html t('about.who_text', currentLocale)}
							</p>
						</div>
					</div>

					<div class="h-full space-y-6">
						<div
							class="h-full rounded-lg bg-base-200 p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
						>
							<div class="mb-6 flex items-center">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary"
								>
									<svg
										class="h-6 w-6 text-base-content"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										></path>
									</svg>
								</div>
								<h3 class="ml-4 text-2xl font-bold text-base-content">
									{t('about.skills', currentLocale)}
								</h3>
							</div>
							<div class="flex flex-wrap gap-3">
								{#each habilidades as habilidade, index}
									<span class="rounded bg-primary/20 px-3 py-1 text-sm text-primary"
										>{habilidade}</span
									>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Animate>
	</div>
</section>
<section id="projetos" class=" py-20">
	<div class="mx-auto max-w-6xl px-4">
		<Animate>
			<div class="space-y-12">
				<div class="flex w-full items-center justify-between">
					<h2 class="text-center text-3xl font-bold text-base-content lg:text-left">
						{t('projects.title', currentLocale)}
					</h2>
					<a href="/projetos" class="btn btn-primary md:px-16"
						>{t('projects.see_more', currentLocale)} <ArrowRight /></a
					>
				</div>
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each projetos.slice(0, 3) as projeto}
						<a
							href="/projetos/{projeto.id}"
							class="group relative rounded-lg border border-base-300 p-1 transition-all duration-500 hover:scale-102"
						>
							<GlowCard
								spread={50}
								glow={true}
								disabled={false}
								proximity={64}
								inactiveZone={0.01}
							/>
							<div class="relative flex h-full flex-col gap-4 rounded-lg bg-base-200 p-4">
								<div class="flex flex-col gap-4">
									<div class="h-48 bg-base-100">
										<img
											src={projeto.images[0]}
											alt={t(projeto.tituloKey, currentLocale)}
											class="h-full w-full rounded-lg object-cover"
										/>
									</div>
									<h3 class="text-xl font-semibold text-base-content">
										{t(projeto.tituloKey, currentLocale)}
									</h3>
									<p class="text-base-content">{t(projeto.descKey, currentLocale)}</p>
								</div>
								<div class="flex flex-wrap gap-2">
									{#each projeto.tecnologias as tech}
										<span class="rounded bg-primary/20 px-3 py-1 text-sm text-primary">{tech}</span>
									{/each}
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</Animate>
	</div>
</section>

<section id="experiencias" class=" py-20">
	<div class="mx-auto max-w-6xl px-4">
		<Animate>
			<div class="space-y-12">
				<h2 class="text-center text-3xl font-bold text-base-content lg:text-left">
					{t('experiences.title', currentLocale)}
				</h2>
				<div class="space-y-8">
					{#each experiencias as exp}
						<div class="space-y-4 border-l-4 border-primary pl-8">
							<div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
								<div>
									<h3 class="text-xl font-semibold text-base-content">
										{t(exp.cargoKey, currentLocale)}
									</h3>
									<p class="font-medium text-primary">{t(exp.empresaKey, currentLocale)}</p>
								</div>
								<span class="flex-shrink-0 text-sm text-base-content"
									>{t(exp.periodoKey, currentLocale)}</span
								>
							</div>
							<p class="text-base-content">{t(exp.descKey, currentLocale)}</p>
						</div>
					{/each}
				</div>
			</div>
		</Animate>
	</div>
</section>

<section id="contato" class=" py-20 text-base-content">
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-12 text-center">
			<h2 class="text-4xl font-bold">{t('contact.title', currentLocale)}</h2>
		</div>

		<Animate>
			<div class="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
				<div class="flex flex-col gap-4 lg:mt-7">
					<div class="flex items-center gap-4 rounded-md bg-base-200 p-4">
						<div class="h-3 w-3 animate-pulse rounded-sm bg-primary"></div>
						<span class="font-medium text-base-content"
							>{t('contact.open_to_work', currentLocale)}</span
						>
					</div>

					<div class="flex items-center gap-4 rounded-md bg-base-200 p-4">
						<div class="text-base-content">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="h-6 w-6"
							>
								<path
									d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
								/>
								<path
									d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-wider text-base-content">
								{t('contact.email_label', currentLocale)}
							</p>
							<p class="text-base-content">oliveira.brenobrandao@gmail.com</p>
						</div>
					</div>

					<div class="flex items-center gap-4 rounded-md bg-base-200 p-4">
						<div class="flex h-6 w-6 flex-shrink-0 items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-full w-full text-base-content"
							>
								<path
									d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
								/>
							</svg>
						</div>
						<div>
							<p class="text-xs font-semibold tracking-wider text-base-content">
								{t('contact.location_label', currentLocale)}
							</p>
							<p class="text-base-content">Rua paraiba 710, Savassi, BH</p>
						</div>
					</div>

					<div class="mt-2 flex items-center gap-4">
						{#each socialLinks as item}
							<a
								href={item.link}
								aria-label={item.name}
								class="rounded-md bg-base-200 p-3 text-base-content transition-colors hover:bg-base-100"
							>
								<item.icon width="28" height="28" />
							</a>
						{/each}
					</div>
				</div>
				<form
					bind:this={formElement}
					class="flex flex-col gap-4"
					method="POST"
					action="?/send"
					use:enhance={handleSubmit}
				>
					<div>
						<label for="name" class="mb-2 block text-sm font-medium text-base-content">
							{t('form.name', currentLocale)}
						</label>
						<input
							type="text"
							id="name"
							name="name"
							class="input w-full"
							placeholder={t('form.placeholder.name', currentLocale)}
							required
							disabled={loading}
						/>
					</div>

					<div>
						<label for="email" class="mb-2 block text-sm font-medium text-base-content">
							{t('form.email', currentLocale)}
						</label>
						<input
							type="email"
							id="email"
							name="email"
							class="input w-full"
							placeholder={t('form.placeholder.email', currentLocale)}
							required
							disabled={loading}
						/>
					</div>

					<div>
						<label for="message" class="mb-2 block text-sm font-medium text-base-content">
							{t('form.message', currentLocale)}
						</label>
						<textarea
							id="message"
							name="message"
							rows="5"
							class="textarea w-full"
							placeholder={t('form.placeholder.message', currentLocale)}
							required
							disabled={loading}
						></textarea>
					</div>

					<button type="submit" class="btn btn-primary" disabled={loading}>
						{#if loading}
							<span class="loading loading-spinner"></span>
							{t('form.sending', currentLocale)}
						{:else}
							{t('form.submit', currentLocale)}
						{/if}
					</button>
				</form>
			</div>
		</Animate>
	</div>
</section>

<style>
	.name-text {
		display: inline-block;
		background: linear-gradient(45deg, hsl(var(--p)), hsl(var(--s)), hsl(var(--a)));
		background-size: 200% 200%;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation:
			nameWave 10s ease-in-out infinite,
			gradientShift 7s ease-in-out infinite;
		margin-right: 20px;
		transition: transform 0.3s ease;
	}

	@keyframes nameWave {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		25% {
			transform: translateY(-8px) rotate(1deg);
		}
		75% {
			transform: translateY(-4px) rotate(-1deg);
		}
	}

	@keyframes gradientShift {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>
