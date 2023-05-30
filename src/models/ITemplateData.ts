interface ITemplateData {
    category_id?: number,
    parent_id?: number,
    archive_id?: number,
    title?: string,
    inputs?: {
        id?: number,
        keyword?: string,
        name?: string,
        data_type_id?: number,
        required?: number
    }[],
    employees?: {
        id?: number,
        employee_id?: number
    }[]
} 

export default ITemplateData;