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

    

}


export default ApiService;