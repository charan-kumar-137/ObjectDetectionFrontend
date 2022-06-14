import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  preview: HTMLVideoElement;
  recordingTimeMS = 5000;
  constructor() {
    this.preview = <HTMLVideoElement>document.getElementById('preview');
    console.log(document)
  }

  ngOnInit(): void {}

  wait(delayInMS: number) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  }

  log(msg: any) {
    console.log(msg);
  }

  async startRecording(stream: MediaStream, lengthInMS: number) {
    let recorder = new MediaRecorder(stream);
    let data: any = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    // log(recorder.state + ' for ' + lengthInMS / 1000 + ' seconds...');

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event) => reject(event.error);
    });

    let recorded = this.wait(lengthInMS).then(
      () => recorder.state == 'recording' && recorder.stop()
    );

    return Promise.all([stopped, recorded]).then(() => data);
  }


  start() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream: MediaProvider) => {
        this.preview.srcObject = stream;
        return new Promise((resolve) => (this.preview.onplaying = resolve));
      })
      .catch((error) => {
        if (error.name === 'NotFoundError') {
          this.log("Camera or microphone not found. Can't record.");
        } else {
          this.log(error);
        }
      });
  }


}
