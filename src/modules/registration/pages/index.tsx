import styled from '@emotion/styled'
import { AccountCircle, ArrowForward, Mail, Phone, PhoneAndroid, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../redux/userStore/actions'
import { ROUTES } from '../../../routes'
import { PRIMARY } from '../../../shared/colors'
import { SEX } from '../../../shared/constants'
import { BackdropLoader } from '../../shared/Backdrop'
import { createLearner } from '../network'
import { Background } from '../../homePage/components/Background'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  border-radius: 20%;

  > div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    height: 700px;
    margin: 20px;

    .img-part {
      background-color: ${PRIMARY};
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 400px;
      padding: 20px;

      > h2 {
        font-size: 40px;
        text-align: center;
        color: white;
      }
    }

    .form-part {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px 20px 30px 20px;
      border-radius: 60px;
      background-color: white;

      > h2 {
        font-size: 30px;
        color: ${PRIMARY};
        text-align: center;
        // margin-bottom: 100px;
      }

      > form {
        background-color: white;
        width: 400px;
        border-radius: 5px;
        height: 250px;
        margin: 5px;
      }
    }
  }

  @media (min-width: 768px) {
    padding: 0px;
    > form {
      width: 400px;
    }
  }
`

export const RegistrationPage = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useNavigate()
  const defaultValue = {
    first_name: '',
    last_name: '',
    email: '',
    poste: '',
    phone_number: '',
    username: '',
    password: '',
    sex: '',
    year_of_birth: moment(new Date()),
    admin: 'false',
  }
  const [formValues, setFormValues] = useState(defaultValue)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    const dataToPost = {
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      poste: formValues.poste,
      phone_number: formValues.phone_number,
      username: formValues.username,
      password: formValues.password,
      sex: formValues.sex,
      year_of_birth: formValues.year_of_birth.format('YYYY-MM-DD'),
      admin: formValues.admin,
    }
    await createLearner(dataToPost).then((resp) => {
      if (resp) {
        dispatch(
          createUser({
            isConnected: true,
            id: resp.id,
            last_name: resp.last_name,
            first_name: resp.first_name,
            phone_number: resp.phone_number,
            email: resp.email,
            sex: resp.sex,
            username: resp.username,
            admin: resp.admin,
            poste: resp.poste,
            password: resp.password,
            dateCreation: resp.dateCreation,
          }),
        )
        router(ROUTES.DASHBOARD)
      }
      setLoading(false)
    })
  }

  const handleChange = (event: any) => {
    console.log(event.target.value)

    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const POSTES = [
    'Développeur Web',
    'Développeur Mobile',
    'Back-end',
    'Front-end',
    'Chef projet',
  ]

  return (
    <Background>
      <Container>
      <div style={{ borderRadius: '60px' }}>
        {/* <div className='img-part'>
          <h2>Welcome on Virtual Patient</h2>
        </div> */}
        <div className='form-part'>
          <h2>Create your account</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              label='First name'
              name='first_name'
              fullWidth
              margin='dense'
              value={formValues.first_name}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <AccountCircle style={{color:PRIMARY}}/>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              label='Last name'
              name='last_name'
              fullWidth
              margin='dense'
              value={formValues.last_name}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <AccountCircle style={{color:PRIMARY}}/>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              label='Email address'
              name='email'
              fullWidth
              margin='dense'
              type='email'
              value={formValues.email}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Mail style={{color:PRIMARY}}/>
                  </InputAdornment>
                ),
              }}
            />

            <Grid container style={{justifyContent:"space-between"}}>
              <Grid xs={5}>
                <TextField
                  required
                  label='Sex'
                  name='sex'
                  fullWidth
                  select
                  margin='dense'
                  value={formValues.sex}
                  onChange={handleChange}
                  size='small'
                >
                  {SEX.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid xs={6}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DesktopDatePicker
                    label='Date of birth'
                    value={formValues.year_of_birth}
                    maxDate={moment(new Date())}
                    inputFormat='YYYY-MM-DD'
                    onChange={(value) => {
                      if (value) {
                        setFormValues({
                          ...formValues,
                          year_of_birth: value,
                        })
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='date'
                        fullWidth
                        margin='dense'
                        size='small'
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Autocomplete
              freeSolo
              disableClearable
              options={POSTES}
              onChange={(event, value) =>
                setFormValues({ ...formValues, poste: value })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label='Poste'
                  name='poste'
                  fullWidth
                  margin='dense'
                  value={formValues.poste}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />

            <TextField
              required
              label='Contact'
              name='phone_number'
              fullWidth
              margin='dense'
              value={formValues.phone_number}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <PhoneAndroid style={{color:PRIMARY}}/>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              label='Username'
              name='username'
              fullWidth
              margin='dense'
              value={formValues.username}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <AccountCircle style={{color:PRIMARY}}/>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              label='Password'
              name='password'
              fullWidth
              margin='dense'
              type={showPassword ? 'text' : 'password'}
              value={formValues.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                      style={{color:PRIMARY}}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <Button variant='text' onClick={() => router(ROUTES.LOGIN)}>
                Signin now
              </Button>

              <Button
                variant='contained'
                endIcon={<ArrowForward />}
                type='submit'
              >
                Signup
              </Button>
            </div>
          </form>
        </div>
      </div>

      <BackdropLoader loading={loading} />
    </Container>
    </Background>
  )
}
