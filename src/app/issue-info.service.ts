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

  GetIssue(daterange?: string) {
    let issueAPI: string;
    if (daterange == undefined) {
      issueAPI = githubAPI + `repos/nuvention-web/bootcampteamf/issues?state=all`;
    }
    else {
      issueAPI = githubAPI + `repos/nuvention-web/bootcampteamf/issues?state=all&since=${daterange}`;
    }

    return(this.http.get<Issue[]>(issueAPI));
  }
}
