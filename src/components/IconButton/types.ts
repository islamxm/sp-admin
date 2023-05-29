import { HTMLProps, ReactNode } from "react";

export interface IIconButton extends HTMLProps<HTMLButtonElement> {
    icon: ReactNode,
    variant?: iconButtonVariants
    iconSize?: number | string
}


export type iconButtonVariants = 'default' | 'danger' | 'black'