import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ColDef } from "ag-grid-community";
import EventCell from "../table/EventCell";
import { CustomCellRendererProps } from "ag-grid-react";
import { formatTime } from "@/utils/functions";

export default function useTable(mode: "focus" | "goldrush" | "reveal" | "versus" | "medals" | "records" | "results", condition?: boolean, mulitpleConditions?: boolean[]) {
    const { t } = useTranslation();

    const isCensored = useMemo(() => condition ? "text-censored" : undefined, [condition]);

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

        ],
        medals: [
            { headerName: t("gold"), field: "gold", flex: 1, cellClass: isCensored },
            { headerName: t("silver"), field: "silver", flex: 1, cellClass: isCensored },
            { headerName: t("bronze"), field: "bronze", flex: 1, cellClass: isCensored },
        ],
        records: [
            { headerName: t("world"), field: "world", flex: 1, cellClass: isCensored },
            { headerName: t("continental"), field: "continental", flex: 1, cellClass: isCensored },
            { headerName: t("national"), field: "national", flex: 1, cellClass: isCensored },
        ],
        results: [
            { headerName: t("event"), field: "event_name", maxWidth: 200, cellRenderer: (params: CustomCellRendererProps) => <EventCell params={params} isCensored={mulitpleConditions?.[0] ? "text-censored" : undefined} /> },
            { headerName: "NR", field: "single.country_rank", maxWidth: 75, cellClass: mulitpleConditions?.[2] ? "text-censored" : undefined, valueFormatter: params => params.value || "-" },
            { headerName: "CR", field: "single.continent_rank", maxWidth: 75, cellClass: mulitpleConditions?.[2] ? "text-censored" : undefined, valueFormatter: params => params.value || "-" },
            { headerName: "WR", field: "single.world_rank", maxWidth: 75, cellClass: mulitpleConditions?.[2] ? "text-censored" : undefined, valueFormatter: params => params.value || "-" },
            { headerName: t("single"), field: "single.best", minWidth: 75, cellClass: mulitpleConditions?.[2] ? "text-censored" : undefined, valueFormatter: params => formatTime(params.value, params.data.event_id) },
            { headerName: t("average"), field: "average.best", minWidth: 75, cellClass: mulitpleConditions?.[1] ? "text-censored" : undefined, valueFormatter: params => formatTime(params.value, params.data.event_id) },
            { headerName: "WR", field: "average.world_rank", maxWidth: 75, cellClass: mulitpleConditions?.[1] ? "text-censored" : undefined, valueFormatter: params => params.value || "-" },
            { headerName: "CR", field: "average.continent_rank", maxWidth: 75, cellClass: mulitpleConditions?.[1] ? "text-censored" : undefined, valueFormatter: params => params.value || "-" },
            { headerName: "NR", field: "average.country_rank", maxWidth: 75, cellClass: mulitpleConditions?.[1] ? "text-censored" : undefined, valueFormatter: params => params.value || "-" },
        ]
    } as Record<"focus" | "goldrush" | "reveal" | "versus" | "medals" | "records" | "results", ColDef[]>), [t, isCensored, mulitpleConditions]);

    const cols = useMemo(() => colDefs[mode], [mode, colDefs]);

    return {cols}
}