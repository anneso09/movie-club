// Unit tests

import { movieSchema } from "@/schemas/movie";

describe("movieSchema", () => {
  // Test 1 : film valide avec seulement slug + title (champs obligatoires)
  it("should pass with valid required fields", () => {
    const result = movieSchema.safeParse({
        title: "Test Movie",
        slug : "movie_1",
    });
    expect(result.success).toBe(true);
  });

  // Test 2 : film invalide car slug manquant
  it("should fail when slug is missing", () => {
    const result = movieSchema.safeParse({
      title: "Test Movie",
    });
    expect(result.success).toBe(false);
  });

  // Test 3 : film invalide car title manquant
  it("should fail when title is missing", () => {
    const result = movieSchema.safeParse({
      slug: "movie_1",
    });
    expect(result.success).toBe(false);
  });

  // Test 4 : film invalide car rating est une string au lieu d'un number
  it("should fail when rating is a string instead of number", () => {
    const result = movieSchema.safeParse({
      slug: "movie_1",
      title: "Test Movie",
      rating: "8.5",
    });
    expect(result.success).toBe(false);
  });
});