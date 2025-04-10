import { Suspense } from "react";
import { Metadata } from "next";

import { fetchFilteredInvoices, fetchInvoicesPages } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import { MuiDataGrid } from "@/app/components/mui-data-grid";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";

export const metadata: Metadata = {
  title: "Material UI",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalRows = (await fetchInvoicesPages(query)).totalRows;

  const invoices = await fetchFilteredInvoices(searchParams);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Material UI</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <MuiDataGrid data={invoices} rowCount={totalRows} />
      </Suspense>
    </div>
  );
}
