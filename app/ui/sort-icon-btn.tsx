"use client";

import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FC } from "react";

type SortIconBtnProps = {
  field: string;
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
  };
};

export const SortIconBtn: FC<SortIconBtnProps> = ({ field, searchParams }) => {
  const pathname = usePathname();
  const router = useRouter();

  const sortField = searchParams?.sort?.split("_")[0] || "";
  const sortOrder = searchParams?.sort?.split("_")[1];
  const isMatchingField = sortField === field;

  const handleSortModelChange = () => {
    const params = new URLSearchParams(searchParams);
    // if the field is already in the params
    if (sortField === field) {
      // if it has been clicked once already
      if (sortOrder === "asc") {
        params.set("sort", `${sortField}_desc`);
        // if it has been clicked twice already
      } else if (sortOrder === "desc") {
        params.delete("sort");
      }
    } else {
      params.set("sort", `${field}_asc`);
    }

    console.log(params);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <IconButton
      disableFocusRipple
      disableTouchRipple
      disableRipple
      onClick={handleSortModelChange}
    >
      {isMatchingField && sortOrder === "desc" ? (
        <ArrowDownwardIcon fontSize="small" color="primary" />
      ) : (
        <ArrowUpwardIcon
          fontSize="small"
          color={isMatchingField ? "primary" : "disabled"}
        />
      )}
    </IconButton>
  );
};
