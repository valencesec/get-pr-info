const core = require('@actions/core')
const github = require('@actions/github')

const validEvent = ['pull_request']

async function main() {
  try {
    const { eventName, payload: {repository: repo, pull_request: pr} } = github.context

    if (validEvent.indexOf(eventName) < 0) {
      core.error(`Invalid event: ${eventName}`)
      return
    }

    const token = core.getInput('token')
    const octokit = new github.GitHub(token)

    const commits = await octokit.pulls.listCommits({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pr.number,
    })

    const {data: pullRequest} = await octokit.pulls.get({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pr.number,
    });

    const body = {"data":[{"body":pr.body}]}
    const title = {"data":[{"title": pullRequest.title}]}

    core.setOutput('body', JSON.stringify(body.data))
    core.setOutput('title', JSON.stringify(title.data))
    core.setOutput('commits', JSON.stringify(commits.data))
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()
