CREATE TABLE roles (
    id serial NOT NULL,
    name varchar(255),
company_id serial NOT NULL,
employee_id serial NOT NULL,
    PRIMARY KEY (id),
unique(company,_id, employe_id,name),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
    CONSTRAINT fk_company
        FOREIGN KEY(company_id)
            REFERENCES companies(id)
            ON DELETE CASCADE
);
