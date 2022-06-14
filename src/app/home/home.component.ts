import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertService } from '../service/alert/alert.service';
import { FetchService } from '../service/fetch/fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videoFileName = '';
  imageFileName = '';
  baseUrl = 'localhost:8000';
  video_list: any = [];
  image_list: any = [];

  // processVideoGroup = new FormGroup({
  //   videoId: new FormControl(null, [Validators.required, Validators.nullValidator])
  // })
  processVideoGroup = new FormBuilder().group({
    videoId: new FormControl(''),
  });
  constructor(private fetch: FetchService, private alert: AlertService) {}

  ngOnInit(): void {
    this.fetch
      .get('/video/get')
      .forEach((resp) => {
        this.video_list = resp;
      })
      .catch((err) => console.log(err));

    this.fetch
      .get('/image/get')
      .forEach((resp) => {
        this.image_list = resp;
      })
      .catch((err) => console.log(err));
  }

  onSubmitVideo(event: Event): void {
    const fileList: FileList | null = (
      (event.target as HTMLInputElement).firstElementChild as HTMLInputElement
    ).files;
    if (fileList && fileList[0]) {
      const file: File = fileList[0];
      this.videoFileName = file.name;
      const formdata = new FormData();
      formdata.append('video', file);
      this.fetch
        .post('/video/create', formdata)
        .forEach((resp) => {
          this.alert.openSnackBar('Uploaded Video');
        })
        .catch((err) => {
          this.alert.openSnackBar('Error while Uploading');
        });
    }
  }
  onChangeVideo(event: Event): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    if (fileList && fileList[0]) {
      this.videoFileName = fileList[0].name;
    }
  }

  OnProcessVideo(): void {
    console.log(this.processVideoGroup.value);
  }

  onChangeImage(event: Event): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    if (fileList && fileList[0]) {
      this.imageFileName = fileList[0].name;
    }
  }

  onSubmitImage(event: Event): void {
    const fileList: FileList | null = (
      (event.target as HTMLInputElement).firstElementChild as HTMLInputElement
    ).files;
    if (fileList && fileList[0]) {
      const file: File = fileList[0];
      this.imageFileName = file.name;
      const formdata = new FormData();
      formdata.append('image', file);
      this.fetch
        .post('/image/create', formdata)
        .forEach((resp) => {
          this.alert.openSnackBar('Uploaded Image');
        })
        .catch((err) => {
          this.alert.openSnackBar('Error while Uploading');
        });
    }
  }
}
