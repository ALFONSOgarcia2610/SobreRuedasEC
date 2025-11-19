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
    <div className="w-full space-y-4 bg-slate-900/50 p-6 rounded-lg border border-slate-700/50 shadow-xl">
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
            className={filterConfig.className || "max-w-sm bg-slate-800/80 border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-white placeholder:text-slate-400"}
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
            <SelectTrigger className={selectConfig.className || "w-[180px] bg-slate-800/80 border-slate-700 text-white hover:border-green-500 transition-colors"}>
              <SelectValue placeholder={selectConfig.placeholder || "Seleccionar..."} />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectGroup>
                {selectConfig.label && <SelectLabel className="text-slate-300">{selectConfig.label}</SelectLabel>}
                {selectConfig.options.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-green-600/20 hover:text-green-400 focus:bg-green-600/20 focus:text-green-400">
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
              <Button variant="outline" className="bg-slate-800/80 border-slate-700 hover:bg-green-600/10 hover:border-green-500 hover:text-green-400 text-white transition-all">
                Columnas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              {table.getAllColumns()
                .filter((column) => column.getCanHide() && column.id !== "acciones")
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-white hover:bg-green-600/20 hover:text-green-400 focus:bg-green-600/20 focus:text-green-400"
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
          <SelectTrigger className={pageSizeConfig?.className || (isMobile ? "w-[120px]" : "w-[180px]") + " bg-slate-800/80 border-slate-700 text-white hover:border-green-500 transition-colors"}>
            <SelectValue placeholder={pageSizeConfig?.placeholder || "10 Filas"} />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectGroup>
              {pageSizeConfig?.label && <SelectLabel className="text-slate-300">{pageSizeConfig.label}</SelectLabel>}
              {(pageSizeConfig?.options || [5, 10, 20, 40, 70, 100]).map((size) => (
                <SelectItem key={size} value={size.toString()} className="text-white hover:bg-green-600/20 hover:text-green-400 focus:bg-green-600/20 focus:text-green-400">
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla compartida - Desktop y Mobile */}
      <div className="overflow-x-auto rounded-lg border border-slate-700/50 bg-slate-900/60 shadow-2xl p-3">
        { !isMobile ? (
          <Table className="min-w-[800px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b border-slate-700 bg-gradient-to-r from-green-900/30 to-slate-800/50 hover:from-green-900/40 hover:to-slate-800/60 transition-all">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center font-semibold text-white">
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
                table.getRowModel().rows.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    data-state={row.getIsSelected() && "selected"}
                    className={`border-b border-slate-700/50 hover:bg-green-600/10 hover:border-green-500/30 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-800/20'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center whitespace-nowrap text-white">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="h-24 text-center text-slate-400">
                    No hay resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          // Mobile: render cards for each row
          <div className="grid grid-cols-1 gap-3">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <div key={row.id} className="bg-slate-800/40 border border-slate-700 rounded-lg p-3">
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} className="flex justify-between items-start gap-2 py-1">
                      <div className="text-xs text-slate-400">
                        {typeof cell.column.columnDef.header === "string"
                          ? cell.column.columnDef.header
                          : cell.column.id}
                      </div>
                      <div className="text-sm text-white font-medium">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="h-24 text-center text-slate-400">No hay resultados.</div>
            )}
          </div>
        )}
      </div>
      

      {/* Paginación (compartida entre ambas vistas) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2 py-4 border-t border-slate-700/50">
        <div className="text-sm text-white/80">
          <span className="text-green-400 font-semibold">{table.getFilteredSelectedRowModel().rows.length}</span> de{" "}
          <span className="text-green-400 font-semibold">{table.getFilteredRowModel().rows.length}</span> fila(s) seleccionadas.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-slate-800/80 border-slate-700 hover:bg-green-600/20 hover:border-green-500 hover:text-green-400 text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 disabled:hover:border-slate-700 disabled:hover:text-white transition-all"
          >
            Regresar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-slate-800/80 border-slate-700 hover:bg-green-600/20 hover:border-green-500 hover:text-green-400 text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 disabled:hover:border-slate-700 disabled:hover:text-white transition-all"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
