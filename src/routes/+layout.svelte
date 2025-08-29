<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Mouse from '$lib/components/Mouse.svelte';
	import { getLocale, switchLocale, translate as t } from '$lib/i18n';
	import Particles from '$lib/components/Particles.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Motion } from 'svelte-motion';
	import LocaleSelect from '$lib/components/LocaleSelect.svelte';
	import { socialLinks } from '$lib/utils';

	let { children } = $props();

	let isMobileMenuOpen = $state(false);
	let currentLocale = $state(getLocale());

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function toggleLocale() {
		const next = currentLocale === 'pt' ? 'en' : 'pt';
		currentLocale = next;
		switchLocale(next);
	}

	const navItems = [
		{ key: 'nav.home', href: '/' },
		{ key: 'nav.about', href: '/#sobre' },
		{ key: 'nav.projects', href: '/#projetos' },
		{ key: 'nav.experiences', href: '/#experiencias' },
		{ key: 'nav.contact', href: '/#contato' }
	];

	if (typeof window !== 'undefined') {
		// Ensure <html lang> reflects saved/initial locale
		document.documentElement.lang = currentLocale;
		window.addEventListener('localechange', (e: any) => {
			currentLocale = e.detail;
		});
	}

	let scrollY = $state(0);
	let innerHeight = $state(0);

	function updateIntersections() {
		if (document.documentElement.scrollHeight > innerHeight) {
			scrollProgress = scrollY / (document.documentElement.scrollHeight - innerHeight);
		}
	}

	let isMobile = $state(false);

	function checkMobile() {
		isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
	}

	onMount(() => {
		checkMobile();
		window.addEventListener('scroll', () => {
			scrollY = window.scrollY;
			updateIntersections();
		});

		window.addEventListener('resize', () => {
			innerHeight = window.innerHeight;
			innerWidth = window.innerWidth;
			updateIntersections();
		});

		innerHeight = window.innerHeight;
		innerWidth = window.innerWidth;
		updateIntersections();

		return () => {
			window.removeEventListener('scroll', updateIntersections);
			window.removeEventListener('resize', updateIntersections);
		};
	});

	let scrollProgress = $state(0);

	$effect(() => {
		updateIntersections();
	});

	let left = $state(0);
	let width = $state(0);
	let opacity = $state(0);

	let positionMotion = (node: HTMLElement) => {
		let refNode = () => {
			let mint = node.getBoundingClientRect();
			left = node.offsetLeft;
			width = mint.width;
			opacity = 1;
		};
		node.addEventListener('mouseenter', refNode);
		return {
			destroy() {
				node.removeEventListener('mouseenter', refNode);
			}
		};
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if isMobileMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

{#if scrollProgress > 0.01}
	<div transition:fly class="fixed top-0 left-0 z-51 h-1 w-full bg-transparent">
		<div class="h-full bg-primary" style="width: {scrollProgress * 100}%"></div>
	</div>
{/if}

<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
	<div class="glow-orb glow-orb-1"></div>
	<div class="glow-orb glow-orb-2"></div>
	<div class="glow-orb glow-orb-3"></div>
	<div class="glow-orb glow-orb-4"></div>
	<div class="glow-orb glow-orb-5"></div>
</div>

<header
	class="sticky top-0 z-50 transition-opacity {scrollProgress > 0.02
		? 'border-b border-base-300 bg-base-300/40 backdrop-blur '
		: ''}"
>
	<div class="mx-auto max-w-6xl px-4">
		<div class="flex h-16 items-center justify-between">
			<a href="/" class="text-xl font-bold text-base-content"> Breno Brandão </a>

			<nav
				class="hidden items-center text-sm md:flex"
				onmouseleave={() => {
					width = width;
					left = left;
					opacity = 0;
				}}
			>
				{#each navItems as item}
					<a
						href={item.href}
						class="z-10 px-5 py-3 text-base-content transition-colors hover:text-primary"
						use:positionMotion>{t(item.key, currentLocale)}</a
					>
				{/each}
				<Motion
					animate={{
						left: left,
						width: width,
						opacity: opacity
					}}
					transition={{
						type: 'spring',
						stiffness: 400,
						damping: 30
					}}
					let:motion
				>
					<li use:motion class="absolute z-0 h-4 w-full rounded-full bg-base-content md:h-7"></li>
				</Motion>
				<div class="ml-2">
					<LocaleSelect />
				</div>
			</nav>

			<button
				onclick={toggleMobileMenu}
				class="text-white focus:outline-none md:hidden"
				aria-label={t('aria.open_menu', currentLocale)}
			>
				{#if isMobileMenuOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
</header>

{#if isMobileMenuOpen}
	<div class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black">
		<nav class="flex flex-col gap-8 text-center">
			{#each navItems as item}
				<a
					onclick={toggleMobileMenu}
					href={item.href}
					class="text-2xl text-base-content transition-colors hover:text-primary"
					>{t(item.key, currentLocale)}</a
				>
			{/each}
			<LocaleSelect />
		</nav>
	</div>
{/if}

<main>
	{#if !isMobile}
		<Mouse />
		<Particles className="absolute inset-0" />
	{/if}
	{@render children?.()}

	<footer class="z-50 border-t border-base-100 bg-base-300 py-12 text-base-content">
		<div class="mx-auto max-w-6xl px-4">
			<div class="mb-8 grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
				<div class="space-y-4">
					<h3 class="text-lg font-bold text-base-content">{t('footer.quote', currentLocale)}</h3>
					<blockquote class="italic">
						<p>"{t('footer.quote_text', currentLocale)}"</p>
						<cite class="mt-2 block text-sm not-italic"
							>{t('footer.quote_author', currentLocale)}</cite
						>
					</blockquote>
				</div>

				<div class="space-y-4">
					<h3 class="text-lg font-bold text-base-content">
						{t('footer.navigation', currentLocale)}
					</h3>
					<ul class="space-y-2">
						<li>
							<a href="#sobre" class="transition-colors hover:text-primary"
								>{t('footer.about', currentLocale)}</a
							>
						</li>
						<li>
							<a href="#projetos" class="transition-colors hover:text-primary"
								>{t('footer.projects', currentLocale)}</a
							>
						</li>
						<li>
							<a href="#experiencias" class="transition-colors hover:text-primary"
								>{t('footer.experiences', currentLocale)}</a
							>
						</li>
						<li>
							<a href="#contato" class="transition-colors hover:text-primary"
								>{t('footer.contact', currentLocale)}</a
							>
						</li>
					</ul>
				</div>

				<div class="space-y-4">
					<h3 class="text-lg font-bold text-base-content">{t('footer.connect', currentLocale)}</h3>
					<div class="flex items-center justify-center gap-4 md:justify-start">
						{#each socialLinks as item}
							<a
								href={item.link}
								aria-label={item.name}
								class="rounded-full bg-base-200 p-2 text-base-content transition-colors hover:bg-base-100"
							>
								<item.icon width="24" height="24" />
							</a>
						{/each}
					</div>
				</div>
			</div>

			<div
				class="justify-between space-y-4 border-t border-base-100 pt-8 text-center text-sm md:flex-row md:space-y-0"
			>
				<p>
					&copy; {new Date().getFullYear()}
					{t('brand.name', currentLocale)}. {t('footer.rights', currentLocale)}
				</p>
			</div>
		</div>
	</footer>
</main>

<style>
	.glow-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(45px);
		opacity: 0.18;
		animation: float 8s ease-in-out infinite;
	}

	.glow-orb-1 {
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, hsl(var(--p)) 0%, transparent 50%);
		top: 10%;
		left: 10%;
		animation-delay: 0s;
		animation-duration: 8s;
	}

	.glow-orb-2 {
		width: 700px;
		height: 700px;
		background: radial-gradient(circle, hsl(var(--s)) 0%, transparent 40%);
		top: 60%;
		right: 15%;
		animation-delay: -2s;
		animation-duration: 6s;
	}

	.glow-orb-3 {
		width: 1300px;
		height: 1800px;
		background: radial-gradient(circle, hsl(var(--a)) 0%, transparent 40%);
		bottom: 20%;
		left: 20%;
		animation-delay: -4s;
		animation-duration: 14s;
	}

	.glow-orb-4 {
		width: 120px;
		height: 120px;
		background: radial-gradient(circle, hsl(var(--p)) 0%, transparent 50%);
		top: 30%;
		right: 40%;
		animation-delay: -6s;
		animation-duration: 5s;
	}

	.glow-orb-5 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, hsl(var(--s)) 0%, transparent 40%);
		bottom: 40%;
		right: 25%;
		animation-delay: -8s;
		animation-duration: 7s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(10px, -15px) scale(1.1);
		}
		50% {
			transform: translate(-5px, -10px) scale(0.9);
		}
		75% {
			transform: translate(-10px, 5px) scale(1.05);
		}
	}
</style>
