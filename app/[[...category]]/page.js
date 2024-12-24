import HomeContainer from "@/containers/home";
import Movies from "@/mocks/movies.json";
async function HomePage({ params }) {
  let selectedCategory;
  let currentParams = await params;

  if (currentParams.category?.length > 0) {
    selectedCategory = true;
  }
  return (
    <HomeContainer
      selectedCategory={{
        id: currentParams.category?.[0] ?? "",
        movies: selectedCategory ? Movies.results.slice(0, 7) : [],
      }}
    />
  );
}

export default HomePage;
