import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit ,AfterViewInit {
  // Main chart options
  public lineChartOptions!: any;
  public areaChartOptions!: any;
  public radialChartOptions!: any;
  public donutChartOptions!: any;
  public heatmapChartOptions!: any;
  public scatterChartOptions!: any;
  public bubbleChartOptions!: any;
 public barChartOptions!: any;
   stats = [
    { label: 'Total Orders', value: 1234 },
    { label: 'Revenue', value: '₹245000' },
    { label: 'Active Users', value: 567 },
    { label: 'Pending Orders', value: 27 },
    { label: 'Stock', value: 23427 },
    { label: 'Returns', value: 12 }
  ];
  constructor(private router:Router){}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    
    this.lineChartOptions = {
      series: [{ name: 'Orders', data: [10, 41, 35, 51, 49, 62] }],
      chart: { type: 'line', height: 300 },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      title: { text: 'Monthly Orders' },
      fill: { type: 'solid', opacity: 1 },
      plotOptions: {},
    };

    this.areaChartOptions = {
      series: [{ name: 'Sales', data: [31, 40, 28, 51, 42, 109] }],
      chart: { type: 'area', height: 300 },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      title: { text: 'Monthly Revenue' },
      fill: { type: 'solid', opacity: 0.5 },
      plotOptions: {},
    };

    this.radialChartOptions = {
      series: [67, 84, 90],
      chart: { type: 'radialBar', height: 350 },
      labels: ['Electronics', 'Clothing', 'Accessories'],
      plotOptions: {
        radialBar: {
          dataLabels: {
            total: {
              show: true,
              label: 'Total',
              formatter: () => '82%'
            }
          }
        }
      },
      fill: { type: 'solid' },
    };

    this.donutChartOptions = {
      series: [45, 25, 30],
      chart: { type: 'donut', height: 300 },
      labels: ['Delivered', 'Pending', 'Cancelled'],
      plotOptions: {},
      fill: { type: 'gradient' },
    };

    this.heatmapChartOptions = {
      series: [
        {
          name: 'Mon',
          data: [30, 40, 45, 50, 49, 60, 70]
        },
        {
          name: 'Tue',
          data: [20, 29, 37, 36, 44, 45, 50]
        },
        {
          name: 'Wed',
          data: [25, 31, 33, 40, 42, 50, 58]
        },
      ],
      chart: { type: 'heatmap', height: 300 },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: 0, to: 30, color: '#00A100', name: 'Low' },
              { from: 31, to: 60, color: '#128FD9', name: 'Medium' },
              { from: 61, to: 100, color: '#FFB200', name: 'High' },
            ]
          }
        }
      },
      dataLabels: { enabled: false },
      xaxis: { categories: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM'] },
    };

    this.scatterChartOptions = {
      series: [
        {
          name: 'Visitors',
          data: [[4, 5], [6, 7], [7, 9], [9, 12], [12, 14], [13, 15]]
        }
      ],
      chart: { type: 'scatter', height: 300 },
      xaxis: { title: { text: 'Page Views' } },
      yaxis: { title: { text: 'Purchases' } },
      title: { text: 'Visits vs Purchases' }
    };

    this.bubbleChartOptions = {
      series: [
        {
          name: 'Products',
          data: [
            { x: 10, y: 20, z: 30 },
            { x: 20, y: 10, z: 50 },
            { x: 30, y: 40, z: 35 },
            { x: 40, y: 20, z: 60 },
          ]
        }
      ],
      chart: { type: 'bubble', height: 350 },
      xaxis: { title: { text: 'Views' } },
      yaxis: { title: { text: 'Sales' } },
      fill: { type: 'gradient' },
      plotOptions: {
        bubble: {
          minBubbleRadius: 5,
          maxBubbleRadius: 25
        }
      }
    };
    
  }
  Stock(stat:any){
    if(stat.label =='Stock'){
      this.router.navigate(['/admin/stockcheck']);
    }
  }
}