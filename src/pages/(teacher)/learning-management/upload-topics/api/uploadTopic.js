import { api } from "../../../../../lib/api-client";

export default async function uploadTopic(data) {
    return api.post("/upload", {
        topic_name: data.topic_name,
        description: data.description,
        image: data.image,
        level: data.level
    })
};

