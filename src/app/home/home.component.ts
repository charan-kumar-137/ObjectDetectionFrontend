import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
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
  imageOrig: boolean;

  constructor(private fetch: FetchService, private alert: AlertService) {
    this.imageOrig = true;
  }

  ngOnInit(): void {
    this.fetch
      .get('/video/get')
      .forEach((resp) => {
        this.video_list = resp;
        // console.log(this.video_list);
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
	else{
		this.alert.openSnackBar("No File");
	}
  }
  onChangeVideo(event: Event): void {
    const fileList: FileList | null = (event.target as HTMLInputElement).files;
    if (fileList && fileList[0]) {
      this.videoFileName = fileList[0].name;
    }
  }

  OnProcessVideo(id: any): void {
    const formData = new FormData();
    formData.append('id', id);
    this.alert.openSnackBar('Video Process Start', 'Wait');
    this.fetch
      .post('/video/process', formData)
      .forEach((resp) => {
        console.log(resp);
        this.alert.openSnackBar('Video Process Complete', 'Check');
      })
      .catch((err) => {
        console.log(err);
        this.alert.openSnackBar('Video Process Error', 'Try Again');
      });
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
	else{
		this.alert.openSnackBar("No File")
	}
  }

  toggleImage(): void {
    this.imageOrig = !this.imageOrig;
  }

  onProcessImage(id: any): void {
    const formData = new FormData();
    formData.append('id', id);
    this.alert.openSnackBar('Image Processing Start', 'Wait');
    this.fetch
      .post('/image/process', formData)
      .forEach((resp) => {
        this.alert.openSnackBar('Image Processing Complete', 'Check');
      })
      .catch((err) => {
        console.log(err);
        this.alert.openSnackBar('Image Processing Error', 'Try Again');
      });
  }
}
