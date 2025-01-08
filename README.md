Documentation du Projet Fullstack
Ce projet est une application fullstack MERN (MongoDB, Express, React, Node.js) avec Docker et Kubernetes pour la conteneurisation et l'orchestration. L'application permet de gérer des annonces avec des fonctionnalités de création, lecture, mise à jour et suppression (CRUD).

Frontend - Documentation
Description
Le frontend est une interface utilisateur construite avec React pour interagir avec l'API backend. Elle permet de gérer des annonces via une interface conviviale.

Prérequis
Node.js installé (version 14 ou supérieure)
npm ou yarn pour la gestion des paquets
Installation
Clonez ce dépôt :

bash
Copier le code
git clone https://github.com/fullstackDonya/intro_react
Naviguez dans le dossier du frontend :

bash
Copier le code
cd frontend
Installez les dépendances :

bash
Copier le code
npm install
Configuration
Créez un fichier .env à la racine avec la variable suivante :

env
Copier le code
REACT_APP_API_URL=http://localhost:8080
Lancement
Lancez l'application :

bash
Copier le code
npm start
L'application sera accessible à http://localhost:3000.

Fonctionnalités
Page d'accueil : Liste des annonces disponibles
Ajouter une annonce : Formulaire pour créer une nouvelle annonce
Modifier une annonce : Page pour mettre à jour une annonce existante
Supprimer une annonce : Fonctionnalité pour supprimer une annonce
Structure du Projet
components/ : Composants réutilisables de l'interface utilisateur
pages/ : Pages principales de l'application (Accueil, Formulaire, etc.)
services/ : Gestion des appels API avec Axios
Important : Le backend doit être lancé et accessible avant d'utiliser le frontend.

Backend - Documentation
Description
Le backend est une API RESTful construite avec Node.js et Express. Elle interagit avec une base de données MongoDB pour gérer les annonces.

Prérequis
Node.js installé (version 14 ou supérieure)
MongoDB installé et en cours d'exécution localement ou accessible via un service cloud
Installation
Naviguez dans le dossier du backend :

bash
Copier le code
cd backend
Installez les dépendances :

bash
Copier le code
npm install
Configuration
Créez un fichier .env à la racine avec les variables suivantes :

env
Copier le code
PORT=8080
MONGO_URI=mongodb://localhost:27017/annonces
Lancement
Lancez le serveur backend :

bash
Copier le code
npm start
Le backend sera accessible à http://localhost:8080.

Fonctionnalités
GET /annonces : Récupère toutes les annonces
POST /annonces : Crée une nouvelle annonce
PUT /annonces/:id : Met à jour une annonce
DELETE /annonces/:id : Supprime une annonce
Docker - Documentation
Description
Le projet utilise Docker pour la conteneurisation du backend, du frontend et de la base de données MongoDB.

Prérequis
Docker et Docker Compose installés
Utilisation
Construisez et démarrez les conteneurs :

bash
Copier le code
docker-compose up -d
Les services suivants seront disponibles :

Frontend : http://localhost:3000
Backend : http://localhost:8080
MongoDB : Accessible en interne au conteneur
Docker Compose
Le fichier docker-compose.yml définit les services suivants :

mongo : Base de données MongoDB
backend : Serveur Node.js
frontend : Application React
Kubernetes - Documentation
Description
Le projet peut être déployé sur un cluster Kubernetes pour une orchestration avancée.

Prérequis
kubectl installé
Un cluster Kubernetes fonctionnel (Minikube, Docker Desktop Kubernetes, ou un service cloud)
Déploiement
Appliquez les fichiers de configuration Kubernetes pour chaque composant :

bash
Copier le code
kubectl apply -f nginx-pod.yaml
kubectl apply -f nginx-srv.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
kubectl apply -f mongo-data.yaml
Vérifiez que les pods, services et déploiements sont actifs :

bash
Copier le code
kubectl get pods
kubectl get services
kubectl get deployments

