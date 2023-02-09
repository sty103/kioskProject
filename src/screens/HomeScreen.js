import React from 'react';
import {Box, Card, CardActionArea, Typography} from '@material-ui/core';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { useStyles } from '../styles';
import Logo from '../components/Logo.js';


export default function HomeScreen(props) {
   
    const styles = useStyles();
    return (
        <Card>
            <CardActionArea onClick={() => props.history.push('/choose')}>
                <Box className={[styles.root, styles.red].join(" ")}>
                  <Box className={[styles.main, styles.center].join(" ")}>
                      <Typography component="h6" variant="h6">
                        Fast & Easy
                      </Typography>
                      <Typography component="h1" variant="h1">
                          Order <br /> & pay <br /> here
                      </Typography>
                      <TouchAppIcon fontSize="large"></TouchAppIcon>
                    </Box>
                    <Box className={[styles.center1, styles.green].join(" ")}>
                        <Logo large></Logo>
                        <Typography component="h5" variant="h5">
                          Touch to start
                        </Typography>
                    </Box>
              </Box>
          </CardActionArea>
      </Card>
    
      
    
  )
}
