import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const ErrorAlert = () => {
    return (
        <Alert severity="error" className={'alert'}>
            <AlertTitle>Error</AlertTitle>
            <strong>Ошибка при загрузке данных</strong>
        </Alert>
    );
};

export default ErrorAlert;