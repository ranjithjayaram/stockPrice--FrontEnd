import { Injectable } from '@angular/core';
import { HttpClient}    from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {
  companies:any;
  pricedetails:any;
  constructor(private http: HttpClient) { 
    
  }

   public  getCompanies():Observable<any>{
    const baseurl='http://localhost:3000/'
    const url= baseurl+'companies';
    this.companies = this.http.get(url);
    return this.companies;
  }
  public getPriceDetails(cid,from,to):Observable<any>{
    const baseurl='http://localhost:3000/'
    const url= baseurl+'chartdetails?cid='+cid+'&from='+from+'&to='+to;
    this.pricedetails= this.http.get(url);
    return this.pricedetails;
  }
}
