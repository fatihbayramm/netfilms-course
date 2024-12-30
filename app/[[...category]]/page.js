import HomeContainer from "@/containers/home";

const API_URL = "https://api.themoviedb.org/3";

const getSingleCategory = async (genreId) => {
  const response = await fetch(
    `${API_URL}/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}`
  );

  const data = await response.json();
  return data;
};

const getTopRatedMovies = async () => {
  const response = await fetch(
    `${API_URL}/movie/top_rated?api_key=${process.env.API_KEY}`
  );

  const data = await response.json();
  return data;
};

const getPopularMovies = async () => {
  const response = await fetch(
    `${API_URL}/movie/popular?api_key=${process.env.API_KEY}`
  );

  const data = await response.json();
  return data;
};

const getCategories = async () => {
  const response = await fetch(
    `${API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`
  );

  const data = await response.json();
  return data.genres;
};

async function HomePage({ params }) {
  let selectedCategory;
  let currentParams = await params;

  const [topRatedMovies, popularMovies, categories] = await Promise.all([
    getTopRatedMovies(),
    getPopularMovies(),
    getCategories(),
  ]);

  if (currentParams.category?.length > 0) {
    const { results } = await getSingleCategory(currentParams.category[0]);
    selectedCategory = results;
  }
  return (
    <HomeContainer
      selectedCategory={{
        id: currentParams.category?.[0] ?? "",
        movies: selectedCategory ? selectedCategory.slice(0, 7) : [],
      }}
      topRatedMovies={topRatedMovies.results}
      popularMovies={popularMovies.results}
      categories={categories}
    />
  );
}

export default HomePage;
