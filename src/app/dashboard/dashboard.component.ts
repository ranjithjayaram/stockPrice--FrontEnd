import { Component, OnInit } from '@angular/core';
import{ StockPriceService } from '../service/stock-price.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fromValue=new Date();
  toValue = new Date();
  fromMinDate:Date;
  fromMaxDate:Date;
  toMinDate: Date;
  toMaxDate: Date;

  datepickerModel:Date;
  private companies:any=[];
  private priceDetails:any;
  chart:any=[[]];
  charttype='Line';
  currentCmp:any=1;
  currentFrom:any;
  currentTo:any;
  
  constructor( private stockService: StockPriceService) { }
  
  ngOnInit() {
     this.stockService.getCompanies().subscribe(data=>{
      this.companies= data;
    })
    this.toMinDate = new Date();
    this.fromMinDate = new Date();
    this.toMaxDate = new Date();
    this.fromMaxDate = new Date();
    
    this.toMinDate.setDate(this.toMinDate.getDate() - 30);
    this.fromMinDate.setDate(this.fromMinDate.getDate() - 30);
    this.fromValue.setDate(this.fromValue.getDate() - 15);
    this.currentFrom=this.convertDate(this.fromValue);
    this.currentTo=this.convertDate(this.toValue);
    this.getPriceDetails(this.currentCmp,this.currentFrom,this.currentTo);
  }
  changeCompany(cmp){
    this.currentCmp=cmp;
    this.getPriceDetails(cmp,this.currentFrom,this.currentTo)
  }
  getPriceDetails(cid,fromdate,todate){
    console.log()
    this.stockService.getPriceDetails(cid,fromdate,todate).subscribe(data=>{
      this.priceDetails= data;
      this.createChart(data);
    })
    }
    createChart(data){
      this.chart=data.map(el=>{
        let date= new Date(el.date);
        console.log(date);
       let arr=[el.date,Number(el.stockPrice)];
       return arr;
      });
      console.log(this.chart);
  }
  changedFromDateValue(d){
  
  let fromdate=this.convertDate(d);
  this.toMinDate.setDate(d.getDate()+1);
  this.currentFrom=fromdate;
  this.getPriceDetails(this.currentCmp,fromdate,this.currentTo)
  }
  changedtoDateValue(d){
    let todate=this.convertDate(d);
    this.currentTo=todate;
    this.getPriceDetails(this.currentCmp,this.currentFrom,todate)
  }
convertDate(d){
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return(month+'/'+day+'/'+year);

}

}
