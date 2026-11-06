# 配置对话模型

DoroPet 本身不提供模型额度，她能不能聊天、聊得好不好，取决于你接进来的模型服务。

这篇从「选哪家」讲到「聊上第一句」，每一步都对应软件里的实际按钮。

## 先决定用哪家

不熟悉的话，按这三种情况选：

| 你的情况 | 建议 | 理由 |
| --- | --- | --- |
| 只想快点用上 | **DeepSeek** | 国内直连不用代理，注册送额度，几块钱能用很久 |
| 有海外支付方式 | OpenAI / Anthropic / Gemini | 效果上限更高，但需要自己解决网络 |
| 不想花钱 | **Ollama** | 本地跑，完全免费，但要有足够的显存/内存，回复也慢一些 |

软件默认推荐的也是 DeepSeek，新建模型时供应商一栏预选的就是它。

## 第一步：拿到 API Key

API Key 是一串以 `sk-` 开头的字符（各家格式略有不同），相当于你账号的通行证。

### 国内可直接访问

| 供应商 | 注册与取 Key 的地址 |
| --- | --- |
| DeepSeek | [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys) |
| 月之暗面 Moonshot | [platform.moonshot.cn/console/api-keys](https://platform.moonshot.cn/console/api-keys) |
| 智谱 z.ai | [platform.z.ai/api-keys](https://platform.z.ai/api-keys) |
| MiniMax | [platform.minimax.chat](https://platform.minimax.chat/user-center/basic-information/interface-key) |

流程都一样：注册 → 实名（国内平台普遍要求）→ 充值 → 在控制台点「创建 API Key」→ **立刻复制**。

::: warning Key 只显示一次
大部分平台在你关闭弹窗后就再也看不到完整 Key 了。复制下来先存到记事本或密码管理器里，丢了只能重新创建。
:::

### 需要自行解决网络

| 供应商 | 取 Key 的地址 |
| --- | --- |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Anthropic | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| Google Gemini | [aistudio.google.com/apikey](https://aistudio.google.com/apikey)（有免费额度） |
| xAI | [console.x.ai](https://console.x.ai/) |
| Mistral | [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys/) |
| Perplexity | [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api) |

::: tip 嫌麻烦可以用 OpenRouter
[openrouter.ai/keys](https://openrouter.ai/keys) 是一个聚合平台，一个 Key 能调用几十家的模型，充值一次到处能用。缺点是会加一点手续费，速度也略慢。
:::

### 本地模型

**Ollama** 不需要 Key。装好 Ollama 并拉取模型后，供应商选 `Ollama`，API Key 随便填一个占位字符，地址保持默认的 `http://localhost:11434`。

## 第二步：新建模型

打开左侧导航的 **「模型配置」** 页，点右上角 **「+ 新建模型」**。首次使用时中间会显示「暂无模型，点击上方按钮添加」。

表单有六项，按下面顺序填：

### 名称

给自己看的备注名，随便起。比如「DeepSeek 主力」「Claude 备用」。

::: tip 为什么要起名
你可以同时存多套配置，在对话里随时切换。名字起得清楚，切的时候才不会选错。
:::

### 供应商

下拉选择平台。选中后：

- **API 地址会自动留空** —— 这是有意的，留空表示用该供应商的官方地址，不用你手填
- 输入框的灰色提示文字会显示官方地址，供你确认

### API 地址

**留空就行**。只有两种情况需要填：

1. 用中转/代理服务（地址形如 `https://xxx.com/v1`）
2. 用 Azure OpenAI（地址形如 `https://你的资源名.openai.azure.com`，必须自己填）

### API Key

把第一步复制的 Key 粘进来。**这一项和名称都是必填的**，缺一个保存按钮就不生效。

### 模型

填模型名字，比如 `deepseek-flash`、`gpt-5.5`、`claude-sonnet-5-5`。

不知道填什么就点旁边的 **「获取列表」**：

1. 确保上面的 API 地址和 Key 已经填好
2. 点「获取列表」
3. 等一两秒，会拉出这个 Key 能用的所有模型
4. 从下拉里选一个

如果拉取失败，通常是 Key 填错了或者网络不通——这一步同时也是个连接测试。

::: tip 不同供应商命名差别很大
同样是对话模型，OpenAI 叫 `gpt-5.5`，Anthropic 叫 `claude-sonnet-5-5`，DeepSeek 叫 `deepseek-flash`，Google 叫 `gemini-3.8-flash`。手动填的时候要一字不差，建议直接用「获取列表」。

DeepSeek 在 2026 年 9 月发布了 V4.1 Flash，API 名相应改成了 `deepseek-flash`。旧名 `deepseek-v4-flash` 目前仍会被自动路由到同一个模型，但你新配置时直接用新名就好。

模型迭代很快，上面这些名字迟早会过时——别把文档当准绳，以平台控制台里实际列出的为准。「获取列表」拉到的永远是最新的。
:::

### 温度

控制回复的随机性，范围 0–2，默认 **0.7**。

- 调低（0.2–0.4）：回答更稳、更确定，适合查资料、算东西
- 调高（0.9 以上）：更活泼发散，但容易跑题

不确定就保持默认。

## 第三步：设为默认

勾选 **「设为默认」**，之后新建的对话会自动使用这套配置。

不勾也能用，但每次开新对话要去切一下。

## 其余几项（可以先跳过）

| 项 | 说明 |
| --- | --- |
| 最大输出 | 留空表示不限制，模型能写多长写多长。填 0 或负数同样按不限制处理 |
| 图片理解 | 能不能看懂图片。现在按模型规格自动判断，一般不用手动改 |
| 思考强度 | 只有部分模型支持（比如 DeepSeek 的推理模型）。不支持的模型这里不显示 |

## 验证是否配好

回到对话页，随便发一句「你好」。

- **正常回复** → 配好了
- **报错** → 对照下面的表

## 常见错误对照

| 提示 | 原因 | 怎么办 |
| --- | --- | --- |
| `401` / `invalid api key` | Key 错了或已被删除 | 回控制台重新创建，注意别多复制了空格 |
| `402` / `insufficient balance` | 余额不足 | 去平台充值。国内几家最低充 10 元就够用很久 |
| `404` / `model not found` | 模型名写错，或这个 Key 没有该模型权限 | 用「获取列表」重新选 |
| `429` / `rate limit` | 请求太频繁或超出套餐 | 等一会儿再试，或升级套餐 |
| 连接超时 | 网络不通（海外供应商常见） | 国内直连的供应商不会遇到；用海外的需要自己配代理，并把 API 地址换成代理地址 |
| 拉取列表一直转圈 | 地址或 Key 有问题 | 检查 API 地址有没有多写路径，Key 有没有复制全 |

## 另外两个页签：语音与绘图

「模型」页顶部有三个页签，前面讲的全是第一个。另外两个负责让她出声、让她画图，流程类似，但选项少得多。

### 语音合成

切到「语音合成」页签，点「+ 新建 TTS 配置」。内置支持四家：

| 供应商 | 需要 Key | 说明 |
| --- | --- | --- |
| **Edge TTS** | 不需要 | 微软的在线语音。软件**已经自带一条配置**，装上就能读，中文音色多，最自然 |
| **MiMo TTS** | 需要 | 小米的，OpenAI 兼容接口。支持音色设计（用文字描述造一个音色）和音色克隆（上传样本复刻） |
| **OpenAI TTS** | 需要 | 六个英文音色，中文效果一般 |
| **Web Speech API** | 不需要 | 调用系统自带语音，完全离线，但音质最差、可选音色少 |

新手直接用 Edge TTS，什么都不用配。

::: warning 配了 TTS 不等于会出声
还要在设置里打开 **「自动朗读」**，她才会念出回复。只配 TTS 是不会主动说话的。
:::

一个实用细节：改完音色或语速可以**直接试听**，不用先保存——不合适就继续调，不用反复存。

### 图片生成

切到「图片生成」页签，点「+ 新建图片配置」。

| 供应商 | 可选模型 |
| --- | --- |
| OpenAI | `dall-e-3`、`dall-e-2`、`gpt-image-2` |
| Stability AI | `stable-diffusion` |

除了和对话模型一样的名称、Key、模型三项，这里多两个：

- **图片尺寸** —— 形如 `1024x1024`。不同模型支持的尺寸不同，填错了会直接报错
- **质量** —— 常规 / 高清档，具体看模型支持哪些

::: tip 三类配置互不影响
文本 LLM、图片生成、语音合成各自独立存储，各自有默认项。换对话模型不会动你已经调好的语音；想让她换个人声，也不用重配对话模型。
:::

## 想换模型怎么办

不用删了重建。在对话界面顶部的模型选择里直接切，切换只影响**之后发送的消息**，已经聊过的内容不会重算。

如果只是想临时试试别的模型，用这个方法最快——不用动配置。
