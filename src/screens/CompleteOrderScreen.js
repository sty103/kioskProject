import React, { useContext, useEffect } from 'react'
import { createOrder } from '../actions';
import { Store } from '../Store';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import Logo from '../components/Logo';
import { Alert } from '@material-ui/lab';
import { useStyles } from '../styles';

export default function CompleteOrderScreen(props) {
    const styles = useStyles();
    const { state, dispatch } = useContext(Store);
    const { order } = state;
    const { loading, error, newOrder } = state.orderCreate;

    useEffect(() => {
        if(order.orderItems.length > 0) {
            createOrder(dispatch, order);
        }
    }, [order]);

  return(
  <Box className={[styles.root, styles.navy].join(" ")}>
      <Box className={[styles.main, styles.center].join(" ")}>
          <Box>
              <Logo large></Logo>
              {loading ? (
                  <CircularProgress></CircularProgress>
              ):error? (
                  <Alert severity="error">{error}</Alert>
              ): (
                  <>
                  <Typography
                  gutterBottom
                  className={styles.title}
                  variant="h3"
                  component="h3"
                  >
                      Your order has been placed
                  </Typography>
                  <Typography
                  gutterBottom
                  className={styles.title}
                  variant="h1"
                  component="h1"
                  >
                      Thank you!
                  </Typography>
                  <Typography
                  gutterBottom
                  className={styles.title}
                  variant="h3"
                  component="h3"
                  >
                      Your order number is {newOrder.number}
                  </Typography>
                  </>
              )}
          </Box>
          <Box className={[styles.center, styles.space].join(" ")}>
              <Button
              onClick={() => props.history.push('/')}
              variant="contained"
              color="primary"
              className={styles.largeButton}>
                  Order Again
              </Button>
          </Box>
      </Box>
  </Box>
  );
  }
