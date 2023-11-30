import React from 'react';
import {TableCell, TableHead, TableRow} from "@mui/material";

const TableHeader = () => {
    return (
        <TableHead>
            <TableRow sx={{color: 'red'}}>
                <TableCell align={'center'} sx={{fontWeight: 600}}>Избранное</TableCell>
                <TableCell align={'left'} sx={{fontWeight: 600}}>Валюта</TableCell>
                <TableCell align={'right'} sx={{fontWeight: 600}}>Единиц</TableCell>
                <TableCell align={'right'} sx={{fontWeight: 600}}>Буквенный код</TableCell>
                <TableCell align={'right'} sx={{fontWeight: 600}}>Курс</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;