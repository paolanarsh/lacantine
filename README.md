# La Cantine du Rond-Point

## Présentation du projet

La Cantine du Rond-Point est un projet de création d'un site web
vitrine pour un établissement situé au Théâtre du Rond-Point, à Paris.

Ce site a pour objectif de renforcer la présence digitale de
l'établissement, de présenter son univers et son offre, et de faciliter
l'accès aux informations pratiques pour les visiteurs.

Le projet s'inscrit dans une démarche de communication digitale et
de valorisation de l'identité de marque.

## Objectifs du site

- Présenter La Cantine du Rond-Point et son univers.
- Valoriser son offre et ses produits.
- Améliorer l'expérience utilisateur grâce à une interface intuitive.
- Faciliter l'accès aux informations pratiques.
- Intégrer une section dédiée à Instagram.
- Proposer une interface d'inscription à une newsletter.

## Technologies utilisées

### Front-end
- HTML5
- CSS3
- JavaScript

### Back-end
- Python
- Flask
- Flask-CORS

## Fonctionnalités

### Site vitrine
Présentation de l'établissement, de son identité visuelle et de son offre.

### Section Instagram
Une section dédiée aux contenus Instagram, avec une zone prévue pour
l'affichage dynamique des publications via JavaScript.

### Newsletter
Un formulaire d'inscription à une newsletter avec une requête vers
l'API Flask.

À ce stade, cette fonctionnalité est une démonstration.
Aucun service externe d'envoi de newsletters n'est connecté.

### API Flask
Le projet comprend un back-end Flask destiné à gérer les requêtes
du front-end, notamment celles liées aux fonctionnalités Instagram
et newsletter.

## Installation et lancement

Installer les dépendances Python :

```bash
python3 -m pip install Flask Flask-CORS
```

Lancer l'API Flask dans un terminal :

```bash
python3 app.py
```

Puis lancer le site dans un second terminal :

```bash
python3 -m http.server 8000
```

Ouvrir ensuite http://localhost:8000 dans le navigateur.

## Structure du projet

```text
la-cantine/
│
├── index.html
├── styles.css
├── brand.css
├── site-overrides.css
├── logo-transparent.png
├── script.js
├── app.py
└── README.md
```