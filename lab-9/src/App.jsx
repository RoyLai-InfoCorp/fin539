import React, { useState, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    CssBaseline,
    Container,
    Grid,
    Button,
    TextField,
    CircularProgress,
} from "@mui/material";
import { distill, getChroniumBalance, getTimeBalance} from './dapp.js';

const App = () => {
    const [chroniumBalance,setChroniumBalance] = useState(0);
    const [timeBalance,setTimeBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleDistill = async (e)=>{
        setIsLoading(true);
        await distill(timeBalance);
        setIsLoading(false);
    }
    const handleCheckBalance = async (e)=>{
        setIsLoading(true);
        let balanceA = await getChroniumBalance();
        setChroniumBalance(balanceA);
        let balanceB = await getTimeBalance();
        setTimeBalance(balanceB);
        setIsLoading(false);
    }

    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <h1>Lab 9 - DAPP</h1>
                    <h2>Chronium Balance</h2>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid item xs={1}>
                            Chronium:
                        </Grid>
                        <Grid item xs={3}>
                            <TextField value={chroniumBalance}/>
                        </Grid>
                        <Grid item xs={1}>
                            Time:
                        </Grid>
                        <Grid item xs={3}>
                            <TextField value={timeBalance}/>
                        </Grid>
                        {isLoading ? (<Grid item xs={4}><CircularProgress /></Grid>) : (
                            <>
                            <Grid item xs={2} >
                                <Button variant='contained' onClick={handleCheckBalance}>Balance</Button>
                            </Grid>
                            <Grid item xs={2} >
                                <Button variant='contained' onClick={handleDistill}>Distill</Button>
                            </Grid>
                            </>
                        )}
                    </Grid>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default App;
