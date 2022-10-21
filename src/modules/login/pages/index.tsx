import styled from '@emotion/styled'
import {
  AccountCircle,
  ArrowForward,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../../redux/userStore/actions'
import { ROUTES } from '../../../routes/index'
import { PRIMARY } from '../../../shared/colors'
import { BackdropLoader } from '../../shared/Backdrop'
import { signIn } from '../network'
import { ThemeProvider } from '@emotion/react'
import { theme } from '../../..'
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
    height: 500px;

    .form-part {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      padding-top: 50px;
      border-radius: 60px;
      background-color: white;

      > h2 {
        font-size: 30px;
        color: ${PRIMARY};
        text-align: center;
        margin-bottom: 80px;
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

  // @media (min-width: 768px) {
  //   padding: 0px;
  //   .form-part > form {
  //     width: 400px;
  //   }
  // }
`

export const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useNavigate()

  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event: any) => {
    setLoading(true)
    event.preventDefault()
    await signIn(formValues.username, formValues.password).then((resp) => {
      setLoading(false)
      if (resp) {
        //const { User} = resp
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
            year_of_birth: resp.year_of_birth,
            admin: resp.admin,
            poste: resp.poste,
            password:resp.password,
            dateCreation:resp.dateCreation
          }),
        )
        router(ROUTES.DASHBOARD)
      }
    })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <>
      <Background>
        <Container>
          <div style={{ borderRadius: '60px' }}>
            <div className='form-part' >
              <h2>Sign In into your account</h2>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  label='Username'
                  name='username'
                  fullWidth
                  margin='normal'
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
                  margin='normal'
                  color='primary'
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

                  <Button variant='text' color='primary' style={{}} onClick={() => router(ROUTES.REGISTER)}>
                    Create an account
                  </Button>


                  <Button
                    variant='contained'
                    endIcon={<ArrowForward />}
                    type='submit'
                  >
                    Signin
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Background>

      <BackdropLoader loading={loading} />
    </>
  )
}
