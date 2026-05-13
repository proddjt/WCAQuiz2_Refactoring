import useTable from "@/components/layout/hooks/useTable"
import { Table } from "@/components/layout/Table"

interface Props {
    items: unknown[]
    tableType: "focus" | "goldrush" | "versus" | "medals" | "records" | "results"
    condition?: boolean,
    multipleConditions?: boolean[]
}

export default function TableWithCols({items, condition, tableType, multipleConditions} : Props){
    const {cols} = useTable(tableType, condition, multipleConditions)
    return (
        <Table
        rows={items}
        columns={cols}
        isLoading={false}
        />
    )
}