import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Inter } from "@next/font/google";
import Layout from "../../../components/layout/layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactEcharts from "echarts-for-react";
import TimelineComponent from "@/components/TimelineComponent";
import GeoMap from '../../../components/geoMap';
import ChartWrapper from "@/components/wrapper/chartwrapper";
import { Dropdown } from "primereact/dropdown";
import { graphic } from "echarts";
import { useTheme } from "next-themes";
import { Sidebar } from "primereact/sidebar";
import { TabView } from "primereact/tabview";
import { Checkbox } from "antd";

const myinter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export default function Index() {

    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    /*--prime-select--*/
    const [selectedCity, setSelectedCity] = useState(null);
    const BU = [
        { name: "All", code: "NY" },
        { name: "Brand", code: "BR" },
        { name: "Business Unit", code: "BUN" },
        { name: "Region Wise Ageing", code: "RWA" },
        { name: "Cluster", code: "Cl" },
        { name: "Business Group", code: "BG" },
    ];
    const [morefilter, setMorefilter] = useState(false);
    const [Appliedfilter, setAppliedfilter] = useState(false);
    const [Timelinefilter, setTimelinefilter] = useState(false);

    const [selectedSummary, setSelectedSummary] = useState(null);
    const summary = [
        { name: "Default", code: "NY" ,},
        { name: "Inventory", code: "BR" },
        { name: "Receivables", code: "BUN" },
    ];
    const [ingredients, setIngredients] = useState([]);
    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    }
    const onClickNavigate = async (e) => {
        console.log(e)
        if (e.value.code === "BR") {
            window.location.href = "/workingcapital/summary/inventory"
        } else if (e.value.code === "BUN") {
            window.location.href = "/workingcapital/summary/receivables"
        } else if (e.value.code === "NY") {
            window.location.href = "/workingcapital/summary"
        }
    }
    /*--prime-select--*/
    const clusterTab = {
        tooltip: {},
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#fffff' : '#222222',
            },
        },
        grid: {
            top: "5%",
            right: "0%",
            bottom: "12%",
            left: "5%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: [
                "Inventory",
                "SIT",
                "Inventory Including SIT",
                "Accounts Receivable",
                "Accounts Receivables..",
                "Vendar Receivables",
                "Account Payable",
                "Funding",
                "Accounts Payable...",
                "Revenu",
                "VAT",
                "Revenue Including VAT",


            ],
            axisLabel: {
                fontSize: 10,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                rotate: 45,
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            name: "Values in $",
            nameGap: 80,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 11,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 300,
            interval: 50,
            name: "Values in $",
            nameGap: 50,
            nameLocation: "middle",

            nameRotate: 90,
            nameTextStyle: {
                fontSize: 11,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "{value}k",
            },
        },
        series: [
            {
                name: "Grand Total",
                stack: "vendor",
                data: [129, 158, 128, 127, 126, 119, 109, 118, 128, 109, 108, 148, 119, 101,],
                type: "bar",
                color: "#AD943A",
                barGap: 0,
                barWidth: 30,
                label: {
                    show: true,
                    formatter: "${c}K",
                    fontSize: 10,
                    color: '#ffff'
                },
            },
            {
                name: "Software",
                stack: "vendor",
                data: [75, 70, 60, 73, 80, 77, 81, 72, 63, 50, 61, 49, 50, 39,],
                type: "bar",
                color: "#DAD562",
                barWidth: 30,
                label: {
                    show: true,
                    formatter: "${c}K",
                    fontSize: 10,
                    color: '#000000'
                },
            },

        ],
    };

    const totalInventoryTab = {
        tooltip: {},
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#ffff' : '#222222',
            },
        },
        grid: {
            top: "5%",
            right: "0%",
            bottom: "12%",
            left: "5%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: ["East Africa", "Egypt", "FWN Africa", "Kenya", "Qatar", "Rome", "Saudi", "U.A.E"],
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            name: "Values in $",
            nameGap: 40,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 11,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 900,
            interval: 100,
            name: "Values in $",
            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 11,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "April",
                stack: "vendor",
                data: [380, 320, 380, 400, 410, 430, 470, 460],
                type: "bar",
                color: "#029046",
                barGap: 0,
                barWidth: 50,
                label: {
                    show: true,
                    formatter: "${c}K",
                },
            },
            {
                name: "May",
                stack: "vendor",
                data: [270, 240, 270, 230, 210, 220, 230, 240],
                type: "bar",
                color: "#F5F073",
                barWidth: 85,
                label: {
                    show: true,
                    formatter: "${c}K",
                },
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                },
            },
        ],
    };

    const b2bStockTab = {
        tooltip: {},
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#ffff' : '#222222',
            },
        },
        grid: {
            top: "5%",
            right: "0%",
            bottom: "12%",
            left: "5%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: ["Oracle", "NBU", "IBU", "ESBU", "CAABU"],
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            name: "Values in $",
            nameGap: 40,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 11,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 900,
            interval: 100,
            name: "Values in $",
            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 11,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Inventory Value",
                stack: "vendor",
                data: [380, 320, 380, 400, 410],
                type: "bar",
                color: "#029046",
                barGap: 0,
                barWidth: 85,
                label: {
                    show: true,
                    formatter: "${c}K",
                },
            },
            {
                name: "Provisional Value",
                stack: "vendor",
                data: [270, 240, 270, 230, 210],
                type: "bar",
                color: "#F5F073",
                barWidth: 85,
                label: {
                    show: true,
                    formatter: "${c}K",
                },
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                },
            },
        ],
    };

    const ClusterWiseAgeing = {
        title: {
            text: 'Grand Total',
            textStyle: {
                fontSize: 12,
                fontWeight: "400",
                color: currentTheme == 'dark' ? '#ffff' : '#222222',
            },
            subtext: '$6.5M',
            left: "center",
            top: "center",
            subtextStyle: {
                fontSize: 12,
                fontWeight: "600",
                align: "center",
                color: "#FFFFFF"
            }
        },
        color: ['#256D85', '#2794B9', '#FCA400', '#FFCB6A', '#46A2F6', '#A5D4FF', '#A5D4FF', '#0B9614', '#FFFFFF'],
        legend: {
            show: false,
            orient: "horizontal",
            width: "30%",
            itemGap: 50,
            top: "50%",
            itemWidth: 10,
            itemHeight: '10',
            textStyle: {
                fontSize: 8,
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '60%'],
                center: ['50%', '50%'],
                width: "100%",
                height: "100%",
                data: [
                    { value: 2, name: 'UAE' },
                    { value: 24, name: 'Saudi Arabia' },
                    { value: 15, name: 'Qatar' },
                    { value: 15, name: 'Kuwait' },
                    { value: 8, name: 'Kenya' },
                    { value: 10, name: 'FWN Africa' },
                    { value: 5, name: 'Egypt' },
                    { value: 15, name: 'East Africa' },
                    { value: 6, name: ' E.Africa' },
                ],
                label: {
                    show: true,
                    color: "#F9F7F4",
                    fontSize: 12,
                    padding: [-20, -20, -20, -20],
                    position: 'outsideFill',
                    formatter: function (params) {
                        return params.value + '%'
                    },
                },
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            }
        ]
    };

    const TopCustomersTreemap = {
        series: [
            {
                type: 'treemap',
                width: "90%",
                height: "90%",
                label: {
                    show: true,
                    position: 'insideBottomLeft',
                    overflow: "breakAll",
                },
                data: [
                    {
                        name: 'AL Khalili Technology LLC',
                        value: "321567",
                        itemStyle: {
                            color: '#83432A',
                        },


                    },
                    {
                        name: 'SIBCA Electronic Equipment Company',
                        value: "412900",
                        itemStyle: {
                            color: '#769F2E'
                        },
                    },
                    {
                        name: 'Teklogix DMCC',
                        value: "329000",
                        itemStyle: {
                            color: '#11462B'
                        },
                    },
                    {
                        name: 'Intertech LLC',
                        value: "329000",
                        itemStyle: {
                            color: '#796B26'
                        },
                    },
                    {
                        name: 'AL Khalili Technology LLC',
                        value: "329000",
                        itemStyle: {
                            color: '#8DB14D'
                        },
                    },
                    {
                        name: 'United Technology Group GWC-LLC',
                        value: "329000",
                        itemStyle: {
                            color: '#66755F'
                        },
                    },
                    {
                        name: 'Mustafa Sultan Office Techno, Co',
                        value: "329000",
                        itemStyle: {
                            color: '#8C8A48'
                        },
                    },
                    {
                        name: 'Mustafa Sultan Office Technology Co',
                        value: "329000",
                        itemStyle: {
                            color: '#585D72'
                        },
                    },
                    {
                        name: 'Emerson FZE',
                        value: "329000",
                        itemStyle: {
                            color: '#547440'
                        },
                    },
                    {
                        name: 'Infocomm Group LLC',
                        value: "329000",
                        itemStyle: {
                            color: '#A9A771'
                        },
                    }
                ]
            }
        ]
    };

    const aprilmayus = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "3%",
            containLabel: true,
        },
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#ffff' : '#222222',
            },
        },
        xAxis: {
            name:"Cluster",
            type: "category",
            data: [
                "VENDOR \n RECEIVABLES",
                "AP INCL \n FUNDING",
                "Accounts Receivables \n INCL Factoring",
                "Inventory INCL\n SIT",
                "Revenue EXL\n VAT",
                "Revenue INC\n VAT",
            ],
            axisLabel: {
                fontSize: 9,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                height: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            nameGap: 40,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            name:'Values In $',
            type: "value",
            min: 0,
            max: 400,
            interval: 100,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "${value}M",
            },

            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "April",
                data: [
                    {
                        value: 251,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#222222"
                        }
                    },
                    {
                        value: 348,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#222222"
                        }
                    },
                    {
                        value: 276,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#222222"
                        }
                    },
                    {
                        value: 380,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#222222"
                        }
                    },
                    {
                        value: 179,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#222222"
                        }
                    },
                    {
                        value: 355,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#222222"
                        }
                    },],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 38,
                barGap: 0.05,
            },
            {
                name: "May",
                data: [
                    {
                        value: 255,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 322,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 240,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 364,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 244,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 320,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },],
                type: "bar",
                color: "#7C7E41",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 38,

            },
        ],
    };

    const aprilmay = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "3%",
            containLabel: true,
        },
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#ffff' : '#222222',
            },
        },
        xAxis: {
            name:"Cluster",
            type: "category",
            data: [
                "Ageing Inventory",
                "Overdue Accounts\n Receivable",
                "Net Working Capital",
                "Gross working\n capital",
                "Revenue Incl VAT",
                "Revenue",
                "AP Incl Funding",
                "Funding",
                "Accounts Payable",
                "Vendor Receivables",
            ],
            axisLabel: {
                fontSize: 10,
                rotate: 50,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            nameGap: 70,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            name:'Values in $',
            type: "value",
            min: 0,
            max: 400,
            interval: 50,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "${value}M",
            },

            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Professional Services",
                data: [
                    {
                        value: 100,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 120,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 270,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 180,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 110,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 150,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 200,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 130,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 150,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },
                    {
                        value: 145,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#000000"
                        }
                    },],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 25,
                barGap: 0.05,
            },
            {
                name: "Software",
                data: [
                    {
                        value: 150,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 200,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 340,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 250,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 300,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 350,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 250,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 300,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 230,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },
                    {
                        value: 300,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 7,
                            color: "#fff"
                        }
                    },],
                type: "bar",
                color: "#AD943A",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 25,

            },
        ],
    };
    const bu = {
        grid: {
            left: '10%',
            right: '10%'
        },
        legend: {
            bottom: "0",
            left: "",
            itemWidth: 20,
            itemHeight: 20,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },

        series: [
            {
                name: "By BU",
                type: "pie",
                radius: "70%",
                center: ["50%", "45%"],
                roseType: "area",
                color: ["#7C7E41", "#167739", "#91A845", "#A9C09D"],
                data: [
                    { value: 45, name: " 1st Quarter" },
                    { value: 38, name: " 2nd Quarter" },
                    { value: 32, name: " 3rd Quarter" },
                    { value: 30, name: " 4th Quarter" },

                ],
                label: {
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                    lineHeight: 20,
                    lineWidth: 50,
                    formatter: "${c}K  \n {b}",
                },

            },
        ],
    };

    const cluster = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "4%",
            bottom: "15%",
            left: "5%",
            containLabel: true,
        },
        legend: {
            show: true,
            left: 'left',
            bottom: '0%',
            icon: "roundRect",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                // color: currentTheme == 'dark' ? '#767A87' : '#fff',
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                fontSize: "12px",
            },
        },
        xAxis: {
            type: "value",
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "{value}M",
            },
            axisLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
        },
        yAxis: {
            type: "category",
            data: ["OBU", "NBU", "IBU", "ESBU", "DigiGlass", "CAABU"],
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: false,

            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Top Customers",
                data: [5, 5.8, 6.2, 7, 8.5, 9.8],
                type: "bar",
                stack: "total",
                color: "#187B3A",
                barWidth: 38,
                itemStyle: {
                    borderRadius: [0, 2, 2, 0],
                },
                label: {
                    show: true,
                    position: ['100%', '5%'],
                    formatter: "\n ${c}M",
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                }
            },
        ],
    };
    const vendors = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "5%",
            containLabel: true,
        },
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        xAxis: {
            type: "category",
            data: [
                "CAABU",
                "Digi glass",
                "ESBU",
                "IBU",
                "NBU",
                "NBU",
            ],
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLine: {
                show: false,

            },
            axisTick: {
                show: false,
            },

            name: 'Cluster',
            nameGap: 40,
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 80,
            interval: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "${value}M",
            },
            name: 'Values in $',
            nameGap: 50,
            nameLocation: 'middle',
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Series 1",
                data: [38, 72, 52, 74, 62, 50],
                type: "bar",
                stack: "total",
                color: "#AD943A",
                barWidth: 50,
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: "\n ${c}M",
                    align: "center",
                    fontSize: 10,
                    color: "#fff"
                }
            },
        ],
    };

    const inventorysit = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "2%",
            containLabel: true,
        },
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        xAxis: {
            type: "category",
            data: [
                "April",
                "May",
                "June",
            ],
            axisLabel: {
                fontSize: 10,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            nameGap: 50,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 100,
            interval: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "${value}M",
            },

            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Professional Services",
                data: [
                    {
                        value: 88,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#000000"
                        }
                    },
                    {
                        value: 70,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#000000"
                        }
                    },
                    {
                        value: 81,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#000000"
                        }
                    },

                ],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 45,
                barGap: 0.05,
            },
            {
                name: "Software",
                data: [
                    {
                        value: 90,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 90,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 100,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                ],
                type: "bar",
                color: "#AD943A",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 45,

            },
            {
                name: "SIT",
                data: [
                    {
                        value: 50,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 41,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 24,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                ],
                type: "bar",
                color: "#545528",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 45,
                barGap: 0.05,
            }
        ],
    };
    const factoring = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "5%",
            containLabel: true,
        },
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        xAxis: {
            type: "category",
            data: [
                "CAABU",
                "Digi glass",
                "ESBU",
                "IBU",
                "NBU",
                "NBU",
            ],
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLine: {
                show: false,

            },
            axisTick: {
                show: false,
            },

            name: 'Receivables',
            nameGap: 40,
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 80,
            interval: 10,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "${value}M",
            },
            name: 'Values in $',
            nameGap: 50,
            nameLocation: 'middle',
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Series 1",
                data: [38, 72, 52, 74, 62, 50],
                type: "bar",
                stack: "total",
                color: "#AD943A",
                barWidth: 50,
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: "\n ${c}M",
                    align: "center",
                    fontSize: 10,
                    color: "#fff"
                }
            },
        ],
    };
    const inclfactoring = {
        tooltip: {},
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "3%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: [
                "CAABU",
                "Digi glass",
                "ESBU",
                "IBU",
                "NBU",
                "oBU",
            ],
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                width: 100,
                overflow: "truncate",
                interval: 0,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            name: 'Values in $',
            nameGap: 40,
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 350,
            interval: 50,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                formatter: "{value}K",
            },
            name: 'Values in $',
            nameGap: 50,
            nameLocation: 'middle',
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: '',
                type: 'bar',
                stack: 'Total',
                itemStyle: {
                    color: 'transparent',
                    borderRadius: [4, 4, 0, 0],
                },
                data: [0, 40, 100, 140, 160, 185]
            },
            {
                name: 'Oracle',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'insideTop',
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                    formatter: "${c}K",
                },
                data: [40, 60, 40, 20, 25, 20],
                itemStyle: {
                    color: '#AD943A',
                    borderRadius: [4, 4, 0, 0],
                },
            },
        ],
    };
    const topCustomers = {
        grid: {
            top: "20%",
            right: "0%",
            bottom: "15%",
            left: "3%",
            containLabel: true,
        },
        radar: {
            shape: "circle",
            splitNumber: 6,
            indicator: [
                { name: "Infocomm Group LLC", max: 6500 },
                { name: "United\n Technology \n Group DWC - LLC", max: 16000 },
                { name: "InterTech \n LLC", max: 38000 },
                { name: "Al Khalili \n Technology LLC", max: 52000 },
                { name: "Sibca Electronic\n Equipment\n Company", max: 30000 },
                { name: "Teklogix\n DMCC", max: 25000 },

            ],
            axisLine: {
                symbol: "circle",
                symbolSize: [8, 8],
                lineStyle: {
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },
            },
            splitLine: {
                lineStyle: {
                    color: [
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                    ].reverse()
                },
                // length: 500
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: new graphic.RadialGradient(0.5, 0.5, 0.55, [
                        {
                            offset: 0,
                            color: '#215464',
                        },
                        {
                            offset: 1,
                            color: '#1018281A',
                        }
                    ]),
                }
            },
            axisName: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                lineHeight: 15,
            },
        },

        series: [
            {
                name: "Budget vs spending",
                type: "radar",
                itemStyle: {
                    shadowBlur: 80,
                    shadowColor: "#256D85",
                },
                data: [
                    {
                        value: [4000, 6000, 29000, 4000, 12000, 17000,],
                    },
                ],
                symbol: 'none',
                itemStyle: {
                    color: '#215464'
                },
                lineStyle: {
                    color: "#698289"
                },
                areaStyle: {
                    opacity: 0.4
                }

            },
        ],
    };

    const unitwiseBU = {

        title: {

            left: 'center',
            textStyle: {
                color: '#F2F4F7'
            }
        },
        grid: {
            top: 0,
        },
        legend: {
            show: false,
            bottom: 5,
            data: ['Beijing', 'Shanghai', 'Guangzhou'],
            itemGap: 20,
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
            selectedMode: 'single'
        },
        radar: {
            indicator: [
                { name: 'DIO', max: 100 },
                { name: 'IBU', max: 100 },
                { name: 'ESBU', max: 100 },
                { name: 'DIGILAS', max: 100 },
                { name: 'CAABU', max: 100 },
                { name: 'DNWC', max: 100 },
                { name: 'OBU', max: 100 },
                { name: 'NBU', max: 100 },
                { name: 'IBU', max: 100 },
                { name: 'ESBU', max: 100 },
                { name: 'DIGIGLASS', max: 100 },
                { name: 'CAABU', max: 100 },
                { name: 'GWC', max: 100 },
                { name: 'CBU', max: 100 },
                { name: 'NBU', max: 100 },
                { name: 'IBU', max: 100 },
                { name: 'ESBU', max: 100 },
                { name: 'DIGIGLASS', max: 100 },
                { name: 'CAABU', max: 100 },
                { name: 'BNO', max: 100 },
                { name: 'OBU', max: 100 },
                { name: 'NBU', max: 100 },
                { name: 'IBU', max: 100 },
                { name: 'ESBU', max: 100 },
                { name: 'DIGIGLASS', max: 100 },
                { name: 'CAABU', max: 100 },
                { name: 'DVRO', max: 100 },
                { name: 'OBU', max: 100 },
                { name: 'NBU', max: 100 },
                { name: 'IBU', max: 100 },
                { name: 'ESBU', max: 100 },
                { name: 'DIGIGLASS', max: 100 },
                { name: 'CAABU', max: 100 },
                { name: 'DSO', max: 100 },
                { name: 'CBU', max: 100 },
                { name: 'NBU', max: 100 },
                { name: 'IEU', max: 100 },
                { name: 'ESBU', max: 100 },
                { name: '   DIGIGLASS', max: 100 },
                { name: 'CAA3U', max: 100 },

            ],
            shape: 'circle',
            splitNumber: 7,
            axisName: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                fontSize: 10
            },
            splitLine: {
                lineStyle: {
                    color: [
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                        '#FFFFFF40',
                    ].reverse()
                },
                // length: 500
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: new graphic.RadialGradient(0.5, 0.5, 0.55, [
                        {
                            offset: 0,
                            color: '#46A2F6',
                        },
                        {
                            offset: 1,
                            color: '#1018281A',
                        }
                    ]),
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#fffff',
                    length: 10
                },
            }
        },
        series: [
            {
                name: 'Beijing',
                type: 'radar',
                lineStyle: {
                    width: 1.2,
                    opacity: 1,
                    color: '#ffff'
                },
                data: [{
                    value: [30, 80, 65, 65, 81, 30, 92,
                        90, 80, 70, 70, 70, 65, 40, 75,
                        35, 30, 25, 71, 68, 62, 70, 47, 45,
                        43, 43, 47, 44, 47, 42, 47, 40,
                        37, 40, 37, 42, 37, 35]
                }],
                symbol: 'circle',
                itemStyle: {
                    color: '#46A2F6',
                    fontSize: 10
                },
                areaStyle: {
                    opacity: 0.4
                }
            },
        ]
    };



    const AprilTreemap = {
        legend: {
            bottom: "0",
            left: "",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },

        series: [
            {
                name:'DVRO',
                type: 'treemap',
                width: "90%",
                height: "90%",
                label: {
                    show: true,
                    position: 'insideBottomRight',
                    overflow: "breakAll",
                    rich: {
                        larger: {
                            fontSize: 12,
                            color: '#FFFFFF',
                        },
                        normal: {
                            fontSize: 12,
                            color: '#FFFFFF'
                        }
                    },
                    formatter: '{larger|{b}}\n\n {normal|{c}}'
                },
                data: [
                    {
                        name: 'DVRO',
                        value: "321567",
                        itemStyle: {
                            color: '#256D85',
                        },


                    },
                    {
                        name: 'DSO',
                        value: "412900",
                        itemStyle: {
                            color: '#167739'
                        },
                    },
                    {
                        name: 'DNWC',
                        value: "329000",
                        itemStyle: {
                            color: '#A9C09D'
                        },
                    },
                    {
                        name: 'BPO',
                        value: "329000",
                        itemStyle: {
                            color: '#7C7E41'
                        },
                    },


                    {
                        name: 'DIO',
                        value: "329000",
                        itemStyle: {
                            color: '#91A845'
                        },
                    },


                ]
            }
        ]
    };

    const PriceRangeTracking = {
        title: {
            show: true,
            left: "0",
            top: "0",
            textStyle: {
                fontSize: 14,
                fontWeight: "500",
                fontFamily: "Work Sans",

            },
        },
        legend: {
            show: true,
            left: 'left',
            bottom: '0%',
            icon: "roundRect",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                fontSize: "12px",
            },
        },
        grid: {
            top: '10%',
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['', 'CAABU', 'Digi glass', 'ESBU', 'IBU', 'NBU', 'OBU ', ''],
                axisLabel: {
                    show: true,
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    color: '#E6E6E6',
                }
            },

        ],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 70,
                interval: 10,
                axisLabel: {
                    formatter: '${value}K',
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                    fontSize: 10,
                },
                splitLine: {
                    lineStyle: {
                        color: "#E5DFD9",
                        type: "dashed",
                        opacity: 0.2
                    }
                },
                axisLine: {
                    show: true,
                    color: '#E6E6E6',
                }
            }
        ],
        color: ['#145EFC', '#C8C846', '#DCA0FF'],
        series: [
            {
                name: 'Series1',
                type: 'line',
                symbol: "circle",
                symbolSize: 10,
                itemStyle: {
                    color: "#DAD562",
                },
                label: {
                    show: true,
                    formatter: "\n ${c}K",
                    align: "center",
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                },
                stack: 'Total',
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(218, 213, 98, 1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(218, 213, 98, 0)'
                        }])
                },

                emphasis: {
                    focus: 'series'
                },
                lineStyle: {
                    color: "#DAD562",
                    type: "line"
                },
                data: [, 40, 30, 40, 35, 12, 60]
            },

        ]
    };


    /************Geo Map *******************/
    const mapProps = {
        center: [0, 17],
        zoom: 3,
        currentTheme: 'dark',
        themeConfig: {
            dark: {
                layerSwitcher: {
                    primary: '',
                    secondary: '',
                    fontColor: '',
                },
                legend: {
                    primary: '',
                    secondary: '',
                    fontColor: '',
                },
                baseMap: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
            },
            light: {
                layerSwitcher: {
                    primary: 'red',
                    secondary: 'blue',
                    fontColor: 'purple',
                },
                legend: {
                    primary: 'green',
                    secondary: 'pink',
                    fontColor: 'purple',
                },
                mapControls: {
                    primary: 'green',
                    secondary: 'pink',
                },
                baseMap: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            }
        },
        baseMapConfig: {
            url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        },
        layers: [
            {
                name: 'layer1',
                title: 'Core Countries',
                type: 'geojson',
                opacity: 100,
                enabled: true,
                featureLabelField: 'ADMIN',
                renderer: {
                    type: 'custom',
                    config: {
                        color: {
                            field: 'metric',
                            breaks: [
                                {
                                    start: 0,
                                    end: 9,
                                    color: '#588CFA'
                                },
                                {
                                    start: 10,
                                    end: 19,
                                    color: '#0033A0'
                                },
                                {
                                    start: 20,
                                    end: 29,
                                    color: '#7C5CD8'
                                }
                            ],
                        },

                    }
                }
            },
            {
                name: 'layer2',
                title: 'Core Countries',
                type: 'geojson',
                opacity: 100,
                enabled: true,
                selectable: false,

            },

        ],
        geoSources: {
            layer1: {
                url: 'https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson',
            },
            layer2: {
                url: 'https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson',
            },
            layer3: {
                url: 'https://raw.githubusercontent.com/datasets/geo-countries/cd9e0635901eac20294a57ee3b3ce0684d5e3f1a/data/countries.geojson',
            }
        },
        dataSources: {
            layer1: {
                geoKeys: ['ISO_A3'],
                dataKeys: ['ISO_A3'],
                data: [
                    {
                        ISO_A3: 'DZA',
                        metric: 15,
                        metric2: 10,
                        metric3: 10,
                    },
                    {
                        ISO_A3: 'LBY',
                        metric: 25,
                        metric2: 20,
                        metric3: 10,
                    },
                    {
                        ISO_A3: 'EGY',
                        metric: 15,
                        metric2: 30,
                        metric3: 20,
                    },
                    {
                        ISO_A3: 'TUR',
                        metric: 5,
                        metric2: 40,
                        metric3: 30,
                    },
                    {
                        ISO_A3: 'IRQ',
                        metric: 5,
                        metric2: 30,
                        metric3: 40,
                    },
                    {
                        ISO_A3: 'SAU',
                        metric: 25,
                        metric2: 20,
                        metric3: 30,
                    },
                    {
                        ISO_A3: 'ZAF',
                        metric: 25,
                        metric2: 10,
                        metric3: 20,
                    }
                ],
            },
            layer2: {
                geoKeys: ['ISO_A3'],
                dataKeys: ['ISO_A3'],
                data: [
                    {
                        ISO_A3: 'DZA',
                        metric: 15,
                        metric2: 10,
                        metric3: 10,
                    },
                    {
                        ISO_A3: 'LBY',
                        metric: 25,
                        metric2: 20,
                        metric3: 10,
                    },
                    {
                        ISO_A3: 'EGY',
                        metric: 15,
                        metric2: 30,
                        metric3: 20,
                    },
                    {
                        ISO_A3: 'TUR',
                        metric: 5,
                        metric2: 40,
                        metric3: 30,
                    },
                    {
                        ISO_A3: 'IRQ',
                        metric: 5,
                        metric2: 30,
                        metric3: 40,
                    },
                    {
                        ISO_A3: 'SAU',
                        metric: 25,
                        metric2: 20,
                        metric3: 30,
                    },
                    {
                        ISO_A3: 'ZAF',
                        metric: 25,
                        metric2: 10,
                        metric3: 20,
                    }
                ],
            },
            layer3: {
                geoKeys: ['ISO_A3'],
                dataKeys: ['ISO_A3'],
                data: [
                    {
                        ISO_A3: 'NGA',
                        metric: 15
                    },
                    {
                        ISO_A3: 'CMR',
                        metric: 25
                    },
                    {
                        ISO_A3: 'KEN',
                        metric: 15
                    },
                ],
            },
        }
    }
    /************Geo Map *******************/
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeIndex1, setActiveIndex1] = useState(0);
    const [activeIndex2, setActiveIndex2] = useState(0);
    const [activeIndex3, setActiveIndex3] = useState(0);


    console.log("activeInex", activeIndex);
    return (
        <>
            <Layout pageTitle="Summary">
                <div className={myinter.className}>
                    <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw] ">
                        <div>
                            <Link
                                href={"/workingcapital/summary"}
                                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block active-green-btn"
                            >
                                Summary View
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={"/workingcapital/detailedview"}
                                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
                            >
                                Detailed View
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={"/workingcapital/whatifanalysis"}
                                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
                            >
                                What if Analysis
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={"/workingcapital/drilldown"}
                                className="text-[#667085] dark:text-[#F2F4F7] font-medium text-sm xl:text-[0.833vw] py-3 xl:py-[0.833vw] px-7 xl:px-[1.667vw] boxshadow1 bg-[#F9FAFB] dark:bg-[#272F31] rounded-tl-none rounded-tr-none rounded-bl-lg rounded-br-lg border-b border-[#FFFFFF] dark:border-[#667085] dark:hover:bg-[#60B866] dark:hover:border-[#01813F] dark:hover:text-[#FFFFFF] inline-block"
                            >
                                Drilldown Analysis
                            </Link>
                        </div>
                    </div>

                    <div className="inner-page-wrap xl:pl-[2.083vw] pl-5 xl:pr-[1.979vw] pr-5 pb-10 overscroll-auto xl:mt-[3.125vw] mt-[50px]">

                        <div className="grid grid-cols-2 gap-[24px] xl:gap-[1.250vw]">
                            <div className="col relative">
                                <div className="absolute left-[1.25rem] top-[1.25rem]">
                                    {/*--Filter Seaction*/}
                                    <div className="flex justify-between items-center">
                                        {/*left col*/}

                                        <div className="flex items-center dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg z-[999] ">
                                            <div className="xl:p-[0.861vw] p-2 bg-[#B3DDC7] dark:bg-[#242E31] rounded-tl-lg rounded-bl-lg text-base text-white">
                                                <i className="red-tsg-three-line"></i>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light dark:text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        Select Summary View
                                                    </label>
                                                    <Dropdown
                                                        value={selectedSummary}
                                                        onChange={e => onClickNavigate(e)}
                                                        options={summary}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[130px]"
                                                    />
                                                </div>
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        View By
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.value)}
                                                        options={BU}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[130px]"
                                                    />
                                                </div>
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        View By
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.value)}
                                                        options={BU}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[128px]"
                                                    />
                                                </div>
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        View By
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.value)}
                                                        options={BU}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[128px]"
                                                    />
                                                </div>
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        View By
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.value)}
                                                        options={BU}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[128px]"
                                                    />
                                                </div>
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        View By
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.value)}
                                                        options={BU}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[128px]"
                                                    />
                                                </div>
                                                <div className="relative cust-select">
                                                    <label
                                                        htmlFor="username"
                                                        className="absolute z-10 text-xs xl:text-[0.625vw] font-light text-[#888888] px-2 xl:px-[0.521vw] py-2 xl:py-[0.417vw]"
                                                    >
                                                        View By
                                                    </label>
                                                    <Dropdown
                                                        value={selectedCity}
                                                        onChange={(e) => setSelectedCity(e.value)}
                                                        options={BU}
                                                        optionLabel="name"
                                                        placeholder="All"
                                                        className="w-[128px]"
                                                    />
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    {/*--Filter Seaction*/}
                                </div>
                                <div className="absolute right-1 bottom-20 z-10">
                                    <div className="geomap-popup border border-[#1B1D20] rounded-[10px] p-3 xl:p-[0.833vw] w-[200px] xl:w-[16.283vw] flex flex-col items-center gap-3">
                                        <div className="text-[#FFFFFF] text-xs xl:text-[0.929vw] font-medium -tracking-[0.28px] text-center leading-5">CAABU - Cluster Wise <br></br> Ageing 90 Days</div>
                                        <div className="w-[250px] h-[200px]">
                                            <ReactEcharts option={ClusterWiseAgeing} style={{ height: "100%", width: '100%' }} />
                                        </div>

                                        <div className="w-full">
                                            <div className="grid grid-cols-3 gap-1 gap-y-2">
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#029046] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Saudi Arabia</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#F5F073] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Rome</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#4FB155] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Qatar</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#C8C846] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Kuwait</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#E1DFA9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Kenya</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#CDCB90] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">FWN Africa</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#E1DFA9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Egypt</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#A9A771] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">East Africa</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*Map Cluster Wise %*/}
                                <div className="absolute left-1 bottom-0 z-10">
                                    <div className="bg-[#221E29] rounded-lg py-1 xl:py-[0.417vw] px-2 xl:px-[0.521vw]">
                                        <div className="flex justify-between items-center gap-2">
                                            <div>
                                                <div className="text-[#F2F4F7] text-xs xl:text-[0.729vw] -tracking-[0.28px]">Cluster Wise %</div>
                                                <div className="text-[#CACED1] text-[10px] font-normal -tracking-[0.2px]">Metrics are *Metrics are selected in the metric picker in the map in...</div>
                                            </div>
                                            <div className="text-[#98A0A5] text-sm"><i className="red-tsg-map-filter"></i></div>
                                        </div>
                                        <div className="bg-[#1A181E] rounded-lg py-1 xl:py-[0.417vw] px-2 xl:px-[0.521vw]">
                                            <div className="grid grid-cols-3 gap-3 xl:gap-[0.417vw]">
                                                {/*col*/}
                                                <div className="text-center xl:py-[0.208vw] py-1 xl:px-[0.417vw] px-2">
                                                    <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs"><span className="w-4 h-4 rounded-sm bg-[#01813F] flex items-center justify-center text-[6px]"><i className="red-tsg-right-check text-white"></i></span><span>Less Than 20%</span></div>
                                                    <div className="text-[#CACED1] font-medium text-xs">&gt;	 $1 M</div>
                                                </div>
                                                {/*col*/}
                                                <div className="text-center">
                                                    <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs"><span className="w-4 h-4 rounded-sm bg-[#7B6A2E] flex items-center justify-center text-[6px]"><i className="red-tsg-right-check text-white"></i></span><span>Less Than 20%</span></div>
                                                    <div className="text-[#CACED1] font-medium text-xs">&gt;	 $1 M</div>
                                                </div>
                                                {/*col*/}
                                                <div className="text-center">
                                                    <div className="flex items-center gap-2 text-[#CACED1] font-normal text-xs"><span className="w-4 h-4 rounded-sm bg-[#9A9749] flex items-center justify-center text-[6px]"><i className="red-tsg-right-check text-white"></i></span><span>Less Than 20%</span></div>
                                                    <div className="text-[#CACED1] font-medium text-xs">&gt;	 $1 M</div>
                                                </div>
                                                {/*col*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Map Cluster Wise %*/}
                                <div className="relative h-full geo_map -z-0">
                                    <GeoMap mapProps={mapProps} onClick={() => { }} />

                                </div>
                            </div>
                            <div className="col">
                                <div className="rightCopt">
                                    <div className="flex justify-end gap-3 left-2 mt-6">
                                        <div className="text-[#4FB155] dark:text-[#B1B7BC] font-medium text-xs xl:text-[0.729vw] flex items-center space-x-2 bg-[#EEF8F4] dark:bg-[rgba(255,255,255,0.10)] border dark:border-[rgba(255,255,255,0.10)] py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] rounded-lg cursor-pointer" onClick={() => setAppliedfilter(true)}><i className="red-tsg-eye"></i><span>Show Applied Filter</span></div>
                                        <div className="text-[#4FB155] dark:text-[#CACED1] font-normal text-xs xl:text-[0.729vw] flex items-center space-x-2 py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] bg-white dark:bg-[#283C50] rounded border border-[#4FB155] dark:border-[rgba(40,60,80,0.50)] cursor-pointer" onClick={() => setMorefilter(true)}><i className="red-tsg-filter text-base"></i><span>More Filters</span></div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="dark:text-white  text-[18px] xl:text-[0.938vw] font-medium mb-3">
                                        Overall Scorecard
                                    </div>
                                    <div className="grid grid-cols-5 gap-x-[11px] xl:gap-x-[0.573vw] gap-y-[16px] xl:gap-y-[0.833vw]">
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover ">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Inventory</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[#555555] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <p className="dark:text-white text-black text-[12px] xl:text-[0.625vw] font-semibold">
                                                    $78,090,467
                                                </p>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>SIT</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Inventory Including SIT</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Accounts Receivable </p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Factoring Receivables</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Accounts Receivables Including Factoring</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Vendor Receivables</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Accounts Payable</p>
                                            </div>
                                            <div className="dark:text-[#777C81]  text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Funding</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Accounts Payable Including Funding</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[12px] xl:text-[0.625vw]">
                                                <p>Revenue</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>VAT</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Revenue Including VAT</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Accounts Payable Including Funding</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-[rgba(255,255,255,0.05)] bg-[#EEF8F4] border dark:border-[rgba(255,255,255,0.05)] border-[#CAE7CC] rounded-[8px] xl:rounded-[0.417vw] p-[8px] xl:p-[0.417vw] space-y-[7px] overScor_hover">
                                            <div className="dark:text-[#CACED1] text-[#344054] text-[12px] xl:text-[0.625vw]">
                                                <p>Accounts Payable Including Funding</p>
                                            </div>
                                            <div className="dark:text-[#777C81] text-[12px] xl:text-[0.625vw] font-light">
                                                <p>Grand Total - April - US$</p>
                                            </div>
                                            <div className="flex space-x-[10px] xl:space-x-[0.521vw]">
                                                <div className="dark:text-white text-[12px] xl:text-[0.625vw] font-semibold">
                                                    <p>$78,090,467</p>
                                                </div>
                                                <div className="text-[#649A4A] text-[12px] xl:text-[0.625vw] flex">
                                                    <i class="arrowwk red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                    <span>+2.%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-[40px] xl:mt-[2.083vw] bg-white dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)]">
                                    <ChartWrapper
                                        title={activeIndex === 0 ? "Working Capital Summary - April Vs May 23- US$" : activeIndex === 1 ?
                                            "Working Capital - April vs May 2023 " : activeIndex === 2 ? "Working Capital - June Vs July " : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex(0)}>Summary - April Vs May</Tab>
                                                            <Tab onClick={() => setActiveIndex(1)}>April vs May 23</Tab>
                                                            <Tab onClick={() => setActiveIndex(2)}>June Vs July</Tab>

                                                        </TabList>
                                                        <TabPanel >
                                                            <div className="relative">
                                                                {/* <ReactEcharts
                                    option={totalInventoryTab}
                                    style={{ width: "100%", height: "450px" }}
                                    /> */}
                                                                <ReactEcharts
                                                                    option={aprilmayus}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel >
                                                            <div className="relative">
                                                                <ReactEcharts
                                                                    option={aprilmay}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel >
                                                            <div className="relative">
                                                                <ReactEcharts
                                                                    option={clusterTab}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                    </div>
                                                </Tabs>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="mt-[24px] xl:mt-[1.250vw]">
                            <div className="grid grid-cols-2 gap-[24px] xl:gap-[1.250vw] mb-[24px] xl:mb-[1.250vw]">
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={activeIndex1 === 0 ? "Inventory in US$" : activeIndex1 === 1 ? "Inventory INCL SIT - In Us $" : activeIndex1 === 2 ? "Inventory, SIT and Inventory INCL SIT" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex1(0)}>Inventory in US$</Tab>
                                                            <Tab onClick={() => setActiveIndex1(1)}>Inventory INCL SIT</Tab>
                                                            <Tab onClick={() => setActiveIndex1(2)}>Inventory, SIT and Inventory INCL SIT</Tab>
                                                        </TabList>
                                                        <TabPanel >
                                                            <div className="relative">

                                                                <ReactEcharts
                                                                    option={cluster}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Grand Total <span className="font-semibold"> $348M</span></div>
                                                                {/* <div className="text-[#C8CBD0] text-sm xl:text-[0.833vw] font-normal absolute -top-7 bg-[#283C50] px-2 py-1 rounded-md">Grand Total  $348M</div> */}
                                                                <ReactEcharts
                                                                    option={vendors}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                <ReactEcharts
                                                                    option={inventorysit}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                    </div>
                                                </Tabs>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={activeIndex2 === 0 ? "Factoring Receivables - in US $" : activeIndex2 === 1 ? "Account Receivables INCL Factoring" : activeIndex2 === 2 ? "Accounts Receivables - In US $" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex2(0)}>Factoring</Tab>
                                                            <Tab onClick={() => setActiveIndex2(1)}>INCL Factoring</Tab>
                                                            <Tab onClick={() => setActiveIndex2(2)}>Accounts</Tab>
                                                        </TabList>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Grand Total <span className="font-semibold"> $300M</span></div>
                                                                <ReactEcharts
                                                                    option={factoring}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Grand Total <span className="font-semibold"> $205K</span></div>
                                                                <ReactEcharts
                                                                    option={inclfactoring}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Grand Total <span className="font-semibold"> $$232K</span></div>
                                                                <ReactEcharts
                                                                    option={PriceRangeTracking}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                    </div>
                                                </Tabs>
                                            </>
                                        }
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[24px] xl:gap-[1.250vw]">
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={"SIT - In US $"}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>

                                                <div className="relative mt-8">
                                                    <ReactEcharts
                                                        option={topCustomers}
                                                        style={{ width: "100%", height: "450px" }}
                                                    />
                                                </div>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={activeIndex3 === 0 ? "Ratio - April 2023" : activeIndex3 === 1 ? "Ratios - BU" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex3(0)}>April23'</Tab>
                                                            <Tab onClick={() => setActiveIndex3(1)}>BU</Tab>
                                                        </TabList>
                                                        <TabPanel>
                                                            <ReactEcharts
                                                                option={AprilTreemap}
                                                                style={{ width: "100%", height: "450px" }}
                                                            />
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                <ReactEcharts
                                                                    option={unitwiseBU}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>

                                                    </div>
                                                </Tabs>

                                            </>
                                        }
                                    />
                                </div>
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)] border dark:border-[rgba(255,255,255,0.05)] rounded-lg shadow-[0px_2px_5px_rgba(0,0,0,0.05)] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={"Inventory Turnover Value Quarterly - In US $"}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <div className="relative">
                                                    <ReactEcharts
                                                        option={bu}
                                                        style={{ width: "100%", height: "400px" }}
                                                    />
                                                    {/* <div className="text-[#808989] text-sm font-medium absolute echartleft-text">
                                                        Cluster
                                                    </div>
                                                    <div className="text-[#808989] text-sm font-medium absolute echartbottom-text">
                                                        Values in $
                                                    </div> */}
                                                </div>
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[24px] xl:mt-[1.250vw] mb-[20px] custTabs">
              <Tabs>
                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white shadow-[0px_5px_5px_0px_rgba(0,0,0,0.08)] rounded-[8px] xl:rounded-[0.417vw] p-[10px]">
                  <div className="relative">
                    <div className="absolute right-0 top-[10px]">
                      <Link href={""}>
                        <i className="red-tsg-volume text-[#555555] text-[18px] xl:text-[0.938vw]"></i>
                      </Link>
                    </div>
                    <TabList>
                      <Tab>Key Insights</Tab>
                      <Tab>Notes</Tab>
                    </TabList>
                    <TabPanel>
                      <ul className="tabList">
                        <li>
                          1. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          2. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          3. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          4. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                      </ul>
                    </TabPanel>
                    <TabPanel>
                      <ul className="tabList">
                        <li>
                          1. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          2. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          3. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          4. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          5. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          6. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          7. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                        <li>
                          8. The Approval Rate is falling short of Target by
                          more than 10% in month of April
                        </li>
                      </ul>
                    </TabPanel>
                  </div>
                </div>
              </Tabs>
            </div>
                    </div>

                    {/*--show Applied Filter--*/}
                    <Sidebar visible={Appliedfilter} position="right" onHide={() => setAppliedfilter(false)} style={{ width: '30vw' }} className="timeline-filter-sidebar">
                        <div className='xl:p-[1.250vw] p-5'>
                            <div className='flex justify-between items-center'>
                                <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Applied Filters</div>
                                <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setAppliedfilter(false)}><i className='red-tsg-close'></i></div>
                            </div>
                            <div className="xl:mt-[1.250vw] mt-5 lg:h-[75vh]">
                                {/*checkbox Start*/}
                                <div className="mt-5">
                                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                        Financial Year
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>2022</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>2023</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                    </div>
                                </div>
                                {/*checkbox end*/}
                                {/*checkbox Start*/}
                                <div className="mt-8">
                                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                        Quarter
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q1</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q2</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q3</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Q4</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                    </div>
                                </div>
                                {/*checkbox end*/}
                                {/*checkbox Start*/}
                                <div className="mt-8">
                                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                        Month
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Feb</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Mar</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Jun</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Nov</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                    </div>
                                </div>
                                {/*checkbox end*/}
                                {/*checkbox Start*/}
                                <div className="mt-8">
                                    <div className="text-[#344054] dark:text-[#667085] font-medium xl:text-[0.729vw] text-xs">
                                        Week
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-4">
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 10</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 30</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 31</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 49</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 50</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                        <div className="dark:bg-[#344054] bg-[#EDF7EE] py-1 px-2 rounded-lg flex items-center gap-2 cursor-pointer" >
                                            <div className="dark:text-[#E4E7EC] text-[#344054] font-medium text-sm xl:text-[0.885vw]"><span>Week 52</span></div>
                                            <div className="w-4 h-4 rounded-full dark:bg-[#101828] bg-[#CAE7CC] dark:text-[#FFFFFF] text-[#377B3B] text-[6px] flex items-center justify-center">
                                                <i className="red-tsg-close"></i></div>
                                        </div>
                                    </div>
                                </div>
                                {/*checkbox end*/}
                            </div>

                            <div className='grid grid-cols-2 gap-3 mt-5'>
                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setAppliedfilter(false)}>Clear Filter</div>
                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setTimelinefilter(true)}>Edit Filter</div>
                            </div>

                        </div>
                    </Sidebar>
                    {/*--show Applied Filter--*/}

                    {/*--More Filter--*/}
                    <Sidebar visible={morefilter} position="right" onHide={() => setMorefilter(false)} style={{ width: '30vw' }} className="timeline-filter-sidebar">
                        <div className='xl:p-[1.250vw] p-5'>
                            <div className='flex justify-between items-center'>
                                <div className='text-[#344054] dark:text-[#F2F4F7] font-semibold text-2xl xl:text-[1.563vw]'>Filter</div>
                                <div className='bg-[#F9FAFB] dark:bg-[#667085] text-[#344054] dark:text-[#F2F4F7] rounded boxshadow1 px-2 py-1 cursor-pointer' onClick={() => setMorefilter(false)}><i className='red-tsg-close'></i></div>
                            </div>
                            <div className='xl:mt-[1.250vw] mt-5 xl:p-[0.833vw] p-3  dark:border-[#171618] dark:bg-[#171618] rounded lg:h-[auto]'>
                                <div class="timeline-tab">

                                    <TabView>
                                        <TabPanel header=" &nbsp; &nbsp; Basic">
                                            <div className='filter-basictab'>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Inventory</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Receivables</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Accounts Payable</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Funding</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Revenue</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">VAT</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Working Capital</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Over Due Accounts Receivables</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">Ageing Inventory</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='col mt-3 '>
                                                    <label className="text-[#667085] text-[14px] xl:text-[0.729vw] font-medium mb-[10px] xl:mb-[0.521vw] inline-block" for="username">DIO</label>
                                                    <Dropdown optionLabel="name" placeholder="All"
                                                        className="w-full md:w-14rem h-[3vw] dark:bg-[#232527] dark:text-[#C6CBD2] border border-[#C6CBD2] dark:border-[rgba(221,232,237,0.10)]" />
                                                </div>
                                                <div className='grid grid-cols-2 gap-3 mt-8 mb-5'>
                                                    <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Clear Filter</div>
                                                    <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Apply Filter</div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        <TabPanel header=" &nbsp;Timeline">

                                            {/*checkbox Start*/}
                                            <div className="font-medium xl:text-[0.729vw] text-xs mt-5">
                                                Financial Year
                                            </div>
                                            <div className="mt-3 grid grid-cols-6 gap-4 text-[#344054] dark:text-[#667085] ">
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2023
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2022
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2021
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2020
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2019
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2018
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2017
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2016
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2015
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        2014
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="font-medium xl:text-[0.729vw] text-xs mt-5">
                                                Select Quarter
                                            </div>
                                            <div className="mt-3 grid grid-cols-6 gap-4 text-[#344054] dark:text-[#667085] ">
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        All
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        Q1
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        Q2
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        Q3
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox
                                                        inputId="ingredient1"
                                                        name="pizza"
                                                        value="Cheese"
                                                        onChange={onIngredientsChange}
                                                        checked={ingredients.includes("Cheese")}
                                                    />
                                                    <label
                                                        htmlFor="ingredient1"
                                                        className="ml-2 font-medium text-xs"
                                                    >
                                                        Q4
                                                    </label>
                                                </div>
                                            </div>

                                            {/*checkbox end*/}


                                            <div className='grid grid-cols-2 gap-3 mt-[380px] mb-5'>
                                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(198,203,210,0.20)] boxshadow1 bg-white dark:bg-[#0F1013] text-[#344054] dark:text-[#9EA0A5] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Clear Filter</div>
                                                <div className='rounded-lg border border-[#C6CBD2] dark:border-[rgba(255,255,255,0.05)] boxshadow1 bg-[#029046] dark:bg-[#01813F] text-[#FFFFFF] dark:text-[rgba(231 224 224)] text-center text-sm xl:text-[0.833vw] py-2 xl:py-[0.521vw] cursor-pointer' onClick={() => setMorefilter(false)}>Apply Filter</div>
                                            </div>
                                        </TabPanel>

                                    </TabView>

                                </div>

                            </div>
                        </div>
                    </Sidebar>
                    {/*--More Filter--*/}
                </div>
            </Layout>
        </>
    );
}
