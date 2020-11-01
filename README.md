> ***Warning:*** This is the working branch of pheasant and may contain features that are a work in progress. Switch to master branch to view latest stable version

# Pheasant

Pheasanet is an online message board application, but it is not limited to that. You can use it as your notebook, or your blog. You can do whatever you want with it.

## Features

- Supports Markdown
- Password is salted and hashed with the SHA256 algorithm
- Code highlighting with `prism-react-renderer`
- Edit your message after posting
- Gravatar integration

## Installation

**Prerequisites**

- A stable version of Node.js (other version may work, but I won't test against them)
- Lerna
- Yarn (not forced, but lerna is configured to use Yarn and Yarn Workspaces in this project. npm could still work, but you may need to change the value of `command.bootstrap.npmClient` and `command.bootstrap.useWorkspaces` in `lerna.json`)
- C++ Compiler Toolchain (although most of the native library the server uses provides precompiled binary, it is better to have the toolchain installed on your machine)

First, pull the code down to your local machine:

```bash
git clone https://github.com/KsRyY/pheasant
```

Then, bootstrap it:

```bash
cd pheasant
lerna bootstrap
yarn run configure
```

Follow the instruction to finish configuring the application.

Finally, run the server:

```bash
yarn run start
```

## Roadmap

Please reference [ROADMAP.md](./ROADMAP.md)
