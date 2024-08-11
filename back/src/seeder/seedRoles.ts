import { AppDataSource } from '../data-source';
import { Role } from '../entity/role';

async function seedRoles() {
  // Connexion à la base de données
  const dataSource = await AppDataSource.initialize();
  
  // Création des rôles à insérer
  const roles = [
    { role_name: 'test' }
   
  ];

  // Obtenir le gestionnaire d'entité
  const roleRepository = dataSource.getRepository(Role);

  for (const roleData of roles) {
    // Créer une nouvelle instance de Role
    const role = roleRepository.create({
      role_name: roleData.role_name,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Sauvegarder le rôle dans la base de données
    await roleRepository.save(role);
    console.log(`Role "${roleData.role_name}" has been inserted`);
  }

  await dataSource.destroy(); // Fermer la connexion
}

seedRoles().catch(error => {
  console.error('Error during seeding:', error);
});
