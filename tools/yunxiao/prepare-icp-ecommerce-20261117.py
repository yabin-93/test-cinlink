"""Prepare authorized ICP defect plans from observed, terminal original-prompt runs."""
import hashlib, json, pathlib, shutil

ROOT = pathlib.Path(__file__).resolve().parents[2]
REPORT = ROOT / 'reports/icp-ecommerce-original-20261116-1818'
DEST = ROOT / 'reports/yunxiao/icp-ecommerce-original-production-20261117-input'
read = lambda p: json.loads(p.read_text(encoding='utf-8-sig'))
state = read(REPORT / 'execution.json')
definitions = {c['id']: c for c in read(ROOT / 'docs/design-cases/icp-workflows/cases.json')}
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()

def write(p, value):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf8')

def section(title, body):
    return '**' + title + '**\n\n' + body + '\n\n'

def prompts(case, indexes, prep=False):
    chunks = []
    if prep:
        chunks += ['公共参考准备指令（本例25素材分两次载入，未提前制作）：\n\n```text\n参考资料，暂不制作。\n```']
    for i in indexes:
        v = definitions[case]['steps'][i]
        chunks += [f"第{i+1}轮原文（电商场景!{v['cell']}，整段一次发送）：\n\n```text\n{v['value']}\n```"]
    return '\n\n'.join(chunks)

CASES = {
 '02-timeout': dict(case='ICP-EC-02', key='ICP-EC02-BATCH-PLANNING-TIMEOUT-PROD-20261117',
  title='【生产环境】【电商Case02】10款女装批量制作在规划阶段1200秒超时，未交付图片或视频', indexes=[0], prep=True,
  phenomenon='上传10款女装素材及公共参考后，按原文要求批量制作AI上身图和展示视频，任务在规划阶段直接超时，零首稿交付。',
  pre='1. Windows / Ego Lite登录生产环境，账号可上传素材和创建制作任务。\n2. 新建测试项目和独立会话，准备SKU01～10各1张正面图和1段对应视频、SKU03两张补充图、AI女模参考、品牌Logo、SKU事实表。\n3. SKU10只使用正面图及2秒正面视频，不补充背面；素材匹配表与本次记录一致。',
  reproduce='1. 在新会话上传5份公共参考（SKU03补充图2张、AI女模参考、Logo、SKU表），发送准备指令，等接收完成。\n2. 再上传10张商品正面图和10段对应视频，整段一次发送第1轮原文；不得删SKU来绕过20素材上限。\n3. 沿同一任务等待；本次没有制作补槽，不重复发送或点击重试。\n4. 检查页面任务终态、错误提示及SKU01～10的图片、视频交付。',
  actual='任务failed，页面原文“规划模型等待响应超过 1200 秒，当前请求已超时”；未进入实际图片/视频制作，未交付任一SKU成品。',
  expected='能够完成规划并执行10款制作；素材确有不足时明确指出具体SKU和缺口，继续可完成部分。不能在规划响应超时后零交付。本缺陷依据应用自身超时失败，不另设性能SLA。',
  impact='批量新品上架流程无法启动，后续SKU03/SKU05及统一风格修改失去首稿前置。',
  boundary='仅一次真实原文任务，未重试；后续素材缺口、背面设计准确性和批量成片一致性尚未覆盖，不伪称生成后失败。',
  images=[('failed-planning-response-timeout.png','Case02第1轮：页面明确显示规划响应1200秒超时、任务失败。')]),
 '02-model': dict(case='ICP-EC-02', key='ICP-EC02-SKU10-MODEL-REFERENCE-INVALID-PROD-20261117',
  title='【生产环境】【电商Case02】SKU10上身图生成报model_reference_file_id参数校验错误，图片及视频未交付', indexes=[0,4], prep=True,
  phenomenon='在同一会话基于仅有正面素材独立补跑SKU10末轮，图片生成工具参数校验失败，可用正面上身图和展示视频均未交付。',
  pre='1. Windows / Ego Lite登录生产环境，新建专用项目和独立会话。\n2. 按第1轮原文载入完整10款素材和参考；本次第1轮因规划超时未生成首稿。\n3. 第5轮仅重新绑定SKU10正面图、2秒正面视频、原AI女模参考、Logo和SKU表，仍不提供背面素材。',
  reproduce='1. 按“提示词”的准备指令及第1轮原文载入全部素材，等待原任务终态；本次为规划超时。\n2. 不发送依赖首稿的第2～4轮，不点击重试；在同一会话重新附上前置第3项的5份源资料。\n3. 一次发送第5轮原文，等待素材分析、生成图片及后续视频流程。\n4. 查看“生成图片”节点错误及最终可用图片/视频；本轮没有补槽。',
  actual='视频分析完成后，“生成图片”失败：McpProtocolError: TOOL_ARGUMENTS_INVALID: model_reference_file_id requires a per-image batch of product images。生成视频及尺寸调整未完成，无上身图/视频交付。',
  expected='AI模特参考与本SKU商品图应能被正确使用；未知背面应如实要求补图，仍尽量交付可确认正面范围的上身图和视频，不因工具参数组合校验错误中断。',
  impact='连单SKU、已有正面素材的可用产物也不能完成，未知背面场景的替代制作被阻断。',
  boundary='参数错误原文是实际任务证据，不据此推定源码根因。实际路径发生在首轮超时后的同会话末轮；独立新会话直接发送第5轮的复现性尚未验证。',
  images=[('failed-step-4-sku10-model-reference-batch.png','Case02第5轮：生成图片节点显示实际参数校验错误及整轮失败。')]),
 '03-crop': dict(case='ICP-EC-03', key='ICP-EC03-VERTICAL-CROP-SUBTITLE-LAYOUT-PROD-20261117',
  title='【生产环境】【电商Case03】横版转竖版裁掉产品及原字幕，Reels局部修复后仍有主体缺失', indexes=[0,1],
  phenomenon='同一横版产品视频生成Reels/TikTok后，产品主体和原画面字幕被裁切，并叠加新字幕；要求局部修复Reels后仅部分镜头修正，骑行镜头仍被裁。',
  pre='1. Windows / Ego Lite登录生产环境，新建专用项目和独立会话。\n2. 准备本次product-intro-300s.mp4（300秒、1280×720、英语原声、画面内英语字幕和品牌收尾），同时提供ADO产品事实表及Logo。\n3. 使用同一源视频分别制作A/Reels、B/TikTok和C/Shopify，保留各自独立工程。',
  reproduce='1. 上传前置素材，一次发送第1轮完整原文；出现“等待确认剪辑方案”时，逐个核验后原样点击“审核确认”，不手动调整构图代替应用。\n2. 完成后播放实际A/B成片，检查开头和骑行段的车身、车轮、原字幕完整性及新旧字幕布局。\n3. 同一会话一次发送第2轮原文，等待Reels修正版导出，保留B/C。\n4. 打开修正版约8.04秒（问题段约7.3～11.27秒），核对骑行产品主体是否完整；对照B/C是否保持。',
  actual='A首稿26.783秒、B首稿19.300秒，均1080×1920；可见原片产品/原字幕横向被裁及新旧双层字幕。Reels修正版有部分完整镜头，但约8.04秒仍有骑行主体靠边或出框；B/C未被串改。',
  expected='按原文把原有文字和产品完整适配竖屏；空间不足时用缩放留边等不改变产品的方案，字幕应可读且不相互遮挡。局部修复后应覆盖已指出的产品裁切段，不误改其他正常版本。',
  impact='生成的竖版广告产品展示不完整，文字被裁或重叠，影响平台投放可读性。',
  boundary='首稿审阅截图与后续实际导出核验共同留证；原字幕本来就在输入视频内，未把其原始错字或内容归因于CinLink。后续第5轮Reels安全区已修复并交付，不能据此称本轮所有版本始终未修复。',
  images=[('failed-initial-reels-cropped.png','Case03第1轮Reels审阅画面：产品及画面内原字幕被裁。'),('failed-initial-tiktok-cropped.png','Case03第1轮TikTok审阅画面：产品裁切、原字幕与新增字幕同屏。'),('failed-step-1-reels-riding-still-cropped.png','Case03第2轮修正版约8.04秒：骑行主体仍靠边并被裁。')]),
 '03-cta': dict(case='ICP-EC-03', key='ICP-EC03-TIKTOK-MISSING-CTA-PROD-20261117',
  title='【生产环境】【电商Case03】TikTok成片结尾只有品牌标识，未添加要求的Shop Now CTA', indexes=[0], medium=True,
  phenomenon='原文要求TikTok版本结尾添加CTA，已提供Shop Now事实资料，实际成片的结尾只有品牌标识，没有CTA文字。',
  pre='1. Windows / Ego Lite登录生产环境，新建测试项目和独立会话。\n2. 上传本次300秒、1280×720英语产品介绍视频、ADO产品事实表和Logo；事实表明确CTA为Shop Now。\n3. 使用第1轮原文同时制作三版，B为15～20秒、9:16的TikTok独立工程。',
  reproduce='1. 上传素材后一次发送第1轮原文；出现方案审核时原样确认，不手动添加CTA。\n2. 等三版完成并下载实际B-TikTok.mp4。\n3. 播放B成片的结尾品牌段（约16.5秒至19.3秒，截图为17.36秒），查看是否存在CTA，不能把Logo文字当CTA。\n4. 对照商品事实表已给出的Shop Now及B工程文字对象/成片，记录结尾实际内容。',
  actual='B成片19.300秒、1080×1920。结尾展示ADO品牌标识，未见Shop Now或其他明确行动引导文字；实际文件及工程核验一致。',
  expected='B结尾保留品牌信息并添加明确的CTA；已有Shop Now资料时使用该文案，不应仅交付Logo收尾。',
  impact='TikTok广告缺少明确购买/访问引导，不满足该版本的明确交付要求。',
  boundary='只针对初稿B缺CTA，不将A/C或Case01本已有Shop Now的B版本混作同一结果。没有凭单个抽帧判定全片，而是结合实际结尾段和工程核验。',
  images=[('failed-initial-tiktok-missing-CTA.png','Case03第1轮TikTok实际结尾17.36秒：品牌标识可见，未显示CTA。')]),
 '03-reference': dict(case='ICP-EC-03', key='ICP-EC03-TIKTOK-REVISION-REFERENCE-CONFLICT-PROD-20261117',
  title='【生产环境】【电商Case03】连续修改TikTok时工程或素材引用冲突，15秒改版和安全区修正版未交付', indexes=[0,1,2,3,4],
  phenomenon='对已交付TikTok进行15秒改版时，高光工程报工程/修订不匹配；再基于最近有效TikTok改安全区时，Editor batch apply报原文件引用冲突。两条修订均未交付。',
  pre='1. Windows / Ego Lite登录生产环境，新建专用项目和独立会话。\n2. 上传同一300秒横版产品视频、事实表和Logo，用原文先制作三版独立成片；初稿B约19.3秒。\n3. 后续在本例会话连续修改，不能用失败的新B15草稿冒充有效B版本。',
  reproduce='1. 顺序发送第1～3轮原文，每轮终态后再进入下一轮；第1轮审核原样确认，第2轮为Reels局部修复。\n2. 第3轮AI补背景错误是假设，本次实际未使用AI背景；补槽如实填写附件中的原回答，保留现有真实视频，不制造错误。\n3. 一次发送第4轮原文要求TikTok约15秒、前3秒突出使用效果，等待“选择精彩片段→生成高光工程”。\n4. 记录生成高光工程的工程/修订不匹配错误，没有15秒成片；不点击重试。\n5. 从工程选择器切回最近有效的约19.3秒B/TikTok（不是5分钟失败B15草稿），A用第2轮修正版，C保留首稿。\n6. 发送第5轮安全区原文，等待A/B修改和导出；检查A交付、B节点错误与C是否保持。',
  actual='第4轮failed：“The saved highlight belongs to a different project or revision”，无15秒改版。第5轮整体done但B的Editor batch apply失败：“REFERENCE_CONFLICT / Snapshot original file references do not match”；只交付A安全区修正版，B仍为19.3秒旧版，C保持。',
  expected='应用应在当前选定的有效独立工程及正确素材引用上完成TikTok15秒改版和安全区调整，交付对应新视频，A/C按指令保持。整体done不能替代B交付。',
  impact='同一会话对已生成版本无法继续局部修改，出现部分任务完成但目标版本未交付。',
  boundary='按相同“连续修改时引用冲突、无TikTok修正版”现象合并登记两个触发点；不推定两条错误具有同一源码根因。第5轮页面截图显示B节点失败，REFERENCE_CONFLICT原文另由实际任务证据附件保留。',
  images=[('failed-step-3-tiktok-revision-mismatch.png','Case03第4轮：高光工程/修订不匹配错误，无15秒成片。'),('failed-step-4-tiktok-safe-area.png','Case03第5轮：B修改节点失败，页面明确未提供TikTok安全区修正版。'),('failed-step-4-reference-conflict-detail.png','Case03第5轮B失败节点展开原图；具体引用冲突原文见随附case-evidence.json。')]),
 '04-localization': dict(case='ICP-EC-04', key='ICP-EC04-SPANISH-ONSCREEN-TEXT-NOT-REPLACED-PROD-20261117',
  title='【生产环境】【电商Case04】西语广告残留英文卖点和CTA，后续文字修改仅返回分析未生成修正版', indexes=[0,1,2,3,4],
  phenomenon='英语广告译制成西语后，配音及新增字幕已为西语，但原画面内英语标题、字幕和Shop Now仍在；继续指定CTA及英文文字替换，只交付分析文档，没有修改视频。',
  pre='1. Windows / Ego Lite登录生产环境，新建专用项目和独立会话。\n2. 上传附件english-ad-35s.mp4（35秒、540×960，英语原声、烧录字幕、Foldable Electric Bike / Easy to Fold / Shop Now），同时提供同型号事实表和Logo。\n3. 原片及后续修改始终使用本例工程，品牌ADO及产品名保持，不手工遮盖英文代替应用。',
  reproduce='1. 一次发送第1轮原文并等待完成，下载35秒西语视频，核对实际画面3.5秒及31.5秒的英文卖点、字幕和CTA。\n2. 顺序执行第2轮原文；本次plegable译法正确，误译补槽如实说明未发生，不制造错误或切中文，完整回答见附件。\n3. 发送第3轮CTA原文；必要补槽说明本轮成片末尾实际上仍为Shop Now，目标是Descubre más（原回答见附件）。等终态并检查视频是否改变。\n4. 顺序发送第4轮原文；本次原片无独立折叠操作展示，音画错位假设未发生，补槽按实际说明，保留正常内容。\n5. 发送第5轮英文画面文字替换原文，等待直接替换或自然遮盖结果；检查实际视频、工程及新结果是否交付。',
  actual='首轮交付35.000秒、540×960西语音轨/字幕视频，但Foldable Electric Bike、Easy to Fold、Shop Now及部分英文烧录字幕保留，局部新旧字幕重叠。第3轮和第5轮均done但仅返回video-analysis.md，工程内容保持，未交付Descubre más CTA/配音或英文画面文字修正版；第5轮明确称尚未替换/遮盖且无修改后视频。',
  expected='按原文完成音轨、字幕和画面内卖点/标题/CTA的整体西语本地化；不能直接替换时尝试自然遮盖且不伤产品。后续明确修改请求应交付可核验的视频结果，无法完成的范围应说明。',
  impact='广告仍是英西混合画面，不能作为完整墨西哥市场本地化成片交付，继续修改也未完成。',
  boundary='本条合并同一画面文字未本地化及后续未执行现象；可折叠误译、折叠演示音画错位均为未触发假设，不作为缺陷；本片未确认出现Long Battery Life，不声称复现该词。配音自然度/墨西哥口音未人工试听验收，不据此提缺陷。',
  images=[('failed-step-0-english-text-not-localized.png','Case04第1轮完成页：已交付西语版，页面提示画面英文替换未完成。'),('failed-step-0-english-selling-title-remains.png','Case04第1轮加载完成后的3.5秒预览：英文卖点和原英文字幕仍在，局部英西字幕重叠。'),('failed-step-0-english-CTA-remains.png','Case04第1轮加载完成后的31.5秒预览：结尾仍显示Shop Now。'),('failed-step-2-CTA-analysis-only.png','Case04第3轮：Descubre más修改任务只交付video-analysis.md。'),('failed-step-4-text-replacement-analysis-only.png','Case04第5轮：应用明确未执行替换/遮盖、没有修改后视频。')]),
 '05-provider': dict(case='ICP-EC-05', key='ICP-EC05-AMAZON-AD-PROVIDER-FAILED-PROD-20261117',
  title='【生产环境】【电商Case05】根据吸尘器图片制作20秒广告时供应商视频处理失败，未交付成片', indexes=[0],
  phenomenon='仅用吸尘器真实商品图片制作20秒Amazon广告，图片排序完成后视频生成报供应商处理失败，后续尺寸调整未执行，完整广告未交付。',
  pre='1. Windows / Ego Lite登录生产环境，新建专用项目和独立会话。\n2. 准备BLACK+DECKER HHVK515JP07的5张真实商品图（侧面、总览、吸头、集尘盒、手持展示）、Logo及已确认事实表。\n3. 无现成视频、无背面/底部图片；不得补未知结构或编造吸力、续航数据。',
  reproduce='1. 在新会话一次附上5张商品图、PNG Logo和纯事实TXT共7份素材。\n2. 一次发送第1轮完整原文，要求20秒、16:9、英语卖点、Logo收尾，素材不足可用不改变产品的替代展示。\n3. 沿原任务等待图片排序及视频生成；本次没有制作补槽，不重复发送、不点击重试。\n4. 检查视频生成错误、后续尺寸调整状态及最终20秒成片是否交付。',
  actual='任务failed，图片排序完成，“生成视频”节点报Tencent VOD video processing failed at the provider.；后续裁剪/尺寸调整未执行，无20秒广告MP4交付。',
  expected='基于可确认素材完成广告；无法准确生成某镜头时如实说明并尝试允许的真实产品替代展示，避免整条广告停留在供应商失败。',
  impact='无现成视频的商品广告制作被阻断，依赖首稿的外观、动作和卖点修改不能执行。',
  boundary='错误表明本次供应商处理失败，不推定内部根因或稳定复现概率。后续第5轮独立生成5秒正侧面动态镜头已通过，不能把该成功镜头当成本次20秒完整广告。该末轮首次补槽网络失败已恢复，不另报稳定缺陷。',
  images=[('failed-step-0-tencent-vod-provider.png','Case05第1轮：图片排序成功，生成视频显示Tencent VOD供应商处理失败。')])
}

def prepare():
    DEST.mkdir(parents=True, exist_ok=True)
    for name, spec in CASES.items():
        case = spec['case']; entry = state['cases'][case]; folder = DEST / name
        if (folder/'plan.json').exists():
            raise RuntimeError('已有计划；先核对自身检查点，不覆盖准备文件：' + name)
        folder.mkdir(parents=True, exist_ok=True)
        selected = [s for s in entry['steps'] if s['index'] in spec['indexes']]
        assert all(s['status'] in ('done','failed','cancelled') for s in selected)
        for s in selected: assert s['documentVerbatim'] and s['prompt'] == definitions[case]['steps'][s['index']]['value']
        images = []
        for filename, caption in spec['images']:
            original = REPORT / case / filename; copied = folder / filename
            shutil.copy2(original,copied); assert sha(original)==sha(copied)
            images.append(dict(path=filename, caption=caption, sha256=sha(copied)))
        inputs, metadata = [], []
        for n in ['attachments','references','products']:
            path=REPORT/'materials'/f"case{case[-2:]}-{n}.json"
            if path.exists():inputs += [pathlib.Path(p) for p in read(path)]
        if name=='02-model':inputs += [pathlib.Path(p) for p in read(REPORT/'materials/case02-sku10-independent.json')]
        unique = {str(p):p for p in inputs}
        for path in unique.values():
            metadata.append(dict(name=path.name,bytes=path.stat().st_size,sha256=sha(path)))
        runs = [read(REPORT/case/f"step-{s['index']}-run.json") for s in selected]
        source_files = {}
        for run in runs:
            for f in run.get('related_files',[]):
                source_files[f['file_id']] = {k:f[k] for k in ['file_id','name','kind','mime_type','size_bytes','content_sha256','facts'] if k in f}
        write(folder/'material-index.json',dict(case=case,files=metadata,application_source_files=list(source_files.values()),sourceAccess='本次原始输入可从下列历史会话附件获取；回归应新建项目，不直接在旧工程重试。',conversation='https://app.cinlink.ai/c/'+entry['conversationId'],publicSources=['https://www.youtube.com/watch?v=BnbnrCNBJxw','https://adoebike.co.uk/collections/belt-drive-ebike/products/ado-air-20-ultra-folding-electric-bike-v2025'] if case in ['ICP-EC-03','ICP-EC-04'] else ['https://www.blackanddecker.com/products/hhvk515jp07'] if case=='ICP-EC-05' else ['https://www.asos.com/'],preparation='Case03/04的300秒横版/35秒竖版为同源真实测评本地预制测试输入，不是CinLink生成产物。' if case in ['ICP-EC-03','ICP-EC-04'] else 'SKU10仅2秒正面视频和正面图，不补背面。' if case=='ICP-EC-02' else '无背面/底部图，未提供视频。'))
        failures=[]
        for run in runs:
            for message in run.get('messages',[]):
                for node in message.get('plan',[]) if isinstance(message.get('plan'),list) else []:
                    if node.get('error') or node.get('status')=='failed':
                        failures.append(dict(runId=run['run_id'],tool=node.get('tool',node.get('step')),status=node.get('status'),error=node.get('error'),projectId=node.get('project_id')))
        write(folder/'case-evidence.json',dict(case=case,testDate='2026-11-16',syncDate='2026-11-17',batch=REPORT.name,projectId=state['workspaceId'],conversationId=entry['conversationId'],caseStatus=entry['status'],rounds=selected,runErrors=[dict(runId=r['run_id'],status=r['status'],error=r.get('error')) for r in runs],screenshots=images,validationBoundary=spec['boundary'],observedNodeFailures=failures))
        # Preserve all original sent rounds and necessary clarification replies, not raw signed responses.
        sequence = '# 本例实际原文执行顺序\n\n'+prompts(case,[s['index'] for s in entry['steps']],bool(spec.get('prep')))
        sequence += '\n\n必要补槽（实际回答；不追加制作建议）：\n\n'
        sequence += '\n\n'.join(f"第{s['index']+1}轮：{json.dumps(s['clarification'],ensure_ascii=False)}" for s in entry['steps'] if s.get('clarification')) or '本例无补槽。'
        (folder/'prompt-sequence.md').write_text(sequence,encoding='utf8')
        base = section('现象',spec['phenomenon']) + section('前置步骤',spec['pre']) + section('提示词',prompts(case,spec['indexes'],bool(spec.get('prep'))))
        base += section('复现步骤',spec['reproduce']) + section('实际结果',spec['actual']) + section('预期结果',spec['expected']) + section('影响',spec['impact'])
        ids = '\n'.join(f"- 第{s['index']+1}轮：{s['runId']}；状态{s['status']}。" for s in selected)
        base += section('补充',f"- 测试日期：2026-11-16；本次为既有实测缺陷同步，未重新执行产品。\n- 关联用例：{case}；[历史会话与原输入](https://app.cinlink.ai/c/{entry['conversationId']})（仅取证，回归另建项目）。\n"+ids+'\n- 附件material-index.json记录实际源文件规格、哈希和文件标识；case-evidence.json保留本次结果及真实补槽；prompt-sequence.md含完整实际执行顺序。\n- '+spec['boundary'])
        base += section('失败截图','__SCREENSHOTS__')
        (folder/'description.md').write_text(base,encoding='utf8')
        attachments=[]
        for filename in ['case-evidence.json','material-index.json','prompt-sequence.md']:
            attachments.append(dict(path=filename,sha256=sha(folder/filename)))
        extras=[]
        for path in unique.values():
            if path.suffix.lower()=='.txt':extras.append(path)
        if name=='04-localization':extras += [p for p in unique.values() if p.name=='english-ad-35s.mp4']
        if name=='02-model':extras += [p for p in unique.values() if p.name=='SKU10-front-only.mp4']
        for path in {p.name:p for p in extras}.values():
            shutil.copy2(path,folder/path.name);attachments.append(dict(path=path.name,sha256=sha(folder/path.name)))
        fields=dict(labels=['4059c63d8703784388875ab6ca'])
        if spec.get('medium'):fields.update(priority='0302d601f492838ff405113d00',seriousLevel='b68befd018ae163c4165329608')
        plan=dict(key=spec['key'],subject=spec['title'],descriptionPath='description.md',fields=fields,images=images,attachments=attachments)
        write(folder/'plan.json',plan)
    write(DEST/'batch.json',dict(date='2026-11-17',testDate='2026-11-16',scope='ICP电商原文批次',plans=[dict(name=n,key=s['key'],case=s['case'],title=s['title']) for n,s in CASES.items()],notSubmittedAsDefects=['Case01缺A及其依赖修改存在源素材/首稿缺口，不能全归因产品缺陷。','Case02/05第2～4轮6条缺前置未提交。','4轮假设错误未触发，未计缺陷。','Case05独立末轮已通过，首次补槽网络失败已恢复，不另报稳定缺陷。']))
    print(json.dumps(dict(prepared=len(CASES),screenshots=sum(len(s['images']) for s in CASES.values()),directory=str(DEST)),ensure_ascii=False))

if __name__=='__main__':prepare()
