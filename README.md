# Phabricator 简体中文翻译和工具

## 目录

* [翻译进度](#翻译进度)
* [启动翻译工具](#启动翻译工具)
* [编译翻译文件和 README 文件](#编译翻译文件和-readme-文件)
* [本地化 Phabricator](#本地化-phabricator)
* [提取 Phabricator 国际化字典资源](#提取-phabricator-国际化字典资源)
* [翻译指南](#翻译指南)
* [附录](#附录)
  * [翻译规则列表](Rules.md)
  * [术语表](Terminology.md)
  * [Phabricator 官方国际化文档](https://secure.phabricator.com/book/phabcontrib/article/internationalization/)

## 翻译进度

当前翻译的 Phabricator 版本：[[eed68de](https://secure.phabricator.com/rPeed68de99984e77e06258f0095eb86c6179f7e65s)] `(stable) Promote 2017 Week 27`，文件 `i18n_files.json` 的 SHA1 值：489a5c96b4f769bc04f535fdd5c27e5178885607。

当前总词条数量：14494 条，不包含原型应用的总词条数量：12270 条。

当前整体翻译进度百分比：47%。

当前短词条翻译进度百分比：54%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
\_\_tests\_\_ | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
aphront | 95% | ========= | 72% | =======
applications/almanac | 75% | ======= | 66% | ======
applications/aphlict | 95% | ========= | 63% | ======
applications/arcanist | --- |  | --- | 
applications/audit | 63% | ====== | 60% | ======
applications/auth | 70% | ====== | 53% | =====
applications/badges | 66% | ====== | 65% | ======
applications/base | **100%** | ✓✓✓✓✓✓✓✓ | 96% | =========
applications/cache | 89% | ======== | 70% | =======
applications/calendar `原型` | 67% | ====== | 62% | ======
applications/celerity | 59% | ===== | 50% | =====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 85% | ======== | 72% | =======
applications/config | 63% | ====== | 47% | ====
applications/conpherence | 45% | ==== | 43% | ====
applications/console | 55% | ===== | 53% | =====
applications/countdown | 45% | ==== | 44% | ====
applications/daemon | 47% | ==== | 40% | ===
applications/dashboard | 93% | ========= | 87% | ========
applications/differential | 40% | ==== | 35% | ===
applications/diffusion | 44% | ==== | 37% | ===
applications/diviner | 56% | ===== | 53% | =====
applications/doorkeeper | 24% | == | 20% | ==
applications/draft | --- |  | --- | 
applications/drydock | 38% | === | 33% | ===
applications/fact `原型` | 24% | == | 23% | ==
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/feed | 57% | ===== | 51% | =====
applications/files | 36% | === | 32% | ===
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 50% | ==== | 47% | ====
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 42% | ==== | 38% | ===
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 33% | === | 30% | ==
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 44% | ==== | 41% | ====
applications/lipsum | 13% | = | 9.5% | 
applications/macro | 64% | ====== | 62% | ======
applications/maniphest | 79% | ======= | 75% | =======
applications/meta | 90% | ======== | 89% | ========
applications/metamta | 53% | ===== | 45% | ====
applications/multimeter `原型` | 44% | ==== | 44% | ====
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 75% | =======
applications/nuance `原型` | 36% | === | 34% | ===
applications/oauthserver `原型` | 63% | ====== | 53% | =====
applications/owners | 41% | ==== | 38% | ===
applications/packages `原型` | 46% | ==== | 39% | ===
applications/passphrase | 58% | ===== | 53% | =====
applications/paste | 58% | ===== | 58% | =====
applications/people | 97% | ========= | 86% | ========
applications/phame | 81% | ======== | 77% | =======
applications/phid | 64% | ====== | 57% | =====
applications/phlux `原型` | 52% | ===== | 50% | =====
applications/pholio | 47% | ==== | 46% | ====
applications/phortune `原型` | 37% | === | 34% | ===
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 32% | === | 30% | ===
applications/phrequent `原型` | 50% | ===== | 47% | ====
applications/phriction | 94% | ========= | 93% | =========
applications/phurl `原型` | 53% | ===== | 52% | =====
applications/policy | 79% | ======= | 67% | ======
applications/ponder | 67% | ====== | 66% | ======
applications/project | 86% | ======== | 77% | =======
applications/releeph `原型` | 34% | === | 31% | ===
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 23% | == | 18% | =
applications/search | 75% | ======= | 62% | ======
applications/settings | 94% | ========= | 86% | ========
applications/slowvote | 48% | ==== | 48% | ====
applications/spaces | 83% | ======== | 71% | =======
applications/subscriptions | 93% | ========= | 88% | ========
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 57% | ===== | 38% | ===
applications/tokens | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/transactions | 71% | ======= | 62% | ======
applications/typeahead | **100%** | ✓✓✓✓✓✓✓✓ | 95% | =========
applications/uiexample `原型` | 32% | === | 31% | ===
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
infrastructure | 35% | === | 27% | ==
view | 89% | ======== | 85% | ========

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

然后你将得到五份文件：

1. Phabricator 简体中文翻译文件：`dist/PhabricatorSimplifiedChineseTranslation.php`；
2. 重新排序后的翻译数据文件：`data/translations.json`；
3. 包含最新摘要信息的 README 文件：`README.md`；
4. 翻译规则列表文件：`Rules.md`；
5. 术语表文件：`Terminology.md`。

## 本地化 Phabricator

将 `dist/PhabricatorSimplifiedChineseTranslation.php` 文件拷贝到 Phabricator 项目的 `phabricator/src/extensions` 目录中即可。

然后调整个人设置，进入 `Personal Settings` 的 `Account`，在 `Translation` 选项中选择 `Chinese (Simplified)`，保存后界面即切换为简体中文。

## 提取 Phabricator 国际化字典资源

当 Phabricator 项目更新时，会出现新的词条，这时需要提取新的国际化字典资源，方法如下：

首先拉取最新的 Phabricator 源码。在 **Phabricator** 项目路径，执行如下命令：

```sh
$ bin/i18n extract
```

然后你将在 Phabricator 项目的 `/src/.cache/` 目录中找到 `i18n_files.json` 文件。
拷贝 `i18n_files.json` 文件到本项目的 `data/` 目录。

## 翻译指南

* 是否翻译为中文的判断；
  * 如果英文意思无法直接表达名称所代表的功能，则不予翻译，保留英文，如 Multimeter 翻译成中文为“万用表”，并不是模块的本意“性能取样器”，所以不予翻译；
  * 开发术语，如：Pull 和 Push 等；
* 相同的英文单词和词组在同一意思下，尽量使用相同的翻译；
* 相同的英文单词和词组在不同意思下，避免使用相同的翻译；
* 相同结构的英文组合，要使用相同的翻译方法；
* 如果英文表达本身不准确，翻译过程中要予以校准；


## 附录

* [翻译规则列表](Rules.md)
* [术语表](Terminology.md)
* [Phabricator 官方国际化文档](https://secure.phabricator.com/book/phabcontrib/article/internationalization/)