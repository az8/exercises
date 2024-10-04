import { IEntityCommit } from '@/types/commits/IEntityCommit';
import { SAMPLE_COMMITS } from './constants/commit-constants';

export abstract class CommitService {
  public static async genCommits(): Promise<IEntityCommit[]> {
    return SAMPLE_COMMITS;
  }

}
