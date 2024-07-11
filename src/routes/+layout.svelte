<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import { writable } from 'svelte/store';

	let y = writable<number>(0);
	let innerHeight = writable<number>(0);
	let innerWidth = writable<number>(0);

	function gotTop() {
		document.body.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<div
	class="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col text-sm
sm:text-base"
>
	<div
		class={'fixed bottom-0 z-[10] flex w-full p-10 duration-200 ' +
			($y > 0 ? 'opacity-full pointer-events-auto' : 'pointer-events-none opacity-0')}
	>
		<button
			on:click={gotTop}
			class="hover:text- ml-auto cursor-pointer rounded-full bg-white px-3
      text-slate-900 sm:px-4"
		>
			<i class="fa-solid fa-arrow-up grid aspect-square place-items-center"></i>
		</button>
	</div>
	<Header {y}></Header>
	<slot></slot>
	<Footer />
</div>

<svelte:window bind:scrollY={$y} bind:innerHeight={$innerHeight} bind:innerWidth={$innerWidth} />
