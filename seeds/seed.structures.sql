INSERT INTO structures ( id, structure_name, constructable, constructing_count, brood_count, hp, atk, biomass_cost, synapse_produced, description, special_features )
VALUES
  (1, 'Spawning Pit', true, 0, 1, 20, 0, 10, 0, 'A pit dug into the ground that gets filled with Biomass to create aliens from.', 'Can build Worker and Warrior Drone Aliens.'),
  -- (2, 'Organic Cauldron', true, 0, 0, 15, 0, 10, 0, 'A massive pot for birthing Primarchs.', 'Can build Primarchs.'),
  (2, 'Synapse Clusters', true, 0, 0, 5, 0, 10, 5, 'A cluster of brains that communicates telepathically with the Brood.', 'Produces 5 synapse for the Brood.'),
  (3, 'Watcher Orbs', true, 0, 0, 5, 0, 5, 0, 'Small organic stalks with a single large eyeball growing out of the top.', 'Can detect movements near to the lair and give you a warning.'),
  (4, 'Subterranean Tentacles', true, 0, 0, 20, 5, 15, 0, 'Underground tentacles that can attack invaders.', 'Can be set to defense mode, to shield aliens from harm.')