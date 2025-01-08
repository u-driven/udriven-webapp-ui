## official webapp

Whether you're a developer, designer, tester, or enthusiast, there are plenty of ways to get involved and make a difference. 
We welcome contributions to our open source projects.

# udriven-webapp-ui

Front End Web App v1 Repo

## Installation

(You must install node.js first)

* node.js version : v20.18.0

1. Install node_modules dependencies(from package.json)

```
$ npm install
```

2. Run repository

- development(run code in local)

```
$ npm run serve
```

3. Publish repository

- build(bundle before push to server)

```
$ npm run build （需至package.json設定編譯環境）
```


### update:2025/1/08

```
viper-webapp-ui/
├─── .github/                       # github佈署設定檔案
├─── dist/                          # 編譯後檔案，發佈用
├─── node_modules/                  # node.js模組套件
│
├─── public/                        # 靜態檔案
│   └─── api                        # local端測試api文件，不會編譯發佈
│
├─── src/                           # Vue3 composition codebase
│   └─── assets/
│   │   └─── images/                # icon與圖檔放置
│   │   └─── scss/                  # SCSS & CSS
│   │       └─── _variabled         # Bootstrap 5 SCSS 客製化
│   │       └─── all                # SCSS主入口檔
│   └─── components/                # 頁面組件庫
│   └─── lang/                      # 多語系包
│   └─── router/                    # 路由設定
│   └─── store/                     # Pinia
│   └─── utils/                     # 共用function庫
│   └─── views/                     # 各頁主頁面框
│   └─── App.vue                    # 主頁面匡
│   └─── main.js                    # vue全域設定與套件入口
│
├─── .env.SND                       # SND環境編譯路徑
├─── .env.DEV                       # DEV環境編譯路徑
├─── .env.TST                       # TST環境編譯路徑
├─── .env.PRD                       # PRD環境編譯路徑
├─── .env.local                     # local (For Apache) 環境編譯路徑
├─── .env.serve                     # local (For localhost) 環境編譯路徑
├─── .npmrc                         # npm套件位置導向 (For our inside packages)
├─── babel.config.js
├─── index.html                     # 進入點
└─── package.json                   # node.js相關套件資訊
└─── vite.config.js                  # Vue & vite設定檔
```

## Create New Branch and Merge to Master

1. Create new branch (SANDPIT)

```
$ git branch your_branch_name
```

2. Check-in with new branch

```
$ git checkout your_branch_name
```

3. Add and commit files

```
$ git add .
$ git commit -m 'your commit...'
```

4. Push to origin

```
$ git push origin your_branch_name
```

5. Merge to master

```
$ git checkout master
$ git merge your_branch_name
```

## Remarks

1. Use camel case with javascript variables declaration (coding style suggestion)
2. New creating folder naming with underscore