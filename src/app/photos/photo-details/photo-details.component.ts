import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { PhotoComment } from '../photo/photo-comment';
import { AlertService } from '@src/app/shared/components/alert/alert.service';
import { UserService } from '@src/app/core/user/user.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
  public photo$: Observable<Photo>;
  public comments$: Observable<[PhotoComment]>;
  public photoId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(() => {}, () => this.router.navigate(['not-found']));
  }

  public remove() {
    this.photoService.removePhoto(this.photoId).subscribe(
      () => {
        this.alertService.successMessage('Photo removed!', true);
        this.router.navigate(['/user', this.userService.getUserName()]);
      },
      () => this.alertService.warningMessage('Could not remove photo!', true)
    );
  }
}
