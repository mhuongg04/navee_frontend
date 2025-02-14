import { api } from "../../../../../lib/api-client";

export default async function uploadTopic(formData) {
    return api.post("/upload", formData)
};

