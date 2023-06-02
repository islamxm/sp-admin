export interface ICard {
    id?: number | string
    label?: string,
    isAdd?: boolean,
    isCat?: boolean,
    data?: any,

    placeholder?: string

    onRoute?: (...args: any[]) => any,
    onSelect?: (...args: any[]) => any


    onAddCat?: (...args: any[]) => any,
    onAddTemplate?: (...args: any) => any
}