import { IconButton, InputAdornment, TextField } from "@mui/material";
import { MobileDateTimePicker , LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function RangePicker({
    label = "Range",
    value,
    onChange = ()=>{},
    disablePast = true,
    setMessageError= ()=>{},
    ...props
}) {
    const [innerValue, setInnerValue] = useState(null);
  
    // margen de 5 minutos
    const today = dayjs().add('5','minute')
    const isToday = value && (value.format('DD/MM/YYYY') === today.format('DD/MM/YYYY'))

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker 
            label={label}
            value={innerValue}
            disablePast={disablePast}
            minDateTime={disablePast && isToday && today}
            onChange={(newInnerValue)=>{ return setInnerValue(newInnerValue)}}
            onAccept={(accept)=>{ 
                
                if ( props.minDateTime && props.minDateTime.unix() > accept.unix()) return setInnerValue(null), onChange(null), setMessageError('Debe seleccionar una fecha valida')
                if ( props.maxDateTime && props.maxDateTime.unix() < accept.unix()) return setInnerValue(null), onChange(null), setMessageError('Debe seleccionar una fecha valida')
                return onChange(accept)

            }}
            renderInput={(params) => {
                params.InputProps.endAdornment = (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={(event)=>{ 
                                event.stopPropagation();
                                return setInnerValue(null), onChange(null)
                            }}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </InputAdornment>
                )
                return <TextField {...params} />
            }}
            {...props}
        />
    </LocalizationProvider>

}