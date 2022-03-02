import AuthStore from './authStore';
import MoviesStore from './moviesStore';

export interface Stores {
  moviesStore: MoviesStore,
  authStore: AuthStore,
}

export const stores: Stores = {
  moviesStore: new MoviesStore(),
  authStore: new AuthStore(),
};
