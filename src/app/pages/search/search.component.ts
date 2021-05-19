import { Component, OnInit } from '@angular/core';
import {GetalltrainsService } from '../../services/trains/getalltrains.service';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  trains=[];

  from;
  to;
  date;
  general;
  classType;

  constructor(private gettrains:GetalltrainsService,private route:ActivatedRoute,private navigaterouter:Router) { }

  ngOnInit(): void {
    this.gettrains.getalltrains().subscribe(train => {
      this.trains = train
      
    })

    this.getparams()
   
  }
  getparams(){
    this.route.queryParams.subscribe(params => {
      

      this.from = params['from']
      this.to = params['to']
      this.date = params['date']
      this.general = params['general']
      this.classType = params['classType']
    })

    this.trains= this.trains.filter(train => {
      if(train.from == this.from && train.to == this.to ){
        
        return train
      }
     })
  }



  onSubmit(){
    
   this.trains= this.trains.filter(train => {
    if(train.from == this.from && train.to == this.to){
      
      
      return train
    }
   })
  }

  booktic(trainid){
    this.navigaterouter.navigate(['/ticketbook'],{queryParams: { trainId: trainid}})
  }

}
