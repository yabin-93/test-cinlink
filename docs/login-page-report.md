# 登录页面结构快照

> 由 `npx playwright test --project=auth` 自动生成，用于定位登录卡点。
> 账号已掩码，不含任何凭据值。

**结果**：登录成功（工作台输入框已就绪，页面已离开登录页）

**快照数**：2

## 快照 1 · 13:57:53

- URL: `https://staging-app.cinlink.ai/login?return_to=%2F`
- 标题: CinLink | Everything You Need To Create And Remake Content

可见文本：

```
Welcome to Cinlink
Email
Verification code
Send code

Sign in
back
By continuing, you agree to Cinlink’s Terms of Use.
Read our Privacy Policy
```

可点击元素：

| 标签 | 文案 | href |
|---|---|---|
| button | Send code | — |
| button | Sign in | — |
| button | back | — |
| a | Terms of Use | https://cinlink.ai/terms |
| a | Privacy Policy | https://cinlink.ai/privacy |

输入控件：

| 标签 | type | name | placeholder |
|---|---|---|---|
| input | email | — | Email address |
| input | text | — | Please enter the code |

## 快照 2 · 13:58:31

- URL: `https://staging-app.cinlink.ai/`
- 标题: CinLink | Everything You Need To Create And Remake Content

可见文本：

```
CinLink
PROJECTS
＋
Active
Archived
All
自动补充测试素材
@7MB.mp4 转写字幕
自动补充测试素材
test
test
未分组
@regression-20261028-7MB.mp4 请识别这个视频中的语音，生成原语言的 SRT 字幕文件，仅输出 SRT，不烧录视频。
1
1020817070
Free
Hello, 1020817070!

What would you like to create in 
自动补充测试素材

Assets & Generation
Edit & Enhance
Subtitles & Translation
Extract & Repurpose
Find Local Footage
AI Image
AI Video
自动补充测试素材
0/1 media files analyzed
Analyze
Explore Video Templates

Find a template for your next video and make it your own.

Podcast Highlights
Travel Memories, Sharper
Cook Along with Captions
Product Film, Polished
```

可点击元素：

| 标签 | 文案 | href |
|---|---|---|
| div | ＋ | — |
| button | Active | — |
| button | Archived | — |
| button | All | — |
| div | 自动补充测试素材1 | — |
| div | @7MB.mp4 转写字幕 | — |
| div | 自动补充测试素材0 | — |
| div | test0 | — |
| div | test0 | — |
| div | 未分组1 | — |
| div | @regression-20261028-7MB.mp4 请识别这个视频中的语音，生成原语言的 SRT 字幕文件，仅输出 | — |
| button | Chats | — |
| button | ＋ | — |
| button | 11020817070Free | — |
| button | Assets & Generation | — |
| button | Edit & Enhance | — |
| button | Subtitles & Translation | — |
| button | Extract & Repurpose | — |
| button | Find Local Footage | — |
| button | AI Image | — |
| button | AI Video | — |
| button | 自动补充测试素材 | — |
| button | Analyze | — |
| button | Podcast HighlightsView template | — |
| button | Travel Memories, SharperView template | — |
| button | Cook Along with CaptionsView template | — |
| button | Product Film, PolishedView template | — |

输入控件：

| 标签 | type | name | placeholder |
|---|---|---|---|
| input | search | — | Search conversations |
| input | file | — | — |
