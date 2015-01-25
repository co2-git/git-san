git-san
=======

A git repositories manager.

# Abstract

`git-san` is a per-project git repositories dependencies manager CLI utlity. With it, you can install, update and uninstall git repositories. It keeps a small database of the installed dependencies in a file so you can also install from file.

# Install

```bash
npm install -g git-san
git-san
```

# Install

Move to your project directory and enter the install command followed by the `repository-address`. It will create a directory called `git_components` and store repositories there. It will also create a file `git-san.json` as a small database to keep track of installed repositories.

## Usage

```bash
git-san install <repository-address>
```

## Example with full address

```bash
git-san install https://github.com/co2-git/git-san
```

## Example with SSH

You can use both HTTP(S) or SSH.

```bash
git-san install git@github.com:co2-git/git-san
```

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

### Example output

```json
{
	"co2-git/git-san": {
		"provider": "github",
		"vendor": "co2-git",
		"repo": "git-san",
		"commit": "...",
		"branch": "master",
		"tag": "..."
	}
}
```

# Uninstall

```bash
git-san uninstall co2-git/git-san
```

# Update
