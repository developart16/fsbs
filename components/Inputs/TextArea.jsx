import TextField from '@mui/material/TextField';

export default function TextArea({
    value = "",
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
      multiline={multiline}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}