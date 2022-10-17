import styled from '@emotion/styled'
import { Add, ChangeCircleOutlined, LibraryBooksOutlined } from '@mui/icons-material'
import { Button, Tooltip, Typography } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Projet } from '../../../../entities/Projet'
import { ROUTES } from '../../../../routes'
import { BackdropLoader } from '../../../shared/Backdrop'
import { ButtonWithModal } from '../../../shared/ButtonModal'
import { getProjets } from '../../network'
import { ProjetForm } from '../ProjetForm/ProjetForm'

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin: 30px 0px;
  padding: 30px;
`

export const ProjetTable = () => {
  const router = useNavigate()
  const [projets, setProjets] = useState<Projet[]>([])
  const [loading, setLoading] = useState(true)
  const [exp, setProj] = useState<Projet>()

  useEffect(() => {
    getProjets().then((projets) => {
      setProjets(projets)
      setLoading(false)
    })
  }, [])

  const columns = [
    {
      field: 'nom',
      headerName: 'Nom',
      flex: 1,
    },
    {
      field: 'description',
      headerName: "Description",
      width: 200,
    },
    {
      field: 'state',
      headerName: 'Etat',
      flex: 1,
    },
    {
      field: 'auteur',
      headerName: 'Auteur',
      flex: 1,
    },
    {
      field: 'dateCreation',
      headerName: 'Date Création',
      flex: 1,
      valueGetter: function getDate(
        params: GridValueGetterParams<any, Projet>,
      ) {
        return new Date(params.row.dateCreation).toDateString()
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: (params: GridValueGetterParams<any, Projet>) => [
        <Tooltip title='Details'>
          <GridActionsCellItem
            icon={<LibraryBooksOutlined />}
            label='Detail'
            color='info'
            onClick={() =>
              router(ROUTES.EXPERT.DETAIL_CASE, { state: params.row })
            }
          />
        </Tooltip>,
        <Tooltip title='Changer Etat'>
        <GridActionsCellItem
          icon={<ChangeCircleOutlined />}
          label='Changer Etat'
          color='info'
          onClick={() =>
            router(ROUTES.EXPERT.DETAIL_CASE, { state: params.row })
          }
        />
      </Tooltip>,
      ],
    },
  ]

  return (
    <Container>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Projets
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

      <ButtonWithModal title={'Nouveau Projet'} buttonText={'Nouveau Projet'}>
            {(closeModal) => (
              <div style={{ width: 650 }}>
                <ProjetForm closeModal={closeModal} saveProjet={setProj} />
              </div>
            )}
          </ButtonWithModal>

        {/* <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => router(ROUTES.DASHBOARD)}
          sx={{ marginBottom: 2 }}
        >
          Nouveau Projet
        </Button> */}
      </div>

      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        rows={projets}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
        disableExtendRowFullWidth={true}
        autoHeight={true}
        autoPageSize={true}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-row:hover': {
            fontWeight: 450,
            boxShadow: 3,
          },
        }}
      />

      <BackdropLoader loading={loading} />
    </Container>
  )
}
