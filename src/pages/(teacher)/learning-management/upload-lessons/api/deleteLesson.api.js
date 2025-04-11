import { api } from "../../../../../lib/api-client";

export default async function deleteLesson(lesson_id) {
    return await api.delete(`/lesson/${lesson_id}`);
}