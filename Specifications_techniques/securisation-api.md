# Stratégie de sécurisation de l'API

## Introduction

Dans le cadre de la réalisation de notre application nous avons fait le choix de centraliser tous les enregistrements grâce à une API (interface de programmation d'application). Cette API aura à traiter des données personnelles de nos utilisateurs comme leurs pseudos et mot de passes. L'authentification donnera accés à des ressources de la plateforme.

Ces informations soulèvent des questions de sécurité quant à la protection de ces informations contre l’accès et l’utilisation non autorisée. La couche de l'API sera renforcé en appliquant les recommandations de l'ANSSI et en suivant le concept des trois piliers : <strong>Anticiper</strong> les menaces et vulnérabilité, <strong>prévenir</strong> les vulnérabilités en étant pro-actif, <strong>réagir</strong> aux menaces en répondant de manière approprié et en améliorant la sécurité future de l'application.

## Politique de sécurisation

### Authentification et Gestion des Sessions avec OAuth 2.0 et JWT

Sécurisez les APIs en utilisant **OAuth 2.0** pour l’authentification et les JSON Web Tokens (**JWT**) pour la gestion des sessions.
Sécurisez les APIs en utilisant **OAuth 2.0** pour l’authentification et les JSON Web Tokens (**JWT**) pour la gestion des sessions.

**OAuth 2.0 et JWT** : Bien que mentionnés dans la gestion des sessions, leur application aux APIs assure une couche supplémentaire de sécurité pour l'authentification et la gestion des autorisations, adaptée aux interactions entre services.

- **Tokens et JWT** : Nous utilisons ces méthodes pour assurer des sessions sécurisées avec des identifiants uniques et des données codées, permettant une gestion stateless qui augmente la scalabilité et la performance.

**Validation et Sanitization des Requêtes API**:

Assurez-vous que chaque requête API soit scrutée pour valider et assainir son contenu, ciblant efficacement les tentatives d’injections **SQL** et **XSS**.
Assurez-vous que chaque requête API soit scrutée pour valider et assainir son contenu, ciblant efficacement les tentatives d’injections **SQL** et **XSS**.

**Chiffrement des communications**:

Nous renforcerons la sécurité des données en transit entre le serveur et le client en mettant en place des tunnels sécurisés. Le protocole HTTPS, associé aux standards de sécurité **TLS** (Transport Layer Security) et **HSTS** (HTTP Strict Transport Security), garantira que toutes les communications dont la première entre l'application et nos serveurs seront chiffrées forçant l’utilisation de HTTPS.  
Cela protégera les données des utilisateurs contre les interceptions malveillantes et assurera la confidentialité des informations échangées, même sur des réseaux moins sécurisés.

**Limitation du Taux de Requêtes (Rate Limiting)**:

Mettez en place des contrôles stricts sur le nombre de requêtes acceptées pour prévenir les attaques par déni de service (DoS).

### Gestion des Identités Utilisateurs avec les UUID

Nous utiliserons des **UUID** (Universally Unique IDentifiers) pour renforcer la sécurité et la confidentialité des données des utilisateurs. Les UUID, générés de manière aléatoire, rendront difficile la prédiction des identifiants et contribueront à la protection contre les tentatives d'accès non autorisé.

### Transmission Sécurisée des Mots de Passe

Assurez-vous que les mots de passe sont toujours transmis de manière sécurisée, en utilisant des connexions HTTPS pour éviter les interceptions

### Journalisation des Requêtes API

Enregistrez chaque appel API, y compris les détails de la requête tels que l’adresse IP source, les paramètres de requête, les en-têtes, et les réponses. Cela permet de tracer les actions à travers l’API et de détecter des anomalies comme des tentatives d’injection ou des abus de l’API.

### Visualisation des end-points API via Swagger

Ensemble de règles et d’outils pour décrire, produire, consommer et visualiser des services web RESTful.

### Monitoring et Journalisation

Nous allons mettre en place un système de surveillance continue pour détecter les activités suspectes et réagir rapidement en cas d'incident. Des journaux d'audit détaillés seront maintenus pour enregistrer toutes les actions effectuées sur la plateforme, facilitant ainsi la détection des comportements anormaux et la réponse aux menaces potentielles.

### Sécuriser les routes via des ACL (Access Control List)

Contrôle des permissions et des rôles utilisateurs à chaque demande d’accès aux ressources protégées (fichiers, fonctionnalités admin/modérateur)

### Gestion des Rôles avec RBAC (Role-Based Access Control)

Système qui assigne des permissions aux utilisateurs en fonction des rôles qu'ils occupent. Définir les rôles est fondamental pour respecter le principe du moindre privilège, qui vise à limiter les privilèges des utilisateurs uniquement à ce dont ils ont besoin pour accomplir leurs tâches. Ici nous avons défini rôles:

- Super-administrateur

- Administrateur

- Modérateur

- Membre

**Sécurité** : Des mesures robustes seront implémentées pour protéger les données contre les accès non autorisés et les pertes.  
**Politique de Confidentialité** : Une politique claire et accessible décrira la gestion des données personnelles et les droits des utilisateurs.

___

## Conclusion 


En appliquant ces mesures de sécurité, nous réduisons les failles de sécurité qui peuvent survenir et nous réduisons le risque d'indisponibilité des services. Cette stratégie sera réévaluée régulièrement pour répondre aux Vulnérabilités exposées connues (CVE) et aux changements technologiques. 