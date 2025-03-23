import { UpdateInvoice, DeleteInvoice } from "@/app/ui/invoices/buttons";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import InvoiceStatus from "@/app/ui/invoices/status";
import type { InvoicesTable } from "@/app/lib/definitions";
import { SortIconBtn } from "./sort-icon-btn";

export default async function TailwindTable({
  data,
  searchParams,
}: {
  data: InvoicesTable[];
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
  };
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {data?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                  <SortIconBtn field="name" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                  <SortIconBtn field="email" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                  <SortIconBtn field="amount" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                  <SortIconBtn field="date" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                  <SortIconBtn field="status" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
