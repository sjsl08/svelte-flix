<!-- MovieList.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import Card from '$lib/components/Card.svelte';
    import { browser } from '$app/environment';
  
    let movies: any[] = [];
  
    onMount(() => {
        if(browser){
            movies = JSON.parse(localStorage.getItem('list') || '[]');
            console.log(localStorage.getItem('list'));
            
        }
    });

    
  </script>
  
  {#if movies.length > 0}
    <div class="flex">
      {#each movies as movie}
        <Card item={movie}/>
      {/each}
    </div>
  {:else}
    <p>No movies in your list.</p>
  {/if}
  