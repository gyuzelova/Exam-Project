import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Fish } from 'src/app/types/post';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  fishPost: Fish[]=[];
  
  constructor(private api: AppService) {}

  ngOnInit(): void {
    this.api.getAllFishs().subscribe({
  next: (data) => {
    this.fishPost = data;
    console.log(this.fishPost);
    
  },
  error: (err) => {
    console.log(err);
    
    }
  })
  }
}
