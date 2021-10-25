import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PersonAddOutlined } from '@material-ui/icons';
import Button from 'components/CustomButtons/Button.js';
import PasswordField from 'components/form-control/PasswordField';
import PropTypes from 'prop-types';
import { default as React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { passwordRegex } from 'variables/constant';
import * as yup from 'yup';
import InputField from '../../../../components/form-control/InputField';

AddStaff.propTypes = {
  onSubmit: PropTypes.func,
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

function AddStaff(props) {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = useState(false);

  // Validation
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .required('Please enter your fullname.')
      .test('should have at least two words', 'Please enter at least two words.', (value) => {
        return value.split(' ').length >= 2;
      }),

    email: yup.string().required('Please enter your email.').email('Please enter a valid email.'),

    password: yup
      .string()
      .required('Please enter your password.')
      .matches(
        passwordRegex,
        'Please enter at least 6 characters, include at least 1 letter, 1 digit & 1 special character.'
      ),

    retypePassword: yup
      .string()
      .required('Please retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });

  // Handle form
  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }

    form.reset();

    setIsDisabled(true);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} color={'primary'} />}

      <Avatar className={classes.avatar}>
        <PersonAddOutlined></PersonAddOutlined>
      </Avatar>

      <Typography component="h3" variant="h5" className={classes.title}>
        Add New Staff
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullname" label="Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          disabled={isDisabled}
        >
          Add New Staff
        </Button>
      </form>
    </div>
  );
}

export default AddStaff;
