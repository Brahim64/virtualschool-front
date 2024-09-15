export class Course{
    id:number;
    code:string;
    title:string;
    teacher:string;
    constructor(id:number,title:string,teacher:string){
        this.id=id
        this.title=title
        this.teacher=teacher
    }
}