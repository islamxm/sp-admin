import { HTMLProps } from "react";

export interface IButton extends HTMLProps<HTMLButtonElement> {
    text: string,
    isRound?: boolean
    variant?: buttonVariants,
    fill?: boolean,
    type?: 'submit' | 'reset' | 'button',
    load?: boolean 
}

export type buttonVariants = 'blue' | 'danger' | 'black_bordered';