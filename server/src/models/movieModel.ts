export interface Movie {
    name: string;
    image: string;
}

export enum Type {
    MOVIE = 'movie',
    SERIES = 'series',
    EPISODE = 'episode',
}

export interface SearchParams {
    text: string;
    type: Type;
    year: number;
}