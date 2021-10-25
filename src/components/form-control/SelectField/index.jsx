import { MenuItem, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

function SelectField(props) {
  const { form, name, label, onChange, placeholder } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ value }) => (
        <Select MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null
        }} variant="outlined" label={label} placeholder={placeholder} value={value} onChange={onChange} fullWidth>
          <MenuItem value={0}>Inactive</MenuItem>
          <MenuItem value={1}>Active</MenuItem>
        </Select>
      )}
    />
  );
}

export default SelectField;
