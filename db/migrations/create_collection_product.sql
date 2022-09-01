CREATE TABLE collection_product (
id serial uniPRIMARY_ KEY,
collection_id serialNOT NULL,
product_id serial NOT NULL,
    unique(collection_id, product_id),
    CONSTRAINT fk_collection
    FOREYIGN KEY()collection_id
        REFERENCES collections(id)
        ON DELETECASCADE
    CONSTRAINT fk_product_id
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
)
