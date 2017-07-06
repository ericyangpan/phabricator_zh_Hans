# Phabricator 简体中文翻译和工具

当前翻译进度百分比：44%。
当前短句翻译进度百分比：50%。注：短句为长度小于 66 个字符的句子。

分类 | 翻译百分比 | 翻译进度条 | 短句翻译百分比 | 短句翻译进度条
--- | -------- | -------- | ------------ | -----------
\_\_tests\_\_ | 100% | ========== | 100% | ==========
aphront | 70% | ======= | 92% | =========
applications/almanac | 64% | ====== | 73% | =======
applications/aphlict | 63% | ====== | 95% | =========
applications/arcanist | --- |  | --- | 
applications/audit | 34% | === | 36% | ===
applications/auth | 46% | ==== | 60% | ======
applications/badges | 57% | ===== | 58% | =====
applications/base | 88% | ======== | 91% | =========
applications/cache | 72% | ======= | 90% | ========
applications/calendar `原型` | 61% | ====== | 65% | ======
applications/celerity | 47% | ==== | 55% | =====
applications/chatlog `原型` | 79% | ======= | 79% | =======
applications/conduit | 40% | ==== | 48% | ====
applications/config | 34% | === | 45% | ====
applications/conpherence | 38% | === | 40% | ===
applications/console | 47% | ==== | 48% | ====
applications/countdown | 43% | ==== | 43% | ====
applications/daemon | 31% | === | 37% | ===
applications/dashboard | 76% | ======= | 81% | ========
applications/differential | 30% | === | 35% | ===
applications/diffusion | 31% | === | 36% | ===
applications/diviner | 42% | ==== | 44% | ====
applications/doorkeeper | 16% | = | 20% | =
applications/draft | --- |  | --- | 
applications/drydock | 23% | == | 27% | ==
applications/fact `原型` | 15% | = | 16% | =
applications/favorites | 100% | ========== | 100% | ==========
applications/feed | 33% | === | 38% | ===
applications/files | 26% | == | 29% | ==
applications/flag | 100% | ========== | 100% | ==========
applications/fund `原型` | 38% | === | 40% | ====
applications/guides | 95% | ========= | 100% | ==========
applications/harbormaster | 28% | == | 31% | ===
applications/help | 100% | ========== | 100% | ==========
applications/herald | 26% | == | 28% | ==
applications/home | 100% | ========== | 100% | ==========
applications/legalpad | 39% | === | 43% | ====
applications/lipsum | 9.5% |  | 13% | =
applications/macro | 60% | ====== | 63% | ======
applications/maniphest | 69% | ====== | 73% | =======
applications/meta | 87% | ======== | 87% | ========
applications/metamta | 42% | ==== | 50% | ====
applications/multimeter `原型` | 35% | === | 35% | ===
applications/notification | 76% | ======= | 100% | ==========
applications/nuance `原型` | 30% | == | 32% | ===
applications/oauthserver `原型` | 44% | ==== | 52% | =====
applications/owners | 34% | === | 36% | ===
applications/packages `原型` | 35% | === | 42% | ====
applications/passphrase | 40% | === | 44% | ====
applications/paste | 52% | ===== | 52% | =====
applications/people | 77% | ======= | 87% | ========
applications/phame | 50% | ===== | 52% | =====
applications/phid | 43% | ==== | 64% | ======
applications/phlux `原型` | 46% | ==== | 48% | ====
applications/pholio | 39% | === | 40% | ====
applications/phortune `原型` | 25% | == | 28% | ==
applications/phpast | 100% | ========== | 100% | ==========
applications/phragment `原型` | 24% | == | 25% | ==
applications/phrequent `原型` | 47% | ==== | 50% | =====
applications/phriction | 92% | ========= | 94% | =========
applications/phurl `原型` | 44% | ==== | 45% | ====
applications/policy | 67% | ====== | 79% | =======
applications/ponder | 63% | ====== | 64% | ======
applications/project | 75% | ======= | 83% | ========
applications/releeph `原型` | 25% | == | 27% | ==
applications/remarkup | 100% | ========== | 100% | ==========
applications/repository | 17% | = | 21% | ==
applications/search | 61% | ====== | 73% | =======
applications/settings | 85% | ======== | 93% | =========
applications/slowvote | 46% | ==== | 46% | ====
applications/spaces | 70% | ======= | 82% | ========
applications/subscriptions | 88% | ======== | 93% | =========
applications/support | 100% | ========== | 100% | ==========
applications/system | 29% | == | 43% | ====
applications/tokens | 98% | ========= | 98% | =========
applications/transactions | 48% | ==== | 55% | =====
applications/typeahead | 95% | ========= | 100% | ==========
applications/uiexample `原型` | 30% | == | 31% | ===
applications/xhprof | 100% | ========== | 100% | ==========
infrastructure | 23% | == | 29% | ==
view | 84% | ======== | 88% | ========

## 启动翻译工具

在当前项目目录，执行如下命令：

```sh
$ npm start
```

然后启动浏览器（建议 Chrome 或者 Safari），打开网址 http://localhost:3000 来启动翻译工具。

## 编译 PHP 翻译文件和最新的 README.md 文件

在当前项目目录，执行如下命令：

```sh
$ bin/compile
```

然后你将得到四份文件：

1. Phabricator 简体中文翻译文件：`dist/PhabricatorSimplifiedChineseTranslation.php`；
2. 翻译数据文件：`data/translations.json`；
3. 翻译数据备份文件：`data/translations.bak.json`；
4. 包含最新摘要信息的 README 文件：`README.md`。

## 本地化 Phabricator

将 `dist/PhabricatorSimplifiedChineseTranslation.php` 文件拷贝到 Phabricator 项目的 `phabricator/src/extensions` 目录中即可。

然后调整个人设置，进入 `Personal Settings` 的 `Account`，在 `Translation` 选项中选择 `Chinese (Simplified)`，保存后界面即切换为简体中文。

## 翻译规则

总共有三种规则：

1. 参数规则：检查翻译前后 `%s` 和 `%d` 参数的数量是否匹配；
2. 术语表规则：检查翻译内容是否符合术语表；
3. 正则表达式规则：用正则表达式检查翻译内容是否符合规则。

**正则表达式规则列表**

词 | 翻译
---- | -----------
! | !
, | ,\\s
: | :\\s\|:\$\|:\\d\|:"\|:
; | ;\\s
\. | \.
< | <
> | >
\\\*\\\*\[\\S\\s\]\+\?\\\*\\\* | \\\*\\\*\[\\S\\s\]\+\?\\\*\\\*
\\\. | \\\.
\n | \n
\\\.\{3\} | \\\.\{3\}
\\\? | \\\?
no \\w\+ found | \^没有找到
« | «
» | »
"\\w\+" | "\\w\+\|\[\\u4e00\-\\u9fa5\]\+"
'\\w\+' | '\\w\+\|\[\\u4e00\-\\u9fa5\]\+'

## 术语表

词 | 翻译
---- | -----------
Differential | Differential
MFA | 多因素认证
Phabricator | Phabricator
Phame | Phame
Phortune | Phortune
Phriction | Phriction
Phurl | Phurl
Remarkup | Remarkup
account | 帐户
action | 操作
allow | 允许
approve | 批准
author | 作者
authored | 创建
award | 授予
badge | 徽章
collation | 字符序
config | 配置
daemon | 守护进程
default | 默认
delete | 删除
email | 邮件
enable | 启用
guide | 指南
hashtag | 唯一标签
include | 包含
invitee | 被邀请人
is required | 是必填的
monogram | 花押字
multi-factor | 多因素
notification | 通知
open status | 开放状态
permission | 权限
post | 帖子|发送|发布
preference | 偏好
priority | 优先级
profile | 档案
remove | 移除
revert | 恢复
save | 保存
serve | 服务于
session | 会话
setting | 设置
setup | 安装设置
token | 令牌|符记|符号|语素
update | 更新

## 释放国际化资源

在 **Phabricator** 项目路径，执行如下命令：

```sh
$ bin/i18n extract
```

然后你将在 Phabricator 项目的 `/src/.cache/` 目录中找到一个 `i18n_files.json` 文件。
拷贝 `i18n_files.json` 文件到本项目的 `data/` 目录。

## 附带的工具

 `sortjson.js` 是一个用来排序 JSON 文件内容的附带工具。

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

[Phabricator 官方国际化文档](https://secure.phabricator.com/book/phabcontrib/article/internationalization/)