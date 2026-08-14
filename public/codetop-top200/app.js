const ITEMS = [{"rank":1,"title":"3. 无重复字符的最长子串","algo":"哈希表、字符串、滑动窗口","diff":"中等","diffCls":"mid","freq":1170},{"rank":2,"title":"146. LRU缓存机制","algo":"设计、哈希表、链表、双向链表","diff":"中等","diffCls":"mid","freq":940},{"rank":3,"title":"206. 反转链表","algo":"递归、链表","diff":"简单","diffCls":"easy","freq":748},{"rank":4,"title":"215. 数组中的第K个最大元素","algo":"数组、分治、快速选择、排序、堆（优先队列）","diff":"中等","diffCls":"mid","freq":600},{"rank":5,"title":"25. K 个一组翻转链表","algo":"递归、链表","diff":"困难","diffCls":"hard","freq":524},{"rank":6,"title":"15. 三数之和","algo":"数组、双指针、排序","diff":"中等","diffCls":"mid","freq":481},{"rank":7,"title":"53. 最大子数组和","algo":"数组、分治、动态规划","diff":"中等","diffCls":"mid","freq":375},{"rank":8,"title":"补充题4. 手撕快速排序","algo":"数组、排序、分治、快速排序、随机化","diff":"中等","diffCls":"mid","freq":355},{"rank":9,"title":"5. 最长回文子串","algo":"双指针、字符串、动态规划","diff":"中等","diffCls":"mid","freq":351},{"rank":10,"title":"21. 合并两个有序链表","algo":"递归、链表","diff":"简单","diffCls":"easy","freq":332},{"rank":11,"title":"102. 二叉树的层序遍历","algo":"树、广度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":330},{"rank":12,"title":"200. 岛屿数量","algo":"深度优先搜索、广度优先搜索、并查集、数组、矩阵","diff":"中等","diffCls":"mid","freq":329},{"rank":13,"title":"33. 搜索旋转排序数组","algo":"数组、二分查找","diff":"中等","diffCls":"mid","freq":310},{"rank":14,"title":"1. 两数之和","algo":"数组、哈希表","diff":"简单","diffCls":"easy","freq":304},{"rank":15,"title":"46. 全排列","algo":"数组、回溯","diff":"中等","diffCls":"mid","freq":298},{"rank":16,"title":"20. 有效的括号","algo":"栈、字符串","diff":"简单","diffCls":"easy","freq":297},{"rank":17,"title":"88. 合并两个有序数组","algo":"数组、双指针、排序","diff":"简单","diffCls":"easy","freq":296},{"rank":18,"title":"121. 买卖股票的最佳时机","algo":"数组、动态规划","diff":"简单","diffCls":"easy","freq":279},{"rank":19,"title":"92. 反转链表 II","algo":"链表","diff":"中等","diffCls":"mid","freq":271},{"rank":20,"title":"300. 最长上升子序列","algo":"数组、二分查找、动态规划","diff":"中等","diffCls":"mid","freq":270},{"rank":21,"title":"103. 二叉树的锯齿形层次遍历","algo":"树、广度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":269},{"rank":22,"title":"236. 二叉树的最近公共祖先","algo":"树、深度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":267},{"rank":23,"title":"54. 螺旋矩阵","algo":"数组、矩阵、模拟","diff":"中等","diffCls":"mid","freq":256},{"rank":24,"title":"23. 合并K个排序链表","algo":"链表、分治、堆（优先队列）、归并排序","diff":"困难","diffCls":"hard","freq":256},{"rank":25,"title":"143. 重排链表","algo":"栈、递归、链表、双指针","diff":"中等","diffCls":"mid","freq":253},{"rank":26,"title":"141. 环形链表","algo":"哈希表、链表、双指针","diff":"简单","diffCls":"easy","freq":252},{"rank":27,"title":"56. 合并区间","algo":"数组、排序","diff":"中等","diffCls":"mid","freq":243},{"rank":28,"title":"415. 字符串相加","algo":"数学、字符串、模拟","diff":"简单","diffCls":"easy","freq":242},{"rank":29,"title":"72. 编辑距离","algo":"字符串、动态规划","diff":"困难","diffCls":"hard","freq":204},{"rank":30,"title":"160. 相交链表","algo":"哈希表、链表、双指针","diff":"简单","diffCls":"easy","freq":202},{"rank":31,"title":"42. 接雨水","algo":"栈、数组、双指针、动态规划、单调栈","diff":"困难","diffCls":"hard","freq":199},{"rank":32,"title":"1143. 最长公共子序列","algo":"字符串、动态规划","diff":"中等","diffCls":"mid","freq":197},{"rank":33,"title":"82. 删除排序链表中的重复元素 II","algo":"链表、双指针","diff":"中等","diffCls":"mid","freq":186},{"rank":34,"title":"93. 复原IP地址","algo":"字符串、回溯","diff":"中等","diffCls":"mid","freq":185},{"rank":35,"title":"19. 删除链表的倒数第N个节点","algo":"链表、双指针","diff":"中等","diffCls":"mid","freq":184},{"rank":36,"title":"124. 二叉树中的最大路径和","algo":"树、深度优先搜索、动态规划、二叉树","diff":"困难","diffCls":"hard","freq":184},{"rank":37,"title":"4. 寻找两个正序数组的中位数","algo":"数组、二分查找、分治","diff":"困难","diffCls":"hard","freq":173},{"rank":38,"title":"142. 环形链表 II","algo":"哈希表、链表、双指针","diff":"中等","diffCls":"mid","freq":170},{"rank":39,"title":"165. 比较版本号","algo":"双指针、字符串","diff":"中等","diffCls":"mid","freq":165},{"rank":40,"title":"199. 二叉树的右视图","algo":"树、深度优先搜索、广度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":161},{"rank":41,"title":"239. 滑动窗口最大值","algo":"队列、数组、滑动窗口、单调队列、堆（优先队列）","diff":"困难","diffCls":"hard","freq":153},{"rank":42,"title":"704. 二分查找","algo":"数组、二分查找","diff":"简单","diffCls":"easy","freq":152},{"rank":43,"title":"22. 括号生成","algo":"字符串、动态规划、回溯","diff":"中等","diffCls":"mid","freq":151},{"rank":44,"title":"32. 最长有效括号","algo":"栈、字符串、动态规划","diff":"困难","diffCls":"hard","freq":148},{"rank":45,"title":"69. x 的平方根","algo":"数学、二分查找","diff":"简单","diffCls":"easy","freq":147},{"rank":46,"title":"148. 排序链表","algo":"链表、双指针、分治、排序、归并排序","diff":"中等","diffCls":"mid","freq":147},{"rank":47,"title":"94. 二叉树的中序遍历","algo":"栈、树、深度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":144},{"rank":48,"title":"232. 用栈实现队列","algo":"栈、设计、队列","diff":"简单","diffCls":"easy","freq":143},{"rank":49,"title":"31. 下一个排列","algo":"数组、双指针","diff":"中等","diffCls":"mid","freq":137},{"rank":50,"title":"76. 最小覆盖子串","algo":"哈希表、字符串、滑动窗口","diff":"困难","diffCls":"hard","freq":134},{"rank":51,"title":"2. 两数相加","algo":"递归、链表、数学","diff":"中等","diffCls":"mid","freq":133},{"rank":52,"title":"8. 字符串转换整数 (atoi)","algo":"字符串","diff":"中等","diffCls":"mid","freq":132},{"rank":53,"title":"322. 零钱兑换","algo":"广度优先搜索、数组、动态规划","diff":"中等","diffCls":"mid","freq":132},{"rank":54,"title":"43. 字符串相乘","algo":"数学、字符串、模拟","diff":"中等","diffCls":"mid","freq":131},{"rank":55,"title":"70. 爬楼梯","algo":"记忆化、数学、动态规划","diff":"简单","diffCls":"easy","freq":130},{"rank":56,"title":"105. 从前序与中序遍历序列构造二叉树","algo":"树、数组、哈希表、分治、二叉树","diff":"中等","diffCls":"mid","freq":117},{"rank":57,"title":"41. 缺失的第一个正数","algo":"数组、哈希表","diff":"困难","diffCls":"hard","freq":114},{"rank":58,"title":"151. 翻转字符串里的单词","algo":"双指针、字符串","diff":"中等","diffCls":"mid","freq":106},{"rank":59,"title":"78. 子集","algo":"位运算、数组、回溯","diff":"中等","diffCls":"mid","freq":105},{"rank":60,"title":"剑指 Offer 22. 链表中倒数第k个节点","algo":"链表、双指针","diff":"简单","diffCls":"easy","freq":103},{"rank":61,"title":"34. 在排序数组中查找元素的第一个和最后一个位置","algo":"数组、二分查找","diff":"中等","diffCls":"mid","freq":103},{"rank":62,"title":"394. 字符串解码","algo":"栈、递归、字符串","diff":"中等","diffCls":"mid","freq":100},{"rank":63,"title":"129. 求根到叶子节点数字之和","algo":"树、深度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":100},{"rank":64,"title":"155. 最小栈","algo":"栈、设计","diff":"简单","diffCls":"easy","freq":99},{"rank":65,"title":"101. 对称二叉树","algo":"树、深度优先搜索、广度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":97},{"rank":66,"title":"470. 用 Rand7() 实现 Rand10()","algo":"数学、拒绝采样、概率与统计、随机化","diff":"中等","diffCls":"mid","freq":96},{"rank":67,"title":"39. 组合总和","algo":"数组、回溯","diff":"中等","diffCls":"mid","freq":96},{"rank":68,"title":"64. 最小路径和","algo":"数组、动态规划、矩阵","diff":"中等","diffCls":"mid","freq":95},{"rank":69,"title":"695. 岛屿的最大面积","algo":"深度优先搜索、广度优先搜索、并查集、数组、矩阵","diff":"中等","diffCls":"mid","freq":94},{"rank":70,"title":"128. 最长连续序列","algo":"并查集、数组、哈希表","diff":"中等","diffCls":"mid","freq":93},{"rank":71,"title":"122. 买卖股票的最佳时机 II","algo":"贪心、数组、动态规划","diff":"简单","diffCls":"easy","freq":91},{"rank":72,"title":"104. 二叉树的最大深度","algo":"树、深度优先搜索、广度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":91},{"rank":73,"title":"221. 最大正方形","algo":"数组、动态规划、矩阵","diff":"中等","diffCls":"mid","freq":88},{"rank":74,"title":"110. 平衡二叉树","algo":"树、深度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":87},{"rank":75,"title":"234. 回文链表","algo":"栈、递归、链表、双指针","diff":"简单","diffCls":"easy","freq":86},{"rank":76,"title":"240. 搜索二维矩阵 II","algo":"数组、二分查找、分治、矩阵","diff":"中等","diffCls":"mid","freq":85},{"rank":77,"title":"152. 乘积最大子数组","algo":"数组、动态规划","diff":"中等","diffCls":"mid","freq":85},{"rank":78,"title":"179. 最大数","algo":"贪心、数组、字符串、排序","diff":"中等","diffCls":"mid","freq":84},{"rank":79,"title":"662. 二叉树最大宽度","algo":"树、深度优先搜索、广度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":84},{"rank":80,"title":"14. 最长公共前缀","algo":"字典树、数组、字符串","diff":"简单","diffCls":"easy","freq":84},{"rank":81,"title":"48. 旋转图像","algo":"数组、数学、矩阵","diff":"中等","diffCls":"mid","freq":84},{"rank":82,"title":"98. 验证二叉搜索树","algo":"树、深度优先搜索、二叉搜索树、二叉树","diff":"中等","diffCls":"mid","freq":84},{"rank":83,"title":"144. 二叉树的前序遍历","algo":"栈、树、深度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":84},{"rank":84,"title":"543. 二叉树的直径","algo":"树、深度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":82},{"rank":85,"title":"162. 寻找峰值","algo":"数组、二分查找","diff":"中等","diffCls":"mid","freq":80},{"rank":86,"title":"560. 和为K的子数组","algo":"数组、哈希表、前缀和","diff":"中等","diffCls":"mid","freq":79},{"rank":87,"title":"113. 路径总和 II","algo":"树、深度优先搜索、回溯、二叉树","diff":"中等","diffCls":"mid","freq":78},{"rank":88,"title":"62. 不同路径","algo":"数学、动态规划、组合数学","diff":"中等","diffCls":"mid","freq":78},{"rank":89,"title":"198. 打家劫舍","algo":"数组、动态规划","diff":"中等","diffCls":"mid","freq":75},{"rank":90,"title":"209. 长度最小的子数组","algo":"数组、二分查找、前缀和、滑动窗口","diff":"中等","diffCls":"mid","freq":74},{"rank":91,"title":"24. 两两交换链表中的节点","algo":"递归、链表","diff":"中等","diffCls":"mid","freq":73},{"rank":92,"title":"112. 路径总和","algo":"树、深度优先搜索、广度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":72},{"rank":93,"title":"83. 删除排序链表中的重复元素","algo":"链表","diff":"简单","diffCls":"easy","freq":69},{"rank":94,"title":"139. 单词拆分","algo":"字典树、记忆化、数组、哈希表、字符串、动态规划","diff":"中等","diffCls":"mid","freq":69},{"rank":95,"title":"227. 基本计算器 II","algo":"栈、数学、字符串","diff":"中等","diffCls":"mid","freq":69},{"rank":96,"title":"718. 最长重复子数组","algo":"数组、二分查找、动态规划、滑动窗口、哈希函数、滚动哈希","diff":"中等","diffCls":"mid","freq":68},{"rank":97,"title":"226. 翻转二叉树","algo":"树、深度优先搜索、广度优先搜索、二叉树","diff":"简单","diffCls":"easy","freq":68},{"rank":98,"title":"169. 多数元素","algo":"数组、哈希表、分治、计数、排序","diff":"简单","diffCls":"easy","freq":68},{"rank":99,"title":"207. 课程表","algo":"深度优先搜索、广度优先搜索、图、拓扑排序","diff":"中等","diffCls":"mid","freq":67},{"rank":100,"title":"283. 移动零","algo":"数组、双指针","diff":"简单","diffCls":"easy","freq":67},{"rank":101,"title":"739. 每日温度","algo":"栈、数组、单调栈","diff":"中等","diffCls":"mid","freq":63},{"rank":102,"title":"补充题6. 手撕堆排序","algo":"数组、排序、堆（优先队列）、堆排序","diff":"中等","diffCls":"mid","freq":63},{"rank":103,"title":"79. 单词搜索","algo":"深度优先搜索、数组、字符串、回溯、矩阵","diff":"中等","diffCls":"mid","freq":61},{"rank":104,"title":"468. 验证IP地址","algo":"字符串","diff":"中等","diffCls":"mid","freq":61},{"rank":105,"title":"297. 二叉树的序列化与反序列化","algo":"树、深度优先搜索、广度优先搜索、设计、字符串、二叉树","diff":"困难","diffCls":"hard","freq":59},{"rank":106,"title":"460. LFU缓存","algo":"设计、哈希表、链表、双向链表","diff":"困难","diffCls":"hard","freq":58},{"rank":107,"title":"153. 寻找旋转排序数组中的最小值","algo":"数组、二分查找","diff":"中等","diffCls":"mid","freq":58},{"rank":108,"title":"138. 复制带随机指针的链表","algo":"哈希表、链表","diff":"中等","diffCls":"mid","freq":58},{"rank":109,"title":"11. 盛最多水的容器","algo":"贪心、数组、双指针","diff":"中等","diffCls":"mid","freq":57},{"rank":110,"title":"47. 全排列 II","algo":"数组、回溯、排序","diff":"中等","diffCls":"mid","freq":57},{"rank":111,"title":"224. 基本计算器","algo":"栈、递归、数学、字符串","diff":"困难","diffCls":"hard","freq":57},{"rank":112,"title":"55. 跳跃游戏","algo":"贪心、数组、动态规划","diff":"中等","diffCls":"mid","freq":56},{"rank":113,"title":"16. 最接近的三数之和","algo":"数组、双指针、排序","diff":"中等","diffCls":"mid","freq":55},{"rank":114,"title":"40. 组合总和 II","algo":"数组、回溯","diff":"中等","diffCls":"mid","freq":55},{"rank":115,"title":"123. 买卖股票的最佳时机 III","algo":"数组、动态规划","diff":"困难","diffCls":"hard","freq":54},{"rank":116,"title":"402. 移掉K位数字","algo":"栈、贪心、字符串、单调栈","diff":"中等","diffCls":"mid","freq":54},{"rank":117,"title":"136. 只出现一次的数字","algo":"位运算、数组","diff":"简单","diffCls":"easy","freq":53},{"rank":118,"title":"剑指 Offer 51. 数组中的逆序对","algo":"数组、分治、归并排序","diff":"困难","diffCls":"hard","freq":52},{"rank":119,"title":"61. 旋转链表","algo":"链表、双指针","diff":"中等","diffCls":"mid","freq":51},{"rank":120,"title":"剑指 Offer 26. 树的子结构","algo":"树、二叉树、深度优先搜索、递归","diff":"中等","diffCls":"mid","freq":50},{"rank":121,"title":"补充题5. 手撕归并排序","algo":"数组、排序、分治、归并排序","diff":"中等","diffCls":"mid","freq":50},{"rank":122,"title":"75. 颜色分类","algo":"数组、双指针、排序","diff":"中等","diffCls":"mid","freq":49},{"rank":123,"title":"329. 矩阵中的最长递增路径","algo":"深度优先搜索、广度优先搜索、图、拓扑排序、记忆化、数组、动态规划、矩阵","diff":"困难","diffCls":"hard","freq":48},{"rank":124,"title":"442. 数组中重复的数据","algo":"数组、哈希表、排序","diff":"中等","diffCls":"mid","freq":48},{"rank":125,"title":"518. 零钱兑换 II","algo":"数组、动态规划","diff":"中等","diffCls":"mid","freq":48},{"rank":126,"title":"498. 对角线遍历","algo":"数组、矩阵、模拟","diff":"中等","diffCls":"mid","freq":48},{"rank":127,"title":"114. 二叉树展开为链表","algo":"栈、树、深度优先搜索、链表、二叉树","diff":"中等","diffCls":"mid","freq":47},{"rank":128,"title":"26. 删除排序数组中的重复项","algo":"数组、双指针","diff":"简单","diffCls":"easy","freq":47},{"rank":129,"title":"剑指 Offer 36. 二叉搜索树与双向链表","algo":"树、二叉搜索树、链表、深度优先搜索","diff":"中等","diffCls":"mid","freq":47},{"rank":130,"title":"958. 二叉树的完全性检验","algo":"树、广度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":47},{"rank":131,"title":"剑指 Offer 09. 用两个栈实现队列","algo":"栈、队列、设计","diff":"简单","diffCls":"easy","freq":47},{"rank":132,"title":"补充题23. 检测循环依赖","algo":"图、拓扑排序、广度优先搜索","diff":"中等","diffCls":"mid","freq":46},{"rank":133,"title":"74. 搜索二维矩阵","algo":"数组、二分查找、矩阵","diff":"中等","diffCls":"mid","freq":46},{"rank":134,"title":"补充题1. 排序奇升偶降链表","algo":"链表、双指针、归并排序","diff":"中等","diffCls":"mid","freq":46},{"rank":135,"title":"7. 整数反转","algo":"数学","diff":"简单","diffCls":"easy","freq":45},{"rank":136,"title":"347. 前 K 个高频元素","algo":"数组、哈希表、分治、桶排序、计数、快速选择、排序、堆（优先队列）","diff":"中等","diffCls":"mid","freq":44},{"rank":137,"title":"135. 分发糖果","algo":"贪心、数组","diff":"困难","diffCls":"hard","freq":44},{"rank":138,"title":"125. 验证回文串","algo":"双指针、字符串","diff":"简单","diffCls":"easy","freq":43},{"rank":139,"title":"50. Pow(x, n)","algo":"递归、数学","diff":"中等","diffCls":"mid","freq":43},{"rank":140,"title":"208. 实现 Trie (前缀树)","algo":"设计、字典树、哈希表、字符串","diff":"中等","diffCls":"mid","freq":42},{"rank":141,"title":"572. 另一个树的子树","algo":"树、深度优先搜索、二叉树、字符串匹配、哈希函数","diff":"简单","diffCls":"easy","freq":42},{"rank":142,"title":"145. 二叉树的后序遍历","algo":"栈、树、深度优先搜索、二叉树","diff":"中等","diffCls":"mid","freq":42},{"rank":143,"title":"91. 解码方法","algo":"字符串、动态规划","diff":"中等","diffCls":"mid","freq":42},{"rank":144,"title":"213. 打家劫舍 II","algo":"数组、动态规划","diff":"中等","diffCls":"mid","freq":41},{"rank":145,"title":"59. 螺旋矩阵 II","algo":"数组、矩阵、模拟","diff":"中等","diffCls":"mid","freq":41},{"rank":146,"title":"10. 正则表达式匹配","algo":"递归、字符串、动态规划","diff":"困难","diffCls":"hard","freq":40},{"rank":147,"title":"剑指 Offer 40. 最小的k个数","algo":"数组、堆（优先队列）、快速选择","diff":"简单","diffCls":"easy","freq":40},{"rank":148,"title":"440. 字典序的第K小数字","algo":"字典树","diff":"困难","diffCls":"hard","freq":40},{"rank":149,"title":"445. 两数相加 II","algo":"栈、链表、数学","diff":"中等","diffCls":"mid","freq":39},{"rank":150,"title":"450. 删除二叉搜索树中的节点","algo":"树、二叉搜索树、二叉树","diff":"中等","diffCls":"mid","freq":39},{"rank":151,"title":"剑指 Offer 54. 二叉搜索树的第k大节点","algo":"树、二叉搜索树、深度优先搜索、递归","diff":"简单","diffCls":"easy","freq":39},{"rank":152,"title":"剑指 Offer 42. 连续子数组的最大和","algo":"数组、动态规划、贪心","diff":"简单","diffCls":"easy","freq":38},{"rank":153,"title":"45. 跳跃游戏 II","algo":"贪心、数组、动态规划","diff":"中等","diffCls":"mid","freq":38},{"rank":154,"title":"287. 寻找重复数","algo":"位运算、数组、双指针、二分查找","diff":"中等","diffCls":"mid","freq":37},{"rank":155,"title":"剑指 Offer 10- I. 斐波那契数列","algo":"动态规划、数学","diff":"简单","diffCls":"easy","freq":37},{"rank":156,"title":"516. 最长回文子序列","algo":"字符串、动态规划","diff":"中等","diffCls":"mid","freq":37},{"rank":157,"title":"剑指 Offer 10- II. 青蛙跳台阶问题","algo":"动态规划、数学","diff":"简单","diffCls":"easy","freq":37},{"rank":158,"title":"295. 数据流的中位数","algo":"设计、双指针、数据流、排序、堆（优先队列）","diff":"困难","diffCls":"hard","freq":36},{"rank":159,"title":"225. 用队列实现栈","algo":"栈、设计、队列","diff":"简单","diffCls":"easy","freq":36},{"rank":160,"title":"120. 三角形最小路径和","algo":"数组、动态规划","diff":"中等","diffCls":"mid","freq":35},{"rank":161,"title":"328. 奇偶链表","algo":"链表","diff":"中等","diffCls":"mid","freq":35},{"rank":162,"title":"678. 有效的括号字符串","algo":"栈、贪心、字符串、动态规划","diff":"中等","diffCls":"mid","freq":35},{"rank":163,"title":"补充题2. 圆环回原点问题","algo":"动态规划、数组、滚动数组","diff":"中等","diffCls":"mid","freq":35},{"rank":164,"title":"剑指 Offer 04. 二维数组中的查找","algo":"数组、矩阵、二分查找","diff":"简单","diffCls":"easy","freq":35},{"rank":165,"title":"189. 轮转数组","algo":"数组、数学、双指针","diff":"中等","diffCls":"mid","freq":34},{"rank":166,"title":"106. 从中序与后序遍历序列构造二叉树","algo":"树、数组、哈希表、分治、二叉树","diff":"中等","diffCls":"mid","freq":34},{"rank":167,"title":"210. 课程表 II","algo":"深度优先搜索、广度优先搜索、图、拓扑排序","diff":"中等","diffCls":"mid","freq":33},{"rank":168,"title":"9. 回文数","algo":"数学","diff":"简单","diffCls":"easy","freq":33},{"rank":169,"title":"230. 二叉搜索树中第K小的元素","algo":"树、深度优先搜索、二叉搜索树、二叉树","diff":"中等","diffCls":"mid","freq":33},{"rank":170,"title":"97. 交错字符串","algo":"字符串、动态规划","diff":"中等","diffCls":"mid","freq":32},{"rank":171,"title":"96. 不同的二叉搜索树","algo":"树、二叉搜索树、数学、动态规划、二叉树","diff":"中等","diffCls":"mid","freq":32},{"rank":172,"title":"384. 打乱数组","algo":"设计、数组、数学、随机化","diff":"中等","diffCls":"mid","freq":32},{"rank":173,"title":"剑指 Offer 62. 圆圈中最后剩下的数字","algo":"数学、递归","diff":"简单","diffCls":"easy","freq":32},{"rank":174,"title":"416. 分割等和子集","algo":"数组、动态规划","diff":"中等","diffCls":"mid","freq":31},{"rank":175,"title":"44. 通配符匹配","algo":"贪心、递归、字符串、动态规划","diff":"困难","diffCls":"hard","freq":31},{"rank":176,"title":"611. 有效三角形的个数","algo":"贪心、数组、双指针、二分查找、排序","diff":"中等","diffCls":"mid","freq":30},{"rank":177,"title":"887. 鸡蛋掉落","algo":"数学、二分查找、动态规划","diff":"困难","diffCls":"hard","freq":30},{"rank":178,"title":"85. 最大矩形","algo":"栈、数组、动态规划、矩阵、单调栈","diff":"困难","diffCls":"hard","freq":30},{"rank":179,"title":"剑指 Offer 21. 调整数组顺序使奇数位于偶数前面","algo":"数组、双指针、排序","diff":"简单","diffCls":"easy","freq":30},{"rank":180,"title":"400. 第N个数字","algo":"数学、二分查找","diff":"中等","diffCls":"mid","freq":29},{"rank":181,"title":"679. 24 点游戏","algo":"数组、数学、回溯","diff":"困难","diffCls":"hard","freq":29},{"rank":182,"title":"63. 不同路径 II","algo":"数组、动态规划、矩阵","diff":"中等","diffCls":"mid","freq":28},{"rank":183,"title":"1004. 最大连续1的个数 III","algo":"数组、二分查找、前缀和、滑动窗口","diff":"中等","diffCls":"mid","freq":28},{"rank":184,"title":"673. 最长递增子序列的个数","algo":"树状数组、线段树、数组、动态规划","diff":"中等","diffCls":"mid","freq":28},{"rank":185,"title":"253. 会议室 II","algo":"贪心、数组、双指针、前缀和、排序、堆（优先队列）","diff":"中等","diffCls":"mid","freq":27},{"rank":186,"title":"134. 加油站","algo":"贪心、数组","diff":"中等","diffCls":"mid","freq":27},{"rank":187,"title":"395. 至少有K个重复字符的最长子串","algo":"哈希表、字符串、分治、滑动窗口","diff":"中等","diffCls":"mid","freq":27},{"rank":188,"title":"316. 去除重复字母","algo":"栈、贪心、字符串、单调栈","diff":"中等","diffCls":"mid","freq":26},{"rank":189,"title":"51. N皇后","algo":"数组、回溯","diff":"困难","diffCls":"hard","freq":26},{"rank":190,"title":"84. 柱状图中最大的矩形","algo":"栈、数组、单调栈","diff":"困难","diffCls":"hard","freq":26},{"rank":191,"title":"692. 前K个高频单词","algo":"字典树、数组、哈希表、字符串、桶排序、计数、排序、堆（优先队列）","diff":"中等","diffCls":"mid","freq":25},{"rank":192,"title":"264. 丑数 II","algo":"哈希表、数学、动态规划、堆（优先队列）","diff":"中等","diffCls":"mid","freq":25},{"rank":193,"title":"补充题9. 36进制加法","algo":"字符串、数学、模拟","diff":"中等","diffCls":"mid","freq":25},{"rank":194,"title":"剑指 Offer 29. 顺时针打印矩阵","algo":"数组、矩阵、模拟","diff":"简单","diffCls":"easy","freq":25},{"rank":195,"title":"剑指 Offer 27. 二叉树的镜像","algo":"树、二叉树、深度优先搜索、递归","diff":"简单","diffCls":"easy","freq":25},{"rank":196,"title":"494. 目标和","algo":"数组、动态规划、回溯","diff":"中等","diffCls":"mid","freq":24},{"rank":197,"title":"12. 整数转罗马数字","algo":"哈希表、数学、字符串","diff":"中等","diffCls":"mid","freq":24},{"rank":198,"title":"17. 电话号码的字母组合","algo":"哈希表、字符串、回溯","diff":"中等","diffCls":"mid","freq":24},{"rank":199,"title":"647. 回文子串","algo":"双指针、字符串、动态规划","diff":"中等","diffCls":"mid","freq":24},{"rank":200,"title":"279. 完全平方数","algo":"广度优先搜索、数学、动态规划","diff":"中等","diffCls":"mid","freq":24}];

const sidebarEl = document.getElementById('sidebar');
const contentEl = document.getElementById('content');
const searchEl = document.getElementById('search');
const countEl = document.getElementById('count');
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = 'codetop-theme';

function hasStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'dark' || value === 'light';
  } catch (e) {
    return false;
  }
}

function applyTheme(theme, persist) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? '切换到亮色模式' : '切换到暗色模式');
  themeToggle.setAttribute('title', dark ? '切换到亮色模式' : '切换到暗色模式');
  themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  if (persist) {
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (e) {}
  }
}

applyTheme(document.documentElement.dataset.theme, false);
themeToggle.addEventListener('click', function () {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true);
});
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!hasStoredTheme()) applyTheme(e.matches ? 'dark' : 'light', false);
  });
}

let current = null;          // 当前打开的 id（'overview' 或 'q-<rank>'）
let activeIndex = -1;        // 键盘导航的当前项

/* ---------- 侧边栏渲染 ---------- */
function renderList(filter) {
  const q = (filter || '').trim().toLowerCase();
  sidebarEl.innerHTML = '';
  const items = [];
  // 总览项
  const ovItem = { key: 'overview', badge: '🏠', label: '总览 · 算法统计', diffCls: '', matches: !q || '总览'.includes(q) };
  items.push(ovItem);
  // 题目项
  for (const it of ITEMS) {
    const hay = (String(it.rank) + ' ' + it.title + ' ' + it.algo).toLowerCase();
    const matches = !q || hay.includes(q);
    items.push({ key: 'q-' + it.rank, badge: it.rank, label: it.title, diffCls: it.diffCls, matches });
  }
  let visible = 0;
  for (const it of items) {
    if (!it.matches) continue;
    visible++;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'item' + (it.key === 'overview' ? ' overview-item' : '');
    btn.dataset.key = it.key;
    const badgeCls = it.key === 'overview' ? 'rank-badge' : 'rank-badge';
    btn.innerHTML = '<span class="rank-badge">' + it.badge + '</span>'
      + '<span class="label"></span>'
      + (it.diffCls ? '<span class="diff-dot ' + it.diffCls + '"></span>' : '');
    btn.querySelector('.label').textContent = it.label;
    btn.addEventListener('click', () => select(it.key));
    sidebarEl.appendChild(btn);
  }
  if (visible === 0) {
    const d = document.createElement('div');
    d.className = 'empty';
    d.textContent = '未找到匹配题目';
    sidebarEl.appendChild(d);
  }
  countEl.textContent = (q ? visible - (ovItem.matches ? 1 : 0) : ITEMS.length) + ' / ' + ITEMS.length + ' 题';
  updateActive();
}

/* ---------- 题目 / 题解 左右分栏 ---------- */
const SPLIT_KEY = 'codetop-split-ratio';
const SPLIT_MIN = 22, SPLIT_MAX = 78;

function loadSplitRatio() {
  let v = NaN;
  try { v = parseFloat(localStorage.getItem(SPLIT_KEY)); } catch (e) {}
  if (!isFinite(v)) return 50;
  return Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, v));
}
let splitRatio = loadSplitRatio();

function saveSplitRatio(v) {
  splitRatio = v;
  try { localStorage.setItem(SPLIT_KEY, String(Math.round(v * 10) / 10)); } catch (e) {}
}

/* 把 desc 放左栏，solution + code 放右栏，中间插入可拖动分隔条 */
function buildSplit(panel) {
  const desc = panel.querySelector('.q-block.desc');
  const solution = panel.querySelector('.q-block.solution');
  if (!desc || !solution) return null;
  const code = panel.querySelector('.q-block.code');

  const head = panel.querySelector('.panel-head');
  const toolbar = panel.querySelector('.q-toolbar');
  if (head && toolbar) head.appendChild(toolbar);

  const split = document.createElement('div');
  split.className = 'split-view';
  split.style.setProperty('--split', splitRatio);

  const left = document.createElement('section');
  left.className = 'split-pane problem-pane';
  left.setAttribute('aria-label', '题目');

  const right = document.createElement('section');
  right.className = 'split-pane solution-pane';
  right.setAttribute('aria-label', '题解与代码');

  const resizer = document.createElement('div');
  resizer.className = 'split-resizer';
  resizer.setAttribute('role', 'separator');
  resizer.setAttribute('aria-orientation', 'vertical');
  resizer.setAttribute('aria-label', '拖动调整题目与题解宽度');
  resizer.setAttribute('aria-valuemin', String(SPLIT_MIN));
  resizer.setAttribute('aria-valuemax', String(SPLIT_MAX));
  resizer.setAttribute('aria-valuenow', String(Math.round(splitRatio)));
  resizer.tabIndex = 0;

  panel.insertBefore(split, desc);
  left.appendChild(desc);
  right.appendChild(solution);
  if (code) right.appendChild(code);
  split.append(left, resizer, right);
  panel.classList.add('split-panel');

  attachSplitDrag(split, resizer);
  return split;
}

function attachSplitDrag(split, resizer) {
  function apply(pct) {
    const v = Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, pct));
    split.style.setProperty('--split', v);
    resizer.setAttribute('aria-valuenow', String(Math.round(v)));
    return v;
  }
  let dragId = null;

  resizer.addEventListener('pointerdown', function (e) {
    dragId = e.pointerId;
    resizer.setPointerCapture(dragId);
    resizer.classList.add('dragging');
    split.classList.add('resizing');
    e.preventDefault();
  });

  resizer.addEventListener('pointermove', function (e) {
    if (dragId === null) return;
    const box = split.getBoundingClientRect();
    if (box.width <= 0) return;
    saveSplitRatio(apply(((e.clientX - box.left) / box.width) * 100));
  });

  function end() {
    if (dragId === null) return;
    try { resizer.releasePointerCapture(dragId); } catch (e) {}
    dragId = null;
    resizer.classList.remove('dragging');
    split.classList.remove('resizing');
  }
  resizer.addEventListener('pointerup', end);
  resizer.addEventListener('pointercancel', end);

  // 键盘：左右箭头微调，Home/End 到两端，双击复位 50/50
  resizer.addEventListener('keydown', function (e) {
    const step = e.shiftKey ? 10 : 2;
    let v = null;
    if (e.key === 'ArrowLeft') v = splitRatio - step;
    else if (e.key === 'ArrowRight') v = splitRatio + step;
    else if (e.key === 'Home') v = SPLIT_MIN;
    else if (e.key === 'End') v = SPLIT_MAX;
    else if (e.key === 'Enter' || e.key === ' ') v = 50;
    if (v === null) return;
    e.preventDefault();
    saveSplitRatio(apply(v));
  });
  resizer.addEventListener('dblclick', function () { saveSplitRatio(apply(50)); });
}

/* ---------- 选择与渲染 ---------- */
function select(key) {
  current = key;
  const tpl = document.getElementById('panel-' + key);
  if (!tpl) return;
  const frag = tpl.content.cloneNode(true);
  const wrap = document.createElement('div');
  wrap.className = 'panel';
  wrap.appendChild(frag);
  contentEl.replaceChildren(wrap);
  contentEl.classList.toggle('split-mode', !!buildSplit(wrap));
  typeset(contentEl);
  highlight(contentEl);
  attachToolbar();
  contentEl.scrollTop = 0;
  history.replaceState(null, '', '#' + key);
  updateActive();
}

function updateActive() {
  for (const btn of sidebarEl.querySelectorAll('.item')) {
    btn.classList.toggle('active', btn.dataset.key === current);
  }
  // 保证当前项在视野内
  const act = sidebarEl.querySelector('.item.active');
  if (act) act.scrollIntoView({ block: 'nearest' });
}

/* ---------- MathJax / highlight.js ---------- */
function typeset(el) {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([el]).catch(function(){});
  }
}
function highlight(el) {
  if (window.hljs) {
    el.querySelectorAll('pre code').forEach(function(c){ hljs.highlightElement(c); });
  }
}

/* ---------- 收起 / 展开 题解、代码 ---------- */
function attachToolbar() {
  const btns = contentEl.querySelectorAll('.tb-btn');
  btns.forEach(function(b){
    const t = b.dataset.toggle;            // solution | code
    const cls = t === 'solution' ? 'hide-solution' : 'hide-code';
    const hidden = contentEl.classList.contains(cls);
    b.classList.toggle('on', hidden);
    b.textContent = hidden ? ('🙈 显示' + (t === 'solution' ? '题解' : '代码')) : ('🙈 收起' + (t === 'solution' ? '题解' : '代码'));
    b.addEventListener('click', function(){
      const now = contentEl.classList.toggle(cls);
      b.classList.toggle('on', now);
      b.textContent = now ? ('🙈 显示' + (t === 'solution' ? '题解' : '代码')) : ('🙈 收起' + (t === 'solution' ? '题解' : '代码'));
    });
  });
}

/* ---------- 搜索 ---------- */
let listKeys = [];
function refreshKeys() {
  listKeys = [];
  listKeys.push('overview');
  for (const it of ITEMS) listKeys.push('q-' + it.rank);
}
searchEl.addEventListener('input', function(){ renderList(this.value); refreshKeys(); });
searchEl.addEventListener('keydown', function(e){
  if (e.key === 'Enter') {
    const vis = sidebarEl.querySelectorAll('.item');
    const act = sidebarEl.querySelector('.item.active');
    const arr = Array.prototype.slice.call(vis);
    let idx = act ? arr.indexOf(act) : -1;
    if (idx < 0) idx = 0;
    if (vis[idx]) select(vis[idx].dataset.key);
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const vis = Array.prototype.slice.call(sidebarEl.querySelectorAll('.item'));
    if (!vis.length) return;
    let idx = vis.findIndex(function(b){ return b.classList.contains('active'); });
    idx = e.key === 'ArrowDown' ? Math.min(idx + 1, vis.length - 1) : Math.max(idx - 1, 0);
    vis[idx].classList.add('active');
    vis.forEach(function(b, i){ if (i !== idx) b.classList.remove('active'); });
    vis[idx].scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Escape') {
    this.blur();
  }
});

/* ---------- 全局快捷键 ---------- */
document.addEventListener('keydown', function(e){
  if (e.key === '/' && document.activeElement !== searchEl) {
    e.preventDefault();
    searchEl.focus();
    searchEl.select();
  } else if (e.key === 'ArrowLeft') {
    // 左箭头到上一题
    if (current && current !== 'overview') {
      const r = parseInt(current.slice(2), 10);
      if (r > 1) { e.preventDefault(); select('q-' + (r - 1)); }
    }
  } else if (e.key === 'ArrowRight') {
    if (current && current !== 'overview') {
      const r = parseInt(current.slice(2), 10);
      if (r < ITEMS.length) { e.preventDefault(); select('q-' + (r + 1)); }
    }
  }
});

/* ---------- 初始化 ---------- */
function resolveTarget() {
  const t = location.hash.replace('#', '');
  return (t === 'overview' || /^q-\d+$/.test(t)) ? t : 'overview';
}
function init() {
  refreshKeys();
  renderList('');
  select(resolveTarget());
  // MathJax 加载完成后补一次当前面板排版（保险）
  if (window.MathJax && MathJax.startup) {
    MathJax.startup.promise.then(function(){
      if (current && contentEl.querySelector('.arithmatex')) MathJax.typesetPromise([contentEl]).catch(function(){});
    });
  }
}
// 支持前进/后退及手动修改 hash 时切换题目
window.addEventListener('hashchange', function(){
  select(resolveTarget());
});
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
