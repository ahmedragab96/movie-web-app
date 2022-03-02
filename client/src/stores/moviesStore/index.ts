/* eslint-disable no-throw-literal */
import { observable, action, makeObservable } from 'mobx';
import { Movie, MoviesResponse, SearchParams } from './types';
import { instance as axios } from '../../connections/axios';

export default class MoviesStore {
  @observable movies: Movie[] = [];
  @observable getMoviesError: string | undefined = undefined;
    
  
    constructor() {
      makeObservable(this);
    }
  
    @action
    public getMovies = async (searchParams: SearchParams) => {
      try {
        const response: MoviesResponse = await axios.get('/movies', {
          params: searchParams,
        });
        if (response.movies.Error) {
          this.movies = [];
          this.getMoviesError = response.movies.Error;
          return;
        }
        this.movies = response.movies.Search;
        this.getMoviesError = undefined;
      } catch (error) {
        console.log(error);
      }
    }
  
}
