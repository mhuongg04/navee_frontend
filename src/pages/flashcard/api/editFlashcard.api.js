import { api } from "../../../lib/api-client";

export default async function editFlashcard(flashcard_id, title, data) {
    return api.post(`/editflashcard/${flashcard_id}`, { title, data })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            console.error("Không thể sửa flashcard", error)
            return;
        })
}