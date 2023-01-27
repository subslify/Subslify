const FormRow = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  autocomplete = 'on',
  labelText,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText ?? name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        className='form-input'
        autoComplete={autocomplete}
      />
    </div>
  );
};
export default FormRow;
