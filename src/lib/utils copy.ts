import { toast } from "@/components/ui/use-toast";
import { EntityError } from "@/lib/http";
import { type ClassValue, clsx } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const handleErrorApi = ({
    error,
    setError,
    duration,
}: {
    error: any;
    setError?: UseFormSetError<any>;
    duration?: number;
}) => {
    if (error instanceof EntityError && setError) {
        error.payload.errors.forEach((items) => {
            setError(items.field, {
                type: "server",
                message: items.message,
            });
        });
    } else {
        toast({
            title: "Error",
            description: error?.payload?.message ?? "loi khong xac dinh",
            duration: duration ?? 3000,
        });
    }
};

// xoa di ky tu dau tien cua path
export const normalizePath = (path: string) => {
    return path.startsWith("/") ? path.slice(1) : path;
};

export const decodeJWT = <PayLoad = any>(token: string) => {
    return jwt.decode(token) as PayLoad;
};
