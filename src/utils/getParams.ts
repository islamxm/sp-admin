const getParams = (params: URLSearchParams) => {
    if(params && params.get('path')) {
        return Object.fromEntries(params)?.path?.split('/')
    } else {
        return []
    }
}

export default getParams