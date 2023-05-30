const LOCAL_STORAGE = localStorage

interface I {
    token: string | null,
}

const initState:I = {
    token: LOCAL_STORAGE?.getItem('sochi-park-admin-token') ? LOCAL_STORAGE.getItem('sochi-park-admin-token') : null,

}

export default initState;