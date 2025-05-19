import OrderTable from "@/app/manage/orders/order-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";
import envConfig from "@/config";
import { Metadata } from "next";

const url = `${envConfig.NEXT_PUBLIC_URL}/manage/orders`;

export const metadata: Metadata = {
  title: "Quản lý đơn hàng",
  description:
    "Quản lý và theo dõi tất cả các đơn hàng đã được đặt trong nhà hàng.",
  alternates: {
    canonical: url,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AccountsPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Đơn hàng</CardTitle>
            <CardDescription>Quản lý đơn hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <OrderTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
