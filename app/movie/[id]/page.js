import React from "react";
import MovieContainer from "@/containers/movie";
import { notFound } from "next/navigation";

const API_URL = "https://api.themoviedb.org/3";

const getMovie = async (movieId) => {
  const response = await fetch(
    `${API_URL}/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  return response.json();
};

async function MoviePage({ params, searchParams }) {
  const movieDetail = await getMovie(params.id);

  if (!movieDetail) {
    notFound();
  }

  if (searchParams.error === "true") {
    throw new Error("Error happened.");
  }

  return (
    <div>
      <MovieContainer movie={movieDetail} />
    </div>
  );
}

export default MoviePage;
