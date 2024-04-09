import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserProfil, UserProfilData } from 'src/app/types/user';
import { Fish } from 'src/app/types/post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userdata = {} as UserProfilData;
  user = {} as UserProfil;
  fishPost: Fish[] = [];
  profilLogo: string = ""
  constructor(private userService: UserService, private activeRouter: ActivatedRoute) { }


  ngOnInit(): void {

    const id = this.userService.isUserId
    this.userService.getProfileData(id).subscribe((userData) => {
      console.log({ userData: userData });
      this.userdata = userData;
      this.fishPost = userData.fishs
    })

  }
  profilImage(): string {
    if (this.userdata.gender === 'female') {
      this.profilLogo = '../../../assets/img/girl_profil_img.jpeg'
    } else {
      this.profilLogo = '../../../assets/img/boy_profil_img.jpeg'
    }
    return this.profilLogo
  }

  ifHasPosts(): boolean {
    return this.fishPost?.length === 0 ? true : false
  }
  fishArray() {
    this.fishPost = this.userdata.fishs
    console.log(this.fishPost);

    return this.fishPost

  }




  // currentUserId(): string {
  //   return this.userService.isUserId;
  // }
}
