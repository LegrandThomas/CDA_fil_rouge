# Stratégie de sécurisation de la base de données

## Introduction

Nous avons choisi de développer la base de données avec PostgreSQL. Les données représentent le coeur de toute application. Il faut garantir l'intégrité, la sécurité et l'accessibilité de celles-ci.

- **Contrôle d'accès physique** : Le serveur hébergeant PostgreSQL est dans un environnement sécurisé et accessible uniquement par le personnel autorisé.
- **Système d'exploitation** : Utilisation des comptes utilisateur distincts pour exécuter PostgreSQL. Les permissions de ces comptes seront limitées pour minimiser les risques.
- **Pare-feu** : Un pare-feu est utilisé pour restreindre l'accès au port PostgreSQL (par défaut, 5432) uniquement aux adresses IP autorisées. Nous allons mettre en place une “liste blanche”, qui contiendra seulement les IP autorisées à acceder au port 5432.
- **Mises à jour régulières:** Nous Appliquerons régulièrement les mises à jour de sécurité de PostgreSQL pour corriger les vulnérabilités connues.
- **Configuration sécurisée:** PostgreSQL sera configuré pour désactiver les fonctionnalités non utilisées et renforcer les protections par défaut. Par exemple, modifier le fichier **`postgresql.conf`** pour ajuster les paramètres de sécurité (configuration SSL) ou utilisez **`pg_hba.conf`** pour gérer les méthodes d'authentification et restreindre l'accès.

--- 

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

--- 

### **Stratégie de Sauvegarde**

Nous mettrons en place une stratégie de sauvegarde robuste pour protéger les données de l'application contre les incidents tels que les pannes, les erreurs ou les attaques. Des sauvegardes journalières des données seront effectuées pour garantir la disponibilité et l'intégrité des informations des utilisateurs en cas de problème. 

- **Une sauvegarde automatique journalière** déclenchée à minuit et isoler de la bdd grâce à pg_cron permettra de réduire l'impact d'une attaque de type ransomware. 

- **Emplacement**: 3 sauvegardes à différents lieux : 1 dans le cloud, 1 sur le serveur (automatique) et 1 en local

- **Stratégie de rétention** : nous sauvegarderons un maximum de 15 sauvegardes complètes sur chaque emplacement (cloud/serveur/local) pendant une durée de 15 jours et 12 sauvegardes incrémentielles mensuelles pendant 1 an. 

- **Stratégie de purge** : nous purgerons les sauvegardes en fonction du nombre de sauvegardes stockées, leur ancienneté et la taille des fichiers dans l'espace de stockage alloué aux sauvegardes. 

Cette stratégie sera revue en fonction de la performance du système de stockage et du cadre légale de rétention des données. 

--- 

### Partage de notes

- **Contrôle du partage:** Des contrôles d'accès seront mis en place au niveau applicatif pour permettre aux utilisateurs de partager des notes avec des permissions spécifiques (lecture, écriture). Ceci rajoutera une couche supplémentaire à qui peut accéder à certaines données dans la base de données.
- **Journal du partage de note:** Une journalisation du partage de note sera mise en place afin de savoir quelles notes a été envoyé à quel utilisateur ainsi que la réponse de ce partage, s’il a été accepté, ou refusé. Cette journalisation nous permettra aussi d’être informé en cas d’activité anormale et y remédier.


[🔙 Retour à la Table des matières](../README.md)
