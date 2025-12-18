// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTitleSubtitle,
  ApexFill,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexDataLabels
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  grid: ApexGrid;
};

export type RadialChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};
@Component({
  selector: 'app-stock-check',
  templateUrl: './stock-check.component.html',
  styleUrl: './stock-check.component.scss'
})
export class StockCheckComponent implements OnInit {

  public lineChartOptions!: ChartOptions;
  public areaChartOptions!: ChartOptions;
  public barChartOptions!: ChartOptions;
  public radialChartOptions!: RadialChartOptions;

  constructor() { }

  ngOnInit(): void {
    this.lineChartOptions = {
      series: [
        { name: 'Orders', data: [120, 135, 128, 140, 150, 165] }
      ],
      chart: { type: 'line', height: 300 },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
            yaxis: {
        min: 30 // Adds space below the lowest point (which is 40)
      },
      title: { text: 'Monthly Orders Trend' },
      fill: { type: 'solid', opacity: 1 },
      plotOptions: {},
      grid: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      }
    };

this.areaChartOptions = {
  series: [{ name: 'Sales', data: [40, 60, 80, 90, 70, 100] }],
  chart: {
    type: 'area',
    height: 300
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  xaxis: {
    categories: ['Electronics', 'Fashion', 'Groceries', 'Furniture', 'Toys', 'Beauty']
  },
  yaxis: {
    min: 20 // Safe, supported way to add space below 40
  },
  title: {
    text: 'Category-wise Sales'
  },
  fill: {
    type: 'solid',
    opacity: 0.6
  },
  plotOptions: {},
  grid: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  }
};



    this.barChartOptions = {
      series: [
        { name: 'Revenue', data: [20000, 35000, 45000, 30000, 50000, 40000] }
      ],
      chart: { type: 'bar', height: 300 },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { categories: ['Amazon', 'Flipkart', 'Meesho', 'Snapdeal', 'Ajio', 'Myntra'] },
            yaxis: {
        min: 30 // Adds space below the lowest point (which is 40)
      },
      title: { text: 'Revenue by Platform' },
      fill: { type: 'solid', opacity: 1 },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '55%' }
      },
      grid: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }
      }
    };

    this.radialChartOptions = {
      series: [40, 30, 30],
      chart: { type: 'radialBar', height: 350 },
      labels: ['Cash on Delivery', 'UPI', 'Credit Card'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: { fontSize: '22px' },
            value: { fontSize: '16px' },
            total: {
              show: true,
              label: 'Total',
              formatter: () => '100%'
            }
          }
        }
      },
      fill: { type: 'gradient' },

    };
  }
}
