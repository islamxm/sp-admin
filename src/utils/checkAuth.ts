import LOCAL_STORAGE from "./localStorage"

const checkAuth = async (response: Response) => {
    if(response.status === 401) {
        LOCAL_STORAGE.removeItem('sochi-park-admin-token')
        window.location.replace(window.location.origin + '/auth')
    } else {
        return response.json()
    }
}

export default checkAuth;