"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

import type { InvoicesTable } from "@/app/lib/definitions";

const columns: GridColDef<InvoicesTable>[] = [
  {
    field: "name",
    headerName: "Customer",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
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
    valueFormatter: ({ value }: { value: Date }) =>
      dayjs(value).format("DD/MM/YYYY"),
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
    console.log(sortModel);
    const params = new URLSearchParams(searchParams);
    if (sortModel.length === 0) {
      params.delete("sort");
    } else {
      params.set("sort", `${sortModel[0].field}_${sortModel[0].sort}`);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
