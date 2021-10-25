import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputField from 'components/form-control/InputField';
import SelectField from 'components/form-control/SelectField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddCategory.propTypes = {
  onAddCategory: PropTypes.func,
};

const schema = yup.object().shape({
  name: yup.string().required('Please enter name.'),
  status: yup.string().required('Please enter status'),
});

export default function AddCategory({ onAddCategory }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      status: 1,
    },
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    onAddCategory(values);
    setOpen(false);
  };
  const handleStatusChange = (event) => {
    const value = event.target.value;
    form.setValue('status', value);
  };
  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        onClick={handleClickOpen}
        style={{ color: 'white', background: '#9c27b0' }}
      >
        Add new category
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
          <Box width="600px">
            <form>
              <Box marginBottom="24px">
                <InputField name="name" placeholder="Category name" form={form} />
              </Box>
              <SelectField name="status" form={form} onChange={handleStatusChange} />
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            form="hook-form"
            onClick={() => {
              form.handleSubmit(handleSubmit)();
            }}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
