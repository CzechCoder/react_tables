"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DataGrid,
  GridColDef,
  GridPagination,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  TablePagination,
  IconButton,
  TablePaginationProps,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import MuiPagination from "@mui/material/Pagination";

import type { InvoicesTable } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";
import InvoiceStatus from "@/app/ui/invoices/status";

interface CustomPaginationProps {
  currentPage: number;
  rowCount: number;
  onPageChange: (page: number) => void;
}

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

// function CustomPagination({
//   currentPage,
//   rowCount,
//   onPageChange,
// }: CustomPaginationProps) {
//   const handlePageChange = () => {
//     console.log("page changed");
//   };
//   return (
//     <TablePagination
//       component="div"
//       count={rowCount}
//       page={currentPage}
//       rowsPerPage={6}
//       rowsPerPageOptions={[]}
//       onPageChange={handlePageChange}
//       ActionsComponent={(subProps) => (
//         <div className="flex items-center space-x-2">
//           <IconButton onClick={handlePageChange} disabled={currentPage === 0}>
//             <FirstPageIcon />
//           </IconButton>
//           <IconButton
//             onClick={handlePageChange}
//             disabled={currentPage >= Math.ceil(rowCount / 6) - 1}
//           >
//             <LastPageIcon />
//           </IconButton>
//         </div>
//       )}
//     />
//   );
// }

function CustomPagination({
  currentPage,
  rowCount,
  onPageChange,
}: CustomPaginationProps) {
  console.log("current page: " + currentPage);
  return (
    <MuiPagination
      color="primary"
      count={Math.ceil(rowCount / 6)}
      page={currentPage}
      onChange={(_, newPage) => {
        console.log("custom pag: " + newPage);
        onPageChange(newPage);
      }}
    />
  );
}

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
    console.log(pageNumber);
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
        pageSizeOptions={[]}
        paginationModel={paginationModel}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
        onPaginationModelChange={handleChangePagination}
        disableColumnFilter
        disableRowSelectionOnClick
        pagination
        slots={{ pagination: CustomPagination }}
        slotProps={{
          pagination: {
            currentPage,
            rowCount,
            onPageChange: changePage,
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
