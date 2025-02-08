import { api } from "../../../lib/api-client";

export default async function signup(credentials) {
    return await api.post('/auth/signup', {
        firstname: credentials.firstname,
        lastname: credentials.lastname,
        email: credentials.email,
        password: credentials.password,
        role: credentials.role
    }).then((res) => {
        return res.data
    })
}


