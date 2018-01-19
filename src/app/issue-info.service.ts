import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitIdInfo } from './github-id';
import { Observable } from 'rxjs/Observable';
import { Repository } from './repo'
import { Issue } from './gitIssue'

const githubAPI = 'https://api.github.com/';

@Injectable()
export class IssueInfoService {

  constructor(private http: HttpClient) { }

  GetIssue() {
    

    // for (let i = 0; i < array.length; i++) {
    //   const element = array[i];
      
    // }
    const issueAPI = githubAPI + `repos/nuvention-web/bootcampteamf/issues\?state\=all`;
    return(this.http.get<Issue[]>(issueAPI));
  }
}
