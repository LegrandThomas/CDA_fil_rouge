# RBAC - Role-Based Access Control

Le Contrôle d'Accès Basé sur les Rôles (RBAC) est un modèle de gestion des autorisations qui attribue des privilèges aux utilisateurs en fonction de leur rôle au sein d'une organisation.  
Dans ce modèle, chaque utilisateur se voit assigner un ou plusieurs rôles qui déterminent les actions auxquelles il peut accéder et les opérations qu'il peut effectuer dans le système.

En attribuant des rôles spécifiques aux utilisateurs, tels que administrateur, utilisateur régulier, ou invité,  
le RBAC permet de définir clairement qui peut effectuer quelles actions sur les notes, les carnets et autres fonctionnalités de l'application.  
Cette approche simplifie la gestion des autorisations en réduisant la complexité des configurations individuelles d'autorisations pour chaque utilisateur.

Nous avons besoin d'un RBAC dans notre application pour plusieurs raisons essentielles:
- Cela garantit une sécurité renforcée en limitant l'accès aux fonctionnalités sensibles uniquement aux utilisateurs autorisés.
- cela facilite la gestion des utilisateurs à grande échelle en permettant une administration centralisée des permissions basées sur les rôles plutôt que sur des autorisations individuelles.
- le RBAC favorise la conformité réglementaire en assurant un contrôle précis et auditable des accès aux données et aux fonctionnalités critiques de l'application.



| Actions                                      | Registered User | Visitor | Administrator | 
|:--------------------------------------------:|:---------------:|:-------:|:-------:|
| Sign In                                      | ✅              | ❌      ||
| Sign Up                                      | ✅              | ✅      ||
| Manage Account (password reset, etc.)        | ✅              | ✅      ||
| View Post-it                                 | ✅              | ❌      ||
| Create Post-it                               | ✅              | ❌      ||
| Edit Post-it                                 | ✅              | ❌      ||
| Archive Post-it                              | ✅              | ❌      ||
| Filter/Sort Post-it                          | ✅              | ❌      ||
| Create Notebook                              | ✅              | ❌      ||
| Edit Notebook                                | ✅              | ❌      ||
| Archive Notebook                             | ✅              | ❌      ||
| Restore Archived Post-it/Notebook            | ✅              | ❌      ||

