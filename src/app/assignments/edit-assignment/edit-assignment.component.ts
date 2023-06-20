import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { MatieresService } from 'src/app/shared/matieres.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  // associées aux champs du formulaire
  nomAssignment!: string;
  dateDeRendu!: Date;
  note!: number;
  remarques!: string;
  auteurName = "admin";
  auteurPhoto!: string;
  matiereId!: string;

  matieres: { value: number, label: string }[] = [];

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private matieresService: MatieresService
  ) { }

  ngOnInit(): void {
    this.getAssignment();
    this.matieresService.getMatieresForSelect().subscribe(
      matiere => {
        this.matieres = matiere;
      },
      error => {
        // Gérer l'erreur
      }
    );
  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    // Exemple de récupération des query params (après le ? dans l'url)
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
    console.log("nom :" + queryParams['nom'])
    console.log("matière :" + queryParams['matiere'])

    // Exemple de récupération du fragment (après le # dans l'url)
    const fragment = this.route.snapshot.fragment;
    console.log("Fragment = " + fragment);

    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        // Pour pré-remplir le formulaire
        this.nomAssignment = assignment.nom;
        this.dateDeRendu = assignment.dateDeRendu;
        this.auteurName = assignment.auteurName;
        this.auteurPhoto = assignment.auteurPhoto;
        this.note = assignment.note;
        this.remarques = assignment.remarques;
        this.matiereId = assignment.matiereId;
      });
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteurName = this.auteurName;
    this.assignment.auteurPhoto = this.auteurPhoto;
    this.assignment.matiereId = this.matiereId;
    this.assignment.note = this.note;
    this.assignment.remarques = this.remarques;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
