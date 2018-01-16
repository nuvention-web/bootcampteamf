import { GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Repository } from './repo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  title = 'Nuvention Team F';
  subtitle = 'Status Report'
  ghId = '';
  ghIds: GitIdInfo[] = [];
  repo: string[] = [];
  private getGitsub: Subscription;
  private getReposub: Subscription;
  errorMessage = null;
  constructor(public ids: GitIdInfoService) { }


  getRepo() {
    this.getReposub = this.ids.GetRepo().subscribe(data => {
      this.repo.push(data['name'])
      this.repo.push(data['description'])
      console.log(this.repo);
    })
  }


  displayRepoName() {
    return this.repo[0];
  }

  displayRepoDescription() {
    return this.repo[1];
  }

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GitIdInfo);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }

  //Fetches repository name and description when page loads
  ngOnInit() {
    this.getRepo();
  }

  ngOnDestroy() {
    this.getGitsub.unsubscribe();
    this.getReposub.unsubscribe();
  }
}

