import { iconButtonVariants } from "../IconButton/types"
export interface IIconLink extends React.HTMLProps<HTMLAnchorElement> {
    variant?: iconButtonVariants,
    icon?: React.ReactNode,
    iconSize?: number | string,
}