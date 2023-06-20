import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Matiere } from './matiere.model';
import { MatieresService } from '../shared/matieres.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
  titre="Matieres";
  // les données à afficher
  matieres:Matiere[] = [];
  // Pour la data table
  displayedColumns: string[] = ['id', 'nom', 'image', 'professeur'];

  opened = false;

  // propriétés pour la pagination
  page: number=1;
  limit: number=10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  nom:string = "";
  currentRoute:string = "";

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(
    private authService:AuthService,
    private matieresService:MatieresService,
    private ngZone: NgZone) {
  }
  
  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getMatieres
    // TODO

    this.getMatieres();
  }

  ngAfterViewInit() { 
    console.log("after view init");

    if(!this.scroller) return;

    // on s'abonne à l'évènement scroll de la liste
    this.scroller.elementScrolled()
    .pipe(
      tap(event => {
        //console.log(event);
      }),
      map(event => {
         return this.scroller.measureScrollOffset('bottom');
      }),
      tap(y => {
        //console.log("y = " + y);
      }),
      pairwise(),
      tap(([y1, y2]) => {
        //console.log("y1 = " + y1 + " y2 = " + y2);
      }),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 100;
      }),
      // Pour n'envoyer des requêtes que toutes les 200ms
      //throttleTime(200)
    )
    .subscribe((val) => {
      console.log("val = " + val);
      console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.page);
      this.ngZone.run(() => {
        if(!this.hasNextPage) return;

        this.page = this.nextPage;
        this.getAddMatieresForScroll();
      });
    });
  }

  getMatieres() {
    console.log("On va chercher les matieres dans le service");

    this.matieresService.getMatieres(this.page, this.limit)
    .subscribe(data => {
      this.matieres = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Données reçues");
    });
  }

  getAddMatieresForScroll() {
    this.matieresService.getMatieres(this.page, this.limit)
    .subscribe(data => {
      // au lieu de remplacer le tableau, on va concaténer les nouvelles données
      this.matieres = this.matieres.concat(data.docs);
      // ou comme ceci this.matieres = [...this.matieres, ...data.docs]
      //this.matieres = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;

      console.log("Données ajoutées pour scrolling");
    });
  }

  premierePage() {
    this.page = 1;
    this.getMatieres();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getMatieres();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getMatieres();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getMatieres();
  }

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);
   
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getMatieres();
  }

  logout(): void {
    this.authService.logout();
  }

  isLogged() {
    if(this.authService.loggedIn) {
      this.nom = "Michel Buffa";
    }
    return this.authService.loggedIn;
  }
}
