export class Files{
    id:number;
    name:string;
    url:string;
    type:string;
    size:number;
    courseId:number;
    constructor(name:string,url:string,type:string,size:number,courseId:number,id:number){
        this.id=id
        this.courseId=courseId
        this.url=url
        this.name=name
        this.size=size
        this.type=type
    }

} 