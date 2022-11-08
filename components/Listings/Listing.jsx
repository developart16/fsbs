import { Alert, Button, Snackbar } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import calculatePrice from "../../utils/calculatePrice";
import RangePicker from "../Inputs/RangePicker";
import TextArea from "../Inputs/TextArea";
import ShowKeyValue from "../ShowKeyValue";


const Available = <strong style={{color:"green"}}>Disponible</strong>
const Booked = <strong style={{color:"orange"}}>Reservado</strong>
const Blocked = <strong style={{color:"red"}}>Bloqueado</strong>

export default function Listing({
  listing={},
  onClick=()=>{},
  selected=false,
  ...props
}) {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState(null);

  const [messageError, setMessageError] = useState(null);
  const fncCloseMessage = (event, reason)=>{ reason === 'clickaway' && setMessageError(null)}
  const ErrorMessage = () => (
    <Snackbar
      open={messageError}
      autoHideDuration={6000}
      onClose={fncCloseMessage}
    >
      <Alert onClose={fncCloseMessage} severity="error" sx={{ width: '100%' }}>
        {messageError}
      </Alert>
    </Snackbar>
  );
  
  const fncOrder = async (event, listingID)=>{
    event.stopPropagation();
    const messageError = "No puede poner informacion de contacto en la descripcion!";
    const emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    
    // TODO: improve regex to avoid numbers like 666 66 66 66 or difreten combinations
    const phoneRegex = /((\d{3}))?(\d{3})?[\s-]?\d{3}[\s-]?\d{4}/img

    if ( emailRegex.test(description) ) return setMessageError(messageError)
    if ( phoneRegex.test(description) ) return setMessageError(messageError)

    const postListing = await fetch(`api/listing/${listingID}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        description: description
      })
    })
    const response = await postListing.json()
  }

  useEffect(()=>{

    setStartDate(null)
    setEndDate(null)

  }, [selected]);


  const today = dayjs();
  const listingBusy = listing.listingBusy.map((busy)=> {
    return { 
      startDateTime: dayjs(busy.startDateTime),
      endDateTime: dayjs(busy.endDateTime),
      status: busy.status
    }
  });

  const isBusy = listingBusy.find((busy) => { 
    return ( 
      today >= busy.startDateTime &&
      today <= busy.endDateTime
    )
  });

  const CurrentStatus = (
    isBusy 
    ? (isBusy.status === 'booked' ? Booked : Blocked) 
    : Available
  );

  const price = startDate && endDate && calculatePrice({
    pricePerHour: listing.pricePerHour,
    startDate: startDate,
    endDate: endDate
  });

  const selectorRangePicker = (
    <div className="selectorRangePicker listing">
      {( Boolean(price) 
        ? <div> Precio de reserva {price}€ </div>
        : <div> Introduzca las fechas de reserva </div>
      )}

      <RangePicker
        label="Inicio"
        value={startDate}
        minDateTime={dayjs()}
        maxDateTime={endDate && endDate}
        onChange={(startDateEv)=>{ return (setStartDate(startDateEv), startDateEv) }}
        // onChange={(startDateEv)=>{ return setMessageError("No puede tener una fecha final inferior a la inicial") }}
        setMessageError={setMessageError}
      />
      <RangePicker
        label="Fin"
        value={endDate}
        disabled={Boolean(startDate) === false}
        minDateTime={startDate}
        onChange={(endDateEv)=>{ return (setEndDate(endDateEv), endDateEv) }}
        setMessageError={setMessageError}
      />
    </div>
  );

  return (<div className={`justifyCenter ${Boolean(selected)? 'w100': ''}`}>
    <ErrorMessage />
    <div 
      className={`pointer listing ${Boolean(selected)? 'selected w100': ''}`}
      onClick={()=>onClick(listing)}
      {...props}
    >
      <ShowKeyValue keyName="Descripcion" value={listing.listingName} />
      <ShowKeyValue keyName="Precio" value={listing.pricePerHour} />
      <ShowKeyValue keyName="Estado" valueChildren={CurrentStatus}/>

      <Button 
          style={{marginTop:"10px"}}
          variant="contained"
          disabled={ Boolean(startDate && endDate) == false }
          onClick={(event)=>fncOrder(event, listing.listingID)}
      >Reservar</Button>

    </div>
    { selected && selectorRangePicker }
    { selected && (
      <TextArea
        multiline
        placeholder="Descripcion de reserva..."
        value={description}
        onChange={(event)=>{setDescription(event.target.value)}}
      />
    )}
  </div>);
};