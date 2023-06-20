import { Injectable } from '@angular/core';
import { Matiere } from '../matieres/matiere.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
// tableau de devoirs à rendre
matieres:Matiere[] = []
  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    // uri_api = 'http://localhost:8010/api/matieres';
    // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/matieres';
    uri_api = 'https://sarino14-antenaina44-apimean-mbds-mada.onrender.com/api/matieres';
    uri_apiforlist = 'https://sarino14-antenaina44-apimean-mbds-mada.onrender.com/api/matieresforlist';

  getMatieres(page:number, limit:number):Observable<any> {
    return this.http.get<Matiere[]>(this.uri_api + "?page=" + page + "&limit=" + limit);
  }

  getMatiere(id:number):Observable<Matiere|undefined> {
    return this.http.get<Matiere|undefined>(`${this.uri_api}/${id}`)
   
    .pipe(
      map(a => {
        return a;
      }),
      tap(a => {
        if(a)
          console.log("ICI DANS LE TAP " + a.nom)
      }),
      map(a => {
        return a;
      }),
      catchError(this.handleError<Matiere>("Erreur dans le traitement de matiere avec id = " + id))
    )
  }
  getMatieresForSelect(): Observable<{ value: number, label: string}[]> {
    return this.http.get<Matiere[]>(this.uri_apiforlist).pipe(
      map(matieres => matieres.map(matiere => ({ value: matiere.id, label: matiere.nom}))),
      catchError(this.handleError<{ value: number, label: string}[]>("Erreur lors de la récupération des matières"))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 
  addMatiere(matiere:Matiere):Observable<any> {
    this.loggingService.log(matiere.nom, 'ajouté');

    return this.http.post<Matiere>(this.uri_api, matiere);
  }

  updateMatiere(matiere:Matiere):Observable<any> {
    return this.http.put<Matiere>(this.uri_api, matiere);
  }

  deleteMatiere(matiere:Matiere):Observable<any> {
    return this.http.delete(this.uri_api + "/" + matiere._id);
  }
}
