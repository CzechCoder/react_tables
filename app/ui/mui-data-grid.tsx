"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

import type { InvoicesTable } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import InvoiceStatus from "./invoices/status";

const columns: GridColDef<InvoicesTable>[] = [
  {
    field: "name",
    headerName: "Customer",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 110,
    valueGetter: (value) => {
      if (!value) {
        return value;
      }
      return formatCurrency(value);
    },
  },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    description: "Month / Day / Year.",
    valueFormatter: ({ value }: { value: Date }) =>
      dayjs(value).format("DD/MM/YYYY"),
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 110,
    renderCell: (params) => <InvoiceStatus status={params.value} />,
  },
];

export const MuiDataGrid = ({
  data,
  rowCount,
}: {
  data: InvoicesTable[];
  rowCount: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();

  const changePage = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const paginationModel = {
    pageSize: 6,
    page: currentPage - 1,
  };

  const handleChangePagination = ({
    page,
    pageSize,
  }: {
    pageSize: number;
    page: number;
  }) => {
    changePage(page + 1);
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    const params = new URLSearchParams(searchParams);
    if (sortModel.length === 0) {
      params.delete("sort");
    } else {
      params.set("sort", `${sortModel[0].field}_${sortModel[0].sort}`);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-6 w-full">
      <DataGrid
        rows={data}
        columns={columns}
        rowCount={rowCount}
        pageSizeOptions={[6]}
        paginationModel={paginationModel}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        onPaginationModelChange={handleChangePagination}
        disableColumnFilter
        disableRowSelectionOnClick
      />
    </div>
  );
};
