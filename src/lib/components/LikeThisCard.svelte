<script>
    export let title = "Airport 1975";
    export let match = "67% Match";
    export let rating = "5+";
    export let year = 1974;
    export let description = "When an in-flight collision incapacitates the pilots of an airplane bound for Los Angeles,...";
    export let duration = "22m";
    export let imageUrl = "path/to/your/image.jpg";
  </script>
  
  <div class="bg-[#181818] text-white rounded-lg shadow-md w-64">
    <div class="relative">
      <img src={imageUrl} alt={title} class="rounded-t-lg w-full h-40 object-cover" />
      <div class="absolute top-2 right-2 bg-[#000000b3] text-white px-2 py-0.5 rounded-md text-xs font-semibold">
        {duration}
      </div>
    </div>
    <div class="p-3">
      <h3 class="font-semibold text-base mb-1.5">{title}</h3>
      <div class="flex items-center text-sm text-[#46d369] mb-1">
        <span>{match}</span>
      </div>
      <div class="flex items-center text-[#b3b3b3] text-xs mb-2">
        <span class="border border-[#b3b3b3] px-1 mr-2">{rating}</span>
        <span>{year}</span>
      </div>
      <p class="text-xs text-[#b3b3b3] mb-3 leading-tight">{description}</p>
      <div class="flex space-x-3">
        <button class="bg-white text-black rounded-full w-9 h-9 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v18l15-9L5 3z" />
          </svg>
        </button>
        <button class="bg-[#4a4a4a] text-white rounded-full w-9 h-9 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354l7.071 7.071m-7.071-7.071L4.929 11.425m0 0l7.071 7.071m-7.071-7.071l7.071-7.071" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <style>
    /* Add any additional styles if needed */
  </style>