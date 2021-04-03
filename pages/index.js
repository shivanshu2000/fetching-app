import {
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const sdata = [
  { year: '2006' },
  { year: '2007' },
  { year: '2008' },
  { year: '2009' },
  { year: '2010' },
  { year: '2011' },
  { year: '2012' },
  { year: '2013' },
  { year: '2014' },
  { year: '2015' },
  { year: '2016' },
  { year: '2017' },
  { year: '2018' },
  { year: '2019' },
  { year: '2020' },
];

const useStyles = makeStyles((theme) => ({
  chips: {
    borderRadius: '3px',
    backgroundColor: '#9DFF8980',
    // padding: '5px',
    marginTop: '7px',
    marginBottom: '7px',
    [theme.breakpoints.up('sm')]: {
      // margin: '4px 8px 6px 6px',
    },

    [theme.breakpoints.down('xs')]: {
      // marginLeft: '14px',
      // marginRight: '14px',
    },
  },

  active: {
    backgroundColor: '#76BA1B',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    padding: '7px',
    marginTop: '9px',
    marginBottom: '9px',
    marginLeft: '5px',
    marginRight: '5px',
    [theme.breakpoints.up('sm')]: {
      width: '260px',
    },
  },

  leftContainer: {},
}));

export default function Home({ fetchedData }) {
  const classes = useStyles();
  const theme = useTheme();

  const router = useRouter();
  const [adata, setAData] = useState(fetchedData);
  const [urlParams, seturlParams] = useState({
    launch_year: router.query.launch_year ? router.query.launch_year : '',
    launch_success: router.query.launch_success
      ? router.query.launch_success
      : '',
    land_success: router.query.land_success ? router.query.land_success : '',
  });

  const fetchData = async (year, launch_success, land_success) => {
    const params = ['launch_year', 'launch_success', 'land_success'];
    console.log(urlParams['launch_year'], urlParams);
    const filteredParams = params
      .filter((param) => {
        if (urlParams[param] !== '') {
          console.log(param, urlParams[param]);
          return param;
        }
      })
      .map((param) => `${param}=${urlParams[param]}`)
      .join('&');

    const res = await fetch(
      `https://api.spacexdata.com/v3/launches?limit=100&${filteredParams}`
    );

    console.log(filteredParams);
    const route = filteredParams === '' ? '' : `?${filteredParams}`;
    router.push(route);
    const data = await res.json();
    setAData(data);
  };

  useEffect(() => {
    setAData([]);
    const launch_year = urlParams.launch_year;
    const launch_success = urlParams.launch_success;
    const land_success = urlParams.land_success;

    console.log(router);

    fetchData(launch_year, launch_success, land_success);
  }, [urlParams]);

  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  console.log(router);
  return (
    <Grid container direction="column">
      <Grid
        direction="row"
        item
        container
        justify="space-around"
        alignItems="flex-start"
        style={{ marginTop: '25px' }}
      >
        <Grid
          item
          container
          xs={10}
          ex={4}
          sm={2}
          justify="space-between"
          style={{ backgroundColor: '#fff', padding: '5px', height: 'auto' }}
        >
          <Grid item container direction="column" xs={12}>
            <Grid item>
              <Typography>
                <b>Filters</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center">Launch Year</Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Grid>

          {sdata.map((d, i) => (
            <Grid
              item
              // sm={4}
              xs={5}
              className={classes.chips}
              key={`${d.year}${i}`}
              className={
                router.query.launch_year === d.year
                  ? `${classes.active} ${classes.chips}`
                  : classes.chips
              }
            >
              <Typography
                align="center"
                onClick={() => {
                  seturlParams({ ...urlParams, launch_year: d.year });
                }}
                style={{
                  cursor: 'pointer',
                  padding: '5px',
                  fontSize: '14px',
                  fontWeight: 300,
                  fontColor: '#eee',
                }}
              >
                {d.year}
              </Typography>
            </Grid>
          ))}

          <Grid item container direction="column">
            <Grid item>
              <Typography align="center">Successful Launch</Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item container justify="space-between">
              <Grid
                item
                sm={4}
                xs={4}
                className={classes.chips}
                className={
                  router.query.launch_success === 'true'
                    ? `${classes.active} ${classes.chips}`
                    : classes.chips
                }
              >
                <Typography
                  align="center"
                  onClick={() => {
                    seturlParams({ ...urlParams, launch_success: 'true' });
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 300,
                    fontColor: '#eee',
                  }}
                >
                  True{' '}
                </Typography>
              </Grid>
              <Grid
                item
                sm={4}
                xs={4}
                className={classes.chips}
                className={
                  router.query.launch_success === 'false'
                    ? `${classes.active} ${classes.chips}`
                    : classes.chips
                }
              >
                <Typography
                  align="center"
                  onClick={() => {
                    seturlParams({ ...urlParams, launch_success: 'false' });
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 300,
                    fontColor: '#eee',
                  }}
                >
                  False
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container direction="column">
            <Grid item>
              <Typography align="center">Successful Landing</Typography>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item container justify="space-between">
              <Grid
                item
                sm={4}
                xs={4}
                className={classes.chips}
                className={
                  router.query.land_success === 'true'
                    ? `${classes.active} ${classes.chips}`
                    : classes.chips
                }
              >
                <Typography
                  align="center"
                  onClick={() => {
                    seturlParams({ ...urlParams, land_success: 'true' });
                  }}
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 300,
                    fontColor: '#eee',
                  }}
                >
                  True{' '}
                </Typography>
              </Grid>
              <Grid
                item
                sm={4}
                xs={4}
                className={classes.chips}
                className={
                  router.query.land_success === 'false'
                    ? `${classes.active} ${classes.chips}`
                    : classes.chips
                }
              >
                <Typography
                  align="center"
                  onClick={() =>
                    seturlParams({ ...urlParams, land_success: 'false' })
                  }
                  style={{
                    cursor: 'pointer',
                    padding: '5px',
                    fontSize: '14px',
                    fontWeight: 300,
                    fontColor: '#eee',
                  }}
                >
                  False
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={11}
          sm={9}
          justify={matchesMd ? 'space-around' : 'center'}
          style={{ backgroundColor: '#eee', width: '250px' }}
        >
          {adata?.map((d) => (
            <Grid
              item
              container
              // xs={3}
              xs={9}
              ex={6}
              sm={5}
              md={3}
              direction="column"
              className={classes.card}
            >
              <Grid item container>
                <Grid
                  item
                  component="img"
                  src={d.links.mission_patch}
                  width="100%"
                  height="150px"
                  style={{
                    backgroundColor: '#eee',
                    padding: '3px',
                  }}
                />
              </Grid>
              <Grid item style={{ marginTop: '10px' }}>
                {d.mission_name}
              </Grid>
              <Grid item>
                <b>Mission Ids:</b>
                {d.mission_id.map((id) => (
                  <li>{id}</li>
                ))}
              </Grid>
              <Grid item>
                <b>Launch Year:</b> {d.launch_year}
              </Grid>
              <Grid item>
                <b>Successful Launch:</b> {d.launch_success?.toString()}
              </Grid>
              <Grid item>
                <b>Successful Landing:</b> {d.launch_landing?.toString()}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item container justify="center" style={{ marginTop: '25px' }}>
        <Grid item style={{ fontSize: '15px' }}>
          <b>Developed by: </b> Shivanshu Sharma
        </Grid>
      </Grid>
    </Grid>
  );
}

Home.getInitialProps = async ({ query }) => {
  const string = Object.keys(query).map((key) => query[key]);
  console.log(query, string);
  const res = await fetch('https://api.spacexdata.com/v3/launches?limit=100');
  const fetchedData = await res.json();
  return { fetchedData: fetchedData };
};
