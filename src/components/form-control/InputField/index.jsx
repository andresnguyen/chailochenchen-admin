import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  hasHelperText: PropTypes.bool
};

function InputField(props) {
  const { form, name, label, disabled, placeholder, hasHelperText } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ onChange, onBlur, value, name }) => (
        <TextField
          variant="outlined"
          fullWidth
          label={label}
          disabled={disabled}
          error={!!hasError}
          helperText={hasHelperText ? errors[name]?.message : null}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
}

export default InputField;
