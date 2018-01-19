import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitIdInfo } from './github-id';
import { Observable } from 'rxjs/Observable';
import {Repository} from './repo'
import { Issue } from './gitIssue'

const githubAPI = 'https://api.github.com/';

@Injectable() 
export class GitIdInfoService {

  constructor(private http: HttpClient) { }

  GetRepo(): Observable<Issue> {
    const repoAPI = githubAPI + 'repos/nuvention-web/bootcampteamf'
    return(this.http.get(repoAPI))
  }

  GetGitIdInfo(): Observable<GitIdInfo> {
    const userAPI = githubAPI + 'users/';
    return(this.http.get<GitIdInfo>(userAPI + 'DrewParsons'));
  }
}