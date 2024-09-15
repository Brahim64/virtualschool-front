import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FileService } from '../../services/file.service';
import { Files } from '../../shared/files';
import { UploadFileComponent } from "../upload-file/upload-file.component";
import { StorageService } from '../../services/storage.service';
import { KbToMbPipe } from '../../pipes/kb-to-mb.pipe';
import { ToKbPipe } from '../../pipes/to-kb.pipe';
import { HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs';

@Component({
  selector: 'app-course-files',
  standalone: true,
  imports: [HeaderComponent, UploadFileComponent,KbToMbPipe,ToKbPipe],
  templateUrl: './course-files.component.html',
  styleUrl: './course-files.component.scss'
})
export class CourseFilesComponent implements OnInit{

  courseId:number;
  files:Files[];
  token:string;
  
  constructor(private route: ActivatedRoute,private fileService:FileService,private storage:StorageService) {}
  ngOnInit(): void {
    this.token=this.storage.getUser()['token']
    this.route.paramMap.subscribe(params=>{
      this.courseId=Number(params.get('id'));
      this.fileService.getFiles(this.token).subscribe(data=>{

        for (let index = 0; index < data.length; index++) {
          if (data[index]['courseId']==this.courseId) {
            this.files.push(data[index])
          }
          
        }
        
        
      })
    })
    
  }
  download(id:number,name:string) {
    this.fileService.getFile(this.token,id).subscribe(file=>{ 
      console.log(file)
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(file);
      a.href = objectUrl;
      a.download = name; // You can dynamically set the file name here
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }


}
