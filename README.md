git-san
=======

A git repositories manager.

# Abstract

It is a spin-off from Bower. Here, it uses 'git clone' to install the components.

# Install

```bash
npm install -g git-san
```

# Terminal usage

```bash
git-san ls # view project's dependencies if any
git-san install github:co2-git/gitsan
git-san	uninstall github:co2-git/gitsan
```

# git-san.json

git-san keeps a small database of the installed repositories. It can be found in the file `git-san.json` of the current directory
