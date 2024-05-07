import { api } from "@/services/api";


export async function getWatchListMovies(pageParam: number){
  const response = await api.get(
    `/account/${process.env.EXPO_PUBLIC_API_KEY}/watchlist/movies?page=${pageParam}&sort_by=created_at.asc`
  );

  return response.data.results;
}

export async function toggleMovieToWatchList(movieId: string, hasIdInWatchlistMovies: boolean){
  const response = await api.post(
      `/account/${process.env.EXPO_PUBLIC_API_KEY}/watchlist`, {
        media_type: "movie",
        media_id: movieId,
        watchlist: !hasIdInWatchlistMovies,
      }
    );

  if(!response.data.success){
    throw Error("Error adding movie to watchlist")
  }
}
