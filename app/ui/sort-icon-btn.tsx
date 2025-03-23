"use client";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { type FC } from "react";
import { useSearchParams } from "next/navigation";

type SortIconBtnProps = {
  field: string;
};

export const SortIconBtn: FC<SortIconBtnProps> = ({ field }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const sort = searchParams?.get("sort") || "";

  const sortField = sort.split("_")[0];
  const sortOrder = sort.split("_")[1];
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
