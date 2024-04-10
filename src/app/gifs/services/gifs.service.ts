import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'rppSb0spRsSYzX5Vasbj3dGePd88ahyF';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {}

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}`
      )
      .subscribe((resp: any) => {
        console.log(resp);
        this.resultados = resp.data;
      });
  }
}
