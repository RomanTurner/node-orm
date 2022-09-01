CREATE products (
        id serial NOT NULL,
        company_id serial NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT DEFAULT NULL,
        CONSTRAINT fk_company
                FOREIGN KEY(company_id)
        REFERENCES companies(id)
                ON DELETE CASCADE
)
