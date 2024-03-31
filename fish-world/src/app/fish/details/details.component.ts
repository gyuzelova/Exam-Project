import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Fish } from 'src/app/types/post';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  fish = {} as Fish

  constructor(private api: AppService,
    private activeRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }
  ngOnInit(): void {

    this.activeRouter.params.subscribe((data) => {
      const id = data['fishId'];
      console.log({ 'dtails': data });
      this.api.getCurrentPostFish(id).subscribe((fish) => {
        this.fish = fish;
      });
    });

  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  currentUserId(){
    return this.userService.user?.id || '';
  }
  currentFishOwner(){
    return this.fish.owner[0]
  }

  isLikedUser(){
    return this.fish.likedList.includes(this.currentUserId())
  }

  isLiked(fish: Fish)  {
    const id = fish._id;
    this.api.likeFish(id).subscribe((fish) => {
      this.fish = fish;
      this.router.navigate(['/catalog'])
    });
  }

  isOwner() {
  return  this.currentFishOwner() === this.currentUserId() ? true :false;
  }

  deletePost(fish: Fish) {
    const id = fish._id;
    this.api.deletePostFish(id).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }

}
