import LOCAL_STORAGE from "./localStorage"

const checkAuth = async (response: any) => {
    if(response.error === true) {
        LOCAL_STORAGE.removeItem('sochi-park-admin-token')
        window.location.replace(window.location.origin + '/auth')
    } else {
        return response
    }
}

export default checkAuth;