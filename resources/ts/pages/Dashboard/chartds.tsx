"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type {
    PieSectorDataItem,
    PieSectorShapeProps,
} from "recharts/types/polar/Pie"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const equipmentData = [
    { tipo: "CPU", valor: 186, fill: "var(--color-cpu)" },
    { tipo: "Monitor", valor: 305, fill: "var(--color-monitor)" },
    { tipo: "Notebook", valor: 237, fill: "var(--color-notebook)" },
    { tipo: "Impressora", valor: 173, fill: "var(--color-impressora)" },
    { tipo: "Tablet", valor: 209, fill: "var(--color-tablet)" },
]

const chartConfig = {
    cpu: {
        label: "CPU",
        color: "var(--chart-1)",
    },
    monitor: {
        label: "Monitor",
        color: "var(--chart-2)",
    },
    notebook: {
        label: "Notebook",
        color: "var(--chart-3)",
    },
    impressora: {
        label: "Impressora",
        color: "var(--chart-4)",
    },
    tablet: {
        label: "Tablet",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ChartPieInteractive() {
    const id = "pie-interactive"
    const [activeTipo, setActiveTipo] = React.useState(equipmentData[0].tipo)

    const activeIndex = React.useMemo(
        () => equipmentData.findIndex((item) => item.tipo === activeTipo),
        [activeTipo]
    )
    const tipos = React.useMemo(() => equipmentData.map((item) => item.tipo), [])

    const renderPieShape = React.useCallback(
        ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
            if (index === activeIndex) {
                return (
                    <g>
                        <Sector {...props} outerRadius={outerRadius + 10} />
                        <Sector
                            {...props}
                            outerRadius={outerRadius + 25}
                            innerRadius={outerRadius + 12}
                        />
                    </g>
                )
            }

            return <Sector {...props} outerRadius={outerRadius} />
        },
        [activeIndex]
    )

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Equipamentos por tipo</CardTitle>
                    <CardDescription>Distribuição do inventário</CardDescription>
                </div>
                <Select value={activeTipo} onValueChange={(value) => value && setActiveTipo(value)}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Selecionar tipo"
                    >
                        <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {tipos.map((key) => {
                            const config = chartConfig[key.toLowerCase() as keyof typeof chartConfig]

                            if (!config) {
                                return null
                            }

                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: `var(--color-${key.toLowerCase()})`,
                                            }}
                                        />
                                        {config?.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={equipmentData}
                            dataKey="valor"
                            nameKey="tipo"
                            innerRadius={60}
                            strokeWidth={5}
                            shape={renderPieShape}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {equipmentData[activeIndex].valor.toLocaleString("pt-BR")}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Equipamentos
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
