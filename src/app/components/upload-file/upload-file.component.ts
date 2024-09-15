import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import { FileService } from '../../services/file.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatGridListModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent implements OnInit{

  currentFile: File;
  message = '';
  fileInfos?: Observable<any>;
  @Input() currentCourse:number;

  constructor(private uploadService:FileService,private storage:StorageService,private route:ActivatedRoute){}
  ngOnInit(): void {
    
    console.log("%%%%%%%%% id course"+this.currentCourse+"%%%%%%%%%%%%")
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files.item(0);
    console.log(this.currentFile)
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile,String(this.currentCourse),this.storage.getUser()['token']).subscribe({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }

}
