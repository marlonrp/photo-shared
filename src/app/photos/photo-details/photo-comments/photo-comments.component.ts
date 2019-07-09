import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId: number;

  public comments$: Observable<[PhotoComment]>;
  public commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.getComments();
    this.createForm();
  }

  private getComments() {
    this.comments$ = this.photoService.getComments(this.photoId);
  }

  private createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }

  public publishComment() {
    const commentText = this.commentForm.get('comment').value;
    this.photoService.addComment(this.photoId, commentText).subscribe(() => {
      this.commentForm.reset();
      this.getComments();
    });
  }
}
