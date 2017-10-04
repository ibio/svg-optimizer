# svg-optimizer

A simple npm package for shuffling duplicated ids within the folder(including sub-folders).

```bash
$ npm run svg-optimizer root=./folder
or
$ npm run svg-optimizer file=./example.svg
```

- [PRs and Stars are always welcome](https://github.com/ibio/svg-optimizer)

------

### Installing

```bash
$ npm install svg-optimizer
```

After installation, you can write the following into `scripts` of you project's `package.json`.

### Script Usage

```bash
$ npm run svg-optimizer root=./folder
or
$ npm run svg-optimizer file=./example.svg
```

`root` means the root folder you want to pass. It will automatically traverse all its sub-folders and find out all `svg` files, making them have DIFFERENT IDs with each other (as long as they have different filenames). It also support pause / resume (just simply press `ctrl + C`)! In case you want to stop for some reason during the optimization.

`file` means the specific svg file you want to pass. It will only shuffle IDs within this file.


