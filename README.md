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

当前翻译的 Phabricator 版本：[[81b5f90](https://secure.phabricator.com/rP81b5f90dd2417b617b3b3a31ed5831277d6aafb2)] `(stable) Promote 2017 Week 29`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：f0d4482db45d9d04991ac941d9c364520152a7fd。

当前总词条数量：14508 条，不包含原型应用的总词条数量：12276 条。

当前整体翻译进度百分比：48%。

当前短词条翻译进度百分比：55%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
\_\_tests\_\_ | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
aphront | 95% | ========= | 72% | =======
applications/almanac | 75% | ======= | 66% | ======
applications/aphlict | 95% | ========= | 63% | ======
applications/arcanist | --- |  | --- | 
applications/audit | 64% | ====== | 61% | ======
applications/auth | 70% | ======= | 53% | =====
applications/badges | 78% | ======= | 77% | =======
applications/base | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/cache | 89% | ======== | 70% | =======
applications/calendar `原型` | 68% | ====== | 63% | ======
applications/celerity | 57% | ===== | 49% | ====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 85% | ======== | 72% | =======
applications/config | 63% | ====== | 47% | ====
applications/conpherence | 45% | ==== | 43% | ====
applications/console | 56% | ===== | 55% | =====
applications/countdown | 45% | ==== | 44% | ====
applications/daemon | 47% | ==== | 40% | ===
applications/dashboard | 93% | ========= | 87% | ========
applications/differential | 43% | ==== | 38% | ===
applications/diffusion | 44% | ==== | 37% | ===
applications/diviner | 56% | ===== | 53% | =====
applications/doorkeeper | 24% | == | 20% | ==
applications/draft | --- |  | --- | 
applications/drydock | 39% | === | 33% | ===
applications/fact `原型` | 24% | == | 23% | ==
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/feed | 57% | ===== | 51% | =====
applications/files | 37% | === | 32% | ===
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 50% | ===== | 48% | ====
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 42% | ==== | 38% | ===
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 33% | === | 30% | ==
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 44% | ==== | 41% | ====
applications/lipsum | 13% | = | 9.5% | 
applications/macro | 64% | ====== | 62% | ======
applications/maniphest | 81% | ======== | 76% | =======
applications/meta | 90% | ======== | 89% | ========
applications/metamta | 53% | ===== | 45% | ====
applications/multimeter `原型` | 44% | ==== | 44% | ====
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 75% | =======
applications/nuance `原型` | 38% | === | 35% | ===
applications/oauthserver `原型` | 63% | ====== | 53% | =====
applications/owners | 41% | ==== | 38% | ===
applications/packages `原型` | 46% | ==== | 39% | ===
applications/passphrase | 58% | ===== | 53% | =====
applications/paste | 59% | ===== | 59% | =====
applications/people | 97% | ========= | 86% | ========
applications/phame | 81% | ======== | 77% | =======
applications/phid | 64% | ====== | 57% | =====
applications/phlux `原型` | 52% | ===== | 50% | =====
applications/pholio | 47% | ==== | 47% | ====
applications/phortune `原型` | 37% | === | 34% | ===
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 32% | === | 30% | ===
applications/phrequent `原型` | 50% | ===== | 47% | ====
applications/phriction | 94% | ========= | 93% | =========
applications/phurl `原型` | 53% | ===== | 52% | =====
applications/policy | 79% | ======= | 68% | ======
applications/ponder | 67% | ====== | 66% | ======
applications/project | 86% | ======== | 77% | =======
applications/releeph `原型` | 35% | === | 33% | ===
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 23% | == | 18% | =
applications/search | 74% | ======= | 61% | ======
applications/settings | 95% | ========= | 87% | ========
applications/slowvote | 48% | ==== | 48% | ====
applications/spaces | 83% | ======== | 71% | =======
applications/subscriptions | **100%** | ✓✓✓✓✓✓✓✓ | 95% | =========
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 57% | ===== | 38% | ===
applications/tokens | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/transactions | 71% | ======= | 62% | ======
applications/typeahead | **100%** | ✓✓✓✓✓✓✓✓ | 98% | =========
applications/uiexample `原型` | 33% | === | 32% | ===
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
infrastructure | 39% | === | 30% | ===
view | 99% | ========= | 96% | =========

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