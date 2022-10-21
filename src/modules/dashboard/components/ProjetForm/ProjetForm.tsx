import styled from '@emotion/styled'
import { Save, Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    Button,
    Chip,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Projet } from '../../../../entities/Projet'
import { User } from '../../../../entities/User'
import { UserStateType } from '../../../../redux/userStore/reducer'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createProjet, getUser } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const ProjetForm = ({
    saveProjet,
    closeModal,
    proj,
}: {
    saveProjet: (ex: Projet) => void
    closeModal?: () => void
    proj?: Projet
}) => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<NotifType>()
    const connectedUser: UserStateType = useSelector(
        (state: any) => state.userReducer,
      ).user

    const [r, setR] = useState<User[]>([])
    let usr = {
        id: connectedUser.id,
        last_name: connectedUser.last_name,
        first_name: connectedUser.first_name,
        phone_number: connectedUser.phone_number,
        sex: connectedUser.sex,
        poste: connectedUser.poste,
        year_of_birth: connectedUser.year_of_birth,
        email: connectedUser.email,
        username: connectedUser.username,
        password: connectedUser.password,
        admin: connectedUser.admin,
        dateCreation: connectedUser.dateCreation,
    }

    const defaultValue = {
        nom: '',
        description: '',
        state: 'PROPOSE',
        collaborateur: r,
        dateCreation: new Date(),
        auteur: usr,
    }

    const [formValues, setFormValues] = useState(defaultValue)

    const [users, setUsers] = useState<User[]>([])

    const [personName, setPersonName] = useState<any[]>([]);


    useEffect(() => {
        getUser().then((users) => {
            setUsers(users)
        })
        
    }, [])

    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault()
        await createProjet(formValues)
            .then((projet) => {
                console.log('then -> ', projet)
                saveProjet(projet)
                setResponse({ type: 'success', message: 'Saved with success' })
                setLoading(false)
                closeModal?.()
            })
            .catch((response) => {
                console.log('catch', response)
                setResponse({ type: 'error', message: 'Error occured' })
                setLoading(false)
            })
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target
        if (name === "collaborateur"){
            setFormValues({...formValues, [name]: users.filter((item, index) => index in value)})
            setPersonName(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
              );
        }
        else{
            setFormValues({ ...formValues, [name]: value })
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Container1>
                    <Container>
                        <Container1>
                            <TextField
                                required
                                label='Nom'
                                name='nom'
                                fullWidth
                                margin='dense'
                                value={formValues.nom}
                                onChange={handleChange}
                                size='small'
                            />
                            <TextField
                                required
                                label='Description'
                                name='description'
                                fullWidth
                                margin='dense'
                                value={formValues.description}
                                onChange={handleChange}
                                size='small'
                            />        
                            <Select
                                size='small'
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                label='Collaborateurs'
                                name='collaborateur'
                                multiple
                                placeholder='Collaborateurs'
                                style={{width:300}}
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Collaborateurs" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={users[Number(value)].first_name + " " + users[Number(value)].last_name} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {users.map((user, index) => (

                                    <MenuItem
                                        key={index.toString()}
                                        value={index}
                                    >
                                        {user.first_name + " " + user.last_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Button
                                variant='outlined'
                                fullWidth
                                startIcon={<Save />}
                                sx={{ marginTop: 1.1 }}
                                type='submit'
                            >
                                Enregistrer
                            </Button>
                            </Container1>
                        </Container>
                </Container1>
            </form>
            <Notification notif={response} />
            <BackdropLoader loading={loading} />
        </Container>
    )
}
