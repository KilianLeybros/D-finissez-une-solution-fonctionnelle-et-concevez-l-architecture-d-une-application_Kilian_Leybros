# P13-Définissez une solution fonctionnelle et concevez l’architecture d’une application

# Cloner le projet

Git clone : [https://github.com/KilianLeybros/D-finissez-une-solution-fonctionnelle-et-concevez-l-architecture-d-une-application_Kilian_Leybros.git](https://github.com/KilianLeybros/D-finissez-une-solution-fonctionnelle-et-concevez-l-architecture-d-une-application_Kilian_Leybros.git)

### Démarrer le projet

- L'application et la base de données sont dockerisées, vous n'avez qu'à installer Docker sur votre machine.

- Windows : https://docs.docker.com/desktop/setup/install/windows-install/

- Ubuntu : https://docs.docker.com/engine/install/ubuntu/

- Une fois Docker installé et le projet Git cloné, rendez-vous à la racine de celui-ci et lancez-le avec :

> `docker compose up`

- Rendez-vous sur [http://localhost/](http://localhost/)

- Un compte de service client est créé par défaut, car il n'est pas possible d'en créer un via l'interface :
  
Email : admin@test.com
Mot de passe : Azerty123$

- Pour les clients, les comptes devront être créés manuellement en naviguant sur "Connexion" puis "Créer un compte" ou [http://localhost/register](http://localhost/register).

- Un script init.sql est disponible ici à titre informatif : "ycyw-back/src/main/resources/db/init.sql


