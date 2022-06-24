import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    CssBaseline,
    Container,
    Card,
    Grid,
    Button,
    TextField,
    Box,
    CircularProgress,
} from "@mui/material";
import {
    getAccount,
    getBalance,
    sellTokens,
    buyTokens,
    getAddressA,
    getAddressB,
} from "./dapp";

const App = () => {
    const [balance, setBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenAddrA, setTokenAddrA] = useState(getAddressA());
    const [tokenAddrB, setTokenAddrB] = useState(getAddressB());
    const [amtA, setAmtA] = useState(null);
    const [amtB, setAmtB] = useState(null);

    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const handleCheckBalance = async () => {
        const account = await getAccount();
        if (!account) {
            alert("Invalid account");
            return;
        }

        setIsLoading(true);
        setBalance(await getBalance(tokenAddrA, tokenAddrB, account));
        setIsLoading(false);
    };

    const handleBuyA = async () => {
        const account = await getAccount();
        if (!account) {
            alert("Invalid account");
            return;
        }
        if (!amtA) {
            alert("Invalid amount");
            return;
        }
        setIsLoading(true);
        const amtB = await buyTokens(amtA, tokenAddrA, tokenAddrB, account);
        console.log(`Bought ${amtA} of A for ${amtB} of B`);
        setIsLoading(false);
    };
    const handleBuyB = async () => {
        const account = await getAccount();
        if (!account) {
            alert("Invalid account");
            return;
        }
        if (!amtB) {
            alert("Invalid amount");
            return;
        }
        setIsLoading(true);
        const amtA = await buyTokens(amtB, tokenAddrB, tokenAddrA, account);
        console.log(`Bought ${amtB} of B for ${amtA} of A`);
        setIsLoading(false);
    };

    const handleSellA = async () => {
        const account = await getAccount();
        if (!account) {
            alert("Invalid account");
            return;
        }
        if (!amtA) {
            alert("Invalid amount");
            return;
        }
        setIsLoading(true);
        const amtB = await sellTokens(amtA, tokenAddrA, tokenAddrB, account);
        console.log(`Sold ${amtA} of A for ${amtB} of B`);
        setIsLoading(false);
    };

    const handleSellB = async () => {
        const account = await getAccount();
        if (!account) {
            alert("Invalid account");
            return;
        }
        if (!amtB) {
            alert("Invalid amount");
            return;
        }
        setIsLoading(true);
        const amtA = await sellTokens(amtB, tokenAddrB, tokenAddrA, account);
        console.log(`Sold ${amtB} of B for ${amtA} of A`);
        setIsLoading(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container>
                    <h1>DEX DAPP</h1>
                    <h2>Liquidity Pool</h2>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <TextField
                            id='tokenAddrA'
                            label='TokenA Address'
                            value={tokenAddrA}
                            sx={{ width: "500px" }}
                            onChange={(e) => {
                                setTokenAddrA(e.target.value);
                            }}
                        ></TextField>{" "}
                        <TextField
                            id='tokenAddrB'
                            label='TokenB Address'
                            value={tokenAddrB}
                            sx={{ width: "500px" }}
                            onChange={(e) => {
                                setTokenAddrB(e.target.value);
                            }}
                        ></TextField>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button onClick={handleCheckBalance}>Check</Button>
                        )}
                    </Box>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <div>
                                <h3>Token Balance:</h3>
                                <Card>
                                    <ul>
                                        <li>TokenA: {balance?.balanceA}</li>
                                        <li>TokenB: {balance?.balanceB}</li>
                                        <li>Liquidity: {balance?.liquidity}</li>
                                    </ul>
                                </Card>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <h3>Pool Reserves:</h3>
                                <Card>
                                    <ul>
                                        <li>TokenA: {balance?.reservesA}</li>
                                        <li>TokenB: {balance?.reservesB}</li>
                                    </ul>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <h2>Token Swap</h2>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            mb: 2,
                        }}
                    >
                        <TextField
                            id='amtA'
                            label='TokenA Amount'
                            onChange={(e) => {
                                setAmtA(e.target.value);
                            }}
                        ></TextField>
                        <Button onClick={handleBuyA}>Buy</Button>
                        <Button onClick={handleSellA}>Sell</Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                            mb: 2,
                        }}
                    >
                        <TextField
                            id='amtB'
                            label='TokenB Amount'
                            onChange={(e) => {
                                setAmtB(e.target.value);
                            }}
                        ></TextField>
                        <Button onClick={handleBuyB}>Buy</Button>
                        <Button onClick={handleSellB}>Sell</Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default App;
