export interface IUploadFile extends React.HTMLProps<HTMLInputElement> {
    preview?: string,
    deleteFile?: (...args: any[]) => any
}