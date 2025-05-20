import { io } from "socket.io-client";
import envConfig from "@/config";

/**
 * Tạo một socket instance mới với token xác thực
 * Chỉ sử dụng ở phía client
 */
export const generateSocketInstace = (accessToken: string) => {
  return io(envConfig.NEXT_PUBLIC_API_ENDPOINT, {
    auth: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
