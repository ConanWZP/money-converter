import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const InfoAlert = () => {
    return (
        <Alert severity="error" className={'error'}>
            <AlertTitle>Error</AlertTitle>
            <strong>Ошибка при загрузке данных</strong>
        </Alert>
    );
};

export default InfoAlert;