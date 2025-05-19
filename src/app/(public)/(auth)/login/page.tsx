import LoginForm from "@/app/(public)/(auth)/login/login-form";
import { Suspense } from "react";
import envConfig from "@/config";
import { Metadata } from "next";

const url = `${envConfig.NEXT_PUBLIC_URL}/login`;

export const metadata: Metadata = {
  title: {
    template: "%s | Đăng nhập",
    default: "Đăng nhập",
  },
  description: "Đăng nhập vào hệ thống",
  alternates: {
    canonical: url,
  },
};

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
