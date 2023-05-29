import { HTMLProps } from "react";

export interface IInput extends HTMLProps<HTMLInputElement> {
    fill?: boolean
}