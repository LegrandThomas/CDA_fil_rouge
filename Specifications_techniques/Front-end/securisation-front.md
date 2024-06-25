# Stratégie de sécurisation du Front-End

## Introduction

Nous avons choisi de développer le Front-End de notre application Beginners App Dev avec Next et TypeScript. La sécurisation de cette partie est cruciale pour protéger les données des utilisateurs et garantir la sécurité des interactions. La partie front-end permet de vérifier les entrées utilisateur dont on doit toujours se méfier.

### Chiffrement des communications (HTTPS/TLS/HSTS)

Nous renforcerons la sécurité des données en transit entre le client et le serveur en mettant en place des tunnels sécurisés. Le protocole **HTTPS**, associé aux standards de sécurité **TLS** (Transport Layer Security) et **HSTS** (HTTP Strict Transport Security), garantira que toutes les communications dont la première entre l'application et nos serveurs seront chiffrées forçant l’utilisation de HTTPS.  
Cela protégera les données des utilisateurs contre les interceptions malveillantes et assurera la confidentialité des informations échangées, même sur des réseaux moins sécurisés.

### Protection des Entêtes avec Helmet

Nous protégerons nos applications Express.js en utilisant **Helmet**, un ensemble de middleware pour sécuriser les applications Express en définissant divers en-têtes HTTP. Cela inclura la protection contre les attaques **XSS** (Cross-Site Scripting), le contrôle de la politique de contenu, la prévention de l'ouverture de fenêtres contextuelles indésirables (**CSP** (Content Security Policy) ), entre autres.  
Grâce à **NestJS**, la mise en œuvre de ces mesures de sécurité sera simplifiée, nous permettant de garantir une base solide pour la protection de l’environnement numérique de nos utilisateurs.
Nous protégerons nos applications Express.js en utilisant **Helmet**, un ensemble de middleware pour sécuriser les applications Express en définissant divers en-têtes HTTP. Cela inclura la protection contre les attaques **XSS** (Cross-Site Scripting), le contrôle de la politique de contenu, la prévention de l'ouverture de fenêtres contextuelles indésirables (**CSP** (Content Security Policy) ), entre autres.  
Grâce à NestJS, la mise en œuvre de ces mesures de sécurité sera simplifiée, nous permettant de garantir une base solide pour la protection de l’environnement numérique de nos utilisateurs.

### Nettoyage des Formulaires et Sanétization

Nous appliquerons des méthodes de nettoyage et de sanitization sur les données saisies par les utilisateurs pour prévenir les injections **SQL** et **XSS**. Toutes les entrées utilisateur seront validées et échappées pour garantir l'intégrité des données et la sécurité de l'application.

([cf. Politique des mots de passes](./securisation-bdd.md#politique-des-mots-de-passe))

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

([cf. Politique des mots de passes](./securisation-bdd.md#politique-des-mots-de-passe))

---

## Conclusion

En appliquant ces mesures de sécurité pour la partie Front-End de notre application, nous réduisons le champ d'attaque potentiel. Cette stratégie sera réévaluée régulièrement pour répondre aux Vulnérabilités exposées connues (CVE) et aux changements technologiques.

[🔙 Retour à la Table des matières](../README.md)
