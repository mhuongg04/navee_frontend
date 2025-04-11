import { api } from "../../../../../lib/api-client";
import { message } from "antd";

export default async function uploadTopic(formData) {
    try {
        const response = await api.post(`/upload`, formData);
        message.success("Tạo khóa học thành công", 2);
        return response.data;
    } catch (error) {
        message.success("Tạo khóa học thất bại: ", error);
        throw error;
    }
};

