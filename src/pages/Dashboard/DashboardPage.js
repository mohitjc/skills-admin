import React, { useEffect } from "react";
import * as Chart from '../../assets/chart'

const DashboardPage = () => {
    const setChart = () => {
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    useEffect(() => {
        setChart()
    }, [])

    return <>
        gfgfg
        <canvas id="myChart"></canvas>
    </>
}

export default DashboardPage