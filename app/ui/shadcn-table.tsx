"use client";

import { useState, type FC } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { InvoicesTable } from "@/app/lib/definitions";
import { formatCurrency, formatDateToLocal } from "../lib/utils";
import InvoiceStatus from "./invoices/status";
import { Button } from "@mui/material";
import { SortIconBtn } from "./sort-icon-btn";

interface ShadCnTableProps {
  data: InvoicesTable[];
}

const columns: ColumnDef<InvoicesTable>[] = [
  {
    accessorKey: "name",
    header: () => (
      <>
        Customer
        <SortIconBtn field="name" />
      </>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <>
        Email
        <SortIconBtn field="email" />
      </>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <>
        Amount
        <SortIconBtn field="amount" />
      </>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
  {
    accessorKey: "date",
    header: () => (
      <>
        Date
        <SortIconBtn field="date" />
      </>
    ),
    cell: ({ row }) => formatDateToLocal(row.getValue("date")),
  },
  {
    accessorKey: "status",
    header: () => (
      <>
        Status
        <SortIconBtn field="status" />
      </>
    ),
    cell: ({ row }) => <InvoiceStatus status={row.getValue("status")} />,
  },
];

export const ShadCnTable: FC<ShadCnTableProps> = ({ data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  console.log(sorting);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border mt-6">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
