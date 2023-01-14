import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public list = [];
  public base ="https://swapi.dev/api/";
  public FilterForm = new FormGroup({
    filter : new FormControl("")
  })
  public idx=0;
  public clicked = false;
  public character:string;
  public info;
  public birthyear;
  public gender;
  public films:any="show films...";
  public filmsArr=[];
  public filmsList;
  public starships:any="show starships...";
  public starshipsArr=[];
  public starshipsList;
  public vehicles:any="show vehicles...";
  public vehiclesArr=[];
  public vehiclesList;
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${this.base}/people`).subscribe(v=>
      this.getList(v)
      
    );
  }
  getList(v){
    console.log(v)
    v.results.forEach(val=>{
      this.list.push(val);
    })
    console.log(this.list);
  }
  open(i:number){
    this.clicked = !this.clicked;
    this.idx = i;
    console.log("idx is: "+ this.idx);
    this.character = this.list[i];
    console.log("character is: ", this.character)
    this.birthyear = this.character["birth_year"]
    this.gender = this.character["gender"]
    this.filmsList = this.character["films"]
    this.starshipsList = this.character["starships"]
    this.vehiclesList = this.character["vehicles"]
   
  }
  close(){
    this.clicked = !this.clicked;
    this.films="show films...";
  this.filmsArr=[];
  this.filmsList;
  this.starships="show starships...";
  this.starshipsArr=[];
  this.starshipsList;
  this.vehicles="show vehicles...";
  this.vehiclesArr=[];
  this.vehiclesList;
  }
  showFilms(){
    if(this.filmsList.length==0){
      this.films="none"
    }else{
    for(let i = 0 ; i< this.filmsList.length; i++){
      this.http.get(this.filmsList[i]).subscribe(v=>this.getFilms(v))
    }
    this.films = "wait..."
    // console.log(this.filmsList["title"])
  }
  }
  getFilms(v){
    this.filmsArr.push(v["title"]);
    console.log(this.filmsArr);
    if(this.filmsArr.length ===this.filmsList.length)
    this.films = this.filmsArr;
    if(this.filmsArr.length==0){
      this.films="none"
    }
  }
  showStarships(){
    if(this.starshipsList.length==0){
      this.starships="none"
    }else{
    for(let i = 0 ; i< this.starshipsList.length; i++){
      this.http.get(this.starshipsList[i]).subscribe(v=>{this.getStarships(v);console.log(v)})
    }
    this.starships = "wait..."
  }
  }
  getStarships(v){
    this.starshipsArr.push(v["name"]);
    console.log(this.starshipsArr);
    if(this.starshipsArr.length ===this.starshipsList.length)
    this.starships = this.starshipsArr;
    console.log(this.starshipsArr)
  }
  showVehicles(){
    if(this.vehiclesList.length==0){
      this.vehicles="none"
    }else{
    for(let i = 0 ; i< this.vehiclesList.length; i++){
      this.http.get(this.vehiclesList[i]).subscribe(v=>{this.getVehicles(v);console.log(v)})
    }
    this.vehicles = "wait..."
  }
  }
  getVehicles(v){
    this.vehiclesArr.push(v["name"]);
    console.log(this.vehiclesArr);
    if(this.vehiclesArr.length ===this.vehiclesList.length)
    this.vehicles = this.vehiclesArr;
    console.log(this.vehiclesArr)
 
  }
  

}
