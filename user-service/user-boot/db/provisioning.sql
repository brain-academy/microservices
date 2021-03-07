CREATE DATABASE microservices;
\c microservices;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(80),
    discord_username VARCHAR(80)
);

INSERT INTO users(name, discord_username) values ('david', 'DavidU');
