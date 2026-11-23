# FWXC-661 production regression

生产Chrome/yabinc18，同画面源获用户授权重建。13组原文/配音文案基线，实际逐组清空第2句一次；26输入字段仅第2句译文变为空，其他12译文和13原文完整，29个时间轴对象显示未变。刷新并重新进入同一工程后仍13组、第2句为空。实际结果卡视频已下载：30.63秒1280×720 H264/AAC，完整解码退出0。原问题未复现，执行通过；两独立扩散尚未执行。

Environment: production app.cinlink.ai; account yabinc18; workspace347987d5-735d-4e20-a5c1-cd8ca70d07af; conversation32d42aec-7817-42ad-b2ee-3c2054dca804.

Original authorized source difference:30.70s1280x720 input versus old30.63s1920x1080; current rendered product30.63s1280x720. Earlier tool denial resolved through the same Chrome control channel, original accepted preparation completed130s; no resubmission.

Evidence: reports/fixed-regression-20261120-094814/execution/661-prod-original-*.txt, *.png, clear-ui-audit.json and baseline-media-audit.json.

Original Passed; expansion1 Not Run; expansion2 Not Run. Cloud sync pending. Fixed automation script PLAN; no comments/new defects/Git, README read-only.


2026-11-20T11:03:40.085212+08:00 FWXC-661 original production Passed; official cloud status AI Passed PUT/GET verified at10:55:31. Independent E1 preparation accepted once, CID34d892db-21da-49a5-975a-bebc8fed6798. Formal E1/E2 still Not Run. No resubmission, comments/new defects/Git.


2026-11-20T11:08:41.090149+08:00 FWXC-661 independent E1 Passed: Independent production conversation;13 source+13 dubbing fields, first translation cleared once, remaining12 translations and all source/timeline objects unchanged. Passed. Actual UI screenshots and audit retained. E2 Not Run, case not completed yet. User allows rebuilding663/664 independent project scenarios; preserve missing-original-step boundary.


2026-11-20T11:17:57.644325+08:00 FWXC-661 original/E1/E2 all Passed, productionChrome/yabinc18. E2: Independent direct-prompt production baseline completed214s. Last of13 Chinese dubbing rows cleared once; other12 texts unchanged, media-module roundtrip and refresh/reopen preserve13rows and last empty value. All42 visible timeline objects unchanged; original-text column not present in this baseline, not claimed verified. Cloud original AI Passed GET verified10:55:31, no repeated status write; script PLAN. Next663/664 controlled rebuild as user authorized.
