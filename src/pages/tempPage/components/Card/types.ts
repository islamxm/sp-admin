export interface ICard {
    id?: number | string
    label?: string,
    isAdd?: boolean,
    isCat?: boolean,
    data?: any

    onRoute?: (...args: any[]) => any,
    onSelect?: (...args: any[]) => any


    onAddCat?: (...args: any[]) => any,
    onAddTemplate?: (...args: any) => any
}