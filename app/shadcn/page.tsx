import { Suspense } from "react";
import { Metadata } from "next";

import { fetchFilteredInvoices, fetchInvoicesPages } from "@/app/lib/data";
import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import Pagination from "@/app/ui/invoices/pagination";
import { InvoicesTable } from "@/app/lib/definitions";
import { ShadCnTable } from "@/app/ui/shadcn-table";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";

export const metadata: Metadata = {
  title: "ShadCN",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = (await fetchInvoicesPages(query)).totalPages;

  const invoices: InvoicesTable[] = await fetchFilteredInvoices(searchParams);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>ShadCN</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <ShadCnTable data={invoices} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
