import React from 'react';
import {connect} from "react-redux";
import {login} from "../actions/auth";
import {Container, Typography, Button} from '@mui/material';
import Catalog from "./Catalog";
import axios from "axios";
import {Link} from "react-router-dom";

const Home = () => {

    return (
        <div>
            <Container maxWidth="md">
                <Typography variant="h2" gutterBottom>
                    Добро пожаловать в магазин автозапчастей Auto.Drem
                </Typography>

                <Typography variant="body1" paragraph>
                    В нашем магазине вы найдете широкий ассортимент автозапчастей для различных марок автомобилей.
                </Typography>

               <Catalog/>

                <Button component={Link}
                        to='/catalog'
                        variant="contained"
                        color="primary">
                    Перейти в каталог
                </Button>

                <Typography variant="body1" paragraph mt={2}>
                    Также вы можете оставить заявку на ремонт.
                </Typography>

                <Button
                    component={Link}
                    to='/repair'
                    variant="contained" color="primary">
                    Оставить заявку
                </Button>
            </Container>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Home);