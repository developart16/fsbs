import calculatePrice from "../../../utils/calculatePrice";

export default function handler(req, res) {
    const listingId = Number(req.query.listingId)

    // ESTO ES UN EJEMPLO DE ACCESO A BASE DE DATOS
    const listingTemporaryExample = [
        {
            listingId: Number(listingId),
            pricePerHour: 125,
            listingBusy: [
                {
                    startDateTime: "2022-02-15T08:00:00",
                    endDateTime: "2022-02-15T10:30:00",
                    status: "booked"
                },
                {
                    startDateTime: "2022-02-15T12:00:00",
                    endDateTime: "2022-02-15T17:00:00",
                    status: "blocked"
                },
            ]
        }
    ];

    //TODO: hacer comprobaciones para evitar que las fechas sean incorrectas
    //TODO: buscar listing id [en base de datos]? y añadir la informacion
    
    const {
        startDate: startDateTime,
        endDate: endDateTime,
        description = ""
    } = req.body;
    
    if ( !startDateTime || !endDateTime ) return res.status(400);
    
    const listing = listingTemporaryExample.find(_x => _x.listingId === listingId);
    if ( Boolean(listing) === false ) return res.status(404);

    listing.listingBusy.push({
        startDateTime: startDateTime.substring(0,startDateTime.length - 5),
        endDateTime: endDateTime.substring(0,endDateTime.length - 5),
        status: "booked",
        description: description,
        price: calculatePrice({
            pricePerHour: listing.pricePerHour,
            startDate: startDateTime,
            endDate: endDateTime
        })
    });
    
    // TODO: Guardar informacion [en json]?
  
    return res.status(200).json(listing)
  }
  