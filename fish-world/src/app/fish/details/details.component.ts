import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/fish/app.service';
import { Fish } from 'src/app/types/post';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  fish = {} as Fish;
  userId: string = '';
  ownerId: string[] = [];
  likeArray: string[] = []

  constructor(private api: AppService,
    private activeRouter: ActivatedRoute,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/login'])
    // }
    this.activeRouter.params.subscribe((data) => {
      const id = data['fishId'];

      this.api.getCurrentPostFish(id).subscribe((fish) => {
        this.fish = fish;
        this.ownerId.push(fish.owner[0]);
        this.likeArray = fish.likedList.slice()
        console.log(this.fish);

      })
    });

  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  numLikes() {
    return this.likeArray.length || 0;
  }

  isLikedUser(): boolean {
    return this.likeArray.includes(this.userService.isUserId)
  }

  isOwner(): boolean {
    return this.ownerId.join() === this.userService.isUserId ? true : false;
  }

  liked() {
    const id = this.fish._id;
    this.api.likeFish(id).subscribe((fish) => {
      this.fish = fish;
      this.router.navigate(['/catalog'])
      this.ngOnInit();
    });
  }

  deletePost(fish: Fish) {
    const id = fish._id;
    this.api.deletePostFish(id).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }
  // currentUserId(): string {
  //   return this.userService.isUserId;
  // }
  // currentFishOwner(): string {
  //   return this.ownerId.join()
  // }

}
