#### Nombre: Mateo Rubio Hernández, Codigo: 202211504

## Ejecución del proyecto

1. Clonar el repositorio y entrar en la carpeta del proyecto.
2. Instalar dependencias:  
   npm install
3. Configurar la base de datos en app.module.ts. Actualmente está configurada a Postgres en local, host: localhost, puerto: 5432, usuario: postgres, contraseña: 123, base de datos: parcial2. Asegúrese de tener una instancia de Postgres corriendo con esos datos o modifíquelos según su entorno.
4. TypeORM está configurado con synchronize: true, por lo que las tablas se crean automáticamente a partir de las entidades Country y TravelPlans.
5. Ejecutar la API:
    - modo normal: npm run start
    - modo desarrollo (watch): npm run start:dev
6. La API escucha por defecto en el puerto 3000 (o en el definido en la variable de entorno PORT).

## Descripción de la API

La API expone dos módulos principales: Countries y TravelPlans.  
El módulo Countries se encarga de gestionar la información de países. Permite consultar países por su código alfa-3 (cca3) y realiza una estrategia de “cacheo”: primero busca en la base de datos y, si no existe, consulta la API externa RestCountries y guarda el resultado.  
El módulo TravelPlans gestiona planes de viaje. Cada plan contiene nombre, fechas, una nota y una referencia al país de destino mediante una relación ManyToOne hacia Country. Cuando se crea un nuevo plan de viaje, el servicio de TravelPlans delega en el módulo Countries la resolución y persistencia del país asociado.

## Endpoints

Countries
- GET /country  
  Devuelve todos los países almacenados en la base de datos.
- GET /country/:cca3  
  Devuelve un país por su código alfa-3. El retorno incluye un campo adicional que indica si el dato proviene de la base de datos o de la API externa.  
  Ejemplo: GET /country/FRA

TravelPlans
- GET /travelplan  
  Devuelve todos los planes de viaje junto con su país de destino.
- GET /travelplan/:id  
  Devuelve un plan de viaje por id, incluyendo la relación con Country.
- POST /travelplan  
  Cuerpo esperado (JSON):  
  {  
  "name": "Viaje a París",  
  "start_date": "2025-12-01",  
  "end_date": "2025-12-10",  
  "note": "Vacaciones",  
  "cca3": "FRA"  
  }

## Provider externo de países

El provider externo se implementa como un servicio que consume RestCountries usando HttpService de @nestjs/axios y firstValueFrom de rxjs. Este servicio define un método getCountryByAPI(cca3) que llama a la ruta /v3.1/alpha/{cca3}, limitando los campos con el parámetro fields (cca3, name, region, subregion, capital, population, flags).  
La respuesta de RestCountries se mapea a un DTO interno que simplifica la estructura. Este provider se registra en el módulo de Countries usando un token de abstracción y se inyecta en CountryService. De esta manera, CountryService puede pedir información de un país sin acoplarse directamente a la API externa y decidir si debe persistir el resultado en la base de datos.

## Modelo de datos

Country (CountryEntity)
- cca3: string (clave primaria, código alfa-3)
- name: string
- region: string
- subregion: string
- capital: string
- population: number
- flag: string (URL o código de bandera)
- created_at: Date
- updated_at: Date

TravelPlan (TravelPlansEntity)
- id: uuid (clave primaria)
- name: string
- start_date: Date
- end_date: Date
- note: string
- created_at: Date
- cca3_dest: relación ManyToOne hacia CountryEntity usando la columna cca3_dest como clave foránea.  

## Pruebas básicas sugeridas

1. Consultar país no cacheado
    - Asegurarse de que la tabla de países no contenga el código FRA.
    - Hacer GET /country/FRA.
    - Verificar que la respuesta corresponda a Francia y que el país quede guardado en la base de datos.

2. Consultar país cacheado
    - Volver a hacer GET /country/FRA.
    - Verificar que ahora la respuesta se obtenga desde la base de datos sin necesidad de llamar a RestCountries.

3. Crear plan de viaje
    - Enviar POST /travelplan con un cuerpo que incluya un cca3 válido (por ejemplo FRA).
    - Verificar que el plan se cree y que la relación con CountryEntity quede correctamente asociada.
    - Consultar GET /travelplan para ver el listado de planes con su país de destino.
    - Consultar GET /travelplan/:id para ver el solemente el plan asociado con ese id.  

## Extensión de la API
La API se extendió para que ahora imprima en logs las caracteristicas de cada petición. 
Esto se hizo por medio de un middleware que sirve de intermediario entre el cliente y el controlador
de forma global. GlobalMiddleware(el middleware implementado) implementa la clase NestMiddleware 
que le provee de las funciones para registrar y obtener los datos de una request y su respuesta. 
Luego de ello, imprime en logs, los datos obtenidos. El middleware es global debido a que en el módulo 
principal de NestJS se especifico que era para todas las rutas.

También se extendió para que eliminar los paises del caché estuviera protegido
por un guard. Esto se hizo especificando en el @Delete del controlador del módulo 
que se debía usar un guard para autorizar esa solicitud específica. Si dentro de los headers hay un token
llamado "clave" y valor "salchipapa123", entonces el guard deja pasar la solicitud. En caso contrario,
la bloquea.

## Validación extensiones
Para la ruta protegida autorizado DELETE /country/FRA
headers: ["clave": "salchipapa123"]
Para la ruta protegida denegado DELETE /country/FRA
headers: ["clave": "salchipapa345"]
Para la ruta protegida denegado DELETE /country/FRA
headers: []

Para el middleware: Haga cualquier solicitud mencionada 
anteriormente y verifique que se imprime un log en la consola
de donde está corriendo la aplicación. El log debería tener la estructura:

[OUT] {"url":"/country/cca3","status":409,"durationMs":213,"method":"DELETE"}