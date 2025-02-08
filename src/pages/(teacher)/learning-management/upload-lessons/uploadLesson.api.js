import { api } from "../../../../lib/api-client";

//Đăng tải bài học
export default async function uploadLesson(formData) {
    return api.post(`/lesson`, formData);
}
