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

当前翻译的 Phabricator 版本：[[66896e8bf7](https://secure.phabricator.com/rP66896e8bf7169a7d7830a68fe82d49ce1b7bc164)]`(stable) Pull some debugging code back out of "master"`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：9d41c4001a3ca1d8cc6aeb929b8c594183616b9d。

当前翻译的 libphutil 版本：[[b29d76e](https://secure.phabricator.com/rPHUb29d76e1709ef018cc5edc7c03033fd9fdebc578)]`(stable) Promote 2018 Week 45`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：9d41c4001a3ca1d8cc6aeb929b8c594183616b9d。

当前总词条数量：15285 条，不包含原型应用的总词条数量：13019 条。

当前整体翻译进度百分比：73%。

当前短词条翻译进度百分比：83%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
aphront | 97% | ========= | 80% | =======
applications/almanac | 81% | ======== | 73% | =======
applications/aphlict | **100%** | ✓✓✓✓✓✓✓✓ | 71% | =======
applications/arcanist | --- |  | --- | 
applications/audit | 80% | ======= | 74% | =======
applications/auth | 88% | ======== | 67% | ======
applications/badges | 92% | ========= | 91% | =========
applications/base | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/cache | 86% | ======== | 67% | ======
applications/calendar `原型` | 93% | ========= | 89% | ========
applications/celerity | 93% | ========= | 83% | ========
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 93% | ========= | 80% | =======
applications/config | 93% | ========= | 71% | =======
applications/conpherence | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/console | 70% | ======= | 68% | ======
applications/countdown | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/daemon | 98% | ========= | 86% | ========
applications/dashboard | 95% | ========= | 90% | =========
applications/differential | 79% | ======= | 72% | =======
applications/diffusion | 78% | ======= | 66% | ======
applications/diviner | 71% | ======= | 67% | ======
applications/doorkeeper | 73% | ======= | 60% | ======
applications/draft | --- |  | --- | 
applications/drydock | 72% | ======= | 61% | ======
applications/fact `原型` | 43% | ==== | 42% | ====
applications/favorites | 75% | ======= | 75% | =======
applications/feed | 75% | ======= | 67% | ======
applications/files | 72% | ======= | 62% | ======
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 90% | ========= | 87% | ========
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 76% | ======= | 67% | ======
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 77% | ======= | 70% | =======
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 89% | ======== | 84% | ========
applications/lipsum | **100%** | ✓✓✓✓✓✓✓✓ | 71% | =======
applications/macro | 94% | ========= | 91% | =========
applications/maniphest | 97% | ========= | 92% | =========
applications/meta | **100%** | ✓✓✓✓✓✓✓✓ | 99% | =========
applications/metamta | 74% | ======= | 65% | ======
applications/multimeter `原型` | 82% | ======== | 82% | ========
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 73% | =======
applications/nuance `原型` | 81% | ======== | 76% | =======
applications/oauthserver `原型` | 85% | ======== | 72% | =======
applications/owners | 78% | ======= | 74% | =======
applications/packages `原型` | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/passphrase | 88% | ======== | 81% | ========
applications/paste | 99% | ========= | 99% | =========
applications/people | 99% | ========= | 90% | ========
applications/phame | 99% | ========= | 95% | =========
applications/phid | **100%** | ✓✓✓✓✓✓✓✓ | 79% | =======
applications/phlux `原型` | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/pholio | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phortune `原型` | 79% | ======= | 72% | =======
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 72% | ======= | 68% | ======
applications/phrequent `原型` | 80% | ======== | 76% | =======
applications/phriction | 91% | ========= | 88% | ========
applications/phurl `原型` | 90% | ======== | 89% | ========
applications/policy | 89% | ======== | 77% | =======
applications/ponder | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/project | 96% | ========= | 89% | ========
applications/releeph `原型` | 58% | ===== | 54% | =====
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 73% | ======= | 64% | ======
applications/search | 88% | ======== | 74% | =======
applications/settings | 97% | ========= | 89% | ========
applications/slowvote | 99% | ========= | 98% | =========
applications/spaces | 97% | ========= | 82% | ========
applications/subscriptions | **100%** | ✓✓✓✓✓✓✓✓ | 98% | =========
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 74% | ======= | 49% | ====
applications/tokens | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/transactions | 81% | ======== | 69% | ======
applications/typeahead | 91% | ========= | 88% | ========
applications/uiexample `原型` | 97% | ========= | 97% | =========
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
infrastructure | 64% | ====== | 51% | =====
view | 99% | ========= | 97% | =========

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
$ bin/i18n extract ../libphutil
```

然后你将在 Phabricator 项目的 `/src/.cache/` 目录中找到 `i18n_files.json` 文件，拷贝 `i18n_files.json` 文件到本项目的 `data/phabricator` 目录。

然后你将在 libphutil 项目的 `/src/.cache/` 目录中找到 `i18n_files.json` 文件，拷贝 `i18n_files.json` 文件到本项目的 `data/libphutil` 目录。

如果您的 Phabricator 项目和本项目处于同级目录，可以直接在本项目路径下执行以下命令来完成提取和更新国际化字典的工作：

```sh
$ bin/update
```

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