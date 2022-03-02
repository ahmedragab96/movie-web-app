export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export enum Type {
  MOVIE = "movie",
  SERIES = "series",
  EPISODE = "episode",
}

export interface SearchParams {
  text: string;
  type?: Type;
  year?: number;
}

export interface MoviesResponse {
  movies: {
    Search: Movie[];
    Error?: string;
  };
}
