import React, {FC} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {Button} from "@mui/material";
import {MoneyDataModifiedType} from "../../types/axiosTypes";

interface IHeaderProps {
    currentMoney: string,
    handleChange: (e: SelectChangeEvent) => void,
    clearCurrentMoney: () => void,
    moneyData: MoneyDataModifiedType[]
}

const HeaderBlock:FC<IHeaderProps> = ({currentMoney, handleChange, moneyData, clearCurrentMoney}) => {
    return (
        <header className={'header'}>
            <FormControl variant={'standard'} sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-helper-label">Базовая валюта</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={currentMoney}
                    label="Current money"
                    onChange={handleChange}
                >
                    {moneyData?.map((el) => (
                        <MenuItem key={el[0]} value={el[0]}>{el[1]['Name']}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Выберите базовую валюту</FormHelperText>
            </FormControl>
            <Button variant="outlined" color={'inherit'}
                    onClick={clearCurrentMoney}>Сброс</Button>
        </header>
    );
};

export default HeaderBlock;