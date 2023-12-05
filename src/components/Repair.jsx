import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
} from '@material-ui/core';
import Box from "@mui/material/Box";
import Chat from "./UI/Chat";
import {connect} from "react-redux";
import {create_repair, save_messages} from "../actions/service";
import {Paper, Typography} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
    },
}));

const Repair = ({username, password, is_staff, repair_id, state_messages, create_repair, save_messages}) => {
    const classes = useStyles();

    const [problem, setProblem] = useState('');
    const [isRepairCreated, setIsRepairCreated] = useState(true)
    const [requests, setRequests] = useState([])

    useEffect( () => {
        async function load_request() {
            const token = btoa(`${username}:${password}`);

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${token}`,
                }
            };

            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/service/repair-requests/`, config);
                setRequests(res.data)
            } catch (err) {
                console.log(`${err}`);
            }
        }
        load_request()
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblem(value);
    };

    const handleSave = () => {
        create_repair({username: username, password: password, problem: problem})
        if(isRepairCreated) setIsRepairCreated((prevIsRepairCreated) => !prevIsRepairCreated);
    };
    const handleOpen = () => {
        setIsRepairCreated((prevIsRepairCreated) => !prevIsRepairCreated);
    }

    if(is_staff){
        return (
            <div>
                {requests.map((request) => (
                    <Paper key={request.id} className={classes.paper} elevation={3}>
                        <Typography variant="h6" gutterBottom>
                            Заявка #{request.id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Проблема: {request.problem}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Дедлайн выполнения: {request.execution_deadline || 'Не указан'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Стоимость: {request.cost ? `${request.cost} руб.` : 'Не указана'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Исполнители: {request.employees.length > 0 ? request.employees.join(', ') : 'Нет'}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Услуги: {request.services.length > 0 ? request.services.join(', ') : 'Нет'}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleOpen}>
                            Открыть чат
                        </Button>
                        <Chat disable={isRepairCreated} username={username} repair_id={request.id} save_messages={save_messages} state_messages={state_messages}/>
                    </Paper>
                ))}
            </div>
        );
    }

    return (
        <Box
            sx={{
                width: "80%",
                position: 'absolute',
                top: '10%',
                left: '10%',
            }}
        >
            <Typography variant="h4" m={2} gutterBottom>
                Опишите вашу проблему
            </Typography>
            <TextField fullWidth label={'Описание проблемы'} id="margin-dense" margin="dense" onChange={handleChange}/>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Отправить
            </Button>
            <Chat disable={isRepairCreated} username={username} repair_id={repair_id} save_messages={save_messages} state_messages={state_messages}/>
        </Box>
    );
};

const mapStateToProps = state => ({
    username: state.auth.username,
    password: state.auth.password,
    is_staff: state.auth.is_staff,
    repair_id: state.service.repair_request,
    state_messages: state.service.messages,
});

export default connect(mapStateToProps, {create_repair, save_messages})(Repair);