import * as React from 'react'
import { makeStyles, ThemeProvider, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import TextField from '@material-ui/core/TextField'
import Hidden from '@material-ui/core/Hidden'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TeamDisplay from './TeamDisplay'
import theme from './theme'

interface SeedParams {
  afc1: string
  afc2: string
  afc3: string
  afc4: string
  afc5: string
  afc6: string
  afc7: string
  nfc1: string
  nfc2: string
  nfc3: string
  nfc4: string
  nfc5: string
  nfc6: string
  nfc7: string
}

const seeds: SeedParams = {
  afc1: 'KC',
  afc2: 'BUF',
  afc3: 'PIT',
  afc4: 'TEN',
  afc5: 'BAL',
  afc6: 'CLE',
  afc7: 'IND',
  nfc1: 'GB',
  nfc2: 'NO',
  nfc3: 'SEA',
  nfc4: 'WAS',
  nfc5: 'TB',
  nfc6: 'LAR',
  nfc7: 'CHI'
}

const seedKey = (conference: 'afc' | 'nfc', seed: 1 | 2 | 3 | 4 | 5 | 6 | 7): keyof SeedParams => {
  return `${conference}${seed}` as keyof SeedParams
}

interface FieldsParams {
  tieBreaker: number
  superBowl: string
  afcConference: string
  nfcConference: string
  afcDivisional1: string
  afcDivisional2: string
  nfcDivisional1: string
  nfcDivisional2: string
  afcWildCard1: string
  afcWildCard2: string
  afcWildCard3: string
  nfcWildCard1: string
  nfcWildCard2: string
  nfcWildCard3: string
}

const initialFields: FieldsParams = {
  tieBreaker: 0,
  superBowl: '',
  afcConference: '',
  nfcConference: '',
  afcDivisional1: '',
  afcDivisional2: '',
  nfcDivisional1: '',
  nfcDivisional2: '',
  afcWildCard1: '',
  afcWildCard2: '',
  afcWildCard3: '',
  nfcWildCard1: '',
  nfcWildCard2: '',
  nfcWildCard3: ''
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'
  },
  matches: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  textFieldContainer: {
    padding: theme.spacing(2, 1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%'
  },
  paper: {
    margin: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.main}`
  },
  legend: {
    fontSize: '0.85em',
    color: theme.palette.primary.main
  },
  label: {
    marginTop: `-${theme.spacing(4)}px`
  }
}))

const Bracket = () => {
  const classes = useStyles()

  const [entry, setEntry] = React.useState<any>(initialFields)

  const handleChange = (event: { persist: () => void; target: { name: string, value: string | number } }) => {
    event.persist()
    setEntry((entry: FieldsParams) => ({
      ...entry,
      [event.target.name]: event.target.value
    }))
  }

  const superBowlSeed = (rank: number) => {
    if (entry.afcConference && entry.nfcConference) {
      if (rank === 1) {
        return entry.nfcConference
      } else {
        return entry.afcConference
      }
    }
    return ''
  }

  const conferenceSeed = (conference: 'afc' | 'nfc', rank: 1 | 2 | 3 |4 | 5 | 6 | 7) => {

    if (entry[`${conference}Divisional1`] && entry[`${conference}Divisional2`]) {
      if (rank === 1) {
        if (entry[`${conference}Divisional1`] === seeds[seedKey(conference, 1)]) {
          return entry[`${conference}Divisional1`]
        } else {
          return entry[`${conference}Divisional2`]
        }
      } else if (rank === 2) {
        if (entry[`${conference}Divisional1`] === seeds[seedKey(conference, 1)]) {
          return entry[`${conference}Divisional2`]
        } else {
          return entry[`${conference}Divisional1`]
        }
      }
    }
    return ''
  }

  const divisionalSeed = (conference: 'afc' | 'nfc', rank: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    if (
      entry[`${conference}WildCard1`] &&
      entry[`${conference}WildCard2`] &&
      entry[`${conference}WildCard3`]
    ) {
      if (rank === 1) {
        return seeds[seedKey(conference, 1)]
      } else if (rank === 2) {
        if (entry[`${conference}WildCard3`] === seeds[seedKey(conference, 2)]) {
          return seeds[seedKey(conference, 2)]
        } else if (entry[`${conference}WildCard2`] === seeds[seedKey(conference, 3)]) {
          return seeds[seedKey(conference, 3)]
        } else {
          return entry[`${conference}WildCard1`]
        }
      } else if (rank === 3) {
        if (entry[`${conference}WildCard3`] === seeds[seedKey(conference, 7)]) {
          if (entry[`${conference}WildCard2`] === seeds[seedKey(conference, 6)]) {
            return seeds[seedKey(conference, 6)]
          } else {
            return entry[`${conference}WildCard1`]
          }
        } else {
          if (entry[`${conference}WildCard2`] === seeds[seedKey(conference, 3)]) {
            return seeds[seedKey(conference, 3)]
          } else {
            return entry[`${conference}WildCard1`]
          }
        }
      } else if (rank === 4) {
        if (entry[`${conference}WildCard3`] === seeds[seedKey(conference, 7)]) {
          return seeds[seedKey(conference, 7)]
        } else if (entry[`${conference}WildCard2`] === seeds[seedKey(conference, 6)]) {
          return seeds[seedKey(conference, 6)]
        } else {
          return entry[`${conference}WildCard1`]
        }
      }
    }
    return ''
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {entry ? (
        <form>
          <Grid container className={classes.root} spacing={1}>
            <Grid container wrap='nowrap'>
              <Grid container alignItems='center' direction='row'>
                <Grid item xs>
                  <Hidden mdUp implementation='css'>
                    <Typography variant='h4' align='center'>AFC</Typography>
                  </Hidden>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid container direction='column'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Wild Card
                          </FormLabel>
                          <RadioGroup
                            aria-label='afcWildCard1'
                            name='afcWildCard1'
                            value={entry.afcWildCard1}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.afc4}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc4} />}
                            />
                            <FormControlLabel
                              value={seeds.afc5}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc5} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Wild Card
                          </FormLabel>
                          <RadioGroup
                            aria-label='afcWildCard2'
                            name='afcWildCard2'
                            value={entry.afcWildCard2}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.afc3}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc3} />}
                            />
                            <FormControlLabel
                              value={seeds.afc6}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc6} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Wild Card
                          </FormLabel>
                          <RadioGroup
                            aria-label='afcWildCard3'
                            name='afcWildCard3'
                            value={entry.afcWildCard3}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.afc2}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc2} />}
                            />
                            <FormControlLabel
                              value={seeds.afc7}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc7} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid container direction='column'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Divisional
                          </FormLabel>
                          <RadioGroup
                            aria-label='afcDivisional1'
                            name='afcDivisional1'
                            value={entry.afcDivisional1}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.afc1}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.afc1} />}
                            />
                            <FormControlLabel
                              disabled={!divisionalSeed('afc', 4)}
                              value={divisionalSeed('afc', 4)}
                              control={<Radio />}
                              label={<TeamDisplay id={divisionalSeed('afc', 4)} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Divisional
                          </FormLabel>
                          <RadioGroup
                            aria-label='afcDivisional2'
                            name='afcDivisional2'
                            value={entry.afcDivisional2}
                            onChange={handleChange}>
                            <FormControlLabel
                              disabled={!divisionalSeed('afc', 2)}
                              value={divisionalSeed('afc', 2)}
                              control={<Radio />}
                              label={<TeamDisplay id={divisionalSeed('afc', 2)} />}
                            />
                            <FormControlLabel
                              disabled={!divisionalSeed('afc', 3)}
                              value={divisionalSeed('afc', 3)}
                              control={<Radio />}
                              label={<TeamDisplay id={divisionalSeed('afc', 3)} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid container direction='column'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Conference
                          </FormLabel>
                          <RadioGroup
                            aria-label='afcConference'
                            name='afcConference'
                            value={entry.afcConference}
                            onChange={handleChange}>
                            <FormControlLabel
                              disabled={!conferenceSeed('afc', 1)}
                              value={conferenceSeed('afc', 1)}
                              control={<Radio />}
                              label={<TeamDisplay id={conferenceSeed('afc', 1)} />}
                            />
                            <FormControlLabel
                              disabled={!conferenceSeed('afc', 2)}
                              value={conferenceSeed('afc', 2)}
                              control={<Radio />}
                              label={<TeamDisplay id={conferenceSeed('afc', 2)} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container alignItems='center' direction='row-reverse'>
                <Grid item xs>
                  <Hidden mdUp implementation='css'>
                    <Typography variant='h4' align='center'>NFC</Typography>
                  </Hidden>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid container direction='column'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Wild Card
                          </FormLabel>
                          <RadioGroup
                            aria-label='nfcWildCard1'
                            name='nfcWildCard1'
                            value={entry.nfcWildCard1}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.nfc4}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc4} />}
                            />
                            <FormControlLabel
                              value={seeds.nfc5}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc5} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Wild Card
                          </FormLabel>
                          <RadioGroup
                            aria-label='nfcWildCard2'
                            name='nfcWildCard2'
                            value={entry.nfcWildCard2}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.nfc3}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc3} />}
                            />
                            <FormControlLabel
                              value={seeds.nfc6}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc6} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Wild Card
                          </FormLabel>
                          <RadioGroup
                            aria-label='nfcWildCard3'
                            name='nfcWildCard3'
                            value={entry.nfcWildCard3}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.nfc2}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc2} />}
                            />
                            <FormControlLabel
                              value={seeds.nfc7}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc7} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid container direction='column'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Divisional
                          </FormLabel>
                          <RadioGroup
                            aria-label='nfcDivisional1'
                            name='nfcDivisional1'
                            value={entry.nfcDivisional1}
                            onChange={handleChange}>
                            <FormControlLabel
                              value={seeds.nfc1}
                              control={<Radio />}
                              label={<TeamDisplay id={seeds.nfc1} />}
                            />
                            <FormControlLabel
                              disabled={!divisionalSeed('nfc', 4)}
                              value={divisionalSeed('nfc', 4)}
                              control={<Radio />}
                              label={<TeamDisplay id={divisionalSeed('nfc', 4)} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Divisional
                          </FormLabel>
                          <RadioGroup
                            aria-label='nfcDivisional2'
                            name='nfcDivisional2'
                            value={entry.nfcDivisional2}
                            onChange={handleChange}>
                            <FormControlLabel
                              disabled={!divisionalSeed('nfc', 2)}
                              value={divisionalSeed('nfc', 2)}
                              control={<Radio />}
                              label={<TeamDisplay id={divisionalSeed('nfc', 2)} />}
                            />
                            <FormControlLabel
                              disabled={!divisionalSeed('nfc', 3)}
                              value={divisionalSeed('nfc', 3)}
                              control={<Radio />}
                              label={<TeamDisplay id={divisionalSeed('nfc', 3)} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid container direction='column'>
                    <Grid item xs>
                      <Paper className={classes.paper}>
                        <FormControl component='fieldset' className={classes.formControl}>
                          <FormLabel component='legend' className={classes.legend}>
                            Conference
                          </FormLabel>
                          <RadioGroup
                            aria-label='nfcConference'
                            name='nfcConference'
                            value={entry.nfcConference}
                            onChange={handleChange}>
                            <FormControlLabel
                              disabled={!conferenceSeed('nfc', 1)}
                              value={conferenceSeed('nfc', 1)}
                              control={<Radio />}
                              label={<TeamDisplay id={conferenceSeed('nfc', 1)} />}
                            />
                            <FormControlLabel
                              disabled={!conferenceSeed('nfc', 2)}
                              value={conferenceSeed('nfc', 2)}
                              control={<Radio />}
                              label={<TeamDisplay id={conferenceSeed('nfc', 2)} />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='row' justify='center'>
              <Grid item xs={12} md={4}>
                <Hidden mdUp implementation='css'>
                  <Typography variant='h4' align='center'>Super Bowl</Typography>
                </Hidden>
                <Paper className={classes.paper}>
                  <FormControl component='fieldset' className={classes.formControl}>
                    <FormLabel component='legend' className={classes.legend}>
                      Super Bowl
                    </FormLabel>
                    <RadioGroup
                      aria-label='superBowl'
                      name='superBowl'
                      value={entry.superBowl}
                      onChange={handleChange}>
                      <FormControlLabel
                        disabled={!superBowlSeed(1)}
                        value={superBowlSeed(1)}
                        control={<Radio />}
                        label={<TeamDisplay id={superBowlSeed(1)} />}
                      />
                      <FormControlLabel
                        disabled={!superBowlSeed(2)}
                        value={superBowlSeed(2)}
                        control={<Radio />}
                        label={<TeamDisplay id={superBowlSeed(2)} />}
                      />
                    </RadioGroup>
                    <div className={classes.textFieldContainer}>
                      <TextField
                        disabled={superBowlSeed(1) === '' || superBowlSeed(2) === ''}
                        type='number'
                        name='tieBreaker'
                        label='Total Combined Score (Tie Breaker)'
                        variant='outlined'
                        value={entry.tieBreaker}
                        onChange={e => {
                          setEntry({
                            ...entry,
                            tieBreaker: e.target.value
                          })
                        }}
                        fullWidth
                      />
                    </div>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </form>
      ) : (
        <CircularProgress />
      )}
    </ThemeProvider>
  )
}

export default Bracket
