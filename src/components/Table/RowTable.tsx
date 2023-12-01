import React, {FC, useLayoutEffect, useState} from 'react';
import {TableCell, TableRow} from "@mui/material";
import {Star, StarBorder} from '@mui/icons-material';
import {CurrentMoneyType} from "../../types/utilsTypes";
import {IValute} from "../../types/axiosTypes";

interface IRowTable {
    rowData: IValute,
    changeFavoriteStatus: (e: string) => void,
    isFav: boolean,
    currentMoneyData: CurrentMoneyType
}

const RowTable: FC<IRowTable> = ({
                                     rowData,
                                     changeFavoriteStatus,
                                     isFav,
                                     currentMoneyData = {currentNominal: 1, currentValue: 1}
                                 }) => {

    const [isFavorite, setIsFavorite] = useState<boolean>(isFav)
    const [moneyRate, setMoneyRate] = useState<string>('0')

    useLayoutEffect(() => {
        if (!!currentMoneyData.currentNominal && !!currentMoneyData.currentValue) {
            setMoneyRate(((rowData['Value']) / (currentMoneyData.currentValue) * currentMoneyData.currentNominal).toFixed(4))
        } else {
            setMoneyRate((rowData['Value']).toFixed(4))
        }
        // eslint-disable-next-line
    }, [currentMoneyData])


    const changeFavorite = () => {
        setIsFavorite(prevState => !prevState)
        changeFavoriteStatus(rowData['ID'])
    }

    return (
        <TableRow>
            <TableCell align={'center'}>
                <div className={'star'} onClick={changeFavorite}>
                    {
                        isFavorite ?
                            <Star/>
                            :
                            <StarBorder/>
                    }
                </div>
            </TableCell>
            <TableCell>{rowData['Name']}</TableCell>
            <TableCell align={'right'}>{rowData['Nominal']}</TableCell>
            <TableCell align={'right'}>{rowData['CharCode']}</TableCell>
            <TableCell align={'right'}>{moneyRate}</TableCell>
        </TableRow>
    );
};

export default RowTable;