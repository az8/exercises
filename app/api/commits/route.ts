import { CommitService } from '@/services/commits/CommitService';
import { IEntityCommit } from '@/types/commits/IEntityCommit';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse<IEntityCommit[]>> => {
  const commits = await CommitService.genCommits();
  return NextResponse.json(commits);
};
