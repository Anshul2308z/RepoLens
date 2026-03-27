import { fetchCommits, fetchPRs, fetchIssues, fetchBranches } from "./lib/github"
import { normalizeCommits, buildTimeline,
     buildContributors, buildPRContributors,
      buildIssueContributors, buildStats } from "./lib/process"

function json(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const repoURI = searchParams.get("url")

  const branch = searchParams.get("branch") || "main"; 

  if (!repoURI) {
    return json({
      timeline: [],
      contributors: [],
      commits: [],
      prs: [],
      issues: [],
      branches: [],
      stats: {
        totalCommits: 0,
        activeDays: 0,
        totalPRs: 0,
        totalIssues: 0,
        busFactor: 0,
        totalContributors: 0
      },
      error: "Missing 'url' query parameter"
    }, 400)
  }

  const parts = repoURI.split("/")
  const owner = parts[3]
  const repo = parts[4]

  if (!owner || !repo) {
    return json({
      timeline: [],
      contributors: [],
      commits: [],
      prs:[],
      issues: [],
      branches: [],
      stats: {
        totalCommits: 0,
        activeDays: 0,
        totalPRs: 0,
        totalIssues: 0,
        busFactor: 0,
        totalContributors: 0
      },
      error: "Invalid GitHub URL"
    }, 400)
  }

  try {
    const raw = await fetchCommits(owner, repo, branch)

    const commits = normalizeCommits(raw)

    if (!commits.length) {
      return json({
        timeline: [],
        contributors: [],
        commits: [],
        prs: [],
        issues: [],
        branches: [],
        stats: {
          totalCommits: 0,
          activeDays: 0,
          totalPRs: 0,
          totalIssues: 0,
          busFactor: 0,
          totalContributors: 0
        },
        error: "No commits found"
      }, 404)
    }

    const timeline = buildTimeline(commits)
    const contributors = buildContributors(commits)

    const prRaw = await fetchPRs(owner, repo)
    const prs = buildPRContributors(prRaw)

    const issuesRaw = await fetchIssues(owner, repo)
    const issues = buildIssueContributors(issuesRaw)

    const branchesNew = await fetchBranches(owner, repo)
    const branches = branchesNew.map((b: any) => b.name)

    const stats = buildStats(
                    commits,
                    contributors,
                    prs,
                    issues
                    )

    return json({
      timeline,
      contributors,
      commits,
      prs,
      issues,
      branches,
      stats
    }, 200)

  } catch (err: any) {
    if (err.message === "RATE_LIMIT") {
      return json({
        timeline: [],
        contributors: [],
        commits: [],
        prs:[],
        issues: [],
        branches: [],
        stats: {
          totalCommits: 0,
          activeDays: 0,
          totalPRs: 0,
          totalIssues: 0,
          busFactor: 0,
          totalContributors: 0

        },
        error: "Rate limit exceeded"
      }, 429)
    }

    return json({
      timeline: [],
      contributors: [],
      commits: [],
      prs: [],
      issues: [], 
      branches: [],
      stats: {
        totalCommits: 0,
        activeDays: 0,
        totalPRs: 0,
        totalIssues: 0,
        busFactor: 0,
        totalContributors: 0

      },

      error: "Internal server error"
    }, 500)
  }
}