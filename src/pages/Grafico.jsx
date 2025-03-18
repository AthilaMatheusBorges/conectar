import React from "react";
import { useContext } from "react";
import { ApiContext } from "../context/apiContext";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registrar componentes do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Grafico = () => {
    const { pib, pibPerCapita, anos } = useContext(ApiContext);

    // Configuração dos dados para o gráfico
    const data = {
        labels: anos,
        datasets: [
            {
                label: "PIB (trilhões de dólares)",
                data: pib,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
                yAxisID: "y1",
                fill: false,
            },
            {
                label: "PIB Per Capita(milhares de doláres)",
                data: pibPerCapita,
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderWidth: 2,
                yAxisID: "y2",
                fill: false,
            },
        ],
    };

    // Configuração das opções do gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
                },
            },
        },
        scales: {
            y1: {
                beginAtZero: true,
                type: "linear",
                position: "left",
                title: { display: true, text: "PIB" },
                ticks: { callback: (value) => `$${value}T USD` },
            },
            y2: {
                type: "linear",
                position: "right",
                title: { display: true, text: "PIB Per Capita" },
                ticks: { callback: (value) => `${value/1000}K USD` },
            },
        },
    };

    return (
        <div className="w-full h-full max-w-4xl">
            <h2 className="m-4">Tela 1: Gráfico de Evolução do PIB</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Grafico;
