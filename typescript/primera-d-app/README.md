# Primera D-app
## Ejecución
Para ejecutar esta D-App debe seguir los siguientes pasos


## Ejecutar Servicios Mockup

Crear el archivo _env/compose/docker-compose.yml_ con el siguiente contenido:  

```yaml
version: "3.8"
services:
  auna-report-template-api:
    image: "registry.aunablockchain.com/sdk/auna-report-template-mockup:v1.0.0-node14"
    ports:
      - "3070:3070"
  auna-report-service-api:
    image: "registry.aunablockchain.com/sdk/auna-report-service-mockup:v1.0.0-node14"
    ports:
      - "3071:3071"
  auna-mail-template-api:
    image: "registry.aunablockchain.com/sdk/auna-mail-template-mockup:v1.0.0-node14"
    ports:
      - "3051:3051"
  auna-mail-service-api:
    image: "registry.aunablockchain.com/sdk/auna-mail-service-mockup:v1.0.0-node14"
    ports:
      - "3101:3101"
```

Ejecutar el siguiente comando:  

*  _cd env/compose/_
*  _ docker-compose up -d_


### Instalación de Módulos NodeJS

* _cd apis/external/api-ext_
* _npm i
* _cd apis/internal/api-int
* _npm i_


### Ejecutar API Interna

* _cd apis/internal/api-int
* _npm run build_
* _npm run start_