import { api } from "../../../../../lib/api-client";

export default async function uploadEx(data, lesson_id) {
    console.log(lesson_id)
    return api.post(`${lesson_id}/upload-ex`, { data });
}