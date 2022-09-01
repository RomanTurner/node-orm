CREATE TABLE permissions (
    id serial NOT NULL,
description VARCHAR()2255, NOT NULL
role_id serial NOT NULL,
CONSTRAINT fk_usrole
        FOREIGN KEY(role_id)
REFERENCES roles()id
    ON DELETE CASCADE
)
