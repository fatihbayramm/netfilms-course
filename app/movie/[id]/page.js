import React from "react";
import MovieContainer from "@/containers/movie";
import Movies from "@/mocks/movies.json";
import { notFound } from "next/navigation";
async function MoviePage({ params, searchParams }) {
  const currentParams = await params;

  const movieDetail = Movies.results.find(
    (movie) => movie.id.toString() === currentParams.id
  );

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
