import { api } from "../../../lib/api-client";

export default async function login(credentials) {
    return await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
    }).then((res) => {
        return res.data
    })
}