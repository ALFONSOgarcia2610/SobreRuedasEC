"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type VisibilityState,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface FilterConfig {
  columnId: string
  placeholder?: string
  className?: string
}

interface SelectOption {
  value: string
  label: string
}

interface SelectConfig {
  columnId: string
  options: SelectOption[]
  placeholder?: string
  defaultValue?: string
  className?: string
  label?: string
  exactMatch?: boolean // Nueva propiedad para comparación exacta
}

interface PageSizeConfig {
  options?: number[]
  defaultValue?: number
  placeholder?: string
  className?: string
  label?: string
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  mobileColumns?: ColumnDef<TData, TValue>[] // Columnas para móvil (opcional)
  data: TData[]
  filterConfig?: FilterConfig
  selectConfig?: SelectConfig
  pageSizeConfig?: PageSizeConfig
  showColumnToggle?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  mobileColumns,
  data,
  filterConfig,
  selectConfig,
  pageSizeConfig,
  showColumnToggle = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentStatus, setCurrentStatus] = useState(selectConfig?.defaultValue || 'all')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const isMobile = useIsMobile()

  const table = useReactTable({
    data,
    columns: isMobile && mobileColumns ? mobileColumns : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })



  return (
    <div className="w-full space-y-4  bg-slate-800 p-4 rounded-lg border shadow-sm">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {filterConfig && (
          <Input
            placeholder={filterConfig.placeholder || "Filtrar..."}
            value={(table.getColumn(filterConfig.columnId)?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              setCurrentStatus(selectConfig?.defaultValue || "all");
              if (selectConfig) {
                table.getColumn(selectConfig.columnId)?.setFilterValue(undefined);
              }
              table.getColumn(filterConfig.columnId)?.setFilterValue(event.target.value);
            }}
            className={filterConfig.className || "max-w-sm"}
          />
        )}

        {selectConfig && (
          <Select
            value={currentStatus}
            onValueChange={(value) => {
              setCurrentStatus(value);
              if (value === selectConfig.defaultValue || value === 'all') {
                table.getColumn(selectConfig.columnId)?.setFilterValue(undefined);
              } else {
                table.getColumn(selectConfig.columnId)?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className={selectConfig.className || "w-[180px]"}>
              <SelectValue placeholder={selectConfig.placeholder || "Seleccionar..."} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {selectConfig.label && <SelectLabel>{selectConfig.label}</SelectLabel>}
                {selectConfig.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {/* Ocultar toggle de columnas en móvil */}
        {showColumnToggle && !isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columnas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns()
                .filter((column) => column.getCanHide() && column.id !== "acciones")
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Select
          onValueChange={(value) => {
            table.setPageSize(+value);
          }}
        >
          <SelectTrigger className={pageSizeConfig?.className || (isMobile ? "w-[120px]" : "w-[180px]")}>
            <SelectValue placeholder={pageSizeConfig?.placeholder || "10 Filas"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageSizeConfig?.label && <SelectLabel>{pageSizeConfig.label}</SelectLabel>}
              {(pageSizeConfig?.options || [5, 10, 20, 40, 70, 100]).map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla compartida - Desktop y Mobile */}
      <div className="overflow-x-auto rounded-md border  bg-slate-900">
        <Table className={!isMobile ? "min-w-[800px]" : ""}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={(isMobile && mobileColumns ? mobileColumns : columns).length} className="h-24 text-center">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          </Table>
        </div>
      

      {/* Paginación (compartida entre ambas vistas) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Regresar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
