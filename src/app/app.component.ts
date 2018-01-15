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
  title = 'Status Report';
  subtitle = 'Nuvention Team F'
  ghId = '';
  ghIds: GitIdInfo[] = [];
  repo: Repository;
  results: string[];
  private getGitsub: Subscription;
  private getRepo: Subscription;
  errorMessage = null;
  constructor(public ids: GitIdInfoService) { }

  displayRepo() {
    this.errorMessage = null;
    this.getRepo = this.ids.GetRepo().subscribe( info => this.repo,
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
      console.log()
  }

  displayRepoSimple() {
    this.ids.GetRepo().subscribe(data => {
      this.results = data['name'];
      console.log(this.results);
    })
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

  ngOnDestroy() {
    this.getGitsub.unsubscribe();
    this.getRepo.unsubscribe();
  }
}

