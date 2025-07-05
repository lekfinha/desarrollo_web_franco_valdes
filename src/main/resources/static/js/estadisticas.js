document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos para el gráfico de líneas
    fetch('/api/estadisticas/actividades-por-dia')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('grafico-lineas', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Actividades por Día'
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Fecha'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de Actividades'
                    }
                },
                series: [{
                    name: 'Actividades',
                    data: data.map(item => [new Date(item.fecha).getTime(), item.total])
                }]
            });
        });

    // Cargar datos para el gráfico de torta
    fetch('/api/estadisticas/actividades-por-tema')
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('grafico-torta', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Actividades por Tema'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                        }
                    }
                },
                series: [{
                    name: 'Actividades',
                    colorByPoint: true,
                    data: data.map(item => ({
                        name: item.tema,
                        y: item.total
                    }))
                }]
            });
        });

        // Cargar datos para el gráfico de barras
    fetch("/api/estadisticas/actividades-por-mes-horario")
      .then((response) => response.json())
      .then((data) => {
        // Prepara los datos y convierte a número
        const meses = data.map(item => item.mes);
        const manana = data.map(item => Number(item.manana));
        const mediodia = data.map(item => Number(item.mediodia));
        const tarde = data.map(item => Number(item.tarde));

        Highcharts.chart('grafico-barras', {
          chart: {
            type: 'column',
            backgroundColor: 'transparent'
          },
          title: {
            text: 'Actividades por Mes y Horario',
            style: { color: 'white', fontSize: '24px' }
          },
          xAxis: {
            categories: meses,
            title: { text: 'Mes' }
          },
          yAxis: {
            min: 0,
            title: { text: 'Cantidad de Actividades' }
          },
          legend: { reversed: false },
          plotOptions: { series: { stacking: 'normal' } },
          series: [
            { name: 'Mañana', data: manana },
            { name: 'Mediodía', data: mediodia },
            { name: 'Tarde', data: tarde }
          ]
        });
      })
      .catch((error) => console.error("Error:", error));
});

Highcharts.chart('container2', {
  chart: {
    type: 'pie',
    backgroundColor: 'transparent',
    plotBorderWidth: null,
    plotShadow: false

  },
  title: {
    text: 'Actividades',
    style: {
      color: 'white',
      fontSize: '24px',
    }
  },
  plotOptions: {
    pie: {
      colors: [
        '#B0E0E6', '#FFEEE0', '#FAC8C8', '#FDE2A7', '#D4F3C5',
        '#FFD6C4', '#FFC0CB', '#E6E6FA', '#FFDAB9', '#F0FFF0',
        '#FFFACD', '#ADD8E6', '#E0FFFF', '#F5F5DC', '#FFA07A',
        '#F0F8FF', '#FFF0F5', '#FAFAD2', '#E0FFFF', '#FFC3A0'
      ],
      dataLabels: {
        enabled: true,
        format: '{point.name}: {point.percentage:.1f}%'
      }
    }
  },
  series: [{
    name: 'Actividades',
    data: []
  }]
});
fetch("http://localhost:3006/get_estadisticas")
  .then((response) => response.json())
  .then((hinchas) => {
    let parsedData = hinchas.hinchas.map((hincha) => {
      return [hincha.tipo, hincha.cantidad];
    });

    // Get the chart by ID
    const chart = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === "container"
    );

    // Update the chart with new data
    chart.update({
      series: [
        {
          data: parsedData,
        },
      ],
    });
    chart2.update({
      series: [
        {
          data: parsedData2,
        },
      ],
    });
  })
  .catch((error) => console.error("Error:", error));

function toggle1() {
  var x = document.getElementById("container");
  var z = document.getElementById("btn1");
  if (x.style.display === "none") {
    z.value = "Ver Actividades";
    x.style.display = "block";
    y.style.display = "none";
  } else {
    z.value = "Ver Actividades"
    x.style.display = "none";
    y.style.display = "block";
  }
}