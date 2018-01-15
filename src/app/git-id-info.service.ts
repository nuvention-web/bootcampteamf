import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitIdInfo } from './github-id';
import { Observable } from 'rxjs/Observable';
import {Repository} from './repo'

const githubAPI = 'https://api.github.com/';

@Injectable()
export class GitIdInfoService {

  constructor(private http: HttpClient) { }

  GetRepo() {
    const repoAPI = githubAPI + 'repos/nuvention-web/bootcampteamf'
    return(this.http.get(repoAPI))
  }


  GetGitIdInfo(login: string): Observable<GitIdInfo> {
    const userAPI = githubAPI + 'users/';
    return(this.http.get<GitIdInfo>(userAPI + login));
  }
}