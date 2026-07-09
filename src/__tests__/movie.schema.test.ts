import { omdbMovieSchema } from "@/schemas/omdbMovie";

// Données OMDb valides de base (réutilisées dans plusieurs tests)
const validMovie = {
  Title: "Interstellar",
  Year: "2014",
  Plot: "A team of explorers travel through a wormhole in space.",
  Poster: "https://example.com/poster.jpg",
  imdbRating: "8.7",
  imdbID: "tt0816692",
  Genre: "Adventure, Drama, Sci-Fi",
  Director: "Christopher Nolan",
  Actors: "Matthew McConaughey, Anne Hathaway",
  Runtime: "169 min",
  Response: "True",
};

describe("omdbMovieSchema", () => {
  // Test 1 : film OMDb valide
  it("should pass with valid OMDb data", () => {
    const result = omdbMovieSchema.safeParse(validMovie);
    expect(result.success).toBe(true);
  });

  // Test 2 : Title manquant
  it("should fail when Title is missing", () => {
    const { Title, ...withoutTitle } = validMovie;
    const result = omdbMovieSchema.safeParse(withoutTitle);
    expect(result.success).toBe(false);
  });

  // Test 3 : Response n'est pas "True"
  it("should fail when Response is not True", () => {
    const result = omdbMovieSchema.safeParse({
      ...validMovie,
      Response: "False",
    });
    expect(result.success).toBe(false);
  });

  // Test 4 : imdbRating est un number au lieu d'une string
  it("should fail when imdbRating is a number instead of string", () => {
    const result = omdbMovieSchema.safeParse({
      ...validMovie,
      imdbRating: 8.7, 
    });
    expect(result.success).toBe(false);
  });

  // Test 5 : imdbID manquant
  it("should fail when imdbID is missing", () => {
    const { imdbID, ...withoutId } = validMovie;
    const result = omdbMovieSchema.safeParse(withoutId);
    expect(result.success).toBe(false);
  });
});