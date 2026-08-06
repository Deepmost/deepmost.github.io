---
title: Ragent AI 28 天学习计划：AI 应用开发实习求职版
date: 2026-07-30 16:04:17
tags:
  - 学习计划
---
# Ragent AI 28 天学习计划：AI 应用开发实习求职版

> 个人背景：已经有一段实习经历，具备 Java、Spring Boot 和真实团队协作基础。  
> 求职目标：AI 应用开发实习，重点方向为 Java AI 应用、RAG、Agent、MCP 和 AI 平台工程。  
> 建议投入：每天 1.5～2 小时。  
> 学习方式：前 3 周以静态阅读、调用链追踪和设计总结为主；投递前建议完成至少一个可验证的小扩展。本计划只安排学习，不要求现在编译或运行项目。

## 求职定位

这份计划的目标不是把 5 万行代码全部背下来，而是形成面试官能够验证的四类能力：

| 能力 | 面试证据 | 目标权重 |
|---|---|---:|
| AI 应用主链 | 能完整讲解 RAG、Embedding、Rerank、Prompt、MCP | 40% |
| 生产工程能力 | 能解释模型降级、限流、记忆、Trace、幂等和并发隔离 | 25% |
| 代码与系统设计 | 能沿接口追踪实现，并设计一个扩展点 | 20% |
| 项目表达 | 有架构图、案例、面试题库和准确的简历表述 | 15% |

已有实习经历应这样使用：

1. 用真实实习证明工程基础、协作能力和交付能力。
2. 用 Ragent 证明 AI 应用方向的学习深度和系统设计能力。
3. 找出实习项目与 Ragent 在接口设计、异常处理、缓存、并发、可观测性上的共同点。
4. 不把阅读过的开源代码描述成个人实现；只有亲自完成并验证的扩展才能写成“实现”。

## 学习目标

完成 28 天学习后，应能够：

1. 讲清一次 RAG 问答从前端请求到 SSE 返回的完整链路。
2. 解释问题改写、意图识别、多路召回、RRF、Rerank 和引用生成的作用。
3. 讲清文档从获取、解析、分块到向量索引的入库过程。
4. 理解模型档位、路由、首包探测、健康状态和故障转移。
5. 理解会话记忆、限流、幂等、Trace、MCP 等生产工程设计。
6. 独立设计一个新的检索通道、模型供应商、MCP 工具或入库节点。
7. 准备 30 秒、3 分钟、10 分钟三个版本的项目介绍。
8. 将已有实习经历与 AI 项目能力组合成可信的求职故事。
9. 回答至少 30 道 RAG、LLM 工程、MCP 和系统设计面试题。

## 每日学习节奏

每天按以下节奏执行：

- 10 分钟：回顾前一天笔记，写下今天要解决的 3 个问题。
- 55～70 分钟：阅读代码，只追踪当天指定的调用链。
- 20 分钟：制作流程图、类图、数据表或设计文档。
- 15 分钟：把当天内容整理成 2～3 道面试题并口述回答。
- 10 分钟：关联一次真实实习经历，记录相同点和差异点。

建议建立自己的 `learning-notes/` 笔记目录。每天必须留下“代码位置 + 自己的解释 + 面试表达”三类证据，不要大段抄代码。

## 28 天求职交付物

| 时间 | 必须完成的求职材料 |
|---|---|
| Day 7 | 项目全景图、30 秒项目介绍、与实习经历的能力对照表 |
| Day 14 | 在线问答时序图、10 道 RAG 主链面试题、3 分钟项目介绍 |
| Day 21 | 检索/入库专题文档、最新提交优化分析、20 道技术面试题 |
| Day 28 | 10 分钟项目讲解、30 道题库、扩展设计、简历表述和模拟面试记录 |

---

## 第一周：建立全局地图和求职叙事

### Day 1：理解项目定位和模块边界

**目标**：知道项目解决什么问题，并形成面向 AI 应用开发岗位的项目定位。

**阅读**：

- [README.md](../README.md)
- [根 pom.xml](../pom.xml)
- [bootstrap/pom.xml](../bootstrap/pom.xml)
- [framework/pom.xml](../framework/pom.xml)
- [infra-ai/pom.xml](../infra-ai/pom.xml)
- [mcp-server/pom.xml](../mcp-server/pom.xml)
- [frontend/package.json](../frontend/package.json)

**任务**：

1. 写出 `bootstrap`、`framework`、`infra-ai`、`mcp-server`、`frontend` 的职责。
2. 标出模块间依赖方向，确认业务模块如何依赖通用能力和模型能力。
3. 从目标岗位 JD 中整理 15 个高频关键词，并标记本项目对应的代码模块。
4. 写出一句话项目定位：业务问题、核心方案、生产能力各占一句。
5. 列出已有实习中可以证明的 Java 工程能力，以及还需由 Ragent 补齐的 AI 能力。

**当日产出**：模块依赖图、JD 关键词映射表、30 秒项目介绍初稿。

**验收**：能够在 30 秒内说明“为什么选择学习这个项目”和“它与普通 CRUD 项目的区别”。

### Day 2：理解配置体系和运行时组件

**目标**：知道系统由哪些外部组件支撑，以及配置如何控制功能开关。

**阅读**：

- [bootstrap application.yaml](../bootstrap/src/main/resources/application.yaml)
- [mcp-server application.yml](../mcp-server/src/main/resources/application.yml)
- `bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/config/`
- `infra-ai/src/main/java/com/nageoffer/ai/ragent/infra/config/`

**任务**：

1. 按数据库、Redis、MQ、对象存储、向量库、关键词库、图数据库、MCP、模型供应商分类配置项。
2. 整理默认启用和默认关闭的检索通道。
3. 画出 `recall-budget → rerank-candidate-limit → default-top-k` 检索漏斗。
4. 找出配置启动校验类，记录它们防止了哪些错误配置。

**当日产出**：一份配置分类表和检索漏斗图。

**验收**：能够说明默认向量库、关键词检索和图谱检索分别是什么状态。

### Day 3：理解数据库模型

**目标**：建立用户、会话、知识库、意图、Trace、入库任务之间的数据关系。

**阅读**：

- [数据库说明](../resources/database/README.md)
- [完整表结构](../resources/database/schema_pg.sql)
- `bootstrap/src/main/java/com/nageoffer/ai/ragent/**/dao/entity/`

**任务**：

1. 将表按用户会话、知识库、意图、Trace、入库任务五组分类。
2. 重点分析 `t_conversation`、`t_message`、`t_knowledge_document`、`t_knowledge_chunk`、`t_knowledge_vector`。
3. 找出逻辑删除、审计字段和业务主键的统一规则。
4. 画出知识库到文档、Chunk、向量记录的关系。

**当日产出**：一张精简 ER 图，只保留核心字段。

**验收**：能够说清一条回答、引用来源和原始文档如何关联。

### Day 4：建立后端 API 地图

**目标**：理解系统对外暴露的业务能力，但不深入实现。

**阅读**：

- `bootstrap/src/main/java/com/nageoffer/ai/ragent/**/controller/`
- [RAGChatController.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/controller/RAGChatController.java)
- `framework/src/main/java/com/nageoffer/ai/ragent/framework/web/`

**任务**：

1. 按认证、问答、会话、知识库、入库、意图、Trace、管理后台分类 Controller。
2. 记录每类 API 的路径、输入、输出和对应 Service。
3. 阅读统一响应和全局异常处理，区分普通 JSON API 与 SSE API。

**当日产出**：一张 Controller → Service API 导航表。

**验收**：不搜索代码，指出发起问答、停止生成和查询历史会话的入口。

### Day 5：建立前端页面和状态地图

**目标**：理解用户操作如何映射为 API 调用和状态变化。

**阅读**：

- [router.tsx](../frontend/src/router.tsx)
- [ChatPage.tsx](../frontend/src/pages/ChatPage.tsx)
- [chatStore.ts](../frontend/src/stores/chatStore.ts)
- `frontend/src/services/`
- `frontend/src/types/index.ts`

**任务**：

1. 整理普通用户页面和管理员页面。
2. 找出登录态、会话列表、消息列表和流式状态分别由哪个 Store 管理。
3. 从 `sendMessage` 追踪到 `/rag/v3/chat` 请求构造。
4. 记录 `meta`、`message`、`finish`、`cancel`、`reject` 等 SSE 事件的前端含义。

**当日产出**：一张页面 → Store → Service → API 映射图。

**验收**：能够解释新会话为什么要等 `meta` 事件后才能获得正式会话 ID。

### Day 6：学习启动入口与 Spring 装配

**目标**：理解两个 Spring Boot 应用的扫描范围和基础设施装配方式。

**阅读**：

- [RagentApplication.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/RagentApplication.java)
- [McpServerApplication.java](../mcp-server/src/main/java/com/nageoffer/ai/ragent/mcp/McpServerApplication.java)
- `framework/src/main/java/com/nageoffer/ai/ragent/framework/config/`
- `bootstrap/src/main/java/com/nageoffer/ai/ragent/config/`

**任务**：

1. 记录组件扫描、Mapper 扫描和定时任务相关注解。
2. 找出数据库、Web、Redis、RocketMQ 和线程池配置入口。
3. 区分主服务和 MCP 服务的进程边界。

**当日产出**：一张 Spring Bean 装配概览图。

**验收**：能够解释为什么 `mcp-server` 可以独立部署。

### Day 7：第一周复盘与求职叙事

**目标**：把零散目录知识整理成项目全景，并形成可信的第一版面试表达。

**任务**：

1. 不看代码，重画模块图、核心 ER 图和 API 地图。
2. 分别用 30 秒和 3 分钟口述项目的业务价值、核心技术和模块职责。
3. 列出目前最不理解的 10 个术语，标记将在后续哪一天解决。
4. 从 README 的架构图中找出代码已经对应上的部分。
5. 用 STAR 表整理已有实习中最有含金量的一次交付，并写出它与 AI 应用开发的连接点。
6. 准备三个追问：为什么不用简单向量检索、为什么需要模块隔离、你本人目前做过什么。

**当日产出**：《Ragent 项目全景 v1》、30 秒/3 分钟介绍稿、实习能力对照表。

**验收**：能准确区分“项目原有设计”“自己阅读分析所得”“自己真实实现的内容”。

---

## 第二周：吃透在线问答主链，形成 RAG 面试主线

### Day 8：追踪问答入口和任务生命周期

**目标**：理解一次 SSE 问答任务如何创建、限流、追踪和取消。

**阅读**：

- [RAGChatController.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/controller/RAGChatController.java)
- [RAGChatService.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/service/RAGChatService.java)
- [RAGChatServiceImpl.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/service/impl/RAGChatServiceImpl.java)
- `rag/service/handler/StreamTaskManager.java`
- `rag/service/handler/StreamCallbackFactory.java`

**任务**：追踪 `question`、`conversationId`、`taskId`、`userId` 和 `SseEmitter` 的生命周期。

**当日产出**：问答入口时序图。

**验收**：能够区分会话 ID、任务 ID、用户消息 ID 和回答消息 ID。

### Day 9：理解流式问答总编排

**目标**：掌握问答流程的骨架和所有短路分支。

**阅读**：

- [StreamChatPipeline.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/service/pipeline/StreamChatPipeline.java)
- `rag/service/pipeline/StreamChatContext.java`

**任务**：

1. 按执行顺序整理 `loadMemory`、`rewriteQuery`、`resolveIntents`、`retrieve` 和 `streamRagResponse`。
2. 标出歧义引导、纯系统意图、空检索结果三个短路分支。
3. 记录 `StreamChatContext` 每一步新增了哪些状态。

**当日产出**：带分支的问答活动图。

**验收**：能够说明哪些情况不会进入知识库检索或 RAG Prompt。

### Day 10：理解会话记忆

**目标**：掌握最近消息、持久化摘要和 Token 成本之间的平衡。

**阅读**：

- `rag/core/memory/ConversationMemoryService.java`
- `rag/core/memory/DefaultConversationMemoryService.java`
- `rag/core/memory/JdbcConversationMemoryStore.java`
- `rag/core/memory/JdbcConversationMemorySummaryService.java`
- `rag/config/MemoryProperties.java`
- `rag/core/memory/JdbcConversationMemorySummaryServiceTest.java`

**任务**：画出加载历史、追加消息、触发摘要、下次加载摘要的流程。

**当日产出**：会话记忆状态图。

**验收**：能够解释为什么不能把全部历史消息直接交给模型。

### Day 11：理解问题归一化、改写与拆分

**目标**：理解模糊问法、多轮指代和复合问题如何被处理。

**阅读**：

- [MultiQuestionRewriteService.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/core/rewrite/MultiQuestionRewriteService.java)
- `rag/core/rewrite/QueryTermMappingService.java`
- `resources/prompt/user-question-rewrite.st`
- `rag/rewrite/MultiQuestionRewriteServiceTests.java`

**任务**：

1. 整理术语映射、LLM 改写、JSON 解析和规则兜底的先后顺序。
2. 为“它怎么申请”“报销和请假分别怎么办”手工推演输出。
3. 记录快速模型档位失败后的降级行为。

**当日产出**：三组问题改写案例。

**验收**：能够说明改写失败为什么不会让整个问答失败。

### Day 12：理解意图树和意图分类

**目标**：理解 SYSTEM、KB、MCP 三种意图怎样影响后续流程。

**阅读**：

- `rag/core/intent/DefaultIntentClassifier.java`
- `rag/core/intent/IntentResolver.java`
- `rag/core/intent/IntentNode.java`
- `rag/core/intent/IntentTreeFactory.java`
- `rag/core/intent/IntentNodeRegistry.java`
- `rag/core/intent/DefaultIntentClassifierTest.java`

**任务**：

1. 画出数据库意图节点到运行时意图树的转换过程。
2. 整理叶子节点 Prompt 如何构造，以及模型输出如何解析。
3. 对比 SYSTEM、KB、MCP 意图的后续处理分支。

**当日产出**：意图分类决策表。

**验收**：能够解释为什么一个问题可以同时命中多个知识库或 MCP 工具。

### Day 13：理解检索总编排和 MCP 并行上下文

**目标**：理解子问题、KB 检索和 MCP 调用如何汇总为上下文。

**阅读**：

- [RetrievalEngine.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/core/retrieval/RetrievalEngine.java)
- `rag/dto/RetrievalContext.java`
- `rag/dto/SubQuestionIntent.java`
- `rag/core/prompt/ContextFormatter.java`

**任务**：

1. 跟踪单个子问题的 KB 与 MCP 两类意图。
2. 跟踪多个子问题如何并行处理并合并上下文。
3. 记录 MCP 缺少必填参数时为什么不直接调用工具。

**当日产出**：`SubQuestionIntent → RetrievalContext` 数据流图。

**验收**：能够说明知识库上下文和 MCP 上下文为何分开构造。

### Day 14：第二周复盘

**目标**：完整讲清问答前半段，并能应对连续追问。

**任务**：

1. 从前端 `sendMessage` 开始，追踪到 `RetrievalEngine.retrieve`。
2. 用表格列出每个阶段的输入、输出、失败兜底和 Trace 类型。
3. 回答：无历史、无意图、纯 SYSTEM、空检索、模型改写失败分别会发生什么。
4. 整理 10 道 RAG 主链面试题，每道题准备“结论、原理、代码证据”三层答案。
5. 录制一次 3 分钟口述，检查是否只背概念而没有代码位置和工程取舍。

**当日产出**：《在线问答主链 v1》、阶段表、10 道题库和 3 分钟讲解稿。

**验收**：脱离代码口述完整流程，并能回答“为什么这样设计”和“失败时怎么办”。

---

## 第三周：检索与文档入库，形成技术深挖案例

### Day 15：理解多通道检索架构

**目标**：理解向量、关键词、图谱和联网搜索如何并行召回。

**阅读**：

- [MultiChannelRetrievalEngine.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/core/retrieval/MultiChannelRetrievalEngine.java)
- `rag/core/retrieval/channel/SearchChannel.java`
- `rag/core/retrieval/channel/VectorSearchChannel.java`
- `rag/core/retrieval/channel/KeywordSearchChannel.java`
- `rag/core/retrieval/channel/GraphSearchChannel.java`
- `rag/core/retrieval/channel/WebSearchChannel.java`

**任务**：整理每个通道的启用条件、输入、输出、异常隔离和线程池。

**当日产出**：检索通道对比表。

**验收**：能够说明一个检索通道异常为什么不会终止其他通道。

### Day 16：理解向量检索和作用域选择

**目标**：掌握意图定向检索、全库兜底检索，以及最新提交中的 Query Embedding 复用优化。

**阅读**：

- `rag/core/vector/VectorRetrieverService.java`
- `rag/core/vector/PgVectorRetrieverService.java`
- `rag/core/vector/MilvusVectorRetrieverService.java`
- `rag/core/vector/strategy/IntentParallelRetriever.java`
- `rag/core/vector/strategy/CollectionParallelRetriever.java`
- `rag/core/vector/strategy/AbstractParallelRetriever.java`
- `rag/core/vector/strategy/ParallelQueryVectorReuseTest.java`
- 对应的 `CollectionParallelRetrieverTest.java`、`IntentParallelRetrieverTest.java`

**任务**：

1. 整理置信度阈值、单意图补充阈值和候选预算。
2. 阅读最新提交 `dc0d001`，对比优化前后的 Embedding 调用位置。
3. 说明为什么应在任务扇出前调用一次 `embedAndNormalize`，再把同一向量交给多个检索任务。
4. 从测试中提取三个证明点：Embedding 只调用一次、向量检索调用多次、任务复用同一个数组实例。
5. 写出该优化对延迟、模型调用成本和并发压力的影响，以及共享可变数组的风险约束。

**当日产出**：向量检索作用域决策树和《最新提交性能优化分析》。

**验收**：能够解释低置信意图为什么需要全库兜底，并用 2 分钟讲清本次优化的动机、改法和测试证据。

### Day 17：理解检索后处理链

**目标**：掌握召回结果如何逐步收窄为最终上下文。

**阅读**：

- `rag/core/retrieval/postprocessor/SearchResultPostProcessor.java`
- `DeduplicationPostProcessor.java`
- `FusionPostProcessor.java`
- `RerankPostProcessor.java`
- `MetadataEnrichmentPostProcessor.java`
- `DeduplicationPostProcessorTest.java`

**任务**：

1. 按 `getOrder()` 还原处理顺序。
2. 手工构造两个通道各 5 条结果，演算去重和 RRF 融合。
3. 区分原始召回分数、融合分数和 Rerank 分数。

**当日产出**：一个手算 RRF 示例和后处理责任链图。

**验收**：能够解释为什么先融合再 Rerank，而不是分别 Rerank 后直接拼接。

### Day 18：理解 Prompt、来源与引用

**目标**：理解检索结果如何转换成模型消息和可追溯回答。

**阅读**：

- `rag/core/prompt/RAGPromptService.java`
- `rag/core/prompt/PromptTemplateLoader.java`
- `rag/core/source/SourcesAssembler.java`
- `rag/core/source/GroundingChunksAssembler.java`
- `rag/core/source/CitationContextEnricher.java`
- `bootstrap/src/main/resources/prompt/`
- `CitationContextEnricherTest.java`

**任务**：区分 Prompt 上下文、来源面板、Grounding Chunk 和行内引用四类数据。

**当日产出**：检索结果到回答引用的数据转换图。

**验收**：能够解释关闭行内引用后，为什么来源面板仍可工作。

### Day 19：理解入库领域模型和任务入口

**目标**：理解 Pipeline 定义、任务实例和节点执行日志之间的关系。

**阅读**：

- `ingestion/controller/IngestionPipelineController.java`
- `ingestion/controller/IngestionTaskController.java`
- `ingestion/service/impl/IngestionPipelineServiceImpl.java`
- `ingestion/service/impl/IngestionTaskServiceImpl.java`
- `ingestion/domain/`
- 对应 Service 测试。

**任务**：区分 Pipeline 模板、Pipeline 节点、Task、Task 节点日志。

**当日产出**：入库领域对象关系图。

**验收**：能够说明同一 Pipeline 为什么可以产生多个独立任务。

### Day 20：理解入库执行引擎

**目标**：掌握节点注册、起点发现、环检测、条件判断和链式执行。

**阅读**：

- [IngestionEngine.java](../bootstrap/src/main/java/com/nageoffer/ai/ragent/ingestion/engine/IngestionEngine.java)
- `ingestion/node/IngestionNode.java`
- `ingestion/domain/enums/IngestionNodeType.java`
- `ingestion/engine/ConditionEvaluator.java`
- `ingestion/engine/NodeOutputExtractor.java`
- `ingestion/engine/ConditionEvaluatorTest.java`

**任务**：手工设计一个包含条件节点的 Pipeline，并推演成功、跳过和失败三条路径。

**当日产出**：入库引擎活动图。

**验收**：能够解释引擎如何发现环、缺失节点和多个起点问题。

### Day 21：理解六类入库节点

**目标**：掌握一份文档变成可检索 Chunk 的完整过程。

**阅读**：

- `ingestion/node/FetcherNode.java`
- `ingestion/node/ParserNode.java`
- `ingestion/node/EnhancerNode.java`
- `ingestion/node/ChunkerNode.java`
- `ingestion/node/EnricherNode.java`
- `ingestion/node/IndexerNode.java`
- `core/parser/`、`core/chunk/`
- [PDF 入库示例](examples/pdf-ingestion-example.md)

**任务**：

1. 记录每个节点从 `IngestionContext` 读取和写入哪些字段，并分析节点失败后的日志信息。
2. 将 Day 15～21 整理为“召回侧”和“入库侧”两条面试主线。
3. 累计整理 20 道技术面试题，其中至少包含 5 道检索题、5 道入库题和 3 道性能优化题。
4. 选择一个已有实习中的性能、稳定性或数据处理案例，与 Query Embedding 复用案例比较分析方法。

**当日产出**：六节点输入输出表、检索/入库专题文档、20 道累计题库。

**验收**：能够说明文档增强和 Chunk 增强的区别，并完成一次 5 分钟检索与入库专题讲解。

---

## 第四周：模型、工程能力、MCP 与求职交付

### Day 22：理解索引写入与多后端同步

**目标**：理解向量写入如何扩展到关键词索引和知识图谱。

**阅读**：

- `rag/core/vector/VectorStoreService.java`
- `rag/core/vector/PgVectorStoreService.java`
- `rag/core/vector/MilvusVectorStoreService.java`
- `rag/core/vector/decorator/KeywordSyncingVectorStoreService.java`
- `rag/core/vector/decorator/GraphSyncingVectorStoreService.java`
- `rag/config/KeywordSyncVectorStorePostProcessor.java`
- `rag/config/GraphSyncVectorStorePostProcessor.java`

**任务**：画出装饰器如何在不修改主向量写入流程的情况下同步其他索引。

**当日产出**：多索引写入类图。

**验收**：能够说明策略模式与装饰器模式在这里各自承担什么职责。

### Day 23：理解 AI 客户端抽象

**目标**：理解不同供应商怎样接入统一 Chat、Embedding、Rerank 和 VLM 接口。

**阅读**：

- `infra-ai/infra/chat/ChatClient.java`
- `infra-ai/infra/chat/AbstractOpenAIStyleChatClient.java`
- `infra-ai/infra/embedding/EmbeddingClient.java`
- `infra-ai/infra/embedding/AbstractOpenAIStyleEmbeddingClient.java`
- `infra-ai/infra/rerank/RerankClient.java`
- `infra-ai/infra/vlm/VlmService.java`

**任务**：选择两个模型供应商，对比 provider、URL、请求转换、响应解析和异常处理。

**当日产出**：模型能力接口层次图。

**验收**：能够列出新增一个 OpenAI 兼容供应商通常要实现和配置的内容。

### Day 24：理解模型路由和故障转移

**目标**：掌握模型档位、候选顺序、健康状态和首包探测。

**阅读**：

- [RoutingLLMService.java](../infra-ai/src/main/java/com/nageoffer/ai/ragent/infra/chat/RoutingLLMService.java)
- [ModelRoutingExecutor.java](../infra-ai/src/main/java/com/nageoffer/ai/ragent/infra/model/ModelRoutingExecutor.java)
- `infra-ai/infra/model/ModelSelector.java`
- `infra-ai/infra/model/ModelHealthStore.java`
- `infra-ai/infra/chat/LlmFirstPacketProbe.java`
- `infra/model/ModelSelectorTest.java`

**任务**：分别推演同步请求失败、流式启动失败、首包超时、无内容结束和调用成功。

**当日产出**：模型路由时序图和健康状态转换图。

**验收**：能够解释为什么流式请求不能只以 HTTP 请求成功作为模型可用依据。

### Day 25：理解并发治理、上下文和幂等

**目标**：理解生产环境中如何限制并发并保持跨线程上下文。

**阅读**：

- `rag/service/ratelimit/ChatQueueLimiter.java`
- `rag/service/ratelimit/ChatQueueLimiterTest.java`
- `framework/idempotent/`
- `framework/context/`
- `bootstrap/config/executor/` 或项目中的线程池配置类
- `framework/web/SseEmitterSender.java`

**任务**：整理全局并发配额、等待队列、租约、幂等 Key、用户上下文和 Trace 上下文之间的关系。

**当日产出**：并发请求生命周期图。

**验收**：能够说明仅使用本机 `Semaphore` 为什么不适合多实例部署。

### Day 26：理解评测、Trace、异常与审计

**目标**：掌握一次 RAG 调用如何被评估、观察、诊断和审计，建立“效果 + 性能”双维度意识。

**阅读**：

- `rag/trace/`
- `rag/eval/EvalController.java`
- `rag/eval/`
- `framework/trace/`
- `framework/web/GlobalExceptionHandler.java`
- `framework/exception/`
- `audit/`
- `rag/controller/RagTraceController.java`
- `frontend/src/pages/admin/traces/`

**任务**：

1. 找出 Trace Run 和 Trace Node 的创建、嵌套、耗时和错误记录位置。
2. 整理评测入口可观察的召回结果和回答结果，区分离线评测与线上反馈。
3. 给出检索效果指标草案：Recall@K、MRR、NDCG、引用命中率和回答忠实度。
4. 整理业务异常、客户端异常和远程调用异常的边界。
5. 区分效果评测、技术 Trace、用户反馈与业务变更审计。

**当日产出**：AI 应用评测指标表、可观测性数据流图和异常分类表。

**验收**：面对“回答很慢”和“回答不准确”两个问题，能够给出不同的排查路径。

### Day 27：理解 MCP 工具体系

**目标**：理解工具发现、参数提取、参数校验和远程执行。

**阅读**：

- `bootstrap/src/main/java/com/nageoffer/ai/ragent/rag/core/mcp/`
- [McpServerApplication.java](../mcp-server/src/main/java/com/nageoffer/ai/ragent/mcp/McpServerApplication.java)
- `mcp-server/src/main/java/com/nageoffer/ai/ragent/mcp/config/McpServerConfig.java`
- `mcp-server/src/main/java/com/nageoffer/ai/ragent/mcp/executor/`
- `mcp-server/src/test/java/com/nageoffer/ai/ragent/mcp/executor/`

**任务**：

1. 从意图节点的 `mcpToolId` 追踪到 MCP Server Executor。
2. 整理工具 Schema、LLM 提参、必填参数检查和错误结果格式。
3. 选择天气或票务工具，画出完整调用时序。

**当日产出**：MCP 工具调用时序图和一个新工具设计草案。

**验收**：能够解释 MCP 工具和普通知识库检索的输入输出差异。

### Day 28：求职材料收口与模拟面试

**目标**：把代码理解转化为可信、可验证、可投递的 AI 应用开发能力。

**任务**：

1. 不看代码，重画以下四张图：
   - 模块依赖图
   - 在线问答时序图
   - 多通道检索与后处理图
   - 文档入库 Pipeline 图
2. 准备 30 秒、3 分钟和 10 分钟三个版本的项目介绍；10 分钟版本必须包含业务问题、技术方案、工程取舍、容错机制和扩展点。
3. 从以下方向选择一个毕业设计：
   - 新增一个 `SearchChannel`
   - 新增一个模型供应商
   - 新增一个 `IngestionNode`
   - 新增一个 MCP 工具
4. 为毕业设计写一份方案，至少包含接口、配置、调用链、异常处理、Trace、评测指标和测试用例。
5. 整理至少 30 道面试题，按基础概念、代码实现、工程取舍、故障排查和系统设计分类。
6. 把真实实习经历整理成两个 STAR 故事：一次交付案例和一次问题排查/优化案例。
7. 写两版简历表述：
   - 阅读分析版：只能使用“深入分析、梳理、研究、设计”等准确动词。
   - 扩展实现版：只有实际完成并验证后才能使用“实现、优化、落地”等动词。
8. 完成一次 30 分钟模拟面试，并记录答不好的问题和下一轮补强动作。

**当日产出**：

- 《Ragent 项目全景 v2》
- 三个时长版本的项目讲解稿
- 30 道分类面试题
- 一份可实施的扩展设计文档
- 两个真实实习 STAR 故事
- 准确的简历项目表述和模拟面试记录

**最终验收**：能够回答以下问题：

1. Ragent 为什么不是简单的“向量检索 + LLM”？
2. 多路召回结果如何融合、收窄并进入 Prompt？
3. 文档更新后，向量、关键词和图谱索引如何保持一致？
4. 模型故障时系统如何检测并切换候选模型？
5. 高并发、多轮记忆、回答溯源和链路排障分别如何实现？
6. 如何衡量一次检索优化是否真的改善最终回答？
7. 你本人做过什么、分析过什么、还有什么没有实际验证？

---

## 求职优先级与投递门槛

### P0：投递前必须掌握

- `StreamChatPipeline`
- `RetrievalEngine`
- `MultiChannelRetrievalEngine`
- `DefaultIntentClassifier`
- `MultiQuestionRewriteService`
- `IngestionEngine` 和六类 `IngestionNode`
- `RoutingLLMService`、`ModelSelector`、`ModelHealthStore`
- 会话记忆、限流、SSE、Trace、评测、MCP
- Query Embedding 复用、RRF、Rerank 三个可深入追问的技术点

### P1：形成差异化

- 模型首包探测与三态健康状态
- 意图定向检索和全库兜底策略
- 文档入库节点编排与多索引同步
- 引用、Grounding、用户反馈和效果评测
- 用真实实习案例说明工程能力如何迁移到 AI 应用开发

### P2：第二遍再读

- 管理后台 CRUD
- Dashboard 统计代码
- 文档预览和 UI 样式
- 各种 DO、Mapper、VO 的机械转换
- 默认关闭的 Elasticsearch、LightRAG 细节

### 建议投递门槛

满足以下条件后开始集中投递，不必等待“全部学完”：

- [ ] 能在 3 分钟内讲清在线问答主链。
- [ ] 能手画多通道检索和文档入库两张图。
- [ ] 能回答 Embedding、向量检索、RRF、Rerank、Prompt、MCP 的区别和关系。
- [ ] 能讲清一个模型容错案例和一个检索性能优化案例。
- [ ] 有两个来自真实实习的 STAR 故事。
- [ ] 有 20 道以上已口述过的 AI 应用面试题。
- [ ] 简历能明确区分开源项目学习与个人真实实现。

如果要把 Ragent 作为重点项目写进简历，额外满足：

- [ ] 至少完成一个独立扩展或修复。
- [ ] 为扩展编写测试或可复现验证方案。
- [ ] 能说明方案选择、失败尝试、指标和最终结果。

## 简历表述边界

### 仅完成阅读和分析时

可以写：

> 深入分析 Java Agentic RAG 项目的问答、入库与模型路由链路，梳理多通道召回、RRF/Rerank、会话记忆、MCP 和模型故障转移机制，并完成扩展方案设计。

不能写“主导开发”“实现系统”“性能提升 XX%”。

### 完成独立扩展并验证后

按真实结果改写为：

> 基于现有 RAG 架构扩展 `<具体能力>`，通过 `<测试/评测方法>` 验证 `<真实结果>`，并补充 `<异常处理、Trace 或降级机制>`。

所有数据必须来自实际测量。已有实习经历和开源项目扩展应作为两个独立条目，不混淆所属团队与个人贡献。

## 高频面试主线

完成计划时，至少能连续回答以下问题：

1. 一个生产级 RAG 系统为什么不只是“检索 + 生成”？
2. Query Rewrite、Intent 和 Retrieval 分别解决什么问题？
3. 向量、关键词、图谱和联网搜索如何融合？
4. RRF 与 Rerank 有什么区别，顺序为什么这样安排？
5. Query Embedding 复用优化解决了什么问题，如何测试？
6. 文档分块粒度如何影响召回和回答质量？
7. 如何减少多轮对话 Token，同时保留关键上下文？
8. 模型流式请求的首包超时和普通 HTTP 超时有什么区别？
9. MCP 工具缺少必填参数时应该怎样处理？
10. 如何从效果、延迟、成本、稳定性四个维度评估 AI 应用？
11. 如果回答不准确，你会怎样区分入库、召回、排序、Prompt 和模型问题？
12. 你的实习经历证明了哪些能力，Ragent 又补齐了哪些 AI 能力？

## 学习记录模板

每天复制下面的模板记录：

```markdown
## Day N

### 今天解决的问题

1.
2.
3.

### 核心调用链

入口 → 编排 → 策略/实现 → 存储或外部服务 → 输出

### 关键设计

- 设计目的：
- 扩展点：
- 失败兜底：
- 配置入口：
- 对应测试：

### 面试表达

- 30 秒结论：
- 追问与回答：
- 代码证据：

### 与真实实习的关联

- 相同的工程问题：
- 不同的技术取舍：
- 可以证明的个人能力：

### 仍未理解

-

### 一句话总结

-
```

## 进度表

| 周次 | 完成标志 | 状态 |
|---|---|---|
| 第一周 | 模块图、ER/API 地图、30 秒介绍、实习能力对照表 | ⬜ |
| 第二周 | 在线问答主链图、10 道题、3 分钟介绍 | ⬜ |
| 第三周 | 检索/入库流程图、最新提交分析、累计 20 道题 | ⬜ |
| 第四周 | 30 道题、三个版本介绍、扩展设计、STAR 和简历表述 | ⬜ |
