# svg-optimizer

A simple npm package for shuffling duplicated ids within the folder(including sub-folders).

```bash
svg-optimizer root=./folder
or
svg-optimizer file=./example.svg
```

- [PRs and Stars are always welcome](https://github.com/ibio/svg-optimizer)

------

### Installing

```bash
$ npm install svg-optimizer --save-dev
```

After installation, you can write the following into `scripts` of you project's `package.json`.

### Script Usage

1 add a `package.json`, run the following at your root folder
```bash
$ npm init
```
you can hit 'enter' to use all default setting.

2 add `scripts` on `package.json`.
```json
"scripts": {
  "svg-root": "svg-optimizer root='./folder'",
  "svg-file": "svg-optimizer file='./folder/example.svg'"
},
```

3 run the scripts
```bash
$ npm run svg-root
or
$ npm run svg-file
```

`root` means the root folder you want to pass. It will automatically traverse all its sub-folders and find out all `svg` files, making them have DIFFERENT IDs with each other (as long as they have different filenames). It also support pause / resume (just simply press `ctrl + C` and run the same script again)! In case you want to stop for some reason during the optimization.

`file` means the specific svg file you want to pass. It will only shuffle IDs within this file. If there is a space in the path file, please add `''` to wrap it. Also, you can use `,` to pass multiple files.


