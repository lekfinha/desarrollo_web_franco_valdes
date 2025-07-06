console.log('Script de estadísticas cargado correctamente');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cargando gráficos de estadísticas...');
    
    // Verificar que Highcharts esté disponible
    if (typeof Highcharts === 'undefined') {
        console.error('Highcharts no está cargado');
        return;
    }
    
    console.log('Highcharts está disponible');
    
    // Cargar datos para el gráfico de líneas - Actividades por día
    fetch('/api/estadisticas/actividades-por-dia')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de actividades por día:', data);
            Highcharts.chart('grafico-lineas', {
                chart: {
                    type: 'line',
                    backgroundColor: 'transparent'
                },
                title: {
                    text: 'Actividades por Día',
                    style: { color: 'white', fontSize: '18px' }
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Fecha',
                        style: { color: 'white' }
                    },
                    labels: { style: { color: 'white' } }
                },
                yAxis: {
                    title: {
                        text: 'Cantidad de Actividades',
                        style: { color: 'white' }
                    },
                    labels: { style: { color: 'white' } }
                },
                legend: {
                    itemStyle: { color: 'white' }
                },
                series: [{
                    name: 'Actividades',
                    data: data.map(item => [new Date(item.fecha).getTime(), item.total])
                }]
            });
        })
        .catch(error => console.error('Error cargando actividades por día:', error));

    // Cargar datos para el gráfico de torta - Actividades por tema
    fetch('/api/estadisticas/actividades-por-tema')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de actividades por tema:', data);
            Highcharts.chart('grafico-torta', {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent'
                },
                title: {
                    text: 'Actividades por Tema',
                    style: { color: 'white', fontSize: '18px' }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                            style: { color: 'white' }
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
        })
        .catch(error => console.error('Error cargando actividades por tema:', error));

    // Cargar datos para el gráfico de barras - Actividades por mes y horario
    fetch('/api/estadisticas/actividades-por-mes-horario')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de actividades por mes y horario:', data);
            
            // Preparar los datos
            const meses = data.map(item => item.mes);
            const manana = data.map(item => Number(item.manana || 0));
            const mediodia = data.map(item => Number(item.mediodia || 0));
            const tarde = data.map(item => Number(item.tarde || 0));

            Highcharts.chart('grafico-barras', {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent'
                },
                title: {
                    text: 'Actividades por Mes y Horario',
                    style: { color: 'white', fontSize: '18px' }
                },
                xAxis: {
                    categories: meses,
                    title: { 
                        text: 'Mes',
                        style: { color: 'white' }
                    },
                    labels: { style: { color: 'white' } }
                },
                yAxis: {
                    min: 0,
                    title: { 
                        text: 'Cantidad de Actividades',
                        style: { color: 'white' }
                    },
                    labels: { style: { color: 'white' } }
                },
                legend: { 
                    reversed: false,
                    itemStyle: { color: 'white' }
                },
                plotOptions: { 
                    series: { stacking: 'normal' }
                },
                series: [
                    { name: 'Mañana', data: manana },
                    { name: 'Mediodía', data: mediodia },
                    { name: 'Tarde', data: tarde }
                ]
            });
        })
        .catch(error => console.error('Error cargando actividades por mes y horario:', error));
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