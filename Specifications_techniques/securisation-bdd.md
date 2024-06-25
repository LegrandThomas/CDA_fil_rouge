# Enjeux de Sécurité et Menaces Principales sur toutes les couches de l'application

Notre application traitera des données sensibles telles que les profils d'utilisateurs, les préférences de suivi technologique, les commentaires et les contributions partagées sur la plateforme. Afin de maintenir la confiance des utilisateurs et de respecter les réglementations en vigueur, telles que le RGPD, nous devons nous assurer de protéger ces informations contre tout accès non autorisé.

Les principales menaces identifiées pour notre application incluent :

- **Injection de Script Côté Client (XSS)** : Cette vulnérabilité peut permettre à des attaquants d'injecter du code malveillant dans les pages web, compromettant ainsi la sécurité des utilisateurs et la confidentialité de leurs données.
- **Attaque par Forgery de Requêtes Inter-Sites (CSRF)** : Les attaquants pourraient manipuler les actions des utilisateurs authentifiés sur la plateforme, compromettant ainsi l'intégrité des données et les transactions.
- **Injection SQL (SQLi)** : Les failles dans la gestion des bases de données pourraient permettre aux attaquants d'accéder, de modifier ou de supprimer des données sensibles, constituant ainsi une menace sérieuse pour la sécurité et l'intégrité des données des utilisateurs.

___

## Stratégie de sécurisation de la base de données

## Introduction

Nous avons choisi de développer la base de données avec PostgreSQL. Les données représentent le coeur de toute application. Il faut garantir l'intégrité, la sécurité et l'accessibilité de celles-ci. 

- **Contrôle d'accès physique** : Le serveur hébergeant PostgreSQL est dans un environnement sécurisé et accessible uniquement par le personnel autorisé.
- **Système d'exploitation** : Utilisation des comptes utilisateur distincts pour exécuter PostgreSQL. Les permissions de ces comptes seront limités pour minimiser les risques.
- **Pare-feu** : Un pare-feu est utilisé pour restreindre l'accès au port PostgreSQL (par défaut, 5432) uniquement aux adresses IP autorisées. Nous allons mettre en place une “liste blanche”, qui contiendras seulement les IP autorisées à acceder au port 5432.
- **Mises à jour régulières:** Nous Appliquerons régulièrement les mises à jour de sécurité de PostgreSQL pour corriger les vulnérabilités connues.
- **Configuration sécurisée:**  PostgreSQL sera configuré pour désactiver les fonctionnalités non utilisées et renforcer les protections par défaut. Par exemple, modifier le fichier **`postgresql.conf`** pour ajuster les paramètres de sécurité (configuration SSL) ou utilisez **`pg_hba.conf`** pour gérer les méthodes d'authentification et restreindre l'accès.

### Politique des Mots de Passe <a id="politique-des-mots-de-passe"></a>

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

### Stockage Sécurisé des Mots de Passe

Utilisez des méthodes de hachage robustes, comme Bcrypt, pour le stockage des mots de passe. Bcrypt intègre un salage automatique qui rend chaque hash unique et résistant aux attaques par tables de correspondance.  
([cf. Politique des mots de passes](#politique-des-mots-de-passe))

En adoptant une approche proactive en matière de sécurité et en mettant en œuvre des mesures appropriées, notre apllication s'efforcera de fournir à ses utilisateurs un environnement sûr et fiable pour leur veille technologique.

• **Mécanismes de Limitation d’Essais d’Authentification**

Nous limiterons les tentatives de connexion infructueuses à 5 essais, puis déclenchera l’envoi d’un mail pour réinitialiser le mot de passe.

• **Méthode de Conservation des Mots de Passe**

Les mots de passe sont stockés de manière sécurisée, utilisant un hachage **Bcrypt** avec salage, assurant que chaque mot de passe est unique et protégé contre les attaques.

• **Méthode de Recouvrement d’Accès**

En cas de perte ou de vol des mots de passe, nous fournissons un lien de réinitialisation à usage unique (validité de 24h), assurant une récupération sécurisée.

### ORM contre les Injections SQL

Employez un ORM pour accéder à la base de données, ce qui aide à prévenir les injections SQL en fournissant une couche d’abstraction qui sépare le code SQL de la logique métier.

### **Stratégie de Sauvegarde**

Nous mettrons en place une stratégie de sauvegarde robuste pour protéger les données de l'application contre les incidents tels que les pannes, les erreurs ou les attaques. Des sauvegardes régulières des données seront effectuées pour garantir la disponibilité et l'intégrité des informations des utilisateurs en cas de problème. Automatisation régulière des sauvegardes de la bdd grâce à pg_cron afin de lutter contre les ransomwares
**Sécurité des applications:**

- **Validation des entrées:** Toutes les entrées utilisateurs  seront rigoureusement validées pour empêcher les injections de code malveillant et autres attaques.

- **Tests de sécurité:** Des tests de sécurité réguliers de l'application serviront à identifier et corriger les vulnérabilités.
- **Mise à jour des bibliothèques:** Nous allons mettre régulièrement à jour les bibliothèques tierces utilisées par l'application pour corriger les vulnérabilités connues.

**Partage de notes:**

- **Contrôle du partage:** Des contrôles d'accès seront mis en place au niveau applicatif pour permettre aux utilisateurs de partager des notes avec des permissions spécifiques (lecture, écriture). Ceci rajoutera une couche supplémentaire à qui peut accéder certaines données dans la base de donnée.
- **Journal du partage de note:** Une journalisation du partage de note sera mis en place afin de savoir quelles notes a été envoyé à quel utilisateur ainsi qu ela réponse de ce partage, s’il a été accepté, ou refusé. Cette journalisation nous permettra aussi d’être informé en cas d’activité anormales et y remédier.


___


## Conclusion 

En appliquant ces mesures de sécurité, nous réduisons la fuite de données, l'accés non-autorisé à ces ressources. Cette stratégie sera réévaluée régulièrement pour répondre aux Vulnérabilités exposées connues (CVE) et aux changements technologiques.. La sécurité de la base de données s'adaptera aux changements et aux ressources accumulés sur le site. 