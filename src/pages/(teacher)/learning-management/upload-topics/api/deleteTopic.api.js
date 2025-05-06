import { api } from "../../../../../lib/api-client";

export default async function deleteTopic(topic_id) {
    return await api.delete(`/${topic_id}`)
}