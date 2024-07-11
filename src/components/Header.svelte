<script lang="ts">
    export let y;

    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
  
    let tabs = [
      { name: 'about', link: '#about' },
      { name: 'info', link: '#info' }
    ];
  
    function scrollToSection(sectionId: string) {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    async function handleNavigation(sectionId: string) {
    const currentPath = $page.url.pathname;
    if (currentPath !== '/') {
      await goto('/');
    }
    scrollToSection(sectionId);
  }
  
    console.log(y)
  </script>
  
  <header
    class={'sticky top-0 z-[10] flex bg-white items-center justify-between border border-solid px-6 duration-200 ' + (y > 0 ? 'border-violet-950 bg-white py-4' 
    : 'border-transparent bg-transparent py-6')}
  >
    <a href="/">
      <h1 class="font-medium">
        <b class="poppins font-bold text-violet-400">Cat</b>Class app
      </h1>
    </a>
    <div class="ml-auto hidden items-center gap-4 sm:flex">
      {#each tabs as tab, index}
        <button on:click|preventDefault={() => handleNavigation(tab.link)} class="duration-200 
          hover:text-violet-400">
          <p>{tab.name}</p>
        </button>
      {/each}
    </div>
    <a
      href="https://google.com"
      target="_blank"
      class="blueShadow group relative overflow-hidden rounded-full bg-white px-5 py-2 
      text-slate-950"
    >
      <div
        class="absolute right-full top-0 z-0 h-full w-full bg-violet-400 opacity-20 
        duration-200 group-hover:translate-x-full"
      ></div>
      <h4 class="relative">signup</h4>
    </a>
  </header>
  
  <slot></slot>
  