import { GridColDef } from "@mui/x-data-grid";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { InvoicesTable } from "@/app/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const makeMuiDatagridColumns = (): GridColDef<InvoicesTable>[] => {
  return [
    {
      field: "name",
      headerName: "Customer",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      description: "Month / Day / Year.",
      valueFormatter: ({ value }) => value && formatDateToLocal(value),
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 110,
      editable: true,
    },
  ];
};
