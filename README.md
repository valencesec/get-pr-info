# get-pr-commits

A GitHub Action that get last commit, body and author in current pull-request

## Usage
Add .github/workflows/sanity-check.yml with the following:

```
name: Sanity check
on: [pull_request]

jobs:
  info_check_job:
    runs-on: ubuntu-latest
    name: Info Check
    steps:
    - name: Get PR Info
      id: 'get-pr-info'
      uses: tagenasec/get-pr-info@master
      with:
        token: ${{ secrets.GITHUB_TOKEN }}

```
