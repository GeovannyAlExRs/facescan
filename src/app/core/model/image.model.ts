export class ImageModel{

  id?: string;
  nameImg: string;
  imgUrl:string;

  constructor(nameImg:string, imgUrl:string){
    this.nameImg = nameImg;
    this.imgUrl = imgUrl;
  }

}
