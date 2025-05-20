import jwt from "jsonwebtoken";
import { TokenPayload } from "@/types/jwt.types";
import authApiRequest from "@/apiRequests/auth";
import guestApiRequest from "@/apiRequests/guest";
import { Role } from "@/constants/type";
import { jwtDecode } from "jwt-decode";

/**
 * Các hàm liên quan đến token chỉ sử dụng ở phía client hoặc server Node.js
 * KHÔNG sử dụng trong middleware hoặc Edge Runtime
 */

export const decodeJWT = (token: string) => {
  return jwtDecode(token) as TokenPayload;
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as TokenPayload;
};

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("accessToken") : null;
};

export const getRefeshTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("refreshToken") : null;
};

export const setAccessTokenFromLocalStorage = (accessToken: string) => {
  return isBrowser && localStorage.setItem("accessToken", accessToken);
};

export const setRefreshTokenFromLocalStorage = (refreshToken: string) => {
  return isBrowser && localStorage.setItem("refreshToken", refreshToken);
};

export const removeTokenFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("accessToken");
  isBrowser && localStorage.removeItem("refreshToken");
};

export const checkAndRefreshToken = async (params?: {
  onError?: () => void;
  onSuccess?: () => void;
  force?: boolean;
}) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefeshTokenFromLocalStorage();
  if (!accessToken || !refreshToken) return;
  const decodedAccessToken = jwt.decode(accessToken) as {
    exp: number;
    iat: number;
  };
  const decodedRefreshToken = decodeJWT(refreshToken);
  const now = new Date().getTime() / 1000 - 1;
  // trường hợp refreshToken hết hạn thì không sử lý nữa
  if (decodedRefreshToken.exp < now) {
    removeTokenFromLocalStorage();
    return params?.onError && params.onError();
  }
  // vi du accessToken co thoi gian het han la 10s
  // thi se kiem tra con 1/3s thoi gian het han cua accessToken se cho refresh lai
  //  thoi gian con lai se tinh dua tren cong thuc : decodedAccessToken.exp - now
  //  thoi gian het han cua accessToken dua tren cong thuc : decodedAccessToken.exp - decodedAccessToken.iat
  if (
    params?.force ||
    decodedAccessToken.exp - now <
      (decodedAccessToken.exp - decodedAccessToken.iat) / 3
  ) {
    try {
      const role = decodedRefreshToken.role;
      const res =
        role === Role.Guest
          ? await guestApiRequest.refreshToken()
          : await authApiRequest.refreshToken();
      setAccessTokenFromLocalStorage(res.payload.data.accessToken);
      setRefreshTokenFromLocalStorage(res.payload.data.refreshToken);
      params?.onSuccess && params.onSuccess();
    } catch (error) {
      params?.onError && params.onError();
    }
  }
};
