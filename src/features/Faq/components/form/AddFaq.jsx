import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MDEditor from '@uiw/react-md-editor';
import InputField from 'components/form-control/InputField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

AddFaq.propTypes = {
  categories: PropTypes.array,
  onAddFaq: PropTypes.func,
};

const schema = yup.object().shape({
  question: yup
    .string()
    .required('Please enter question.')
    .min(10, 'Requires at least 10 characters'),
  answer: yup
    .string()
    .required('Please enter answer')
    .min(10, 'Answer and question requires at least 10 characters'),
  categoryId: yup.string().required('Please enter category'),
});

export default function AddFaq({ categories, onAddFaq }) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      question: '',
      answer: '',
      categoryId: null,
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
    onAddFaq(values);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ color: 'white', background: '#9c27b0' }}
      >
        Add new
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New FAQ</DialogTitle>
        <DialogContent>
          <Box width="800px">
            <form>
              <Box display="flex" alignItems="center" marginBottom="12px">
                <InputField name="question" placeholder="Question" form={form} />
                <Controller
                  name="categoryId"
                  control={form.control}
                  render={() => (
                    <Autocomplete
                      id="asynchronous-demo"
                      style={{ width: 300, marginLeft: 12 }}
                      getOptionSelected={(option, value) => option._id === value._id}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) =>
                        form.setValue('categoryId', value ? value._id : null)
                      }
                      options={categories}
                      closeIcon={false}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!form.errors['categoryId']}
                          label="Category"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                />
              </Box>

              <Controller
                name="answer"
                control={form.control}
                render={(field) => <MDEditor {...field} height="400" tabSize={4} preview="edit" />}
              />
              {form.errors['answer'] && (
                <FormHelperText error={!!form.errors['answer']}>
                  {form.errors['answer'].message}
                </FormHelperText>
              )}
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
