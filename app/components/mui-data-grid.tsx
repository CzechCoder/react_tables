"use client";

import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { usePathname, useSearchParams } from "next/navigation";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import type { InvoicesTable } from "@/app/lib/definitions";
import InvoiceStatus from "@/app/components/invoice-status";
import { formatCurrency } from "@/app/lib/utils";

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

const CustomPagination = (props: Partial<TablePaginationProps>) => {
  const { page, count, onPageChange } = props;
  return (
    <MuiPagination
      color="primary"
      showFirstButton
      showLastButton
      count={count}
      page={page}
      onChange={(_: any, newPage: number) => {
        onPageChange && onPageChange(_, newPage);
      }}
    />
  );
};

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

  const changePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const paginationModel = {
    pageSize: 6,
    page: currentPage - 1,
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
        pageSizeOptions={[]}
        paginationModel={paginationModel}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        onPaginationModelChange={({ pageSize, page }) => changePage(page + 1)}
        disableColumnFilter
        disableRowSelectionOnClick
        pagination
        slots={{ pagination: CustomPagination }}
        slotProps={{
          pagination: {
            page: currentPage,
            count: Math.ceil((rowCount || 0) / 6),
            onPageChange: (_: any, newPage: number) => changePage(newPage),
          },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: paginationModel.pageSize },
          },
        }}
      />
    </div>
  );
};
