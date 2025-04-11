import { api } from "../../../../../lib/api-client";

export default async function editExercise(ex_id, question, answer, point) {
    return await api.post(`/edit/exercise/${ex_id}`, { question, answer, point })
        .catch((e) => {
            console.error("Không thể sửa bài tập");
        })
}