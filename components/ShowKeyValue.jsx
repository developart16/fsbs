
export default function ShowKeyValue({
    keyName="key",
    value="value",
    valueChildren,
    keyChildren,
}) {
    
    
  return (
    <p>
      { keyChildren || <b> {keyName} </b> }
      { valueChildren || <span> {value} </span> }
    </p>
  );
    
};


