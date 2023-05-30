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


    //category_id: number, parent_id: number
    getTemps = async (body: FormData) => {
        try {
            let res = await fetch(endpoints.getTemps, {
                method: 'POST',
                body
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

    addTemplate = async (body: FormData) => {
        try {
            let res = await fetch(endpoints.addTemp, {
                method: 'POST',
                body
            })
            return await res?.json()
        } catch(err) {
            console.log(err)
        }
    }

}


export default ApiService;