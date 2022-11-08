# Reservator
Pagina para reservar un `Listing`.

Este recibe un listado de `Listings` ficticios (en `/api/listings.js`) con unas fechas reservadas de ejemplo e sin crear colisiones de reserva intenta permitir realizar nuevas reservas.

### Componentes
Descripcion de los `componentes` generados.
#### Inputs
- RangePicker: `componente` que se auto controla la informacion para no salirse de los min y max preparados.
- TextArea: `componente` que pinta una area de texto para rellenar multiples lineas.

#### Listings
- Listing: `componente` que pinta cada tarjeta de infromacion del `Listing` con boton de reservame e `Inputs` de fechas.
- ListingSelector: `componente` para pintar los `Listings`, recibe un listado y autopagina.

#### Genericos
- ShowKeyValue: `componente` al encontrarse de forma recurrente el formato de pintar un parrafo se utilzia el `componente` con los estilos predefinidos.


### Utils
- calculatePrice: `utilidad` que dadas las fechas y el precio por hora calcula el precio total de la reserva.