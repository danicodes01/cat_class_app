<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  interface Feature {
    name: string;
    planTypes: string[];
  }

  interface LessonPlan {
    name: string;
    description: string;
    planType: string;
    priceId: string;
    endpoint: string;
    image: string;
    price: number;
    features: { feature: Feature }[];
  }

  let plans = writable<LessonPlan[]>([]);

  // Fetch plans and features from the backend
  async function fetchPlans() {
    try {
      const response = await fetch('/plans');
      const data = await response.json();
      plans.set(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }

  onMount(() => {
    fetchPlans();
  });

  function handleCheckout(endpoint: string, priceId: string) {
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.url) {
        window.location.href = data.url; 
      }
    })
    .catch(error => console.error('Error creating checkout session:', error));
  }
</script>

<main class="max-w-5xl mx-auto p-4">
  <h1 class="text-xl font-bold mb-6">Lesson Plans</h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    {#each $plans as plan}
      <div class="p-3 border rounded-md shadow-lg flex flex-col justify-between">
        <div>
          <h2 class="text-lg font-bold mb-2">{plan.name}</h2>
          <p class="text-gray-500 mb-2 text-sm font-light py-2">{plan.description}</p>
          <ul class="list-disc pl-5 mb-2 space-y-1 text-sm">
            {#each plan.features as featureWrapper}
              <li class="{featureWrapper.feature.planTypes.includes(plan.planType) ? 'font-normal' : 'font-light line-through text-gray-400'}">
                {#if featureWrapper.feature.planTypes.includes(plan.planType)}
                  <i class="fa-solid fa-check text-green-500 mr-2"></i>
                {/if}
                {featureWrapper.feature.name}
              </li>
            {/each}
          </ul>
        </div>
        <div>
          <img src={plan.image} alt="{plan.name}" class="w-full h-60 object-cover rounded-md mb-2" />
          {#if plan.priceId}
            <button on:click={() => handleCheckout(plan.endpoint, plan.priceId)} class="w-full inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Checkout
            </button>
          {:else}
            <a href={plan.endpoint} class="w-full inline-flex justify-center py-1 px-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</main>
