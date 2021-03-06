import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { CustomHttpService } from '../.';

@Injectable()
export class CodeService {
  private codesUrl:string[] = ['codes'];
  constructor(private customHttpService:CustomHttpService) { }

  getAllCodes(tagIds:any[]):Observable<any[]>{
    return this.customHttpService.getAllRequest(this.codesUrl, {tags:tagIds.join(',')});
  }

  getCode(id:number){
    return this.customHttpService.getRequest([...this.codesUrl, id.toString()]);
  }

  postCode(payload:any){
    return this.customHttpService.postRequest(this.codesUrl, payload);
  }

  getCodeTags(codeId:number){
    return this.customHttpService.getAllRequest(this.getCodeTagsUrl(codeId));
  }

  upvoteCode(codeId:number){
    return this.customHttpService.putRequest([...this.codesUrl, codeId.toString()], {up:1})
  }

  downvoteCode(codeId:number){
    return this.customHttpService.putRequest([...this.codesUrl, codeId.toString()], {down:0})
  }

  addCodeTags(codeId:number, tags:any[]){
    return this.customHttpService.postRequest(this.getCodeTagsUrl(codeId), {tag_ids:tags});
  }

  deleteCodeTags(codeId:number, tagId:number){
    let path = [...this.getCodeTagsUrl(codeId), tagId.toString()]
    return this.customHttpService.deleteRequest(path); 
  }

  getAllComments(codeId:number){
    let path = [...this.getCodeCommentsUrl(codeId)];
    return this.customHttpService.getAllRequest(path);
  }

  addComment(codeId:number, comment:any){
    let path = [...this.getCodeCommentsUrl(codeId)];
    return this.customHttpService.postRequest(path, comment);
  }

  private getCodeCommentsUrl(codeId:number){
    return [...this.codesUrl, codeId.toString(), 'comments'];
  }

  private getCodeTagsUrl(codeId:number){
    return [...this.codesUrl, codeId.toString(), 'tags'];
  }
}