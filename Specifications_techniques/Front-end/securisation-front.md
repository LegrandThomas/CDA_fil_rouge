# Stratégie de sécurisation du Front-End

## Introduction

Nous avons choisi de développer le Front-End de notre application Beginners App Dev avec Next et TypeScript. La sécurisation de cette partie est cruciale pour protéger les données des utilisateurs et garantir la sécurité des interactions. La partie front-end permet de vérifier les entrées utilisateur dont on doit toujours se méfier.

### Chiffrement des communications (HTTPS/TLS/HSTS)

Nous renforcerons la sécurité des données en transit entre le client et le serveur en mettant en place des tunnels sécurisés. Le protocole **HTTPS**, associé aux standards de sécurité **TLS** (Transport Layer Security) et **HSTS** (HTTP Strict Transport Security), garantira que toutes les communications dont la première entre l'application et nos serveurs seront chiffrées forçant l’utilisation de HTTPS.  
Cela protégera les données des utilisateurs contre les interceptions malveillantes et assurera la confidentialité des informations échangées, même sur des réseaux moins sécurisés.

### Nettoyage des Formulaires et Sanétization

Nous appliquerons des méthodes de nettoyage et de sanitization sur les données saisies par les utilisateurs pour prévenir les injections **SQL** et **XSS**. Toutes les entrées utilisateur seront validées et échappées pour garantir l'intégrité des données et la sécurité de l'application.

<details>
<summary>cf. Politique des mots de passe (implémentée côté BDD)</summary>

### Politique des Mots de Passe

- **Catégories de Mots de Passe** :  
  Les super administrateurs et les administrateurs bénéficient d’un accès complet, nécessitant le plus haut niveau de sécurité.
  Les modérateurs et les utilisateurs standard ont accès aux fonctionnalités standards de l’application, y compris la gestion des commentaires et auront un niveau de sécurité moindre.

- **Longueur des Mots de Passe** :  
  La longueur des mots de passe est déterminée non seulement pour la sécurité, mais aussi pour maintenir la performance optimale du système :

  - Pour les Super administrateurs et Administrateurs, nous exigeons des mots de passe d’au moins **15 caractères**.

  - Les Modérateurs et utilisateurs doivent utiliser des mots de passe d’au moins **12 caractères**.

  - La longueur maximale autorisée de 100 caractères est un compromis entre flexibilité et efficacité systémique.

- **Règles de Complexité** :  
  Tous les mots de passe doivent intégrer une combinaison de lettres majuscules, minuscules, chiffres, et symboles spéciaux. Nous proscrivons également l’utilisation de suites logiques ou répétitives.  
   Nous metterons également en place des Regex pour renforcer la sécurité

- **Délai d’Expiration des Mots de Passe** :  
  La fréquence de renouvellement des mots de passe est adaptée au rôle :

- Un renouvellement **annuel** équilibrant sécurité et facilité d’utilisation. Ce délai a été choisie en fonction du besoin de sécurité de l’application mais aussi afin de ne pas contraindre l’utilisateur à rentrer son mot de passe trop régulièrement

• **Mécanismes de Limitation d’Essais d’Authentification**

Nous limiterons les tentatives de connexion infructueuses à 5 essais, puis déclenchera l’envoi d’un mail pour réinitialiser le mot de passe.

• **Méthode de Conservation des Mots de Passe**

Les mots de passe sont stockés de manière sécurisée, utilisant la fonction **Bcrypt** qui combine hachage et salage, assurant que chaque mot de passe soit indéchiffrable en cas de récupération par un attaquant.

• **Méthode de Recouvrement d’Accès**

En cas de perte ou de vol des mots de passe, nous fournissons un lien de réinitialisation à usage unique (validité de 24h), assurant une récupération sécurisée.

### **Stratégie de Sauvegarde**

Nous mettrons en place une stratégie de sauvegarde robuste pour protéger les données de l'application contre les incidents tels que les pannes, les erreurs ou les attaques. Des sauvegardes journalières des données seront effectuées pour garantir la disponibilité et l'intégrité des informations des utilisateurs en cas de problème.

-Une sauvegarde automatique journalière déclenchée à minuit et isoler de la bdd grâce à pg_cron permettra de réduire l'impact d'une attaque de type ransomware.

- Emplacement: 3 sauvegardes à différents lieux : 1 dans le cloud, 1 sur le serveur (automatique) et 1 en local

- Stratégie de rétention : nous sauvegarderons un maximum de 15 sauvegardes complètes sur chaque emplacement (cloud/serveur/local) pendant une durée de 15 jours et 12 sauvegardes incrémentielles mensuelles pendant 1 an.

- Stratégie de purge : nous purgerons les sauvegardes en fonction du nombre de sauvegardes stockées, leur ancienneté et la taille des fichiers dans l'espace de stockage alloué aux sauvegardes.

Cette stratégie sera revue en fonction de la performance du système de stockage et du cadre légale de rétention des données.

</details>

### Politique de Sécurité Same-Origin et CSP

Ces mesures contrôleront les ressources chargées et exécutées sur le site.

- **Same-Origin Policy** (SOP)  
  Nous empêcherons les scripts de différentes origines d’interagir entre eux, contribuant ainsi à la prévention des attaques XSS. Par exemple, cela protégera les contributions des développeurs contre l’injection de scripts malveillants.
- **Cross-Origin Resource Sharing** (CORS)  
  Nous utiliserons **CORS** pour sécuriser le partage de ressources entre différentes origines. Cela permettra, par exemple, aux développeurs d’accéder de manière sécurisée aux API externes nécessaires sans compromettre la sécurité des données utilisateurs et des projets partagés sur la plateforme.
- **Content Security Policy** (CSP)
- En établissant une **CSP** stricte, nous limiterons les sources de contenu autorisées. Cela aidera à prévenir les attaques XSS en contrôlant les scripts exécutés sur notre application. Par exemple, seules les sources de confiance pourront être chargées, garantissant ainsi que les bibliothèques de code utilisées restent sécurisées.
- **Intégrité des Sous-Ressources** (SRI)  
  Nous utiliserons **SRI** (Subresource Integrity) pour garantir l’intégrité des ressources chargées depuis des origines tierces. En vérifiant les empreintes cryptographiques des fichiers externes, nous assurerons que les bibliothèques et les outils tiers n’ont pas été altérés, protégeant ainsi le code des projets collaboratifs contre toute modification malveillante.

### Mécanismes de Limitation d’Essais d’Authentification

Limitez les tentatives de connexion infructueuses pour prévenir les attaques par force brute. Après plusieurs échecs, bloquez temporairement l’accès et alertez l’utilisateur.

<details>
<summary>cf. Politique des mots de passe (implémentée côté BDD)</summary>

### Politique des Mots de Passe

- **Catégories de Mots de Passe** :  
  Les super administrateurs et les administrateurs bénéficient d’un accès complet, nécessitant le plus haut niveau de sécurité.
  Les modérateurs et les utilisateurs standard ont accès aux fonctionnalités standards de l’application, y compris la gestion des commentaires et auront un niveau de sécurité moindre.

- **Longueur des Mots de Passe** :  
  La longueur des mots de passe est déterminée non seulement pour la sécurité, mais aussi pour maintenir la performance optimale du système :

  - Pour les Super administrateurs et Administrateurs, nous exigeons des mots de passe d’au moins **15 caractères**.

  - Les Modérateurs et utilisateurs doivent utiliser des mots de passe d’au moins **12 caractères**.

  - La longueur maximale autorisée de 100 caractères est un compromis entre flexibilité et efficacité systémique.

- **Règles de Complexité** :  
  Tous les mots de passe doivent intégrer une combinaison de lettres majuscules, minuscules, chiffres, et symboles spéciaux. Nous proscrivons également l’utilisation de suites logiques ou répétitives.  
   Nous metterons également en place des Regex pour renforcer la sécurité

- **Délai d’Expiration des Mots de Passe** :  
  La fréquence de renouvellement des mots de passe est adaptée au rôle :

- Un renouvellement **annuel** équilibrant sécurité et facilité d’utilisation. Ce délai a été choisie en fonction du besoin de sécurité de l’application mais aussi afin de ne pas contraindre l’utilisateur à rentrer son mot de passe trop régulièrement

• **Mécanismes de Limitation d’Essais d’Authentification**

Nous limiterons les tentatives de connexion infructueuses à 5 essais, puis déclenchera l’envoi d’un mail pour réinitialiser le mot de passe.

• **Méthode de Conservation des Mots de Passe**

Les mots de passe sont stockés de manière sécurisée, utilisant la fonction **Bcrypt** qui combine hachage et salage, assurant que chaque mot de passe soit indéchiffrable en cas de récupération par un attaquant.

• **Méthode de Recouvrement d’Accès**

En cas de perte ou de vol des mots de passe, nous fournissons un lien de réinitialisation à usage unique (validité de 24h), assurant une récupération sécurisée.

### **Stratégie de Sauvegarde**

Nous mettrons en place une stratégie de sauvegarde robuste pour protéger les données de l'application contre les incidents tels que les pannes, les erreurs ou les attaques. Des sauvegardes journalières des données seront effectuées pour garantir la disponibilité et l'intégrité des informations des utilisateurs en cas de problème.

-Une sauvegarde automatique journalière déclenchée à minuit et isoler de la bdd grâce à pg_cron permettra de réduire l'impact d'une attaque de type ransomware.

- Emplacement: 3 sauvegardes à différents lieux : 1 dans le cloud, 1 sur le serveur (automatique) et 1 en local

- Stratégie de rétention : nous sauvegarderons un maximum de 15 sauvegardes complètes sur chaque emplacement (cloud/serveur/local) pendant une durée de 15 jours et 12 sauvegardes incrémentielles mensuelles pendant 1 an.

- Stratégie de purge : nous purgerons les sauvegardes en fonction du nombre de sauvegardes stockées, leur ancienneté et la taille des fichiers dans l'espace de stockage alloué aux sauvegardes.

Cette stratégie sera revue en fonction de la performance du système de stockage et du cadre légale de rétention des données.

</details>

## Conclusion

En appliquant ces mesures de sécurité pour la partie Front-End de notre application, nous réduisons le champ d'attaque potentiel. Cette stratégie sera réévaluée régulièrement pour répondre aux Vulnérabilités exposées connues (CVE) et aux changements technologiques.

[🔙 Retour à la Table des matières](../README.md)
