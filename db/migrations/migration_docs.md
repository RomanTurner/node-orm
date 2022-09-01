# Migrations

Because we want to get proper syntax highlighting we are writing the complex logic in sql and just reading the files with node. We convert the sql file to a JS string and then feed that into the pg-node database connection.


fn sqlFileToStr() reads and converts the file

create_table currently drops the table if it exists so we can not run this command with care for persisting data. This is to get our app through the development stage.
