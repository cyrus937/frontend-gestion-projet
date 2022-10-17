import styled from '@emotion/styled'
import { Save, Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    Button,
    Chip,
    IconButton,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Projet } from '../../../../entities/Projet'
import { User } from '../../../../entities/User'
import { BackdropLoader } from '../../../shared/Backdrop'
import { Notification, NotifType } from '../../../shared/Notification'
import { createProjet, getUser } from '../../network'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Line = styled.div`
  height: 127px;
  margin-right: 10px;
  margin-left: 10px;
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
      width: 250,
    },
  },
};

export const ProjetForm = ({
    saveProjet,
    closeModal,
}: {
    saveProjet: (ex: Projet) => void
    closeModal?: () => void
}) => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState<NotifType>()

    const defaultValue = {
        nom: '',
        description: '',
        state: 'PROPOSE',
        collaborateur: [],
        auteur: null,
    }

    const [formValues, setFormValues] = useState(defaultValue)

    const [users, setUsers] = useState<User[]>([])
    const [name, setName] = useState<string[]>([])

    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange1 = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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
                saveProjet(projet.User)
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
        setFormValues({ ...formValues, [name]: value })
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
                        </Container1>

                        <Line></Line>

                        <Container1>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                onChange={handleChange1}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {name.map((n) => (

                                    <MenuItem
                                        key={n}
                                        value={n}
                                    >
                                        {n}
                                    </MenuItem>
                                ))}
                            </Select>
                            {/* <TextField
                                required
                                label='Speciality'
                                name='specialty'
                                fullWidth
                                select
                                margin='dense'
                                value={formValues.collaborateur}
                                onChange={handleChange}
                                size='small'
                            >
                                {users.map((val) => (
                                    <MenuItem key={val.id} value={val}>
                                        {val.first_name + " " + val.first_name}
                                    </MenuItem>
                                ))}
                            </TextField> */}

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
