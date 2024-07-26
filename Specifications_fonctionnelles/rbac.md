## RBAC (Role-Based Access Control)

Ce tableau aligne les permissions et les actions possibles pour chaque rôle selon les exigences et les scénarios d'utilisation détaillés dans nos User Stories. Il est conçu pour faciliter la compréhension des responsabilités et des capacités de chaque rôle au sein de la plateforme, assurant ainsi que les objectifs de gestion des utilisateurs, de modération des contenus et d'engagement des utilisateurs sont atteints efficacement.

### Vue d'ensemble :

| Autorisations / Rôle                                          | Visiteur | Membre | Modérateur | Administrateur | Super Administrateur |
| ------------------------------------------------------------- | -------- | ------ | ---------- | -------------- | -------------------- |
| Gestion de l'authentification et accès à contenu personnalisé | ✅       | ✅     | ✅         | ✅             | ✅                   |
| Créer un compte membre                                        | ✅       | ✅     | ✅         | ✅             | ✅                   |
| Modifier son compte                                           | ❌       | ✅     | ✅         | ✅             | ✅                   |
| Désactiver son compte                                         | ❌       | ✅     | ✅         | ✅             | ✅                   |
| Recevoir des notifications en cas de suppression de contenu   | ❌       | ✅     | ✅         | ✅             | ✅                   |
| Soumission de ressources                                      | ❌       | ✅     | ✅         | ✅             | ✅                   |
| Accès à un rapport d'activité de ses ressources               | ❌       | ✅     | ✅         | ✅             | ✅                   |
| Proposer une session d'échange                                | ❌       | ✅     | ✅         | ✅             | ✅                   |
| Publication de ressources                                     | ❌       | ❌     | ✅         | ✅             | ✅                   |
| Accès à une interface de modération                           | ❌       | ❌     | ✅         | ✅             | ✅                   |
| Anonymisation de contenus non conformes                       | ❌       | ❌     | ✅         | ✅             | ✅                   |
| Accès à un rapport d'activité de modération                   | ❌       | ❌     | ✅         | ✅             | ✅                   |
| Créer un compte modérateur                                    | ❌       | ❌     | ❌         | ✅             | ✅                   |
| Désactiver des comptes modérateurs                            | ❌       | ❌     | ❌         | ✅             | ✅                   |
| Attribuer/modifier des rôles                                  | ❌       | ❌     | ❌         | ✅             | ✅                   |
| Créer des administrateurs                                     | ❌       | ❌     | ❌         | ❌             | ✅                   |
| Modifier des administrateurs                                  | ❌       | ❌     | ❌         | ❌             | ✅                   |
| Désactiver des administrateurs                                | ❌       | ❌     | ❌         | ❌             | ✅                   |

### Vue détaillée :

<details>
<summary>Cliquez pour voir les autorisations détaillées de chaque rôle (Cliquez pour développer)</summary>

| Autorisations / Rôle                                          | Visiteur                        | Membre                          | Modérateur                          | Administrateur                      | Super Administrateur                   |
| ------------------------------------------------------------- | ------------------------------- | ------------------------------- | ----------------------------------- | ----------------------------------- | -------------------------------------- |
| Gestion de l'authentification et accès à contenu personnalisé | Accéder au contenu personnalisé | Accéder au contenu personnalisé | Accéder au contenu personnalisé     | Accéder au contenu personnalisé     | Accéder au contenu personnalisé        |
| Créer un compte membre                                        | Créer un compte                 | Créer un compte                 | Créer un compte                     | Créer un compte                     | Créer un compte                        |
| Modifier son compte                                           | N/A                             | Modifier son compte             | Modifier son compte                 | Modifier son compte                 | Modifier son compte                    |
| Désactiver son compte                                         | N/A                             | Désactiver son compte           | Désactiver son compte               | Désactiver son compte               | Désactiver son compte                  |
| Recevoir des notifications en cas de suppression de contenu   | N/A                             | Recevoir des notifications      | Recevoir des notifications          | Recevoir des notifications          | Recevoir des notifications             |
| Soumission de ressources                                      | N/A                             | Soumettre des ressources        | Soumettre des ressources            | Soumettre des ressources            | Soumettre des ressources               |
| Accès à un rapport d'activité de ses ressources               | N/A                             | Accéder à un rapport d'activité | Accéder à un rapport d'activité     | Accéder à un rapport d'activité     | Accéder à un rapport d'activité        |
| Proposer une session d'échange                                | N/A                             | Proposer une session            | Proposer une session                | Proposer une session                | Proposer une session                   |
| Publication de ressources                                     | N/A                             | N/A                             | Publier des ressources              | Publier des ressources              | Publier des ressources                 |
| Accès à une interface de modération                           | N/A                             | N/A                             | Accéder à l'interface de modération | Accéder à l'interface de modération | Accéder à l'interface de modération    |
| Anonymisation de contenus non conformes                       | N/A                             | N/A                             | Anonymiser des contenus             | Anonymiser des contenus             | Anonymiser des contenus                |
| Accès à un rapport d'activité de modération                   | N/A                             | N/A                             | Accéder à un rapport d'activité     | Accéder à un rapport d'activité     | Accéder à un rapport d'activité        |
| Créer un compte modérateur                                    | N/A                             | N/A                             | N/A                                 | Créer des comptes modérateurs       | Créer des comptes modérateurs          |
| Désactiver des comptes modérateurs                            | N/A                             | N/A                             | N/A                                 | Désactiver des comptes modérateurs  | Désactiver des comptes modérateurs     |
| Attribuer/modifier des rôles                                  | N/A                             | N/A                             | N/A                                 | Attribuer/modifier des rôles        | Attribuer/modifier des rôles           |
| Créer des administrateurs                                     | N/A                             | N/A                             | N/A                                 | N/A                                 | Créer des comptes administrateurs      |
| Modifier des administrateurs                                  | N/A                             | N/A                             | N/A                                 | N/A                                 | Modifier des comptes administrateurs   |
| Désactiver des administrateurs                                | N/A                             | N/A                             | N/A                                 | N/A                                 | Désactiver des comptes administrateurs |

</details>

[🔙 Retour à la Table des matières](./README.md)
