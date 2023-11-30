export interface IMoneyData {
    Date: string,
    PreviousDate: string,
    PreviousURL: string,
    TimeStamp: string,
    Valute: Record<string, IValute>
}

export interface IValute {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Previous: number,
    Value: number
}

export type MoneyDataModifiedType = [string, IValute, (string)?]