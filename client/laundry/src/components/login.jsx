import React from 'react';
import { Button, TextField, Paper, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  };

  console.log('isAuth', isAuth);

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '30px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type='tel' // Изменено на tel
            id="phoneNumber" // Изменено на phoneNumber
            label="Номер телефона" // Изменено на Номер телефона
            name="phoneNumber" // Изменено на phoneNumber
            autoComplete="tel" // Изменено на tel
            autoFocus
            error={Boolean(errors.phoneNumber?.message)}
            helperText={errors.phoneNumber?.message}
            {...register('phoneNumber', {
              required: 'Укажите номер телефона',
            })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль' })}
          />
          <Button
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;