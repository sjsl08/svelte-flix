<!-- src/lib/components/Modal.svelte -->
<script lang="ts">
  import { onDestroy } from "svelte";
  import { modalStore, closeModal } from "$lib/store/globalState";
  import Player from "./Player.svelte";
  import {
    Play,
    Plus,
    ThumbsUp,
    Volume2,
    VolumeOff,
  } from "lucide-svelte";
  import { convertMinutesToTime } from "$lib/utils/helpers";
  import LikeThisCard from "./LikeThisCard.svelte";

  // Define TypeScript Interfaces
  interface Genre {
    id: number;
    name: string;
  }

  interface SpokenLanguage {
    iso_639_1: string;
    name: string;
  }

  interface MovieData {
    original_title?: string;
    genres: Genre[];
    spoken_languages: SpokenLanguage[];
    adult?: boolean;
    runtime?: number;
    overview?: string;
    // Add other relevant fields as needed
  }

  let isOpen = false;
  let videoId = "";
  let shouldRender = false;
  let animationClass = "";
  let movieData: MovieData = { genres: [], spoken_languages: [] }; // Initialize with empty arrays
  let player: Player | null = null;
  let muted = false;

  // Subscribe to the modal store
  const unsubscribe = modalStore.subscribe(async (state) => {
    console.log("Modal State:", state);
    const wasOpen = isOpen;
    isOpen = state.isOpen;
    videoId = state.videoId;
    movieData = state.movieData || { genres: [], spoken_languages: [] }; // Ensure movieData has default arrays

    if (isOpen) {
      // When modal opens
      shouldRender = true;
      animationClass = "bounce-up";

      // Prevent background scrolling on the client-side
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }
    } else if (wasOpen && !isOpen && shouldRender) {
      // When modal closes
      animationClass = "bounce-down";

      setTimeout(() => {
        shouldRender = false;

        // Restore background scrolling on the client-side
        if (typeof document !== "undefined") {
          document.body.style.overflow = "";
        }
      }, 300); // Duration of bounce-down animation (should match CSS animation duration)
    }
  });

  // Cleanup on component destroy
  onDestroy(() => {
    unsubscribe();
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  });

  // Function to close the modal
  const handleCloseModal = () => {
    closeModal();
  };

  // Function to toggle mute
  function toggleMuteVideo() {
    if (player) {
      muted = !muted;
      player.toggleMute();
    }
  }
</script>

{#if shouldRender}
  <!-- Overlay -->
  <div class="overlay" on:click={handleCloseModal}>
    <!-- Modal Content -->
    <div class={`modal-content ${animationClass}`} on:click|stopPropagation>
      <!-- Close Button -->
      <button
        class="close-button"
        on:click={handleCloseModal}
        aria-label="Close Modal"
      >
        &times;
      </button>
      <div class="content">
      
        {#if videoId}
          <div class="pointer-events-none overflow-hidden relative">
            <div
              class="absolute z-30 inset-0 bottom-0 bg-gradient-to-t from-[#141414] to-transparent"
            ></div>

            <div class="absolute pointer-events-auto z-50 left-12 bottom-[0px] w-[90%]">
              <p class="text-white font-bold mb-4 text-4xl">
                {movieData.original_title}
              </p>
              <div class="flex justify-between w-full">
                <div class="flex gap-4">
                  <button
                    class="flex text-2xl items-center gap-2 bg-white text-black px-12 py-2 rounded-md hover:bg-gray-200 transition"
                  >
                    <Play size={20} />
                    <span class="font-semibold">Play</span>
                  </button>
    
                  <button
                    class="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                    aria-label="Add to List"
                  >
                    <Plus class="text-white h-6 w-6" />
                  </button>
                  <button
                    class="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                    aria-label="Like"
                  >
                    <ThumbsUp class="text-white h-6 w-6" />
                  </button>
                </div>
                <button
                  on:click={toggleMuteVideo}
                  class="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {#if !muted}
                    <Volume2 />
                  {:else}
                    <VolumeOff />
                  {/if}
                </button>
              </div>
            </div>

            <Player isMuted={muted} bind:this={player} {videoId} />
            {#if movieData}
              <div
                class="absolute bottom-0 px-12 w-full z-50 pointer-events-auto"
              ></div>
            {/if}
          </div>
        {/if}

        <div class="relative pt-6 px-12">
          <div
            class="absolute inset-0 h-[20px] bottom-0 bg-gradient-to-b from-[#141414] to-transparent"
          ></div>
          <div class="flex">
            <div class="flex items-center flex-1 gap-3">
              <span class="text-green-400">79% Match</span>
              <span class="border-gray-600 border-2 rounded-sm text-sm">
                {movieData.adult ? "18+" : "13+"}
              </span>
              <span class="font-bold">
                {convertMinutesToTime(movieData.runtime)}
              </span>
              <span class="border-gray-600 border-2 rounded-sm text-sm">
                HD
              </span>
            </div>
            <div class="flex-col flex-1">
              <div class="flex ml-40">
                {#if movieData.genres && Array.isArray(movieData.genres)}
                  <span class="font-semibold">Genre: &nbsp;</span>
                  <br />
                  {#each movieData.genres.splice(0,3) as genre}
                    <span class="mr-2">{genre.name}</span>
                  {/each}
                {/if}
              </div>
              <div class="flex ml-40 mt-2">
                <span class="font-semibold">Available in:</span>
                &nbsp;
                {#if movieData.spoken_languages && Array.isArray(movieData.spoken_languages)}
                  {#each movieData.spoken_languages as lang}
                    <span class="mr-2">{lang.name}</span>
                  {/each}
                {/if}
              </div>
            </div>
          </div>

          <div class="relative w-1/2 mt-4">
            <p>{movieData.overview}</p>
          </div>

          <div>
            <h1>More Like This</h1>

            <LikeThisCard/>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Keyframe Animations */
  @keyframes bounce-up {
    0% {
      transform: translateY(100vh);
    }
    60% {
      transform: translateY(-10%);
    }
    80% {
      transform: translateY(5%);
    }
    100% {
      transform: translateY(-5%);
    }
  }

  @keyframes bounce-down {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100vh);
    }
  }

  /* Animation Classes */
  .bounce-up {
    animation: bounce-up 0.5s ease-out forwards;
  }

  .bounce-down {
    animation: bounce-down 0.3s ease-in forwards;
  }

  /* Close Button Styles */
  .close-button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    height: 1.5rem;
    width: 1rem;
    font-size: 1.2rem;
    top: 0.75rem;
    right: 0.75rem;
    background: black;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    z-index: 50;
  }

  /* Overlay Styles */
  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Align modal at the top */
    padding-top: 4rem; /* Space from the top */
    z-index: 50;
  }

  /* Modal Content Styles */
  .modal-content {
    background-color: white;
    width: 50%;
    position: relative;
    max-height: 90vh; /* Prevent modal from exceeding viewport height */
    overflow-y: auto; /* Enable vertical scrolling within the modal */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
  }

  /* Optional: Customize Scrollbar */
  .modal-content::-webkit-scrollbar {
    width: 0px;
  }

  .modal-content::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .modal-content {
      max-width: 90%;
      padding: 0.5rem;
    }

    .close-button {
      top: 0.5rem;
      right: 0.5rem;
    }
  }

  /* Content Styles */
  .content {
    position: relative;
    background-color: rgb(20, 20, 20);

    color: rgb(255, 255, 255);

    box-shadow:
      rgba(0, 0, 0, 0.2) 0px 2px 1px 1px,
      rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;

    background-image: linear-gradient(
      rgba(255, 255, 255, 0.05),
      rgba(255, 255, 255, 0.05)
    );
  }
</style>
