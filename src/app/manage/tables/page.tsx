import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DishTable from "@/app/manage/tables/table-table";
import { Suspense } from "react";
import { Metadata } from "next";
import envConfig from "@/config";

const url = `${envConfig.NEXT_PUBLIC_URL}/manage/tables`;

export const metadata: Metadata = {
  title: "Quản lý bàn ăn",
  description:
    "Quản lý và theo dõi trạng thái các bàn ăn trong nhà hàng. Xem thông tin chi tiết về đặt bàn, đơn hàng và trạng thái bàn.",
  alternates: {
    canonical: url,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TablesPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Bàn ăn</CardTitle>
            <CardDescription>Quản lý bàn ăn</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <DishTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
