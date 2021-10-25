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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

EditCategory.propTypes = {
  category: PropTypes.object,
  onEditCategory: PropTypes.func,
  index: PropTypes.number,
};
const schema = yup.object().shape({
  name: yup.string().required('Please enter name.'),
  status: yup.string().required('Please enter status'),
});

export default function EditCategory({ category, onEditCategory, index }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: category.name,
      status: category.status,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(category);
    form.reset(category);
  }, [category]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    const payload = { values, index, categoryId: category._id };
    onEditCategory(payload);
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    form.setValue('status', value);
  };
  return (
    <div>
      <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
        Edit Category
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Category</DialogTitle>
        <DialogContent>
          <Box width="600px">
            <form>
              <Box marginBottom="24px">
                <InputField name="name" placeholder="Name" form={form} />
              </Box>
              <SelectField
                name="status"
                placeholder="Status"
                form={form}
                onChange={handleStatusChange}
              />
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
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
