"use client";

import { Products } from "@/lib/table-data";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import useSWR from "swr";
const fetcher = async (url: string): Promise<Products[]> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};

export default function DataTableFetch() {
  const { data, error, isLoading } = useSWR<Products[]>(
    `https://fakestoreapi.com/products`,
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        <div className="h-9 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="h-72 w-full animate-pulse rounded-md bg-muted/60" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-6 text-sm text-destructive">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
