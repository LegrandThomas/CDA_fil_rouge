### Architecture N-Tiers
<img src="../Assets/Images/n-tier-architecture.png" alt="Image de la plateforme" width=auto>


Notre application est structurée selon une architecture N-tiers, qui permet une séparation claire des préoccupations, une meilleure gestion de la complexité et une facilité de maintenance. Voici une explication détaillée de chaque couche de notre architecture :
1. Couche Données (Data Layer)

La couche données est responsable de la gestion et du stockage des données. Elle est constituée de notre base de données relationnelle, qui est conçue pour stocker les informations de manière sécurisée, efficace et évolutive. 

Les principales responsabilités de cette couche incluent :

    Stockage des données : Gestion des tables, des relations et des contraintes de la base de données.
    Accès aux données : Fourniture de méthodes pour récupérer, insérer, mettre à jour et supprimer des données.
    Sécurité des données : Mise en place de mécanismes de sécurité pour protéger les données sensibles.
    Intégrité des données : Assurer la cohérence et l'intégrité des données via des contraintes de clé primaire, des clés étrangères et d'autres règles de validation.

2. Couche Serveur (Server Layer)

La couche serveur sert d'intermédiaire entre la couche de données et la couche de présentation. Cette couche est constituée de notre API (Application Programming Interface), qui expose des endpoints pour permettre aux applications front-end d'interagir avec la base de données.

Les principales responsabilités de cette couche incluent :

    Logique Métier : Implémentation des règles métier et des processus métiers de l'application.
    Gestion des requêtes et des réponses : Traitement des requêtes provenant des clients, exécution des opérations nécessaires et renvoi des réponses appropriées.
    Sécurité : Gestion de l'authentification et de l'autorisation pour sécuriser l'accès aux données et aux fonctionnalités.
    Scalabilité : Fourniture de services qui peuvent évoluer en fonction des besoins de l'application, en gérant efficacement les charges et en répartissant les requêtes.

3. Couche Présentation (Presentation Layer)

La couche présentation est divisée en deux versions : une version desktop et une version mobile. Les deux versions consomment les services exposés par l'API pour interagir avec la base de données. 

Les principales responsabilités de cette couche incluent :

    Interface Utilisateur : Fournir une interface intuitive et réactive pour les utilisateurs finaux.
    Expérience Utilisateur : Garantir une expérience utilisateur cohérente et fluide sur les différentes plateformes.
    Consommation de l'API : Interaction avec l'API pour récupérer et afficher les données, ainsi que pour envoyer des données à la base de données via l'API.
    Gestion des Sessions : Gérer l'état de la session utilisateur, y compris l'authentification et la gestion des tokens.

Version Desktop

La version desktop est conçue pour les utilisateurs qui accèdent à l'application via des ordinateurs de bureau ou des ordinateurs portables. Cette version offre une interface riche et complète, optimisée pour les grands écrans.

Version Mobile

La version mobile est optimisée pour les smartphones et les tablettes. Elle offre une interface simplifiée et adaptée aux écrans plus petits, tout en conservant l'accès à toutes les fonctionnalités principales de l'application.

Avantages de l'Architecture N-Tiers

    Modularité : Chaque couche est indépendante, ce qui facilite la maintenance et les mises à jour.
    Réutilisabilité : Les composants de chaque couche peuvent être réutilisés dans d'autres projets ou contextes.
    Scalabilité : L'architecture permet de faire évoluer les couches indépendamment en fonction des besoins.
    Sécurité : La séparation des préoccupations aide à mettre en place des mesures de sécurité robustes à chaque niveau.
    Facilité de Développement : Les développeurs peuvent travailler sur différentes couches simultanément, améliorant ainsi l'efficacité du développement.

En adoptant cette architecture N-tiers, nous assurons que notre application est robuste, évolutive et maintenable, capable de répondre aux besoins actuels et futurs de nos utilisateurs.