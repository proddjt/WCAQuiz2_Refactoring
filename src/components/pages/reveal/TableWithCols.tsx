import useTable from "@/components/layout/hooks/useTable"
import { Table } from "@/components/layout/Table"
import { AgGridReact } from "ag-grid-react"
import { RefObject } from "react"

interface Props {
    items: unknown[]
    tableType: "focus" | "goldrush" | "versus" | "medals" | "records" | "results"
    condition?: boolean,
    multipleConditions?: boolean[]
    context?: Record<string, unknown>
    ref?: RefObject<AgGridReact>
}

export default function TableWithCols({items, condition, tableType, multipleConditions, context, ref} : Props){
    const {cols} = useTable(tableType, condition, multipleConditions)
    return (
        <Table
        rows={items}
        columns={cols}
        isLoading={false}
        context={context}
        ref={ref}
        />
    )
}