import React, { useRef, useLayoutEffect } from 'react';
import './DonutChart.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";

 am4core.useTheme(am4themes_frozen);

 const DonutChart=({data,dataTime,title,number}) =>{
  // am4core.useTheme(number);
   const ch = useRef(null);
  const chartName = "chartdiv"+number;
  const legendName = "legend"+number;
  useLayoutEffect(() => {
      let component = am4core.create(chartName, am4core.Container);
      component.paddingRight=0;
      component.width = am4core.percent(100);
      component.height = am4core.percent(100);
      component.layout = "horizontal";
      let chart = component.createChild(am4charts.PieChart);
      chart.innerRadius = am4core.percent(70);
      chart.width = am4core.percent(100);
      chart.height = am4core.percent(100);
      chart.dx = 0;
      chart.data = data;
      let chart2 = component.createChild(am4charts.XYChart);
      chart2.width = am4core.percent(50);
      chart2.height = am4core.percent(40);
      chart2.innerRadius = am4core.percent(50);
      chart2.layout = "horizontal";
      chart2.dx=-280;
      chart2.dy=110;
      chart2.data = dataTime;
      let dateAxis = chart2.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.disabled = true; 
      dateAxis.renderer.labels.template.disabled = true;
      dateAxis.renderer.ticks.template.disabled = true;
      dateAxis.renderer.fillOpacity = 0;
      let valueAxis = chart2.yAxes.push(new am4charts.ValueAxis()); 
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.renderer.ticks.template.disabled = true;
      var series = chart2.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "year";
      series.dataFields.valueY = "value";
      series.sequencedInterpolation = true;
      series.fillOpacity = 0.3;
      series.defaultState.transitionDuration = 1000;
      series.tensionX = 0.8;
      series.strokeOpacity = 0;
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "device";
      pieSeries.dataFields.hidden ="hidden";
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      let label = pieSeries.createChild(am4core.Label);
      label.text = title+"\n"+"{values.value.sum}";
      label.horizontalCenter = "middle";
      label.verticalCenter = "middle";
      label.textAlign = "middle";
      label.fontSize = 20;
      chart.events.on("ready", function(event) {
      chart.customLegend = document.getElementById(legendName);
      pieSeries.dataItems.each(function(row, i) {
      var color = chart.colors.getIndex(i);
      var percent = Math.round(row.values.value.percent * 100) / 100;
      var value = row.value;
      chart.customLegend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '"style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
    });
  });
      ch.current = component;
    return () => {
      component.dispose();
    };
  }, [data,dataTime,title]);

    return (
      <div >
            <div  id={chartName} className='chartdiv' ></div>
            <div  id={legendName} className='legend' ></div>
      </div>
    );
    
}


export default DonutChart;