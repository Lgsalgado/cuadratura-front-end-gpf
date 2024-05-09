import {Component, OnInit} from '@angular/core';
import {SalesforceomsService} from "../../services/cuadratura/salesforceoms.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {
  }
  chart: any;
  chart2: any;
  //pastel
  chartOptions3 = {
    animationEnabled: true,
    title:{
      text: "Project Cost Breakdown"
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: 28, name: "Labour" },
        { y: 10, name: "Legal" },
        { y: 20, name: "Production" },
        { y: 15, name: "License" },
        { y: 23, name: "Facilities" },
        { y: 17, name: "Taxes" },
        { y: 12, name: "Insurance" }
      ]
    }]
  }
//barras
  chartOptions2 = {
    title:{
      text: "Angular Column Chart"
    },
    animationEnabled: true,
    data: [{
      type: "column",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 }
      ]
    }]
  }
  //lineal
  chartOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Ordenes Web"
    },
    axisY: {
      labelFormatter: (e: any) => {
        var suffixes = ["", "K", "M", "B", "T"];

        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
          order = suffixes.length - 1;

        var suffix = suffixes[order];
        return "$" + (e.value / Math.pow(1000, order)) + suffix;
      }
    },
    data: [{
      type: "line",
      xValueFormatString: "YYYY",
      yValueFormatString: "$#,###.##",
      dataPoints: [
        { x: 1990, y: 2500582120 },
        { x: new Date(1981, 0, 1), y: 2318922620 },
        { x: new Date(1982, 0, 1), y: 2682595570 },
        { x: new Date(1983, 0, 1), y: 3319952630 },
        { x: new Date(1984, 0, 1), y: 3220180980 },
        { x: new Date(1985, 0, 1), y: 4627024630 }

      ]
    }]
  }
}
