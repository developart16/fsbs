// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const listingTemporaryExample = {
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
    // {
    //   startDateTime: "2022-11-07T12:00:00",
    //   endDateTime: "2022-11-09T17:00:00",
    //   status: "blocked"
    // }
  ]
};

export default function handler(req, res) {

  const listings = [
    {
      listingID: 1,
      listingName: "Espacio espectacular en Tokio",
      ...listingTemporaryExample
    },
    {
      listingID: 2,
      listingName: "Espacio espectacular en Barcelona",
      ...listingTemporaryExample
    },
    {
      listingID: 3,
      listingName: "Espacio espectacular en Valencia",
      ...listingTemporaryExample
    },
  ]

  return res.status(200).json(listings)
}
