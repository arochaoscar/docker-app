# Docker App

Esta es una aplicación básica para utilizar **Docker**.  Tiene los archivos de configuración, y el código de las APIs, no es mejor código que escrito pero solo es para poder hacer correr la demo :sunglasses:

## Donwnload docker and install

Si tienes Windows o Mac puedes descargar el instalador desde acá [Docker Desktop](https://www.docker.com/get-started/), y vas con siguiente :arrow_right: siguiente...

Ahora si tienes Linux :metal: te recomiendo este [post](https://www.baeldung.com/linux/docker-run-without-sudo)

## Conf Environment

En el `dockercompose.yaml` tienes las variables requeridas para que la app corran sin problemas, solo debes actualizar los valores para los `volumes:` y que estos apunten a tu ruta local.

Creas un archivo .env

```
HOME_DEV=
API_KEY=
MYSQL_DB_SERVER=
MYSQL_DB_NAME=
MYSQL_DB_USER=
MYSQL_DB_PASS=
PG_DB_SERVER=
PG_DB_NAME=
PG_DB_USER=
PG_DB_PASS=
```

Elimna los archivos `docker-app/mysql-data/.gitkepp` y `docker-app/mysql-data/.gitkepp`

> NOTA: si usas BBDD's productivas no compartas las credenciales

## Run App

```
docker-compose up
```