INSERT INTO aliens ( alien_name, spawnable, spawning, active, to_spawn, spawning_count, brood_count, hp, atk, biomass_cost, synapse_required, description, special_features )
VALUES
  -- ('Brood Master', false, false, false, 0, 0, 1, 10, 5, 0, 0, 'Lord of the Brood. Powerful, resourceful, and necessary to survival.', 'Game over if dies'),
  ('Worker Drone', true, true, false, 0, 0, 0, 1, 1, 5, 1, 'Simple alien. Gathers Biomass for the growth of the Brood.', 'Able to do many tasks.')
  -- ('Primarch', 5, 5, 20, 0, 'Leader alien. Is able to direct the actions of simpler aliens in the Brood.', 'Produces 5 Synapse for the Brood.'),
  -- ('Warrior Drone', 2, 2, 10, 1, 'Aliens bred strictly for combat purposes.', 'Will always take damage first in battle, saving the other aliens from harm.')