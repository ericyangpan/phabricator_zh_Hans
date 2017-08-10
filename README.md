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

当前翻译的 Phabricator 版本：[[e0970a7](https://secure.phabricator.com/rPe0970a7e3d196a7e7f6e99e8616b67f4a3635c3d)] `(stable) Promote 2017 Week 31`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：20e3cd6d4bc0ad28bc58978db5598b63eeee1185。

当前总词条数量：14290 条，不包含原型应用的总词条数量：12077 条。

当前整体翻译进度百分比：56%。

当前短词条翻译进度百分比：65%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
aphront | 94% | ========= | 72% | =======
applications/almanac | 76% | ======= | 67% | ======
applications/aphlict | 95% | ========= | 63% | ======
applications/arcanist | --- |  | --- | 
applications/audit | 69% | ====== | 65% | ======
applications/auth | 69% | ====== | 53% | =====
applications/badges | 84% | ======== | 82% | ========
applications/base | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/cache | 88% | ======== | 69% | ======
applications/calendar `原型` | 70% | ======= | 65% | ======
applications/celerity | 60% | ====== | 51% | =====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 86% | ======== | 73% | =======
applications/config | 70% | ====== | 52% | =====
applications/conpherence | 95% | ========= | 93% | =========
applications/console | 56% | ===== | 55% | =====
applications/countdown | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/daemon | 96% | ========= | 81% | ========
applications/dashboard | 93% | ========= | 88% | ========
applications/differential | 47% | ==== | 41% | ====
applications/diffusion | 48% | ==== | 41% | ====
applications/diviner | 57% | ===== | 54% | =====
applications/doorkeeper | 29% | == | 24% | ==
applications/draft | --- |  | --- | 
applications/drydock | 41% | ==== | 35% | ===
applications/fact `原型` | 26% | == | 26% | ==
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/feed | 63% | ====== | 56% | =====
applications/files | 55% | ===== | 48% | ====
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 57% | ===== | 55% | =====
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 49% | ==== | 43% | ====
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 47% | ==== | 43% | ====
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 49% | ==== | 46% | ====
applications/lipsum | **100%** | ✓✓✓✓✓✓✓✓ | 71% | =======
applications/macro | 73% | ======= | 70% | ======
applications/maniphest | 98% | ========= | 93% | =========
applications/meta | 90% | ======== | 89% | ========
applications/metamta | 67% | ====== | 56% | =====
applications/multimeter `原型` | 50% | ===== | 50% | =====
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 75% | =======
applications/nuance `原型` | 41% | ==== | 39% | ===
applications/oauthserver `原型` | 67% | ====== | 55% | =====
applications/owners | 75% | ======= | 70% | =======
applications/packages `原型` | 64% | ====== | 57% | =====
applications/passphrase | 63% | ====== | 58% | =====
applications/paste | 64% | ====== | 63% | ======
applications/people | 97% | ========= | 86% | ========
applications/phame | 85% | ======== | 81% | ========
applications/phid | 67% | ====== | 58% | =====
applications/phlux `原型` | 57% | ===== | 54% | =====
applications/pholio | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phortune `原型` | 46% | ==== | 41% | ====
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 36% | === | 34% | ===
applications/phrequent `原型` | 54% | ===== | 51% | =====
applications/phriction | 95% | ========= | 94% | =========
applications/phurl `原型` | 58% | ===== | 58% | =====
applications/policy | 86% | ======== | 73% | =======
applications/ponder | 74% | ======= | 73% | =======
applications/project | 99% | ========= | 91% | =========
applications/releeph `原型` | 40% | ==== | 37% | ===
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 30% | === | 24% | ==
applications/search | 96% | ========= | 80% | =======
applications/settings | 94% | ========= | 86% | ========
applications/slowvote | 66% | ====== | 66% | ======
applications/spaces | 86% | ======== | 73% | =======
applications/subscriptions | **100%** | ✓✓✓✓✓✓✓✓ | 95% | =========
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 68% | ====== | 44% | ====
applications/tokens | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/transactions | 79% | ======= | 68% | ======
applications/typeahead | **100%** | ✓✓✓✓✓✓✓✓ | 98% | =========
applications/uiexample `原型` | 38% | === | 37% | ===
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
infrastructure | 48% | ==== | 37% | ===
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