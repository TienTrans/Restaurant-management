import MenuOrder from "@/app/guest/menu/menu-order";
import envConfig from "@/config";
import { Metadata } from "next";

const url = `${envConfig.NEXT_PUBLIC_URL}/guest/menu`;

export const metadata: Metadata = {
  title: "Menu quán",
  description: "Menu quán",
  alternates: {
    canonical: url,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function MenuPage() {
  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">🍕 Menu quán</h1>
      <MenuOrder />
    </div>
  );
}
