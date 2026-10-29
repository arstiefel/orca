import type { ProjectHostSetup } from '../../../../shared/project-types'
import type { Repo } from '../../../../shared/repo-types'
import { getRepoHostIdentity } from '../../../../shared/repo-host-identity'
import { getComposerEligibleRepos } from '@/lib/new-workspace-composer-repo'
import {
  getRepoWorkspaceCreationTargetHint,
  type WorkspaceCreationTargetHint
} from '@/lib/project-host-workspace-target'

/** A host-section header's create target: its own host, since the header repeats per host section and ids alone can't pick one. */
export function getHeaderCreateWorkspaceTarget(
  repo: Repo,
  repos: readonly Repo[],
  projectHostSetups: readonly ProjectHostSetup[]
): { initialWorkspaceTarget?: WorkspaceCreationTargetHint } {
  const identity = getRepoHostIdentity(repo)
  // Plumbing repos the composer can't target keep the id path, which maps them to an eligible sibling.
  return getComposerEligibleRepos(repos).some(
    (candidate) => getRepoHostIdentity(candidate) === identity
  )
    ? { initialWorkspaceTarget: getRepoWorkspaceCreationTargetHint(repo, projectHostSetups) }
    : {}
}
