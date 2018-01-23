import { GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Repository } from './repo';
import { Issue } from './gitIssue'
import { IssueInfoService } from './issue-info.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnDestroy {
  title = 'Nuvention Team F';
  subtitle = 'Status Report';
  summary = '';
  ghId = '';
  ghIds: GitIdInfo[] = [];
  issues: Issue[] = [];
  repo: string[] = [];
  issue_date;
  private getGitsub: Subscription;
  private getReposub: Subscription;
  private getIssuessub: Subscription;
  errorMessage = null;
  public options: Object = {
    placeholderText: 'Write a summary of your project updates here!',
    charCounterCount: false,
  }
  public editorContent: string = `      <p>Status Update 1/23/2018 - NUvention Team F</p>

  <ul>
    <li>Progress:
  
      <ul>
        <li>Team Worked updating the Summary section of the Github Puller Project</li>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</li>
        <li>sed do eiusmod tempor incididunt ut labore et</li>
      </ul>
    </li>
    <li>Future Updates:
  
      <ul>
        <li>olore magna aliqua. Ut enim ad minim ven</li>
        <li>iam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&nbsp;</li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </li>
      </ul>
    </li>
  </ul>`;


  constructor(public ids: GitIdInfoService, public issue_info: IssueInfoService) { }



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

  addGhId() {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo().subscribe( info => {
      this.ghIds.push(info as GitIdInfo);
      console.log(this.ghIds)
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }


  formatDate(date : string ) {
    var split_date = date.split(new RegExp('[-T]'), 3);
    console.log(split_date);
    return split_date;
  }


  getIssues() {
    this.getIssuessub = this.issue_info.GetIssue().subscribe( info => {
      info.forEach(element => {
        this.issues.push(element as Issue);
        var created = this.formatDate(element.created_at);
        var updated = this.formatDate(element.updated_at);
        element.created_at = `${created[1]} / ${created[2]} / ${created[0]}`
        element.updated_at = `${updated[1]} / ${updated[2]} / ${updated[0]}`
      });
    })
  }

  getDateISO() {
    let date : string = (<HTMLInputElement>document.getElementById("date_input")).value;
    console.log(date); 
    var split_date = date.split('/', 3);
    split_date.forEach((element, index) => {
      if (element.length == 1) {
        split_date[index] = `0${element}`
      }
    });
    return `${split_date[2]}-${split_date[0]}-${split_date[1]}T00:00:00Z` 
  }

  getIssuesByDate() {
    //clear the issue table because it'll just append more issues otherwise
    this.issues = [];

    this.getIssuessub = this.issue_info.GetIssue(this.getDateISO()).subscribe( info => {
      info.forEach(element => {
        this.issues.push(element as Issue);
        var created = this.formatDate(element.created_at);
        var updated = this.formatDate(element.updated_at);
        element.created_at = `${created[1]} / ${created[2]} / ${created[0]}`
        element.updated_at = `${updated[1]} / ${updated[2]} / ${updated[0]}`
      });
    });
  }

  //Fetches repository name and description when page loads
  ngOnInit() {
    this.getRepo();
    this.getIssues();
  }

  ngOnDestroy() {
    this.getGitsub.unsubscribe();
    this.getReposub.unsubscribe();
  }
}

