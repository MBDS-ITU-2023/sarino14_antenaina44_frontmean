import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { MatieresService } from 'src/app/shared/matieres.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit{

  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  auteur = "admin";
  note = 0;
  remarques = "";
  matiereId = "";

  matieres: { value: number, label: string }[] = [];
  auteurName!: string;
  auteurPhoto!: string;

  opened = false;

  constructor(private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
              private router:Router,
              private authService:AuthService) { }
  ngOnInit(): void {
    this.matieresService.getMatieresForSelect().subscribe(
      matiere => {
        this.matieres = matiere;
      },
      error => {
        // Gérer l'erreur
      }
    );
  }

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === "") return;
    if (this.dateDeRendu === undefined) return;
    if (this.auteurName === "") return;
    if (this.note === undefined) return;

    let nouvelAssignment = new Assignment();
    // génération d'id, plus tard ce sera fait dans la BD
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.auteurName = this.auteurName;
    nouvelAssignment.auteurPhoto = this.auteurPhoto;
    nouvelAssignment.matiereId = this.matiereId;
    nouvelAssignment.note = this.note;
    nouvelAssignment.remarques = this.remarques;

    // on demande au service d'ajouter l'assignment
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message);

        // On va naviguer vers la page d'accueil pour afficher la liste
        // des assignments
        this.router.navigate(["/home"]);

      });
  }

  logout(): void {
    this.authService.logout();
  }
}
