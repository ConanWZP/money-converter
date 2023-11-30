import React, {FC, useMemo} from 'react';
import {TableBody, Table, TableContainer, Paper} from "@mui/material";
import RowTable from "./RowTable";
import TableHeader from "./TableHeader";
import {CurrentMoneyType} from "../../types/utilsTypes";
import {MoneyDataModifiedType} from "../../types/axiosTypes";

interface ITableProps {
    data: MoneyDataModifiedType[],
    changeFavoriteStatus: (e: string) => void,
    currentMoney: string
}

const GeneralTable: FC<ITableProps> = ({data, changeFavoriteStatus, currentMoney}) => {

    const currentMoneyData = useMemo((): CurrentMoneyType => {
        if (!!currentMoney) {
            const moneyDataElement = data.find((e) => e[0] === currentMoney)
            if (moneyDataElement) {
                return {
                    currentNominal: moneyDataElement[1]['Nominal'],
                    currentValue: moneyDataElement[1]['Value']
                } as CurrentMoneyType
            } else {
                return {
                    currentNominal: 1,
                    currentValue: 1
                }
            }
        } else {
            return {
                currentNominal: 1,
                currentValue: 1
            }
        }

    }, [currentMoney, data])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {
                        data?.map((row) => (
                            <RowTable key={row[0]} rowData={row[1]}
                                      changeFavoriteStatus={changeFavoriteStatus} isFav={!!row[2]}
                                      currentMoneyData={currentMoneyData}/>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GeneralTable;