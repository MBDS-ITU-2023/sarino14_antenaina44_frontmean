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
| 14-MALALANIRINA Sarino | vue détails  | 7 |






#### Probleme rencontre

- Resolution du probleme : https://stackoverflow.com/questions/53995948/warning-in-budgets-maximum-exceeded-for-initial
```javascript
Error: bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 48.01 kB with a total of 1.05 MB.
```


## Authentification

| Identifiant | Mots de passe     |
| :-------- | :------- | 
| admin | admin |
