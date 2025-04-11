import { api } from "../../../../../lib/api-client";

export default async function deleteExercise(ex_id) {
    return await api.delete(`/delete/exercise/${ex_id}`)
        .catch((e) => {
            console.error("Không thể xóa bài tập", e)
        })
}