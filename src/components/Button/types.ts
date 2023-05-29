import { HTMLProps } from "react";

export interface IButton extends HTMLProps<HTMLButtonElement> {
    text: string,
    isRound?: boolean
    variant?: buttonVariants
}

export type buttonVariants = 'blue' | 'danger';