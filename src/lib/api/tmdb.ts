// src/lib/api/tmdb.ts

const API_KEY = '920a7b538bfb15120fe9dc6ced7735b0';  // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getTMDBConfig(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

// Movies
export async function fetchPopularShows(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map((show: any) => ({
        id: show.id,
        title: show.title,
        image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
        poster_path: show.backdrop_path,
    }));
}

export async function fetchTrendingShows(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map((show: any) => ({
        id: show.id,
        title: show.title,
        image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
        poster_path: show.backdrop_path,
    }));
}

export async function fetchTopRatedShows(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map((show: any) => ({
        id: show.id,
        title: show.title,
        image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
        poster_path: show.backdrop_path,
    }));
}

export async function getGenres(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

export async function getMoviesByGenre(fetch: (url: string) => Promise<Response>, id: string): Promise<any[]> {
    try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=1`);
        const data = await response.json();
        return data.results.map((movie: any) => ({
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            poster_path: movie.backdrop_path,
        }));
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        return [];
    }
}

// TV Shows
export async function fetchPopularTVShows(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map((show: any) => ({
        id: show.id,
        name: show.name,
        image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
        poster_path: show.backdrop_path,
    }));
}

export async function fetchTrendingTVShows(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map((show: any) => ({
        id: show.id,
        name: show.name,
        image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
        poster_path: show.backdrop_path,
    }));
}

export async function fetchTopRatedTVShows(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results.map((show: any) => ({
        id: show.id,
        name: show.name,
        image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
        poster_path: show.backdrop_path,
    }));
}

export async function getTVGenres(fetch: (url: string) => Promise<Response>) {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

export async function getTVShowsByGenre(fetch: (url: string) => Promise<Response>, id: string): Promise<any[]> {
    try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${id}&page=1`);
        const data = await response.json();
        return data.results.map((show: any) => ({
            id: show.id,
            name: show.name,
            image: `https://image.tmdb.org/t/p/w500${show.backdrop_path}`,
            poster_path: show.backdrop_path,
        }));
    } catch (error) {
        console.error('Error fetching TV shows by genre:', error);
        return [];
    }
}


export async function getMovieTrailer(movieId: number) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        // Usually the official trailer is on YouTube
        const trailer = data.results.find((video) => video.site === 'YouTube' && video.type === 'Trailer');
        return trailer || null;
    }
    return null;
}

// Get Movie by ID
export async function getMovieById( movieId: string): Promise<any | null> {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching movie with ID ${movieId}: ${response.statusText}`);
        }
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return null;
    }
}