import { api } from "../../../../lib/api-client";

export default async function editVocabulary(vocab_id, data) {
    return await api.post(`/edit/vocab/${vocab_id}`, data)
        .catch((e) => {
            console.error("Không thể sửa từ vựng", e);
            throw e;
        })
}