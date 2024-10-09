<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import Plyr from 'plyr';
  import 'plyr/dist/plyr.css'; // Import Plyr default styles

  // Video ID for YouTube video
  export let videoId = 'LNlrGhBpYjc'; // Default YouTube video ID
  export let poster = ''; // Custom poster image

  let player;
  let playerElement;
  export let isMuted = true; // Initial mute state

  const dispatch = createEventDispatcher();

  // Function to toggle mute state
  export function toggleMute() {
    if (player) {
      if (player.muted) {
        player.muted = false;
        isMuted = false;
        console.log('Video unmuted');
        dispatch('unmute');
      } else {
        player.muted = true;
        isMuted = true;
        console.log('Video muted');
        dispatch('mute');
      }
    }
  }

  // Function to mute the video
  export function mute() {
    if (player && !player.muted) {
      player.muted = true;
      isMuted = true;
      console.log('Video muted');
      dispatch('mute');
    }
  }

  // Function to unmute the video
  export function unmute() {
    if (player && player.muted) {
      player.muted = false;
      isMuted = false;
      console.log('Video unmuted');
      dispatch('unmute');
    }
  }

  // Function to get current mute state
  export function getIsMuted() {
    return isMuted;
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      console.log('Initializing Plyr...');
      player = new Plyr(playerElement, {
        autoplay: false, // Disable autoplay initially
        disableContextMenu: true, // Disable right-click context menu
        muted: isMuted, // Ensure muted to comply with autoplay policies
        controls: [], // Remove all default controls
        youtube: {
          modestbranding: 1, // Minimal YouTube branding
          rel: 0, // Do not show related videos at the end
          iv_load_policy: 3, // Disable video annotations
          // showinfo is deprecated and no longer supported by YouTube
        },
      });

      // Listen for the Plyr 'ready' event
      player.on('ready', () => {
        console.log('Plyr is ready. Autoplay will start in 500ms.');
        // Set a timeout to autoplay after 500 milliseconds
        setTimeout(() => {
          player.play()
        }, 500); // 500 milliseconds = 0.5 seconds
      });

      // Handle Plyr errors
      player.on('error', (error) => {
        console.error('Plyr Error:', error);
      });

      // Log when the video starts playing
      player.on('play', () => {
        console.log('Video is playing');
      });

      // Update isMuted state when mute state changes externally
      player.on('mute', () => {
        isMuted = true;
        dispatch('mute');
      });

      player.on('unmute', () => {
        isMuted = false;
        dispatch('unmute');
      });

      console.log('Player initialized:', player);
    }
  });

  onDestroy(() => {
    if (player) {
      console.log('Destroying Plyr player...');
      player.destroy();
    }
  });
</script>

<!-- Video Player Wrapper -->
<div class="player-wrapper relative bg-black  overflow-hidden shadow-lg">
  <div class="aspect-video scale-[1.4]">
    <div
      bind:this={playerElement}
      data-plyr-provider="youtube"
      data-plyr-embed-id={videoId}
      class="w-full h-full"
    ></div>
    
  </div>
</div>

<style>
  /* Optional: Remove if using Tailwind's aspect-ratio plugin */
  .aspect-w-16 {
    padding-bottom: 56.25%;
  }
  .aspect-h-9 {
    height: 0;
    position: relative;
  }
  .aspect-h-9 > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* src/lib/PlyrCustom.css */

  /* Custom Plyr variables to style the player */
  :root {
    --plyr-color-main: #ff0000;
    --plyr-video-background: rgba(0, 0, 0, 1);
    --plyr-focus-visible-color: #00b3ff;
    --plyr-badge-background: #4a5464;
    --plyr-badge-text-color: #ffffff;
    --plyr-captions-background: rgba(0, 0, 0, 0.8);
    --plyr-captions-text-color: #ffffff;
    --plyr-control-icon-size: 24px;
    --plyr-control-spacing: 12px;
    --plyr-control-padding: 8px;
    --plyr-control-radius: 6px;
    --plyr-control-toggle-checked-background: #ff0000;
    --plyr-video-controls-background: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.85)
    );
    --plyr-video-control-color: #ffffff;
    --plyr-video-control-color-hover: #ff0000;
    --plyr-video-control-background-hover: #ff0000;
    --plyr-menu-background: rgba(255, 255, 255, 0.9);
    --plyr-menu-color: #000000;
    --plyr-tooltip-background: rgba(255, 255, 255, 0.9);
    --plyr-tooltip-color: #000000;
    --plyr-font-family: 'Arial', sans-serif;
    --plyr-font-size-base: 16px;
    --plyr-font-weight-bold: 600;
  }

  /* Optional: Customize loading spinner */
  .plyr__spinner {
    border-top-color: var(--plyr-color-main);
  }

  /* Optional: Customize progress bar */
  .plyr__progress__filled {
    background-color: var(--plyr-color-main);
  }

  /* Optional: Customize menu items */
  .plyr__menu__container {
    background-color: var(--plyr-menu-background);
  }
  .plyr__menu__item {
    color: var(--plyr-menu-color);
  }

  /* Custom Mute Button Styles */
  .mute-button {
    /* Adjust the size and positioning as needed */
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .mute-button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  /* Optional: Add cursor pointer */
  .mute-button {
    cursor: pointer;
  }
</style>
