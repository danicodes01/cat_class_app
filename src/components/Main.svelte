<script lang="ts">
	import Step from './Step.svelte';

	interface Step {
		name: string;
		icon: string;
		href?: string;
	}

	let steps: Step[] = [
		{
			name: 'Lesson Plans',
			icon: 'fa-solid fa-list-check',
			href: 'lesson-plans'
		},
		{
			name: 'CatClass Store',
			icon: 'fa-solid fa-cart-shopping'
		},
		{
			name: 'Customer Reviews',
			icon: 'fa-solid fa-child-reaching'
		},
		{
			name: 'Support',
			icon: 'fa-solid fa-headset'
		},
		{
			name: 'Follow Us on Instagram',
			icon: 'fa-solid fa-brands fa-instagram'
		},
		{
			name: 'Follow Us on X',
			icon: 'fa-solid fa-brands fa-x-twitter'
		}
	];
</script>

<main class="flex flex-1 flex-col p-4">
	<section id="home" class="grid grid-cols-1 gap-10 py-8 sm:py-14 lg:grid-cols-1">
		<div class="flex flex-col gap-6 text-center md:gap-8 lg:justify-center lg:gap-10">
			<h2 class="text-4xl font-semibold sm:text-5xl md:text-6xl">
				Hi! Welcome to <span class="poppins text-violet-400">Cat</span>Class
				<div class="py-10">😻</div>
			</h2>
			<p class="text-base sm:text-lg md:text-xl">
				Learn like a <span class="poppins text-violet-400">cat</span> ...
			</p>
			<div class="relative grid place-items-center rounded-2xl">
				<img
					src={'images/profile.png'}
					alt="profile image"
					class="z-[2] max-h-[70vh]
				object-cover"
					aria-hidden="true"
				/>
			</div>
			<a
				class="blueShadow poppins group relative mx-auto cursor-pointer
				overflow-hidden rounded-full bg-slate-900 px-6 py-3 text-base 
				text-white sm:text-lg md:text-xl lg:mr-auto"
				href="/learning"
			>
				<div
					class="absolute right-full top-0 z-0 h-full w-full
				bg-violet-400 text-white opacity-20 duration-200 
				group-hover:translate-x-full"
				></div>
				<h4 class="z-9 relative text-white">Start Learning &rarr;</h4>
			</a>
		</div>
	</section>

	<section
		id="about"
		class="relative flex flex-col gap-16 py-20 pt-10 sm:gap-20 md:gap-24 lg:py-32 
		lg:pt-16"
	>
		<div class="relative flex flex-col gap-2 py-4 text-center">
			<h3 class="text-3xl font-semibold sm:text-4xl md:text-5xl">
				About <b class="poppins font-bold text-violet-400">Cat</b>Class
			</h3>
			<h6 class="text-lg sm:text-xl md:text-2xl">
				Curious to <span class="poppins text-violet-400">learn</span> more?
			</h6>
			<h2 class="py-3 text-2xl sm:text-4xl md:text-5xl">Our Mission</h2>
			<p class="poppins mx-auto text-lg font-semibold sm:text-xl md:text-2xl">
				At CatClass, our mission is purr-sistently simple: to transform learning into a pawsitive,
				engaging, and fun experience for students all over the globe. We believe that everyone has
				an inner curious cat just waiting to pounce on new knowledge. With CatClass, you can leap
				over any learning hurdle with grace and confidence, just like a cat landing on its feet.
			</p>
			<h2 class="py-3 text-2xl sm:text-4xl md:text-5xl">What We Do</h2>
			<p class="poppins mx-auto text-lg font-semibold sm:text-xl md:text-2xl">
				CatClass is your go-to platform for claw-some education! We specialize in breaking down
				complex concepts into bite-sized, digestible lessons that make learning a piece of fish. Our
				innovative approach helps students tackle and overcome learning roadblocks, ensuring that
				nothing stands in the way of their educational journey.
			</p>
			<h2 class="py-3 text-2xl sm:text-4xl md:text-5xl">How We Help Students</h2>
			<p class="poppins mx-auto text-lg font-semibold sm:text-xl md:text-2xl">
				Just like a cat chasing after a laser pointer, our students are driven by curiosity and
				excitement. We provide tools, resources, and a supportive community to help students scratch
				the surface of new subjects and dive deep into their passions. Whether it's mastering a
				tricky math problem or unraveling the mysteries of science, CatClass is here to guide you
				every step of the way.
			</p>
			<p class="poppins mx-auto text-lg font-semibold sm:text-xl md:text-2xl">
				Join CatClass today and discover how fun and easy learning can be. Let's unleash your inner
				feline scholar and make education pawsitively enjoyable!
			</p>
		</div>
	</section>

	<section id="info" class="flex flex-col gap-24 py-10 lg:py-10">
		<div class="flex flex-col gap-2 text-center">
			<div class="grid grid-cols-2 gap-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
			lg:gap-10">
				{#each steps as step}
					<Step {step}></Step>
				{/each}
			</div>
		</div>
	</section>
</main>
