import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {



  constructor(private  http: HttpClient) {}

  getQuery(query: string){

    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQBkR9aoLQ7Rho4lwSYZy07ggkdou9iUhXwZaHMW-Y3A2TwZp59bM9UZNDz196367H4QH6t-ELyK7WwRMB0'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases')
      .pipe(map(data => data['albums'].items));
  }

  getArtist(termino:string){
    return this.getQuery(`search?query=${termino}&type=artist&offset=0&limit=20`)
      .pipe(map(data => data['artists'].items));
  }

  getArtista(id:string){
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data => data['tracks']));
  }

}

