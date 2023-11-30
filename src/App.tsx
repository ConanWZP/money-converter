import React, {useEffect, useState} from 'react';
import {SelectChangeEvent} from '@mui/material/Select';
import './App.css';
import axios from "axios";
import GeneralTable from "./components/Table/GeneralTable";
import Loader from "./components/MiniComponents/Loader";
import ErrorAlert from "./components/MiniComponents/ErrorAlert";
import HeaderBlock from "./components/Header/HeaderBlock";
import {IMoneyData, MoneyDataModifiedType} from "./types/axiosTypes";
import WarningAlert from "./components/MiniComponents/WarningAlert";

const App = () => {

    const [moneyData, setMoneyData] = useState<MoneyDataModifiedType[]>([])
    const [favoriteElements, setFavoriteElements] = useState<MoneyDataModifiedType[]>([])
    const [currentMoney, setCurrentMoney] = useState('');
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const handleChange = (event: SelectChangeEvent): void => {
        setCurrentMoney(event.target.value);
        localStorage.setItem('currentMoney', event.target.value)
    }

    const clearCurrentMoney = (): void => {
        setCurrentMoney('')
        localStorage.setItem('currentMoney', '')
    }
    const fetchData = async (): Promise<void> => {
        setIsLoading(true)
        try {
            const response = await axios.get<IMoneyData>('https://www.cbr-xml-daily.ru/daily_json.js')
            const parsedData = Object.entries(response.data['Valute'])

            const storedFavoriteElements: MoneyDataModifiedType[] = JSON.parse(localStorage.getItem("favoriteElements") as string) || [];
            setFavoriteElements(storedFavoriteElements)
            const storedFavoriteElementsOnlyNames = storedFavoriteElements.map((fav) => fav[1]['Name'])

            if (storedFavoriteElementsOnlyNames.length > 0) {
                const uniqMoneyData = parsedData.filter((el) => {
                    for (let i = 0; i <= storedFavoriteElementsOnlyNames.length - 1; i++) {
                        if (el[1]['Name'] === storedFavoriteElementsOnlyNames[i]) {
                            return false
                        }
                    }
                    return el[1]['Name']
                })
                setMoneyData([...storedFavoriteElements, ...uniqMoneyData])
            } else {
                setMoneyData(parsedData)
            }
        } catch (e) {
            setIsError(true)
        }

    }

    const sortByFavoriteAndName = (element1: MoneyDataModifiedType, element2: MoneyDataModifiedType): number => {
        if (element1[2] === 'favorite' && element2[2] !== 'favorite') return -1
        if (element1[2] !== 'favorite' && element2[2] === 'favorite') return 1

        if (element1[1]['Name'] > element2[1]['Name']) return 1
        if (element1[1]['Name'] < element2[1]['Name']) return -1

        return 0
    }

    const checkIsFavorite = (id: string): boolean => {
        for (let i = 0; i < favoriteElements.length; i++) {
            if (favoriteElements[i][1]['ID'] === id) {
                // убирает статус 'favorite' с элемента в массиве всех элементов
                moneyData[i].pop()
                return true
            }
        }
        return false
    }
    const changeFavoriteStatus = (id: string): void => {
        // проверка: является ли элемент избранным
        const isAlreadyFavorite: boolean = checkIsFavorite(id)

        let newFavoriteElements: MoneyDataModifiedType[]
        if (isAlreadyFavorite) {
            newFavoriteElements = favoriteElements.filter(el => el[1]['ID'] !== id)
            setMoneyData(prevState => prevState.sort(sortByFavoriteAndName))
        } else {
            let favoriteElement: MoneyDataModifiedType[] = []
            for (let i = 0; i < moneyData.length; i++) {
                if (moneyData[i][1]['ID'] === id) {
                    // нашли необходимую валюту и убираем из массива, после поместим в начало массива
                    favoriteElement = moneyData.splice(i, 1)
                    // добавление метки favorite, чтобы при сортировке можно было отличить избранное от обычного
                    favoriteElement[0].push('favorite')

                    break
                }
            }
            console.log(favoriteElement)
            newFavoriteElements = [...favoriteElements, ...favoriteElement].sort((a, b) => a[1]['Name'].localeCompare(b[1]['Name']))

            setMoneyData(prevState => [...favoriteElement, ...prevState].sort(sortByFavoriteAndName))
        }
        setFavoriteElements(newFavoriteElements)
        localStorage.setItem('favoriteElements', JSON.stringify(newFavoriteElements))
    }

    useEffect(() => {
        fetchData().then(() => {
            setCurrentMoney(localStorage.getItem('currentMoney') || '')
        }).finally(() => {
            setIsLoading(false)
        })
    }, []);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className={'container'}>
            {
                isError ?
                    <ErrorAlert/>
                    :
                    moneyData.length > 0 ?
                        <>
                            <HeaderBlock currentMoney={currentMoney} handleChange={handleChange}
                                         clearCurrentMoney={clearCurrentMoney} moneyData={moneyData}/>
                            <GeneralTable data={moneyData} changeFavoriteStatus={changeFavoriteStatus}
                                          currentMoney={currentMoney}/>
                        </>
                        :
                        <WarningAlert/>
            }
        </div>
    )
}

export default App;
