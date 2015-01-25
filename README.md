git-san
=======

A git repositories manager.

# Abstract

`git-san` is a per-project git repositories dependencies manager CLI utlity. With it, you can install, update and uninstall git repositories. It keeps a small database of the installed dependencies in a file so you can also install from file.

# Install git-san

```bash
npm install -g git-san
```

# Install

Move to your project directory and enter the install command followed by the `repository-address`. It will create a directory called `git_components` and store repositories there. It will also create a file `git-san.json` as a small database to keep track of installed repositories.

## Usage

```bash
git-san install <repository-address>
```

Where `<repository-address>` can be:

1. **HTTP(s) URL**, `https://github.com/co2-git/git-san`
2. **SSH address**, `git@github.com:co2-git/git-san`
3. **Provider address** (from supported list of providers), `github:co2-git/git-san`
4. **Vendor Address** (if repository hosted in Github), `co2-git/git-san`

## Example with full address

```bash
git-san install https://github.com/co2-git/git-san
```

## Example with SSH

You can use both HTTP(S) or SSH.

```bash
git-san install git@github.com:co2-git/git-san
```

## Provider address

This is the list of the supported providers:

1. **github** `git-san install github:<vendor>/<repo>`
2. **bitbucket** `git-san install bitbucket:<vendor>/<repo>`
3. **gitlab** `git-san install gitlab:<vendor>/<repo>`

## Github shortcut

If you want to install a repository from Github, you can use this short syntax:

```bash
git-san install co2-git/git-san
```

## Auto-install

To install dependencies from the database file, just enter:

```bash
git-san install
```

# Branch, commit and tag

## Tag and semantic versioning

`git-san` will use semantic versioning if possible. If given a repository URL, it will check for tags and install the latest tag. It then uses semantic versioning to update the repository.

This will install `git-san` latest tag version (let's say 0.0.1):

```bash
git-san install co2-git/git-san
```

To this command, `git-san` will install the repo and answer with this JSON:

```json
{
	"co2-git/git-san": {
		"provider": "github",
		"vendor": "co2-git",
		"repo": "git-san",
		"tag": "0.0.1",
		"version": "~0.0.1"
	}
}
```

Note the `tag` attribute and the `version` attribute. The former contains the tag the repository is currently at, and the latter the semantic version declaration for updating.

### Install from specific tag

```bash
git-san install --tag=0.0.2 co2-git/git-san
```

### Semantic versioning

You can use semantic versioning:

```bash
git-san install --tag=~0.0.2 co2-git/git-san
```

### No semantic versioning

Not every repository use semantic versioning. In this case, you can still specify a tag at install time:

```bash
git-san install --tag=alpha co2-git/git-san
```

In this case though, you won't be able to automatically update the repository:

```bash
git-san update co2-git/git-san
```

will not do nothing - you have to pass it a new tag name:

```bash
git-san update --tag=beta co2-git/git-san
```

## Commit

If no tags are found, `git-san` will revert to commit strategy. In this case, it will install the repository from the latest commit from master and save that commit number. This commit number will be used to check for new versions. Any new commit number will be interpreted as a new version.

You can also skip tagging and force using commit strategy such as:

```bash
git-san install --commit co2-git/git-san
```

After installing the repository, `git-san` will answer with this JSON:

```json
{
	"co2-git/git-san": {
		"provider": "github",
		"vendor": "co2-git",
		"repo": "git-san",
		"commit": "373e6e2edc594ee632790778cbf94505f1d584bc",
		"branch": "master"
	}
}
```

## Branch

With the commit strategy, master is the branch by default to install from. You can specify another branch like this:

```bash
git-san install --commit --branch=dev co2-git/git-san
```

You will then get this JSON:

```json
{
	"co2-git/git-san": {
		"provider": "github",
		"vendor": "co2-git",
		"repo": "git-san",
		"commit": "373e6e2edc594ee632790778cbf94505f1d584bc",
		"branch": "dev"
	}
}
```

# Update

View strategies above to see how repositories get updated.

```bash
git-san update co2-git/git-san
```

# ls (List)

Invoke the `ls` command to see a list of installed repositories.

```bash
git-san ls
```

# Uninstall

```bash
git-san uninstall co2-git/git-san
```

# Change

```bash
# switch to commit strategy
git-san change --commit co2-git/git-san

# switch to tag strategy
git-san change --tag co2-git/git-san

# switch to another branch
git-san change --branch=dev co2-git/git-san
```
