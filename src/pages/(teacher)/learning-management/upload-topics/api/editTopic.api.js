import { api } from "../../../../../lib/api-client";
import { message } from "antd";

export default async function editTopic(topic_id, formData) {
    try {
        const response = await api.post(`/edit/${topic_id}`, formData);
        message.success("Sửa khóa học thành công", 2);
        return response.data;
    } catch (error) {
        message.success("Sửa khóa học thất bại: ", error);
        throw error;
    }
}
