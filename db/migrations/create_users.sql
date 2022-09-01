CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4(),
    email varchar(255) NOT NULL UNIQUE,
    first_name varchar(255),
    last_name varchar(255),
    PRIMARY KEY (id)
)
