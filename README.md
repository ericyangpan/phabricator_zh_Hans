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

当前翻译的 Phabricator 版本：[[7ae4d93](https://secure.phabricator.com/rP7ae4d93043c8c120dfd85df4689aa90f34dcca37)] `(stable) Promote 2017 Week 38`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：bef8938aea23082462076ff1bc529681bb7e9da1。

当前总词条数量：14343 条，不包含原型应用的总词条数量：12120 条。

当前整体翻译进度百分比：75%。

当前短词条翻译进度百分比：85%。注：短词条为长度小于 66 个字符的词条。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
aphront | 99% | ========= | 80% | ========
applications/almanac | 89% | ======== | 82% | ========
applications/aphlict | **100%** | ✓✓✓✓✓✓✓✓ | 71% | =======
applications/arcanist | --- |  | --- | 
applications/audit | 82% | ======== | 77% | =======
applications/auth | 88% | ======== | 67% | ======
applications/badges | 91% | ========= | 90% | ========
applications/base | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/cache | 88% | ======== | 69% | ======
applications/calendar `原型` | 92% | ========= | 87% | ========
applications/celerity | 67% | ====== | 57% | =====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 92% | ========= | 78% | =======
applications/config | 86% | ======== | 66% | ======
applications/conpherence | 97% | ========= | 96% | =========
applications/console | 70% | ======= | 68% | ======
applications/countdown | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/daemon | 99% | ========= | 86% | ========
applications/dashboard | 94% | ========= | 89% | ========
applications/differential | 78% | ======= | 71% | =======
applications/diffusion | 74% | ======= | 63% | ======
applications/diviner | 66% | ====== | 63% | ======
applications/doorkeeper | 68% | ====== | 57% | =====
applications/draft | --- |  | --- | 
applications/drydock | 76% | ======= | 65% | ======
applications/fact `原型` | 47% | ==== | 46% | ====
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/feed | 75% | ======= | 67% | ======
applications/files | 67% | ====== | 59% | =====
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 85% | ======== | 82% | ========
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 79% | ======= | 71% | =======
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 79% | ======= | 73% | =======
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 80% | ======== | 76% | =======
applications/lipsum | **100%** | ✓✓✓✓✓✓✓✓ | 71% | =======
applications/macro | 90% | ========= | 88% | ========
applications/maniphest | 98% | ========= | 93% | =========
applications/meta | **100%** | ✓✓✓✓✓✓✓✓ | 99% | =========
applications/metamta | 78% | ======= | 67% | ======
applications/multimeter `原型` | 79% | ======= | 79% | =======
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 75% | =======
applications/nuance `原型` | 79% | ======= | 74% | =======
applications/oauthserver `原型` | 84% | ======== | 71% | =======
applications/owners | 83% | ======== | 78% | =======
applications/packages `原型` | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/passphrase | 88% | ======== | 80% | ========
applications/paste | 92% | ========= | 91% | =========
applications/people | 97% | ========= | 87% | ========
applications/phame | 97% | ========= | 93% | =========
applications/phid | 75% | ======= | 63% | ======
applications/phlux `原型` | 96% | ========= | 92% | =========
applications/pholio | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phortune `原型` | 77% | ======= | 69% | ======
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 71% | ======= | 67% | ======
applications/phrequent `原型` | 80% | ======== | 76% | =======
applications/phriction | 97% | ========= | 96% | =========
applications/phurl `原型` | 88% | ======== | 87% | ========
applications/policy | 89% | ======== | 77% | =======
applications/ponder | 96% | ========= | 95% | =========
applications/project | 98% | ========= | 91% | =========
applications/releeph `原型` | 55% | ===== | 51% | =====
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 59% | ===== | 48% | ====
applications/search | 94% | ========= | 80% | =======
applications/settings | 95% | ========= | 87% | ========
applications/slowvote | 94% | ========= | 94% | =========
applications/spaces | 97% | ========= | 82% | ========
applications/subscriptions | **100%** | ✓✓✓✓✓✓✓✓ | 98% | =========
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 77% | ======= | 50% | =====
applications/tokens | 98% | ========= | 98% | =========
applications/transactions | 90% | ======== | 78% | =======
applications/typeahead | **100%** | ✓✓✓✓✓✓✓✓ | 98% | =========
applications/uiexample `原型` | 95% | ========= | 95% | =========
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