import TextField from '@mui/material/TextField';

export default function TextArea({
    label,
    value,
    onChange = ()=>{},
    defaultValue,
    size = 6,
    multiline,
    ...props
}) {

  return (
    <TextField
      className='listing'
      variant='standard'
      rows={size}
      label={label}
      multiline={multiline}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}