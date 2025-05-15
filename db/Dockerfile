FROM mysql:8  # Imagen base de MySQL 8

# Copiar el SQL de inicializacion (para crear la base de datos con sus tablas y datos)
# Estos se ejecutan automáticamente al iniciar el contenedor por primera vez
COPY ./init.sql /docker-entrypoint-initdb.d/   #copiar el archivo init.sql al contenedor
