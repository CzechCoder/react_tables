import postgres from "postgres";

import { InvoicesTable } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 6;

type SearchParamsType = {
  query?: string;
  page?: string;
  sort?: string;
};

const assignColumnName = (sortField: string) => {
  switch (sortField) {
    case "name":
      return "customers.name";
    case "email":
      return "customers.email";
    case "amount":
      return "invoices.amount";
    case "date":
      return "invoices.date";
    case "status":
      return "invoices.status";
    default:
      return "invoices.date";
  }
};

export const fetchFilteredInvoices = async (
  searchParams: SearchParamsType = { query: "", page: "", sort: "" }
) => {
  const query = searchParams.query || "";
  const page = searchParams.page || "";
  const sort = searchParams.sort || "";

  const sortField = assignColumnName(sort.split("_")[0]);
  const sortDirection = searchParams?.sort?.split("_")[1] || "desc";

  const currentPage = Number(page) || 1;

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY ${sql(sortField)} ${
      sortDirection === "asc" ? sql`asc` : sql`desc`
    }
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
};

export const fetchInvoicesPages = async (query: string) => {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    const totalRows = data[0].count;
    return { totalPages, totalRows };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
};
