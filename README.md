# node
This is the backend of our mobile application "Peddler" we are working with Nodejs to implement our project you need to use : Vscode Mongoose to nuse the database on desktop express mongoose 
extend schema (for classes heritage)
Folders are :Models for collection Routes for REST API routes and we installed REST CLIENT extension to execute rather than using postman 




# Ce repo contient les fonctions a consommer par notre application iOS (Peddler)

## Construit avec
* Javascript
* NodeJs
* MongoDB
* ExpressJS
## Requis
* Node-js
* Nodemon
## Usage
1. Ouvrir terminal
2. Ecrire les commandes :
3. cd [emplacement du projet]
4. npm install
5. npm run server
# Fonctions
I. Users
* Connexion (POST): localhost:3000/api/utilisateur/connexion
* Inscription (POST): localhost:3000/api/utilisateur/inscription
* Confirmation email (GET): localhost:3000/api/utilisateur/confirmation/:token
* ModifierProfil (PUT): localhost:3000/api/utilisateur/modifierProfil

II. Produit
* Connexion (POST): localhost:3000/api/utilisateur/connexion
* Inscription (POST): localhost:3000/api/utilisateur/inscription
* Confirmation email (GET): localhost:3000/api/utilisateur/confirmation/:token
* ModifierProfil (PUT): localhost:3000/api/utilisateur/modifierProfil
# Swagger
*. http://localhost:3000/docs/#/
# Docker
1. start 
*. docker-compose up --build
2. down
*. docker-compose down

# Auteurs
* Mohamed Ali Dbira
* Mohamed Malek Bouzgerou
