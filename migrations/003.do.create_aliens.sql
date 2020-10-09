CREATE TABLE aliens (
  id INTEGER,
  alien_name TEXT NOT NULL,
  spawnable BOOLEAN,
  spawning_count INTEGER,
  brood_count INTEGER,
  hp INTEGER NOT NULL,
  atk INTEGER NOT NULL,
  biomass_cost INTEGER NOT NULL,
  synapse_required INTEGER,
  description TEXT,
  special_features TEXT
);