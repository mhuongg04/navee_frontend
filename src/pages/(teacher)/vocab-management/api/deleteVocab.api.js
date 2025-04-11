import { api } from "../../../../lib/api-client";

export default async function deleteVocabulary(vocab_id) {
    return await api.delete(`/delete/vocab/${vocab_id}`);
}