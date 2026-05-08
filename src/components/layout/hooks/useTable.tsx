import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ColDef } from "ag-grid-community";
import EventCell from "../table/EventCell";
import { CustomCellRendererProps } from "ag-grid-react";
import { formatTime } from "@/utils/functions";

export default function useTable(mode: "focus" | "goldrush" | "reveal" | "versus", condition: boolean) {
    const { t } = useTranslation();

    const isCensored = useMemo(() => condition ? "table-censored" : undefined, [condition]);

    const colDefs = useMemo(() => ({
        focus: [
            { headerName: t("event"), field: "event_id", maxWidth: 300, cellRenderer: (params: CustomCellRendererProps) => <EventCell params={params} isCensored={isCensored} /> },
            { headerName: t("result_type"), field: "type", maxWidth: 100, valueFormatter: params => t(params.value), cellClass: isCensored },
            { headerName: t("result"), field: "best", maxWidth: 120, valueFormatter: params => formatTime(params.value, params.data.event_id), cellClass: isCensored },
            { headerName: 'NR', field: "country_rank", maxWidth: 65, cellClass: isCensored },
            { headerName: 'CR', field: "continent_rank", maxWidth: 65, cellClass: isCensored },
            { headerName: 'WR', field: "world_rank", maxWidth: 65, cellClass: isCensored },
        ],
        goldrush: [

        ],
        reveal: [

        ],
        versus: [

        ]
    } as Record<"focus" | "goldrush" | "reveal" | "versus", ColDef[]>), [t, isCensored]);

    const cols = useMemo(() => colDefs[mode], [mode, colDefs]);

    return {cols}
}