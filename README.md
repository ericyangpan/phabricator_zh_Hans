# Phabricator 简体中文翻译和工具

目录

* [启动翻译工具](#启动翻译工具)
* [编译翻译文件和 README 文件](#编译翻译文件和-readme-文件)
* [本地化 Phabricator](#本地化-phabricator)
* [提取 Phabricator 中的国际化字典](#提取-phabricator-中的国际化字典)
* [附带的工具](#附带的工具)
* [附录](#附录)
  * [翻译规则列表](https://github.com/arielyang/phabricator_zh_Hans/blob/master/rules.md)
  * [术语表](https://github.com/arielyang/phabricator_zh_Hans/blob/master/terminology.md)
  * [Phabricator 官方国际化文档](https://secure.phabricator.com/book/phabcontrib/article/internationalization/)

当前词条总数量：16353 条。

当前整体翻译进度百分比：44%。

当前短词条翻译进度百分比：50%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | ------------ | ----------- | ------------ | -----------
\_\_tests\_\_ | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
aphront | 92% | ========= | 70% | =======
applications/almanac | 73% | ======= | 64% | ======
applications/aphlict | 95% | ========= | 63% | ======
applications/arcanist | --- |  | --- | 
applications/audit | 36% | === | 34% | ===
applications/auth | 60% | ====== | 46% | ====
applications/badges | 58% | ===== | 57% | =====
applications/base | 91% | ========= | 88% | ========
applications/cache | 90% | ======== | 72% | =======
applications/calendar `原型` | 65% | ====== | 61% | ======
applications/celerity | 55% | ===== | 47% | ====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 48% | ==== | 40% | ====
applications/config | 45% | ==== | 34% | ===
applications/conpherence | 40% | === | 38% | ===
applications/console | 48% | ==== | 47% | ====
applications/countdown | 43% | ==== | 43% | ====
applications/daemon | 37% | === | 31% | ===
applications/dashboard | 81% | ======== | 76% | =======
applications/differential | 35% | === | 30% | ===
applications/diffusion | 36% | === | 31% | ===
applications/diviner | 44% | ==== | 42% | ====
applications/doorkeeper | 20% | = | 16% | =
applications/draft | --- |  | --- | 
applications/drydock | 27% | == | 23% | ==
applications/fact `原型` | 16% | = | 15% | =
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/feed | 38% | === | 33% | ===
applications/files | 29% | == | 26% | ==
applications/flag | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/fund `原型` | 40% | ==== | 38% | ===
applications/guides | **100%** | ✓✓✓✓✓✓✓✓✓✓ | 95% | =========
applications/harbormaster | 31% | === | 28% | ==
applications/help | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/herald | 28% | == | 26% | ==
applications/home | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/legalpad | 43% | ==== | 39% | ===
applications/lipsum | 13% | = | 9.5% | 
applications/macro | 63% | ====== | 60% | ======
applications/maniphest | 73% | ======= | 70% | ======
applications/meta | 87% | ======== | 87% | ========
applications/metamta | 50% | ==== | 42% | ====
applications/multimeter `原型` | 35% | === | 35% | ===
applications/notification | **100%** | ✓✓✓✓✓✓✓✓✓✓ | 76% | =======
applications/nuance `原型` | 32% | === | 30% | ==
applications/oauthserver `原型` | 52% | ===== | 44% | ====
applications/owners | 36% | === | 34% | ===
applications/packages `原型` | 42% | ==== | 35% | ===
applications/passphrase | 44% | ==== | 40% | ===
applications/paste | 52% | ===== | 52% | =====
applications/people | 87% | ======== | 77% | =======
applications/phame | 52% | ===== | 50% | =====
applications/phid | 64% | ====== | 43% | ====
applications/phlux `原型` | 48% | ==== | 46% | ====
applications/pholio | 40% | ==== | 39% | ===
applications/phortune `原型` | 28% | == | 25% | ==
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/phragment `原型` | 25% | == | 24% | ==
applications/phrequent `原型` | 50% | ===== | 47% | ====
applications/phriction | 94% | ========= | 92% | =========
applications/phurl `原型` | 45% | ==== | 44% | ====
applications/policy | 79% | ======= | 67% | ======
applications/ponder | 64% | ====== | 63% | ======
applications/project | 83% | ======== | 75% | =======
applications/releeph `原型` | 27% | == | 25% | ==
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/repository | 21% | == | 17% | =
applications/search | 73% | ======= | 61% | ======
applications/settings | 93% | ========= | 85% | ========
applications/slowvote | 46% | ==== | 46% | ====
applications/spaces | 82% | ======== | 70% | =======
applications/subscriptions | 93% | ========= | 88% | ========
applications/support | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
applications/system | 43% | ==== | 29% | ==
applications/tokens | 98% | ========= | 98% | =========
applications/transactions | 55% | ===== | 48% | ====
applications/typeahead | **100%** | ✓✓✓✓✓✓✓✓✓✓ | 95% | =========
applications/uiexample `原型` | 31% | === | 30% | ==
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓✓✓
infrastructure | 29% | == | 23% | ==
view | 88% | ======== | 85% | ========

## 启动翻译工具

在当前项目目录，执行如下命令：

```sh
$ npm start
```

然后启动浏览器（建议 Chrome 或者 Safari），打开网址 http://localhost:3000 来启动翻译工具。

## 编译翻译文件和 README 文件

在当前项目目录，执行如下命令：

```sh
$ bin/compile
```

然后你将得到四份文件：

1. Phabricator 简体中文翻译文件：`dist/PhabricatorSimplifiedChineseTranslation.php`；
2. 翻译数据文件：`data/translations.json`；
3. 包含最新摘要信息的 README 文件：`README.md`。

## 本地化 Phabricator

将 `dist/PhabricatorSimplifiedChineseTranslation.php` 文件拷贝到 Phabricator 项目的 `phabricator/src/extensions` 目录中即可。

然后调整个人设置，进入 `Personal Settings` 的 `Account`，在 `Translation` 选项中选择 `Chinese (Simplified)`，保存后界面即切换为简体中文。

## 提取 Phabricator 中的国际化字典

首先拉取最新的 Phabricator 源码。在 **Phabricator** 项目路径，执行如下命令：

```sh
$ bin/i18n extract
```

然后你将在 Phabricator 项目的 `/src/.cache/` 目录中找到 `i18n_files.json` 文件。
拷贝 `i18n_files.json` 文件到本项目的 `data/` 目录。

## 附带的工具

 `sortjson` 是一个用来排序 JSON 文件内容的附带工具。

 在当前项目目录，执行如下命令：

 ```sh
 $ bin/sortjson
 ```

**帮助**

```sh
$ bin/sortjson file selector

排序所有属性。举例：bin/sortjson ./data/example.json
只排序根节点下的属性。举例：bin/sortjson ./data/example.json .
只排序给定节点下的属性。举例：bin/sortjson ./data/example.json words.
排序给定节点下的所有子节点属性。举例：bin/sortjson ./data/example.json words
```

## 附录

* [翻译规则列表](https://github.com/arielyang/phabricator_zh_Hans/blob/master/rules.md)
* [术语表](https://github.com/arielyang/phabricator_zh_Hans/blob/master/terminology.md)
* [Phabricator 官方国际化文档](https://secure.phabricator.com/book/phabcontrib/article/internationalization/)