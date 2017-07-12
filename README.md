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

当前总词条数量：14514 条，不包含原型应用的总词条数量：12290 条。

当前整体翻译进度百分比：43%。

当前短词条翻译进度百分比：49%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
\_\_tests\_\_ | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
aphront | 95% | ========= | 72% | =======
applications/almanac | 75% | ======= | 66% | ======
applications/aphlict | 95% | ========= | 63% | ======
applications/arcanist | --- |  | --- | 
applications/audit | 63% | ====== | 59% | =====
applications/auth | 69% | ====== | 53% | =====
applications/badges | 65% | ====== | 64% | ======
applications/base | 91% | ========= | 88% | ========
applications/cache | **100%** | ✓✓✓✓✓✓✓✓ | 82% | ========
applications/calendar `原型` | 66% | ====== | 61% | ======
applications/celerity | 55% | ===== | 47% | ====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 49% | ==== | 42% | ====
applications/config | 52% | ===== | 39% | ===
applications/conpherence | 44% | ==== | 42% | ====
applications/console | 48% | ==== | 47% | ====
applications/countdown | 43% | ==== | 43% | ====
applications/daemon | 41% | ==== | 35% | ===
applications/dashboard | 93% | ========= | 87% | ========
applications/differential | 36% | === | 31% | ===
applications/diffusion | 43% | ==== | 36% | ===
applications/diviner | 54% | ===== | 52% | =====
applications/doorkeeper | 20% | = | 16% | =
applications/draft | --- |  | --- | 
applications/drydock | 37% | === | 32% | ===
applications/fact `原型` | 24% | == | 23% | ==
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/feed | 57% | ===== | 51% | =====
applications/files | 36% | === | 31% | ===
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 49% | ==== | 46% | ====
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 35% | === | 31% | ===
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 32% | === | 29% | ==
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 43% | ==== | 41% | ====
applications/lipsum | 13% | = | 9.5% | 
applications/macro | 63% | ====== | 60% | ======
applications/maniphest | 73% | ======= | 70% | ======
applications/meta | 90% | ======== | 89% | ========
applications/metamta | 51% | ===== | 44% | ====
applications/multimeter `原型` | 35% | === | 35% | ===
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 76% | =======
applications/nuance `原型` | 34% | === | 32% | ===
applications/oauthserver `原型` | 63% | ====== | 52% | =====
applications/owners | 40% | ==== | 37% | ===
applications/packages `原型` | 46% | ==== | 39% | ===
applications/passphrase | 48% | ==== | 44% | ====
applications/paste | 55% | ===== | 54% | =====
applications/people | 87% | ======== | 77% | =======
applications/phame | 53% | ===== | 51% | =====
applications/phid | 64% | ====== | 43% | ====
applications/phlux `原型` | 52% | ===== | 50% | =====
applications/pholio | 42% | ==== | 41% | ====
applications/phortune `原型` | 34% | === | 30% | ===
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 26% | == | 25% | ==
applications/phrequent `原型` | 52% | ===== | 49% | ====
applications/phriction | 94% | ========= | 92% | =========
applications/phurl `原型` | 53% | ===== | 52% | =====
applications/policy | 79% | ======= | 67% | ======
applications/ponder | 65% | ====== | 64% | ======
applications/project | 85% | ======== | 77% | =======
applications/releeph `原型` | 32% | === | 29% | ==
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 22% | == | 18% | =
applications/search | 74% | ======= | 61% | ======
applications/settings | 94% | ========= | 86% | ========
applications/slowvote | 47% | ==== | 47% | ====
applications/spaces | 82% | ======== | 70% | =======
applications/subscriptions | 93% | ========= | 88% | ========
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 50% | ===== | 33% | ===
applications/tokens | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/transactions | 57% | ===== | 50% | ====
applications/typeahead | **100%** | ✓✓✓✓✓✓✓✓ | 95% | =========
applications/uiexample `原型` | 31% | === | 30% | ===
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
infrastructure | 32% | === | 25% | ==
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