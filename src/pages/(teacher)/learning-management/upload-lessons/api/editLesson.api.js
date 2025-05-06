import { api } from "../../../../../lib/api-client";

export default async function editingLesson(lesson_id, formData) {
    return await api.post(`/edit/lesson/${lesson_id}`, formData);
}