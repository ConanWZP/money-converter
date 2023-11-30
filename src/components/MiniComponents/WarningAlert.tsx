import React from 'react';
import {Alert, AlertTitle} from "@mui/material";

const WarningAlert = () => {
    return (
        <Alert severity="warning" className={'alert'}>
            <AlertTitle>Warning</AlertTitle>
            <strong>Валюты не найдены</strong>
        </Alert>
    );
};

export default WarningAlert;