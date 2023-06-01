import endpoints from "./endpoints";

const headers = {
    'Content-type': 'application/json'
}


class ApiService {


    //login: string, password: string
    login = async (body: FormData) => {
        try {
            let res = await fetch(endpoints.login, {
                method: 'POST',
                // headers,
                body
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getCats = async (token: any) => {
        try {
            let res = await fetch(endpoints.getCats, {
                method: 'POST',
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    //title: string, thumbnail_picture: file
    addCat = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.addCat, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    editCat = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.editCat, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    deleteCat = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.deleteCat, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    //category_id: number, parent_id: number
    getTemps = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.getTemps, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getTemp = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.getTemp, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    // data: {
    //     category_id: 1,
    //     parent_id: 0,
    //     archive_id: 1,
    //     title: "Согласие",
    //     inputs: [
    //       {
    //         id: 1,
    //         keyword: "{name}",
    //         name: "ФИО",
    //         data_type_id: 1,
    //         required: 1
    //       }
    //     ],
    //     employees: [
    //       {
    //         id: 1,
    //         employee_id: 1
    //       }
    //     ]
    //   }
    //thumbnail_picture: file
    //document_file: file

    addTemp = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.addTemp, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    editTemp = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.editTemp, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    deleteTemp = async (body: FormData, token: any) => {
        try {
            let res = await fetch(endpoints.deleteTemp, {
                method: 'POST',
                body,
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }


    getArchs = async (token: any) => {
        try {
            let res = await fetch(endpoints.getArchs, {
                method: 'POST',
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

    getEmps = async (token: any) => {
        try {
            let res = await fetch(endpoints.getEmps, {
                method: 'POST',
                headers: {
                    'Authorization': token
                }
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        } 
    }

    getInputsFromFile = async (body: FormData ,token: any) => {
        try {
            let res = await fetch(endpoints.getInputsFromFile, {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        } 
    }


    getDataTypes = async (token: any) => {
        try {
            let res = await fetch(endpoints.getDataTypes, {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
            })
            return await res?.json() 
        } catch(err) {
            console.log(err)
        }
    }
}


export default ApiService;