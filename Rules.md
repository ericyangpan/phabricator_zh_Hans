# 翻译规则列表

共有两种规则：

1. 术语表规则：检查翻译内容是否符合术语表；
2. 正则表达式规则：用正则表达式检查翻译内容是否符合规则。

**正则表达式规则列表**

词 | 翻译
-- | -----------
%\[sd\] | %\(\\d\\\$\)\?\[sd\]
! | \(\?! \)！\(\?! \)\|“!\|!\\w\+
,\(\?! and\)\(\?! or\) | \(\?! \)\(，\|、\)\(\?! \)\(\?!并且\)\(\?!或者\)\|\\d,\\d
: | \(\?! \)：\(\?! \)\|\[a\-z\]:\[a\-z\]\|://\|：\\n\|NOTE:\|WARNING:\|IMPORTANT:\|To:\|Cc:\|Re:\|From:\|\\d:\\d
; | \(\?! \)；\(\?! \)
\\\? | \(\?! \)？\(\?! \)
\\\.\{3\} | \(\?! \)…\(\?! \)
\[\^\.\]\\\.\(\?!\\w\|\\d\|\\\.\|%\|\\\*\|"\) | \(\?! \)。\(\?! \)
<\.\+\> | \(\?! \)<\.\+\>\(\?! \)
\\\(\(\?!s\)\(\?!S\)\.\*\?\\\) | （\.\+\?）\|\\\(\\\)\|\\\(<\.\+\?\>\\\)
"\.\+" | \(\?! \)“\.\+”\(\?! \)
'\\S\+\?' | \(\?! \)‘\\S\+\?’\(\?! \)
\\\*\\\*\[\\S\\s\]\+\?\\\*\\\* | \\\*\\\*\[\\S\\s\]\+\?\\\*\\\*
no \.\+ found\\\. | \^没有\\\.\+找到
\^You do not have permission to | \^你没有\.\+权限
Show Only | \^仅显示


**正则表达式规则例外列表**

词 | 翻译
-- | -----------
,\(\?! and\)\(\?! or\) | Go Juice
,\(\?! and\)\(\?! or\) | ou=People, dc=example, dc=com
,\(\?! and\)\(\?! or\) | user=%s, should_verify=%s
,\(\?! and\)\(\?! or\) | user=%s, verified=%s, primary=%s, should_verify=%s
: | UTC%+d:%02d
; | &lt;script&gt;alert(1);&lt;/script&gt;
\[\^\.\]\\\.\(\?!\\w\|\\d\|\\\.\|%\|\\\*\|"\) | $ ./bin/drydock release-lease --id %d
\[\^\.\]\\\.\(\?!\\w\|\\d\|\\\.\|%\|\\\*\|"\) | US East (N. Virginia, Older default endpoint)
\[\^\.\]\\\.\(\?!\\w\|\\d\|\\\.\|%\|\\\*\|"\) | The custom domain should contain at least one dot (.) because some browsers fail to set cookies on domains without a dot. Instead, use a normal looking domain name like &#34;%s&#34;.
\[\^\.\]\\\.\(\?!\\w\|\\d\|\\\.\|%\|\\\*\|"\) | Enter an object to test rules for, like a Diffusion commit (e.g., `rX123`) or a Differential revision (e.g., `D123`). You will be shown the results of a dry run on the object.
<\.\+\> | &lt;DEAD&gt; %s
\\\(\(\?!s\)\(\?!S\)\.\*\?\\\) | &lt;script&gt;alert(1);&lt;/script&gt;
\\\(\(\?!s\)\(\?!S\)\.\*\?\\\) | (null)
\\\(\(\?!s\)\(\?!S\)\.\*\?\\\) | constant(345)
\\\(\(\?!s\)\(\?!S\)\.\*\?\\\) | cos(x)

