import React from 'react';
import './App.css';
import DonutChart from './components/DonutChart/DonutChart';
import visits from './services/visits/visits.json';
import visitsYear from './services/visits/year.json';
import impressions from './services/impression/impression.json';
import impressionsYear from './services/impression/year.json';
import revenue from './services/revenue/revenue.json';
import revenueYear from './services/impression/year.json';
const App= () =>{
  const  data = [visits,impressions,revenue];
  const dataTime =[visitsYear,impressionsYear,revenueYear];
  const title = ['VISITS','IMPRESSIONS','REVENUE'];
// const chartName = 'chartdiv';
// const legendName = 'legend';

    return (
      
      <div>
        <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossOrigin="anonymous"
        />
        <div className="row" >
         {data.map((val,index )=> 
            <div className="col-4" >
            <DonutChart id="chart1" data={data[index]} dataTime={dataTime[index]} title={title[index]} number={index} ></DonutChart>
            </div>
         )}       
        
         
        </div>
      </div>
    );
  
}

export default App;