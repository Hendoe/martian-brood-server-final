CREATE TABLE structures (
  id INTEGER,
  structure_name TEXT NOT NULL,
  constructable BOOLEAN,
  constructing_count INTEGER,
  brood_count INTEGER,
  hp INTEGER NOT NULL,
  atk INTEGER NOT NULL,
  biomass_cost INTEGER NOT NULL,
  synapse_produced INTEGER,
  description TEXT,
  special_features TEXT
);