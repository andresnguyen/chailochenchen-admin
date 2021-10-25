import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PersonAddOutlined } from '@material-ui/icons';
import Button from 'components/CustomButtons/Button.js';
import SelectField from 'components/form-control/SelectField';
import UpdatePasswordField from 'components/form-control/UpdatePasswordField';
import PropTypes from 'prop-types';
import { default as React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import UpdateInputField from '../../../../components/form-control/UpdateInputField';
import { passwordRegex } from 'variables/constant';

EditStaff.propTypes = {
  onSubmit: PropTypes.func,
  data: PropTypes.array,
  disabled: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.primary.main,
  },

  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },

  submit: {
    marginTop: theme.spacing(3),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(2),
    left: 0,
    right: 0,
  },
}));

function EditStaff(props) {
  const classes = useStyles();
  const { data } = props;

  const [isDisabled, setIsDisabled] = useState(true);
  const [loadingInputs, setLoadingInputs] = useState({
    fullname: false,
    password: false,
    active: false,
  });

  // Validation
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required('Please enter your fullname.')
      .test('should have at least two words', 'Please enter at least two words.', (value) => {
        return value.split(' ').length >= 2;
      }),

    password: yup
      .string()
      .required('Please enter your password.')
      .matches(
        passwordRegex,
        'Please enter at least 6 characters, include at least 1 letter, 1 digit & 1 special character.'
      ),
  });

  // Handle form
  const form = useForm({
    defaultValues: {
      fullname: data.fullname,
      password: data.password,
      active: data.active,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  // Handle onChange input
  const handleFullnameChange = (event) => {
    const value = event.target.value;
    form.setValue('fullname', value);
    setLoadingInputs({
      ...loadingInputs,
      fullName: value !== data.fullname,
    });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    form.setValue('password', value);
    setLoadingInputs({
      ...loadingInputs,
      password: value !== data.password,
    });
  };

  const handleActiveChange = (event) => {
    const value = event.target.value;
    form.setValue('active', value);
    setLoadingInputs({
      ...loadingInputs,
      active: value !== data.active,
    });
  };

  const updateIsDisabled = () => {
    setIsDisabled(!loadingInputs.fullname && !loadingInputs.password && !loadingInputs.active);
  };

  useEffect(() => {
    updateIsDisabled();
  }, [loadingInputs]);

  const { isSubmitting } = form.formState;

  return (
    <div>
      <div className={classes.root}>
        {isSubmitting && <LinearProgress className={classes.progress} color={'primary'} />}

        <Avatar className={classes.avatar}>
          <PersonAddOutlined></PersonAddOutlined>
        </Avatar>

        <Typography component="h3" variant="h5" className={classes.title}>
          Edit Staff
        </Typography>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <UpdateInputField
            name="fullname"
            label="Name"
            form={form}
            onChange={handleFullnameChange}
          />
          <UpdatePasswordField
            name="password"
            label="Password"
            form={form}
            onChange={handlePasswordChange}
          />
          <SelectField name="active" label="Active" form={form} onChange={handleActiveChange} />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submit}
            disabled={isDisabled}
          >
            Update Staff
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditStaff;
