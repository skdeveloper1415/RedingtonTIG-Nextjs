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
import { Checkbox } from "primereact/checkbox";

const myinter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export default function Index() {
    const [morefilter, setMorefilter] = useState(false);
    const [Appliedfilter, setAppliedfilter] = useState(false);
    const [Timelinefilter, setTimelinefilter] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    }

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

    const [selectedSummary, setSelectedSummary] = useState(null);
    const summary = [
        { name: "Default", code: "NY" },
        { name: "Inventory", code: "BR" },
        { name: "Receivables", code: "BUN" },
    ];
    const onClickNavigate = async (e) => {
        console.log(e)
        if (e.value.code === "BR") {
            window.location.href = "/workingcapital/summary/inventory"
        } else if (e.value.code === "BUN") {
            window.location.href="/workingcapital/summary/receivables"
        }else if (e.value.code === "NY") {
            window.location.href="/workingcapital/summary"
        }
    }

    /*--prime-select--*/
   

    const totalInventoryTab = {
        tooltip: {},
        backgroundColor:currentTheme == 'dark' ? '#0F1013' : 'white',
        legend: {
            show: true,
            bottom: 0,
            left: 0,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "#fff",
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
                color: "#CACED1",
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
                color: "#CACED1",
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
                color: "#CACED1",
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
                color: "#CACED1",
            },
        },
        series: [
            {
                name: "Professional Service",
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
                name: "Software",
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
                color: "#fff",
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
                color: "#CACED1",
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
                color: "#CACED1",
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
                color: "#CACED1",
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
                color: "#CACED1",
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
                color: "#FFFFFF"
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
                color: "#fff",
            },
        },
        xAxis: {
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
                color: "#CACED1",
                width: 100,
                height: 100,
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
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            nameGap: 50,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 12,
                color: "#CACED1",
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 400,
            interval: 100,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            axisLabel: {
                fontSize: 12,
                color: "#CACED1",
                formatter: "${value}M",
            },

            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: "#CACED1",
            },
        },
        series: [
            {
                name: "Professional Services",
                data: [
                    {
                        value: 251,
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
                        value: 348,
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
                        value: 276,
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
                        value: 380,
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
                        value: 179,
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
                        value: 355,
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
                color: "#DAD562",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 38,
                barGap: 0.05,
            },
            {
                name: "Software",
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
                color: "#fff",
            },
        },
        xAxis: {
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
                color: "#CACED1",
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
                show: false,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            nameGap: 50,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 12,
                color: "#CACED1",
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 400,
            interval: 100,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2B2F31",
                },
            },
            axisLabel: {
                fontSize: 12,
                color: "#CACED1",
                formatter: "${value}M",
            },

            nameGap: 50,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: "#CACED1",
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
                            color: "#fff"
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
                            color: "#fff"
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
                            color: "#fff"
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
                            color: "#fff"
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
                            color: "#fff"
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
                        value: 130,
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
                        value: 145,
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
                name: "By BU",
                type: "pie",
                radius: "70%",
                center: ["50%", "45%"],
                roseType: "area",
                color: ["#167739", "#545528", "#91A845", "#A9C09D"],
                data: [
                    { value: 45, name: "1st Quarter (April - June)" },
                    { value: 49, name: "2nd Quarter (July - Sept)" },
                    { value: 50, name: "3rd Quarter ( Oct - Dec)" },
                    { value: 55, name: "4th Quarter (Jan - Mar)" },

                ],
                label: {
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                    lineHeight: 20,
                    formatter: "${c}K  \n {b}",
                },

            },
        ],
    };

    const inventoryapril = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "4%",
            bottom: "10%",
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
                formatter: "${value}M",
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
            name: 'Values in $',
            nameGap: 40,
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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
            name: 'Inventory',
            
            nameGap: 60,
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
                data: [4, 4.2, 6.5, 5, 6, 8],
                type: "bar",
                stack: "total",
                color: "#7C7E41",
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
    const inventoryussit = {
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
                    type:"line",
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
            max: 350,
            interval: 50,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "line",
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
                formatter: "${value}K",
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
                data: [190, 230, 165, 90, 314, 104],
                type: "bar",
                stack: "total",
                color: "#187B3A",
                barWidth: 50,
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: "\n ${c}M",
                    align: "center",
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#000000' : '#ffff',
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
                    type: "",
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
            name:"Months",
            nameGap: 40,
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
            interval: 20,
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
            name:"Values in $",
            nameGap: 46,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 10,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "1st Quarter",
                data: [
                    {
                        value: 57,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 78,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 65,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },

                ],
                type: "bar",
                color: "#187B3A",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 45,
                barGap: 0.05,
            },
            {
                name: "2nd Quarter",
                data: [
                    {
                        value: 62,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 37,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 52,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                ],
                type: "bar",
                color: "#545528",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 45,

            },
            {
                name: "3rd Quarter",
                data: [
                    {
                        value: 92,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 99,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 85,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                ],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 45,
                barGap: 0.05,
            }
        ],
    };

    //
    const buwise = {
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
                "Quarter 1",
                "Quarter 2",
                "Quarter 3",
                "Quarter 4",
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
                    type: "",
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
            name:"Quarter",
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
            max: 1000,
            interval: 200,
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
                formatter: "${value}K",
            },
            name:"Values",
            nameGap: 52,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Inventory",
                data: [
                    {
                        value: 620,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 780,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 560,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 700,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },

                ],
                type: "bar",
                color: "#187B3A",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 35,
                barGap: 0.05,
            },
            {
                name: "SIT",
                data: [
                    {
                        value: 780,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 920,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 800,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 520,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                ],
                type: "bar",
                color: "#545528",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 35,

            },
            {
                name: "Inventory Including SIT",
                data: [
                    {
                        value: 800,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 500,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 640,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 620,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                ],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 35,
                barGap: 0.05,
            }
        ],
    };
    const inventoryratio = {
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
                "DNWC",
                "DSO",
                "DIO",
                "DPO",
                // "DVRO",
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
                    type: "",
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
            name:"Inventory",
            nameGap: 40,
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
                formatter: "{value}",
            },
            name:"Values",
            nameGap: 30,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "June",
                data: [
                    {
                        value: 62,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 78,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 54,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 54,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 54,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },

                ],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    //   borderRadius: [4, 4, 0, 0],
                },
                barWidth: 40,
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barGap: 0.05,
            },
            {
                name: "July",
                data: [
                    {
                        value: 75,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
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
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 80,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 50,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                ],
                type: "bar",
                color: "#AD943A",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 40,

            },
            {
                name: "August",
                data: [
                    {
                        value: 60,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 50,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 69,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                    {
                        value: 65,
                        label: {
                            show: true,
                            position: 'insideTop',
                            // formatter: "\n ${c}M",
                            align: "center",
                            fontSize: 10,
                            color: "#fff"
                        }
                    },
                ],
                type: "bar",
                color: "#545528",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 40,
                barGap: 0.05,
            },
            
        ],
    };

    const inventory = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "4%",
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
                "UAE",
                "South Africa",
                "Rome",
                "Qatar",
                "Kuwait",
                "Kenya",
                "FWN Africa",
                "Egypt",
                "East Africa",
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
            max: 7,
            interval: 1,
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
            nameGap: 40,
            nameLocation: 'middle',
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Value",
                data: [3.2, 4.3, 2.2, 5.0, 5.2, 6.0, 4.2, 2.9, 6.8],
                type: "bar",
                stack: "total",
                color: "#AD943A",
                barWidth: 50,
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: "\n ${c}M",
                    align: "center",
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#000000' : '#fff',
                }
            },
        ],
    };

    const sit = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "4%",
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
                "UAE",
                "South Africa",
                "Rome",
                "Qatar",
                "Kuwait",
                "Kenya",
                "FWN Africa",
                "Egypt",
                "East Africa",
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
                    type: "line",
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
            max: 7,
            interval: 1,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "line",
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
            nameGap: 40,
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
                data: [4.2, 3.4, 6.6, 4.0, 4.4, 4.3, 6.9, 4.9,5.1],
                type: "bar",
                stack: "total",
                color: "#AD943A",
                barWidth: 50,
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: "\n ${c}M",
                    align: "center",
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#000000' : '#ffff',
                }
            },
        ],
    };

    const inventoryincludesit = {
        tooltip: {},
        grid: {
            top: "10%",
            right: "0%",
            bottom: "15%",
            left: "4%",
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
                "UAE",
                "South Africa",
                "Rome",
                "Qatar",
                "Kuwait",
                "Kenya",
                "FWN Africa",
                "Egypt",
                "East Africa",
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
                    type: "line",
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
            max: 7,
            interval: 1,
            axisLine: {
                show: true,
                lineStyle: {
                    type: "line",
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
            nameGap: 40,
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
                data: [4.2, 3.4, 6.6, 4.0, 4.4, 4.3, 6.9, 4.9,5.1],
                type: "bar",
                stack: "total",
                color: "#AD943A",
                barWidth: 50,
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                label: {
                    show: true,
                    position: 'insideTop',
                    formatter: "\n ${c}M",
                    align: "center",
                    fontSize: 10,
                    color: currentTheme == 'dark' ? '#000000' : '#ffff',
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
                color: "#fff",
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
                color: "#CACED1",
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
            name: 'Values in $',
            nameGap: 40,
            nameLocation: 'middle',
            nameTextStyle: {
                fontSize: 12,
                color: '#CACED1',
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
                    color: "#2B2F31",
                },
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                fontSize: 12,
                color: "#CACED1",
                formatter: "{value}K",
            },
            name: 'Values in $',
            nameGap: 50,
            nameLocation: 'middle',
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: '#CACED1',
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
                    color: '#CACED1',
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
                    color: "#3c4142",
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
                color: "#CACED1",
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
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
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

    const workingcapital = {
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
                "Quarter 1",
                "Quarter 2",
                "Quarter 3",
                "Quarter 4",
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
                    type: "",
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
            name:"Quarter",
            nameGap: 40,
            nameLocation: "middle",
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        yAxis: {
            type: "value",
            min: 0,
            max: 1000,
            interval: 200,
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
                formatter: "${value}K",
            },
            name:"Values in US $",
            nameGap: 52,
            nameLocation: "middle",
            nameRotate: 90,
            nameTextStyle: {
                fontSize: 12,
                color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            },
        },
        series: [
            {
                name: "Inventory",
                data: [
                    {
                        value: 750,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 780,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 480,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 620,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },

                ],
                type: "bar",
                color: "#187B3A",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 35,
                barGap: 0.05,
            },
            {
                name: "SIT",
                data: [
                    {
                        value: 500,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 900,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 820,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 650,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                ],
                type: "bar",
                color: "#545528",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 35,

            },
            {
                name: "Inventory Including SIT",
                data: [
                    {
                        value: 580,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 500,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 650,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                    {
                        value: 820,
                        label: {
                            show: true,
                            position: 'insideTop',
                            formatter: "\n ${c}K",
                            align: "center",
                            fontSize: 10,
                            color: currentTheme == 'dark' ? '#000000' : '#ffff',
                        }
                    },
                ],
                type: "bar",
                color: "#DAD562",
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                },
                barWidth: 35,
                barGap: 0.05,
            }
        ],
    };


    // Ratio - Inventory QoQ
    const inventoryqoq = {
        tooltip: {},
        legend: {
          show: true,
          bottom: 0,
          left: 0,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: currentTheme == 'dark' ? '#CACED1' : '#222222',
            fontSize:11
          },
        },
        grid: {
          top: "5%",
          right: "0%",
          bottom: "15%",
          left: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
          axisLabel: {
            fontSize: 11,
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
          // splitLine: {
          //   show: true,
          //   lineStyle: {
          //     type: "dashed",
          //     color: "#2B2F31",
          //   },
          // },
          name: "Quarter",
          nameGap: 20,
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 11,
            color: currentTheme == 'dark' ? '#CACED1' : '#222222',
          },
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          interval: 20,
          name: "Values in $",
          nameGap: 30,
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
            show: true,
            lineStyle: {
                   type: "dashed",
                   color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                }
          },
          axisLabel: {
            fontSize: 10,
            color: currentTheme == 'dark' ? '#CACED1' : '#222222',
          },
        },
        series: [
          {
            name: "OBU",
            stack: "inventory",
            data: [90,90,90,42],
            type: "bar",
            color: "#DAD562",
            barGap: '5%',
            barCategoryGap: '15%',
            label: {
              show: true,
              position: "insideTop",
              color: currentTheme == 'dark' ? '#000000' : '#ffff',
              fontSize: 10,
              padding: [10, 0, 0, 0],
            },
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
            },
          },
          {
            name: "NBU",
            stack: "provisional",
            data: [93,82,95,58],
            type: "bar",
            color: "#AD943A",
           barGap: '5%',
            barCategoryGap: '15%',
            label: {
              show: true,
              position: "insideTop",
              color: currentTheme == 'dark' ? '#000000' : '#ffff',
              fontSize: 10,
              padding: [10, 0, 0, 0],
            },
            itemStyle: {
              borderRadius: [2, 2, 0, 0],
            },
          },
          {
            name: "IBU",
            stack: "provisionalB2b",
            data: [70,75,52,95],
            type: "bar",
            color: "#545528",
            barGap: '5%',
            barCategoryGap: '15%',
            label: {
              show: true,
              position: "insideTop",
              fontSize: 10,
              padding: [10, 0, 0, 0],
            },
            itemStyle: {
               borderRadius: [2, 2, 0, 0],
            },
          },
          {
            name: "ESBU",
            stack: "inventoryB2B",
            data: [50,68,89,65],
            type: "bar",
            color: "#1E2827",
           barGap: '5%',
            barCategoryGap: '15%',
            label: {
              show: true,
              position: "insideTop",
              fontSize: 10,
              padding: [10, 0, 0, 0],
            },
            itemStyle: {
           borderRadius: [2, 2, 0, 0],
            },
          },
          {
            name: "DigiGlas",
            stack: "inventorycv1",
            data: [80,55,70,50],
            type: "bar",
            color: "#667085",
          barGap: '5%',
            barCategoryGap: '15%',
            label: {
              show: true,
              position: "insideTop",
              fontSize: 10,
              padding: [10, 0, 0, 0],
            },
            itemStyle: {
               borderRadius: [2, 2, 0, 0],
            },
          },
          {
            name: "CAABU",
            stack: "inventorycv2",
            data: [95,47,70,95],
            type: "bar",
            color: "#B3B3B3",
            barGap: '5%',
            barCategoryGap: '15%',
            label: {
              show: true,
              position: "insideTop",
              color: currentTheme == 'dark' ? '#000000' : '#ffff',
              fontSize: 10,
              padding: [10, 0, 0, 0],
            },
            itemStyle: {
             borderRadius: [2, 2, 0, 0],
            },
          }
        ],
      };
    // Ratio - Inventory QoQ

    const AprilTreemap = {
        legend:{
           show:true
        },
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
                        name: 'Mustafa Sultan Office Techno, Co',
                        value: "329000",
                        itemStyle: {
                            color: '#8C8A48'
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
                // color: currentTheme == 'dark' ? '#363A44' : 'white',
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
                // color: currentTheme == 'dark' ? '#767A87' : '#fff',
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
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                    fontSize: 10,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    color: currentTheme == 'dark' ? '#2B2F31' : '#E6E6E6',
                },

                name: 'Inventory',
                nameGap: 40,
                nameLocation: 'middle',
                nameTextStyle: {
                    fontSize: 12,
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                },
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
                },
                name: 'Values in $',
                nameGap: 50,
                nameLocation: 'middle',
                nameRotate: 90,
                nameTextStyle: {
                    fontSize: 12,
                    color: currentTheme == 'dark' ? '#CACED1' : '#222222',
                },
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
    const [activeIndex4, setActiveIndex4] = useState(0);


    console.log("activeInex", activeIndex);
    return (
        <>
            <Layout pageTitle="Summary">
                <div className={myinter.className}>
                    <div className="flex gap-0.5 items-start bg-[#E5F3EC] dark:bg-[#15171B] w-full fixed z-[999] xl:top-[5vw] 2xl:top-[4.89vw]">
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
                                                        placeholder="Inventory"
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
                            {/*left col*/}

                            {/*right col*/}
                            {/* <div>
                                <TimelineComponent />
                            </div> */}
                            {/*right col*/}
                        </div>
                        {/*--Filter Seaction*/}

                        <div className="grid grid-cols-2 gap-[24px] xl:gap-[1.250vw]">
                            <div className="col relative">
                                <div className="absolute right-1 bottom-20 z-10">
                                    <div className="geomap-popup border border-[#1B1D20] rounded-[10px] p-3 xl:p-[0.833vw] w-[200px] xl:w-[16.283vw] flex flex-col items-center gap-3">
                                        <div className="text-[#FFFFFF] text-xs xl:text-[0.929vw] font-medium -tracking-[0.28px] text-center leading-5">Region Wise Working<br></br>Capital - In US $</div>
                                        <div className="w-[250px] h-[200px]">
                                            <ReactEcharts option={ClusterWiseAgeing} style={{ height: "100%", width: '100%' }} />
                                        </div>

                                        <div className="w-full">
                                            <div className="grid grid-cols-3 gap-1 gap-y-2">
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#256D85] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Saudi Arabia</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#2794B9] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Rome</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#FCA400] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Qatar</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#FFCB6A] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Kuwait</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#46A2F6] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Kenya</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#A5D4FF] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">FWN Africa</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#029046] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
                                                    <div className="text-[#FFFFFF] font-normal text-[10px]">Egypt</div>
                                                    <div className="text-[#F9F7F4] font-semibold text-xs">$2.2M</div>
                                                    <div className="text-[#767A87] font-normal text-xs space-x-1"><i className="red-tsg-up-rounded-arrow"></i><span>+2%</span></div>
                                                </div>
                                                {/*col*/}
                                                {/*col*/}
                                                <div className="flex flex-col items-center gap-y-1">
                                                    <div className="bg-[#FFFFFF] w-[10.8px] h-[10.8px] rounded-[1.8px]"></div>
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
                            <div className="grid justify-end">
                                    <div className="flex justify-end gap-3 left-2 mt-[-40px]">
                                        <div className="text-[#4FB155] dark:text-[#B1B7BC] font-medium text-xs xl:text-[0.729vw] flex items-center space-x-2 bg-[#EEF8F4] dark:bg-[rgba(255,255,255,0.10)] border dark:border-[rgba(255,255,255,0.10)] py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] rounded-lg cursor-pointer" onClick={() => setAppliedfilter(true)}><i className="red-tsg-eye"></i><span>Show Applied Filter</span></div>
                                        <div className="text-[#4FB155] dark:text-[#CACED1] font-normal text-xs xl:text-[0.729vw] flex items-center space-x-2 py-3 xl:py-[0.833vw] px-2 xl:px-[0.833vw] bg-white dark:bg-[#283C50] rounded border border-[#4FB155] dark:border-[rgba(40,60,80,0.50)] cursor-pointer" onClick={() => setMorefilter(true)}><i className="red-tsg-filter text-base"></i><span>More Filters</span></div>
                                    </div>
                                </div>
                                <div className="dark:text-white text-[18px] xl:text-[0.938vw] font-medium mb-3 mt-5">
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
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
                                                <i class="red-tsg-up-line-arrow inline-flex justify-center items-center text-[8px] text-white w-[14px] h-[14px] rounded-full bg-[#02A666] mr-1"></i>
                                                <span>+2.%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="mt-[40px] xl:mt-[2.083vw] dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2"> 
                                    <ChartWrapper
                                        title={activeIndex === 0 ? "Region Wise - Inventory" : activeIndex === 1 ?
                                            "Region Wise - SIT" : activeIndex === 2 ? "Region Wise - Inventory Including SIT" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex(0)}>Inventory</Tab>
                                                            <Tab onClick={() => setActiveIndex(1)}>SIT</Tab>
                                                            <Tab onClick={() => setActiveIndex(2)}>Inventory Including SIT</Tab>

                                                        </TabList>
                                                        <TabPanel >
                                                            <div className="relative">
                                                            <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Total <span className="font-semibold"> $50M</span></div>
                                                                <ReactEcharts
                                                                    option={inventory}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel >
                                                        
                                                            <div className="relative">
                                                            <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Total <span className="font-semibold"> $50M</span></div>
                                                                <ReactEcharts
                                                                    option={sit}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel >
                                                        
                                                            <div className="relative">
                                                            <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Total <span className="font-semibold"> $50.3M</span></div>
                                                                <ReactEcharts
                                                                    option={inventoryincludesit}
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
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] rounded-[8px] xl:rounded-[0.417vw] boxshadow2">
                                    <ChartWrapper
                                        title={activeIndex1 === 0 ? "Inventory - In US $ - April 2023" : activeIndex1 === 1 ? "Inventory - SIT in  US $" : activeIndex1 === 2 ? "Inventory - Including SIT in US $" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex1(0)}>Inventory</Tab>
                                                            <Tab onClick={() => setActiveIndex1(1)}>SIT</Tab>
                                                            <Tab onClick={() => setActiveIndex1(2)}>Inventory Including SIT</Tab>
                                                        </TabList>
                                                        <TabPanel >
                                                            <div className="relative">

                                                                <ReactEcharts
                                                                    option={inventoryapril}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                
                                                                <ReactEcharts
                                                                    option={inventoryussit}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                            <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Total <span className="font-semibold"> $51.3M</span></div>
                                                                <ReactEcharts
                                                                    option={PriceRangeTracking}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                    </div>
                                                </Tabs>
                                            </>
                                        }
                                    />
                                </div>
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] boxshadow2 rounded-[8px] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={activeIndex2 === 0 ? "Ratio - April 2023 (Relevant Ratio for Inventory)" : activeIndex2 === 1 ? "Ratio - Inventory Ratio - June, July and August" : activeIndex2 === 2 ? "Ratio - Inventory QoQ" : activeIndex2 === 3 ? "Ratios - BU 2023" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex2(0)}>April 23’</Tab>
                                                            <Tab onClick={() => setActiveIndex2(1)}>Inventory (Jun, Jul, Aug)</Tab>
                                                            <Tab onClick={() => setActiveIndex2(2)}>Inventory QoQ </Tab>
                                                            <Tab onClick={() => setActiveIndex2(3)}>BU 23’</Tab>
                                                        </TabList>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                
                                                                <ReactEcharts
                                                                    option={AprilTreemap}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                
                                                                <ReactEcharts
                                                                    option={inventoryratio}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                                
                                                                <ReactEcharts
                                                                    option={inventoryqoq}
                                                                    style={{ width: "100%", height: "400px" }}
                                                                />
                                                            </div>
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
                            </div>


                            <div className="grid grid-cols-2 gap-[24px] xl:gap-[1.250vw] mb-[24px] xl:mb-[1.250vw]">
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] boxshadow2 rounded-[8px] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={activeIndex4 === 0 ? "Inventory,SIT and Inventory Incl SIT" : activeIndex4 === 1 ? "Average Inventory Turnover Value Quarterly - In US $" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex4(0)}>Inventory SIT & Incl SIT</Tab>
                                                            <Tab onClick={() => setActiveIndex4(1)}>Inventory Quarterly</Tab>
                                                        </TabList>
                                                        <TabPanel>
                                                        <ReactEcharts
                                                                    option={inventorysit}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                            <div className="text-sm xl:text-[0.633vw] font-normal absolute -top-7 dark:bg-[#283C50] dark:text-[#C8CBD0] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Total <span className="font-semibold">$1,99,000</span></div>
                                                            
                                                            <ReactEcharts
                                                                option={bu}
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
                                <div className="dark:bg-[rgba(255,255,255,0.02)] bg-white border dark:border-[rgba(255,255,255,0.05)] boxshadow2 rounded-[8px] xl:rounded-[0.417vw]">
                                    <ChartWrapper
                                        title={activeIndex3 === 0 ? "Inventory Including SIT - Working Capital Management" : activeIndex3 === 1 ? "Inventory Including SIT - BU Wise" : null}
                                        maximizeIcon={true}
                                        ExportIcon={true}
                                        data={
                                            <>
                                                <Tabs>
                                                    <div className="echartTabs">
                                                        <TabList>
                                                            <Tab onClick={() => setActiveIndex3(0)}>Working Capital Management</Tab>
                                                            <Tab onClick={() => setActiveIndex3(1)}> BU Wise</Tab>
                                                        </TabList>
                                                        <TabPanel>
                                                        <div className="relative">
                                                        <div className="flex dark:text-[#C8CBD0] text-sm xl:text-[0.633vw] font-normal absolute -top-7 gap-3 "><span className="dark:bg-[#283C50] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Q1 Total <span className="font-semibold">$2,568,349.57</span></span><span className="dark:bg-[#283C50] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Q1 Total<span className="font-semibold"> $2,244,380.54</span></span><span className="dark:bg-[#283C50] bg-[#EEF8F4] border border-[#CAE7CC] px-2 py-1 rounded-md">Q1 Total <span className="font-semibold">$1,534,043.51</span></span></div>
                                                        <ReactEcharts
                                                                    option={workingcapital}
                                                                    style={{ width: "100%", height: "450px" }}
                                                                />
                                                                </div>
                                                        </TabPanel>
                                                        <TabPanel>
                                                            <div className="relative">
                                                            <ReactEcharts
                                                                    option={buwise}
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
