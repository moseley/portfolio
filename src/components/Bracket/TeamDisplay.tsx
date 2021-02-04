import * as React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

interface TeamParams {
  id: string
  seed: number
  conference: string
  city: string
  name: string
  logo: string
}

const teams: TeamParams[] = [
  { id: 'BAL', seed: 5, conference: 'afc', city: 'Baltimore', name: 'Ravens', logo: '/logos/bal.svg' },
  { id: 'BUF', seed: 2, conference: 'afc', city: 'Buffalo', name: 'Bills', logo: '/logos/buf.svg' },
  { id: 'CHI', seed: 7, conference: 'nfc', city: 'Chicago', name: 'Bears', logo: '/logos/chi.svg' },
  { id: 'CLE', seed: 6, conference: 'afc', city: 'Cleveland', name: 'Browns', logo: '/logos/cle.svg' },
  { id: 'GB', seed: 1, conference: 'nfc', city: 'Green Bay', name: 'Packers', logo: '/logos/gb.svg' },
  { id: 'IND', seed: 7, conference: 'afc', city: 'Indianapolis', name: 'Colts', logo: '/logos/ind.svg' },
  { id: 'KC', seed: 1, conference: 'afc', city: 'Kansas City', name: 'Chiefs', logo: '/logos/kc.svg' },
  { id: 'LAR', seed: 6, conference: 'nfc', city: 'Los Angeles', name: 'Rams', logo: '/logos/lar.svg' },
  { id: 'NO', seed: 2, conference: 'nfc', city: 'New Orleans', name: 'Saints', logo: '/logos/no.svg' },
  { id: 'PIT', seed: 3, conference: 'afc', city: 'Pittsburgh', name: 'Steelers', logo: '/logos/pit.svg' },
  { id: 'SEA', seed: 3, conference: 'nfc', city: 'Seattle', name: 'Seahawks', logo: '/logos/sea.svg' },
  { id: 'TB', seed: 5, conference: 'nfc', city: 'Tampa Bay', name: 'Buccaneers', logo: '/logos/tb.svg' },
  { id: 'TEN', seed: 4, conference: 'afc', city: 'Tennessee', name: 'Titans', logo: '/logos/ten.svg' },
  { id: 'WAS', seed: 4, conference: 'nfc', city: 'Washington', name: 'Football Team', logo: '/logos/was.jpg' }
]

export const teamById = (id: string) => teams.find(team => team.id === id)

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'flex-start',
    alignItems: 'center',
    fontSize: '0.8em'
  },
  imgContainer: {
    width: '24px',
    height: '24px',
    marginRight: theme.spacing(1)
  },
  img: {
    width: '24px',
    height: '24px',
    objectFit: 'fill'
  }
}))

const TeamDisplay = ({ id }: { id: string }) => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(true)
  const [team, setTeam] = React.useState<TeamParams | null>(null)
  React.useEffect(() => {
    const fetchTeam = async () => {
      const tempTeam: TeamParams | undefined = await teamById(id)
      if (tempTeam) {
        setTeam(tempTeam)
      }
      setLoading(false)
    }
    if (id) {
      fetchTeam()
    } else {
      setLoading(false)
    }
  }, [id])
  return loading ? (
    <CircularProgress color='secondary' size={14} />
  ) : (
    <>
      <div className={classes.row}>
        {team ? (
          <>
            <div className={classes.imgContainer}>
              <img alt={team.name} src={team.logo} className={classes.img} />
            </div>
            {/* {`${team.name} (${team.seed})`} */}
          </>
        ) : (
          <div>{'TBD'}</div>
        )}
      </div>
    </>
  )
}

export default TeamDisplay
