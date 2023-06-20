
# Mini projet : améliorer le TP sur les Assignments

Vous apporterez les améliorations optionnelles suivantes à ce TP :

Ajout de Toolbar et une SideBar/Sidenav pour la présentation.
 
Ajout de gestion de login/password
code en dur dans le service d'authentification.
 
 admin (qui lui seul peut faire EDIT et DELETE des assignments).
 
Ajouter de nouvelles propriétés au modèle des Assignments:
Auteur (nom ou photo de l'élève)
Matière (Base de données, Technologies Web, Grails, etc.)
 
Améliorer l'affichage des Assignments

Puisqu'on a ajouté de nouvelles propriétés, il faudra mettre à jour les différents endroits où les Assignments sont affichés/édités/saisis, en particulier :

- Afficher dans la liste des Assignments chaque Assignment sous forme d'une Material Card, avec le titre, la date, l'élève, une petite image illustrant la matière, la photo du prof en petit en haut à droite.

- La vue détails montrera en plus les remarques, la note s'il a été rendu, etc.
Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière)
 
- OPTIONNEL : Afficher les Assignments dans deux onglets séparés selon qu'ils ont été rendus ou pas encore rendus

- Lorsqu'on met une note à un Assignment et il devient rendu et apparaitra dans l'onglet "Rendu"
Optionnel : drag'n'drop pour passer d'un état à l'autre. On attrape la card d'un assignment non rendu, on la droppe dans la liste des rendus et ça demande de rentrer une note, de mettre les remarques, et l'assignment devient rendu.
 
Optionnel (mais simple à faire): utiliser un Formulaire de type Stepper (formulaire en plusieurs étapes) pour l'ajout d'Assignments (éventuellement pour la modification)
 
 - Rendre le tout plus joli, essayez de ne faire tous la même chose.
 
Hébergement sur render.com OBLIGATOIRE

Le sujet est ouvert, vous pouvez ajouter ce qui vous semble amusant/pertinent:
(difficulté moyenne) drag and drop entre la liste des Assignments non rendus et rendus, qui déclenchera la notation,
(facile) Ajout de messages de notification (SnackBar Material)
(bcp de travail) Collection d'élèves et de profs pour faciliter l'association devoir/élève et matières/profs
Etc.
 


## Cloner le projet 

pour le front-end

```bash
  git clone https://github.com/MBDS-ITU-2023/sarino14_antenaina44_frontmean_mbds_mada.git
```

pour le back-end

```bash
git clone https://github.com/MBDS-ITU-2023/sarino14_antenaina44_apimean_mbds_mada.git
```
## Demarrer localement le projet

### Aller dans le repertoire du projet backend

- Lancer la commande dans le backend pour installer les dependance

```bash
  npm install
```

- Lancer la commande demmarer dans le backend 

```bash
  npm run start
```

### Aller dans le repertoire du projet frontend

- Dans le fichier package.json changer la section "scripts" en 

```bash
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "npm install && ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
```

- Lancer la commande pour installer les dependances dans frontend 

```bash
  npm install
```
- Lancer la commande pour lancer le projet  

```bash
  ng serve
```
ou 
```bash
  npm start
```


## Contributions

| Nom et Prenom | Tache     | Ordre des taches                |
| :-------- | :------- | :------------------------- |
| 14-MALALANIRINA Sarino | Mise en place de la base de donnees MongoDB(Creation CLUSTER et Base de donnees) | 1 |
| 14-MALALANIRINA Sarino | Developpement cote back-end (Ajout modele : Matiere(Propriete : nom matiere, image, image du prof))| 2 |
| 44-RANDRIANANTOANDRO Antenaina | Ajout de la page login et les fonctionnalite d'authentification simple en code dur (Design : Angular Material & CSS)| 3 |
| 44-RANDRIANANTOANDRO Antenaina | Ajout SIDE BAR et TOOLBAR (Design : Angular Material & CSS)| 4 |
| 44-RANDRIANANTOANDRO Antenaina | Amelioration de l'affichage des assignement avec ANGULAR MATERIAL | 5 |
| 44-RANDRIANANTOANDRO Antenaina | Deploiement du front-end sur render | 6 |





#### Probleme rencontre

- Resolution du probleme : https://stackoverflow.com/questions/53995948/warning-in-budgets-maximum-exceeded-for-initial
```javascript
Error: bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 48.01 kB with a total of 1.05 MB.
```

