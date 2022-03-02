import { observable, action, makeObservable } from 'mobx';
import { Movie, MoviesResponse, SearchParams } from './types';
import { instance as axios } from '../../connections/axios';

export default class MoviesStore {
    @observable movies: Movie[] = [];
  
    constructor() {
      makeObservable(this);
    }
  
    @action
    public getMovies = async (searchParams: SearchParams) => {
      try {
        const response: MoviesResponse = await axios.get('/movies', {
          params: searchParams,
        });

        this.movies = response.movies.Search;
      } catch (error) {
        console.log(error);
      }
    }
  
}
