import {RawGitService} from 'services/raw-git';
import {NpmService} from 'services/npm';
import {ChangeLogService} from 'services/change-log';
import {inject} from 'aurelia-framework';
import {GitTagListService} from 'services/git-tag-list';

@inject(RawGitService, NpmService, ChangeLogService, GitTagListService)
export class RepositoryService {
  constructor(rawGitService, npmService, changeLogService, gitTagService) {
    this.rawGitService = rawGitService;
    this.npmService = npmService;
    this.changeLogService = changeLogService;
    this.gitTagService = gitTagService;
  }
  // get the official repositories from rawgit
  getOfficialRepos() {
    return this.rawGitService.getOfficialRepos();
  }
  // get the plugins from rawgit
  getPluginRepos() {
    return this.rawGitService.getPluginRepos();
  }
  getRepositoryInfo(repo, version) {
    // gitTagService is a hardcoded list for now
    let tag = version || this.gitTagService.getLatestVersion(repo);
    return Promise.all([
      this.rawGitService.getRepositoryInfo(repo, tag),
      this.rawGitService.getPackageJson(repo, tag),
      // Need the change log to get all tags for a repo at the moment
      //   can probably replace this with Jeremy's recommendation for pulling from Github once
      //   and storing the tags in localStorage for the user
      this.rawGitService.getChangeLog(repo, tag)
    ]).then(() => {
      return this.npmService.parsePackageJson(repo);
    }).then(() => {
      if (!repo.isLoaded) {
        return this.changeLogService.parseChangeLog(repo);
      } else {
        Promise.resolve(false)
      }
    });
  }
}