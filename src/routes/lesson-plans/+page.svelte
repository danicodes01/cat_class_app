<script lang="ts">
    let features = [
      { name: 'Basic customer support', availableIn: ['free', 'standard', 'pro'] },
      { name: 'Access to selected courses', availableIn: ['free', 'standard', 'pro'] },
      { name: 'Access to all courses', availableIn: ['standard', 'pro'] },
      { name: 'Monthly progress reports', availableIn: ['standard', 'pro'] },
      { name: 'Community forum access', availableIn: ['standard', 'pro'] },
      { name: 'Private tutoring sessions', availableIn: ['pro'] },
      { name: 'Personalized learning plans', availableIn: ['pro'] },
      { name: 'Exclusive content and resources', availableIn: ['pro'] },
      { name: 'Certificate of completion for all courses', availableIn: ['pro'] },
    ];
  
    let plans = [
      {
        name: 'CatClass Free Package',
        description: features,
        planType: 'free',
        priceId: '',
        endpoint: '/signup',
        image: 'images/teacherc.png'
      },
      {
        name: 'CatClass Standard Package',
        description: features,
        planType: 'standard',
        priceId: 'price_1Pb6zBHvykoUxbsOxy5MmUXL',
        endpoint: '/create-payment-intent/catclass-standard-package',
        image: 'images/teacherb.png'
      },
      {
        name: 'CatClass Pro Package',
        description: features,
        planType: 'pro',
        priceId: 'price_1Pb2wCHvykoUxbsOxKu4WEgM',
        endpoint: '/create-payment-intent/catclass-pro-package',
        image: 'images/teachera.png'
      },
    ];
  
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
  
  <main class="max-w-7xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-8">Lesson Plans</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each plans as plan}
        <div class="p-4 border rounded-md shadow-lg flex flex-col justify-between">
          <div>
            <h2 class="text-xl font-bold mb-2">{plan.name}</h2>
            <ul class="list-disc pl-5 mb-4 space-y-1">
              {#each plan.description as feature}
                <li class="{feature.availableIn.includes(plan.planType) ? 'font-normal' 
                : 'font-light line-through text-gray-400'}">
                  {#if feature.availableIn.includes(plan.planType)}
                    <i class="fa-solid fa-check text-green-500 mr-2"></i>
                  {/if}
                  {feature.name}
                </li>
              {/each}
            </ul>
          </div>
          <div>
            <img src={plan.image} alt="{plan.name}" class="w-full h-50 object-cover 
            rounded-md mb-4" />
            {#if plan.priceId}
              <button on:click={() => handleCheckout(plan.endpoint, plan.priceId)} 
                class="w-full inline-flex justify-center py-2 px-4 border border-transparent 
                shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500">
                Checkout
              </button>
            {:else}
              <a href={plan.endpoint} class="w-full inline-flex justify-center py-2 px-4 
              border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500">
                Sign Up
              </a>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </main>