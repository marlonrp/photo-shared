import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  public photoForm: FormGroup;
  public file: File;
  public preview: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  public upload() {
    const form = this.photoForm.getRawValue();
    const formData = new FormData();
    formData.append('description', form.description);
    formData.append('allowComments', `${form.allowComments}`);
    formData.append('imageFile', this.file);
    this.photoService
      .upload(formData)
      .subscribe(() => this.router.navigate(['']));
  }

  public handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }
}
