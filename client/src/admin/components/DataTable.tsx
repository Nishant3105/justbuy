import { useState } from "react";
import AddProductForm from "../components/AddProductForm";
import type { Product } from "../../types/Product";

interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (row: any) => React.ReactNode;
}

type SortOrder = "asc" | "desc";

interface Props {
    columns: Column[];
    data: any[];
    loading?: boolean;
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
    onSortChange: (sortBy: string, order: SortOrder) => void;
    sortBy: string;
    order: SortOrder;
}

const DataTable = ({
    columns,
    data,
    loading,
    page,
    pages,
    onPageChange,
    onSortChange,
    sortBy,
    order,
}: Props) => {

    const handleSort = (column: string) => {
        const newOrder =
            sortBy === column && order === "asc" ? "desc" : "asc";

        onSortChange(column, newOrder);
    };


    return (
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      
      {/* Header */}
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          {columns.map((col) => {
            const isActive = sortBy === col.key;

            return (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`
                  px-5 py-4 text-left font-semibold text-gray-700 whitespace-nowrap
                  ${col.sortable
                    ? "cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    : ""}
                `}
              >
                <div className="flex items-center gap-1">
                  {col.label}

                  {col.sortable && (
                    <span className="text-gray-400 text-xs">
                      {isActive ? (
                        order === "asc" ? "▲" : "▼"
                      ) : (
                        "⇅"
                      )}
                    </span>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-100">
        {loading ? (
          <tr>
            <td
              colSpan={columns.length}
              className="py-12 text-center text-gray-500"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Loading products...
              </div>
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="py-12 text-center text-gray-400"
            >
              No products found
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr
              key={row._id}
              className="
                hover:bg-blue-50/40
                transition-colors
                duration-150
              "
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-5 py-4 text-gray-700 whitespace-nowrap"
                >
                  {col.render
                    ? col.render(row)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>

    </table>
  </div>

  {/* Pagination */}
  <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">

    <button
      disabled={page === 1}
      onClick={() => onPageChange(page - 1)}
      className="
        px-4 py-2 rounded-lg border border-gray-300 bg-white
        hover:bg-gray-100
        disabled:opacity-40 disabled:cursor-not-allowed
        transition
      "
    >
      ← Previous
    </button>

    <div className="text-sm text-gray-600 font-medium">
      Page <span className="text-gray-900">{page}</span> of{" "}
      <span className="text-gray-900">{pages}</span>
    </div>

    <button
      disabled={page === pages}
      onClick={() => onPageChange(page + 1)}
      className="
        px-4 py-2 rounded-lg border border-gray-300 bg-white
        hover:bg-gray-100
        disabled:opacity-40 disabled:cursor-not-allowed
        transition
      "
    >
      Next →
    </button>

  </div>
</div>

    );
};

export default DataTable;
