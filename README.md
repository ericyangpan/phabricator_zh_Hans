# Phabricator 简体中文翻译（汉化）和工具

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

当前翻译的 Phabricator 版本：[[4c242256e](https://secure.phabricator.com/rP4c242256e490bd9c7e865137dd345287696f0cff)]`(stable) Promote 2019 Week 26`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：6a64c8462a8c6923085bcfde105c45e80c3669cc。

当前翻译的 libphutil 版本：[[a4feaf5](https://secure.phabricator.com/rPHUa4feaf52f4c01ff692e46e53bb731c9d7e5bedfe)]`(stable) Promote 2019 Week 26`，文件 `data/phabricator/i18n_files.json` 的 SHA1 值：6a64c8462a8c6923085bcfde105c45e80c3669cc。

当前总词条数量：16018 条，不包含原型应用的总词条数量：13728 条。

当前整体翻译进度百分比：78%。

当前短词条翻译进度百分比：90%。注：短词条为长度小于 66 个字符的词条。

当前不包含原型应用的翻译进度百分比：91%。

分类 | 短词条翻译百分比 | 短词条翻译进度条 | 整体翻译百分比 | 整体翻译进度条
--- | :-----------: | ------------- | :----------: | -----------
aphront | 99% | ========= | 81% | ========
applications/almanac | 93% | ========= | 85% | ========
applications/aphlict | **100%** | ✓✓✓✓✓✓✓✓ | 76% | =======
applications/arcanist | --- |  | --- | 
applications/audit | 87% | ======== | 79% | =======
applications/auth | 97% | ========= | 73% | =======
applications/badges | 92% | ========= | 91% | =========
applications/base | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/cache | 95% | ========= | 76% | =======
applications/calendar `原型` | 98% | ========= | 94% | =========
applications/celerity | 93% | ========= | 83% | ========
applications/chatlog `原型` | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/conduit | 98% | ========= | 85% | ========
applications/config | 93% | ========= | 72% | =======
applications/conpherence | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/console | 91% | ========= | 88% | ========
applications/countdown | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/daemon | 90% | ======== | 79% | =======
applications/dashboard | 99% | ========= | 89% | ========
applications/differential | 89% | ======== | 82% | ========
applications/diffusion | 84% | ======== | 72% | =======
applications/diviner | 74% | ======= | 70% | =======
applications/doorkeeper | 76% | ======= | 63% | ======
applications/draft | --- |  | --- | 
applications/drydock | 85% | ======== | 72% | =======
applications/fact `原型` | 57% | ===== | 42% | ====
applications/favorites | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/feed | 91% | ========= | 83% | ========
applications/files | 82% | ======== | 71% | =======
applications/flag | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/fund `原型` | 97% | ========= | 94% | =========
applications/guides | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/harbormaster | 89% | ======== | 77% | =======
applications/help | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/herald | 85% | ======== | 77% | =======
applications/home | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/legalpad | 94% | ========= | 89% | ========
applications/lipsum | **100%** | ✓✓✓✓✓✓✓✓ | 71% | =======
applications/macro | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/maniphest | 98% | ========= | 92% | =========
applications/meta | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/metamta | 85% | ======== | 75% | =======
applications/multimeter `原型` | 88% | ======== | 88% | ========
applications/notification | **100%** | ✓✓✓✓✓✓✓✓ | 76% | =======
applications/nuance `原型` | 84% | ======== | 79% | =======
applications/oauthserver `原型` | 89% | ======== | 75% | =======
applications/owners | 85% | ======== | 80% | ========
applications/packages `原型` | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/passphrase | 95% | ========= | 87% | ========
applications/paste | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/people | 97% | ========= | 88% | ========
applications/phame | 99% | ========= | 97% | =========
applications/phid | **100%** | ✓✓✓✓✓✓✓✓ | 79% | =======
applications/phlux `原型` | 96% | ========= | 96% | =========
applications/pholio | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phortune `原型` | 81% | ======== | 73% | =======
applications/phpast | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/phragment `原型` | 80% | ======== | 76% | =======
applications/phrequent `原型` | 89% | ======== | 84% | ========
applications/phriction | 96% | ========= | 95% | =========
applications/phurl `原型` | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/policy | 93% | ========= | 80% | ========
applications/ponder | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/project | 95% | ========= | 87% | ========
applications/releeph `原型` | 68% | ====== | 63% | ======
applications/remarkup | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/repository | 81% | ======== | 71% | =======
applications/search | 88% | ======== | 75% | =======
applications/settings | 99% | ========= | 90% | =========
applications/slowvote | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/spaces | 97% | ========= | 85% | ========
applications/subscriptions | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/support | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/system | 94% | ========= | 60% | ======
applications/tokens | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
applications/transactions | 89% | ======== | 75% | =======
applications/typeahead | 98% | ========= | 92% | =========
applications/uiexample `原型` | 98% | ========= | 97% | =========
applications/xhprof | **100%** | ✓✓✓✓✓✓✓✓ | **100%** | ✓✓✓✓✓✓✓✓
infrastructure | 82% | ======== | 65% | ======
view | **100%** | ✓✓✓✓✓✓✓✓ | 98% | =========

## 启动翻译工具

在当前项目目录，执行如下命令：

```sh
$ npm start
```

然后启动浏览器（建议 Chrome 或者 Safari），打开网址 http://localhost:3000 来启动翻译工具。

## 编译翻译文件和 README 文件

在当前项目目录，执行如下命令：

```sh
$ ./bin/compile
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

首先拉取最新的 Phabricator 和 libphutil 源码。在 **Phabricator** 项目路径，执行如下命令：

```sh
$ ./bin/i18n extract
$ ./bin/i18n extract ../libphutil
```

然后你将在 Phabricator 项目的 `/src/.cache/` 目录中找到 `i18n_files.json` 文件，拷贝 `i18n_files.json` 文件到本项目的 `data/phabricator` 目录。

然后你将在 libphutil 项目的 `/src/.cache/` 目录中找到 `i18n_files.json` 文件，拷贝 `i18n_files.json` 文件到本项目的 `data/libphutil` 目录。

如果您的 Phabricator 项目和本项目处于同级目录，可以直接在本项目路径下执行以下命令来完成提取和更新国际化字典的工作：

```sh
$ ./bin/update
```

## 翻译指南

* 是否翻译为中文的判断；
  * 如果英文意思无法直接表达名称所代表的功能，则不予翻译，保留英文，如 Multimeter 翻译成中文为“万用表”，并不是模块的本意“性能取样器”，所以不予翻译；
  * 开发术语，~~如：Pull 和 Push 等~~；
* 相同的英文单词和词组在同一意思下，尽量使用相同的翻译；
* 相同的英文单词和词组在不同意思下，避免使用相同的翻译；
* 相同结构的英文组合，要使用相同的翻译方法；
* 如果英文表达本身不准确，翻译过程中要予以校准；

## 附录

* [翻译规则列表](Rules.md)
* [术语表](Terminology.md)
* [Phabricator 官方国际化文档](https://secure.phabricator.com/book/phabcontrib/article/internationalization/)