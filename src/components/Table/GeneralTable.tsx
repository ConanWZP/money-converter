import React, {FC} from 'react';
import {TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface ITableProps {
    data: any
}

const tableHeadData: string[] = ['Избранное', 'Валюта', 'Единиц', 'Буквенный код', 'Курс']
const GeneralTable:FC<ITableProps> = ({data}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{color: 'red'}}>
                        <TableCell align={'center'} sx={{fontWeight: 600}}>Избранное</TableCell>
                        <TableCell align={'left'} sx={{fontWeight: 600}}>Валюта</TableCell>
                        <TableCell align={'right'} sx={{fontWeight: 600}}>Единиц</TableCell>
                        <TableCell align={'right'} sx={{fontWeight: 600}}>Буквенный код</TableCell>
                        <TableCell align={'right'} sx={{fontWeight: 600}}>Курс</TableCell>
                        {/*{
                            tableHeadData.map((cell: string) => (
                                <TableCell key={cell} align={'right'} sx={{fontWeight: 600}}>{cell}</TableCell>
                            ))
                        }*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.map((row: any) => (
                            <TableRow key={row[0]}>
                                <TableCell align={'center'}><StarIcon/></TableCell>
                                <TableCell>{row[1]['Name']}</TableCell>
                                <TableCell align={'right'}>{row[1]['Nominal']}</TableCell>
                                <TableCell align={'right'}>{row[1]['CharCode']}</TableCell>
                                <TableCell align={'right'}>1.1545</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GeneralTable;