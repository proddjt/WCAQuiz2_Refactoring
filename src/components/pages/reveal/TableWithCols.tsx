import useTable from "@/components/layout/hooks/useTable"
import { Table } from "@/components/layout/Table"

interface Props {
    items: unknown[]
    tableType: "focus" | "goldrush" | "versus" | "medals" | "records" | "results"
    condition?: boolean,
    multipleConditions?: boolean[]
    context?: Record<string, unknown>
}

export default function TableWithCols({items, condition, tableType, multipleConditions, context} : Props){
    const {cols} = useTable(tableType, condition, multipleConditions)
    return (
        <Table
        rows={items}
        columns={cols}
        isLoading={false}
        context={context}
        />
    )
}