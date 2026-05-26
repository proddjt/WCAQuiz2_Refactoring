import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_IT } from "@ag-grid-community/locale";

import { colorSchemeDark, GridOptions, themeQuartz, type ColDef, type RowClickedEvent, type SelectionChangedEvent } from "ag-grid-community";
import { useMemo, type RefObject } from "react";

interface Props {
  columns: ColDef[];
  rows: unknown[];
  context?: Record<string, unknown>;
  isLoading: boolean;
  ref?: RefObject<AgGridReact>;
  pagination?: boolean;
  onRowClicked?: (event: RowClickedEvent) => void;
  onSelectionChanged?: (event: SelectionChangedEvent) => void;
  selectionMode?: "singleRow" | "multiRow";
  hideCheckboxes?: boolean;
}

const myTheme = themeQuartz.withPart(colorSchemeDark)

function Table({
  columns,
  rows,
  isLoading,
  ref,
  pagination,
  context,
  onRowClicked,
  onSelectionChanged,
  selectionMode,
  hideCheckboxes,
}: Props) {
  const rowSelection = useMemo(() => {
    if (selectionMode)
      return {
        mode: selectionMode,
        checkboxes: !hideCheckboxes,
        enableClickSelection: hideCheckboxes,
      };
    return undefined;
  }, [selectionMode, hideCheckboxes]);

  return (
    <AgGridReact
      alwaysShowVerticalScroll
      context={context}
      columnDefs={columns}
      rowData={rows}
      loading={isLoading}
      localeText={AG_GRID_LOCALE_IT}
      pagination={pagination}
      ref={ref}
      onRowClicked={onRowClicked}
      onSelectionChanged={onSelectionChanged}
      rowSelection={rowSelection}
      theme={myTheme}
      containerStyle={{ flexGrow: 1}}
    />
  );
}

export { Table };
