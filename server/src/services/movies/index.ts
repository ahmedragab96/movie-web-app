import { instance as axios } from "../../axios/movies.axios";
import { getCache, setCache } from "../../redis";
import { Movie, SearchParams } from "../../models/movieModel";

export class MoviesService {
  private static instance: MoviesService;

  public static get Instance() {
    if (!MoviesService.instance) {
      MoviesService.instance = new MoviesService();
    }
    return MoviesService.instance;
  }

  public async getMovies(params: SearchParams): Promise<Movie[]> {
    try {
      const movies: Movie[] = await axios.get("/", {
        params: {
          s: params.text,
          type: params.type,
          y: params.year,
        },
      });
      return movies;
    } catch (error) {
      console.log(error);
    }
  }
}
