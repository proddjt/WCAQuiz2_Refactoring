import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ColDef } from "ag-grid-community";
import EventCell from "../table/EventCell";
import { CustomCellRendererProps } from "ag-grid-react";
import { formatTime } from "@/utils/functions";
import RankCell from "../table/RankCell";
import ClickableCell from "../table/ClickableCell";
import ResultCell from "../table/ResultCell";
import useGoldrushGuessedEvents from "@/context/GoldrushGuessedEvents/useGoldrushGuessedEvents";

export default function useTable(
  mode: "focus" | "goldrush" | "versus" | "medals" | "records" | "results",
  condition?: boolean,
  multipleConditions?: boolean[],
) {
  const { t } = useTranslation();
  const {guessedEvents} = useGoldrushGuessedEvents();

  const isCensored = useMemo(() => (condition ? "text-censored" : undefined), [condition]);

  const colDefs = useMemo(
    () =>
      ({
        focus: [
          {
            headerName: t("event"),
            sortable: false,
            suppressMovable: true,
            field: "event_id",
            maxWidth: 300,
            cellRenderer: (params: CustomCellRendererProps) => <EventCell event={params.value} isCensored={isCensored} />,
          },
          {
            headerName: t("result_type"),
            sortable: false,
            suppressMovable: true,
            field: "type",
            maxWidth: 100,
            valueFormatter: (params) => t(params.value),
            cellClass: isCensored,
          },
          {
            headerName: t("result"),
            sortable: false,
            suppressMovable: true,
            field: "best",
            maxWidth: 120,
            valueFormatter: (params) => formatTime(params.value, params.data.event_id),
            cellClass: isCensored,
          },
          {
            headerName: "NR",
            sortable: false,
            suppressMovable: true,
            field: "country_rank",
            maxWidth: 65,
            cellRenderer: (params: CustomCellRendererProps) => <RankCell params={params} isCensored={isCensored} />,
          },
          {
            headerName: "CR",
            sortable: false,
            suppressMovable: true,
            field: "continent_rank",
            maxWidth: 65,
            cellRenderer: (params: CustomCellRendererProps) => <RankCell params={params} isCensored={isCensored} />,
          },
          {
            headerName: "WR",
            sortable: false,
            suppressMovable: true,
            field: "world_rank",
            maxWidth: 65,
            cellRenderer: (params: CustomCellRendererProps) => <RankCell params={params} isCensored={isCensored} />,
          },
        ],
        goldrush: [
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("event"),
            field: "event",
            maxWidth: 300,
            cellRenderer: (params: CustomCellRendererProps) => <EventCell event={params.value} />,
            cellClass: "centered-cell",
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("first"),
            field: "first.name",
            maxWidth: 200,
            cellRenderer: (params: CustomCellRendererProps) => <ClickableCell params={params} condition={multipleConditions?.[0] || false} />,
            cellClass: "centered-cell",
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("table_results"),
            field: "first.position",
            width: 240,
            cellRenderer: (params: CustomCellRendererProps) => (
              <ResultCell params={params} isCensored={multipleConditions?.[0] && !guessedEvents.some(((event: string) => params.data.event === event)) ? "text-censored" : undefined} />
            ),
            cellClass: "centered-cell",
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("second"),
            field: "second.name",
            maxWidth: 200,
            cellClass: multipleConditions?.[2] ? "text-censored" : undefined,
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("table_results"),
            field: "second.position",
            width: 240,
            cellRenderer: (params: CustomCellRendererProps) => (
              <ResultCell params={params} isCensored={multipleConditions?.[2] ? "text-censored" : undefined} />
            ),
            cellClass: "centered-cell",
          },
          { sortable: false,
            suppressMovable: true,
            headerName: t("third"), field: "third.name", maxWidth: 200, cellClass: multipleConditions?.[1] ? "text-censored" : undefined },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("table_results"),
            field: "third.position",
            width: 240,
            cellRenderer: (params: CustomCellRendererProps) => (
              <ResultCell params={params} isCensored={multipleConditions?.[1] ? "text-censored" : undefined} />
            ),
            cellClass: "centered-cell",
          },
        ],
        versus: [],
        medals: [
          { sortable: false,
            suppressMovable: true,
            headerName: t("gold"), field: "gold", flex: 1, cellClass: isCensored },
          { sortable: false,
            suppressMovable: true,
            headerName: t("silver"), field: "silver", flex: 1, cellClass: isCensored },
          { sortable: false,
            suppressMovable: true,
            headerName: t("bronze"), field: "bronze", flex: 1, cellClass: isCensored },
        ],
        records: [
          { sortable: false,
            suppressMovable: true,
            headerName: t("world"), field: "world", flex: 1, cellClass: isCensored },
          { sortable: false,
            suppressMovable: true,
            headerName: t("continental"), field: "continental", flex: 1, cellClass: isCensored },
          { sortable: false,
            suppressMovable: true,
            headerName: t("national"), field: "national", flex: 1, cellClass: isCensored },
        ],
        results: [
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("event"),
            field: "event_name",
            maxWidth: 200,
            cellRenderer: (params: CustomCellRendererProps) => (
              <EventCell event={params.value} isCensored={multipleConditions?.[0] ? "text-censored" : undefined} />
            ),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: "NR",
            field: "single.country_rank",
            maxWidth: 75,
            cellRenderer: (params: CustomCellRendererProps) => (
              <RankCell params={params} isCensored={multipleConditions?.[2] ? "text-censored" : undefined} />
            ),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: "CR",
            field: "single.continent_rank",
            maxWidth: 75,
            cellRenderer: (params: CustomCellRendererProps) => (
              <RankCell params={params} isCensored={multipleConditions?.[2] ? "text-censored" : undefined} />
            ),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: "WR",
            field: "single.world_rank",
            maxWidth: 75,
            cellRenderer: (params: CustomCellRendererProps) => (
              <RankCell params={params} isCensored={multipleConditions?.[2] ? "text-censored" : undefined} />
            ),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("single"),
            field: "single.best",
            minWidth: 75,
            cellClass: multipleConditions?.[2] ? "text-censored" : undefined,
            valueFormatter: (params) => formatTime(params.value, params.data.event_name),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: t("average"),
            field: "average.best",
            minWidth: 75,
            cellClass: multipleConditions?.[1] ? "text-censored" : undefined,
            valueFormatter: (params) => formatTime(params.value, params.data.event_name),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: "WR",
            field: "average.world_rank",
            maxWidth: 75,
            cellRenderer: (params: CustomCellRendererProps) => (
              <RankCell params={params} isCensored={multipleConditions?.[1] ? "text-censored" : undefined} />
            ),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: "CR",
            field: "average.continent_rank",
            maxWidth: 75,
            cellRenderer: (params: CustomCellRendererProps) => (
              <RankCell params={params} isCensored={multipleConditions?.[1] ? "text-censored" : undefined} />
            ),
          },
          {
            sortable: false,
            suppressMovable: true,
            headerName: "NR",
            field: "average.country_rank",
            maxWidth: 75,
            cellRenderer: (params: CustomCellRendererProps) => (
              <RankCell params={params} isCensored={multipleConditions?.[1] ? "text-censored" : undefined} />
            ),
          },
        ],
      }) as Record<"focus" | "goldrush" | "versus" | "medals" | "records" | "results", ColDef[]>,
    [t, isCensored, multipleConditions, guessedEvents],
  );

  const cols = useMemo(() => colDefs[mode], [mode, colDefs]);

  return { cols };
}
