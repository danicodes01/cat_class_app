<script lang="ts">
    import type { ActionData } from './$types';
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';

    export let form: ActionData;

    let showInvalidError = form?.invalid;
    let showCredentialsError = form?.credentials;

    // Reactive statements to update the error state based on form changes
    $: showInvalidError = form?.invalid;
    $: showCredentialsError = form?.credentials;

    function handleInput() {
        showInvalidError = false;
        showCredentialsError = false;
    }

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('redirect')) {
            sessionStorage.setItem('redirect', params.get('redirect'));
        }
    });
</script>

<h1 class="text-3xl font-bold text-center text-violet-400 mb-6">Login</h1>

<form action="?/login" method="POST" use:enhance class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
    <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input 
            type="text" 
            id="username" 
            name="username" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            on:input={handleInput}
        >
    </div>
    <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-400 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
            on:input={handleInput}
        >
    </div>

    {#if showInvalidError}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">Username and password are required.</span>
    </div>
    {/if}

    {#if showCredentialsError}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Holy smokes!</strong>
        <span class="block sm:inline">You have entered the wrong credentials.</span>
    </div>
    {/if}

    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-400 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400">Log in</button>
</form>
