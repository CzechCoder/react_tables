import { InvoicesTableSkeleton } from "@/app/components/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";

import { fetchFilteredInvoices, fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/components/pagination";
import TailwindTable from "@/app/components/tailwind-table";
import Search from "@/app/components/search";
import { lusitana } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "TailwindCSS",
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

  const invoices = await fetchFilteredInvoices(searchParams);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>TailwindCSS</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <TailwindTable data={invoices} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
