## 数组

### 二分法

场景：

题目要求时间复杂度要求O(logn)可以考虑二分法，当数据为有序数组时考虑二分法(特别是在有序数组中找特定值)，查找数据数组的中特定元素考虑二分法，

#### 模版

```javascript

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
 var search = function(nums, target) {
   //设置获取边界left，right
    let left = 0,right = nums.length-1;
   //	结束终止条件，重点区分left <= right,还是left <right
    while(left<=right){
      //中点获取策略
        let mid = Math.floor((right-left)/2+left);
      //以下为判断逻辑，根据实际情况变化。
        if(nums[mid] == target ){
            return mid;
        }else if(nums[mid]<target){
            left  = mid+1 ;
            right = right;
            
        }else if(nums[mid]>target){
            left = left;
            right = mid-1;
        }
    }
    return -1;
};

```



例题：

- [力扣二分题目集合](https://leetcode.cn/tag/binary-search/problemset/)



### 双指针法

场景：

双指针法（快慢指针法，左右指针）在数组和链表的操作中很常见，对于要求原地修改的可以往双指针的方向思考🤔。



例题：

- [力扣双指针题目集合](https://leetcode.cn/tag/two-pointers/problemset/)





### 滑动窗口



滑动窗口和双指针很像，也可以理解为双指针解法的一种(左右指针法)，两个指针之间形成的区域可以理解为窗口，指针移动，窗口大小位置发生改变。

例题：

- [力扣滑动窗口题目集合](https://leetcode.cn/tag/sliding-window/problemset/)



# 链表









# 前缀和





















# 广度优先搜索











# 链表

```js
/**
* 链表节点定义
*function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
 }
//删除节点 虚拟头节点（新节点next指向头节点,备份记录新节点，）
var removeElements = function(head, val) {
    if(!head){
        return head;
    }
    const ret = new ListNode(0, head);
    let temp = ret;
    while(temp.next){
        if(temp.next.val===val){
           // 删除节点
            temp.next = temp.next.next;
        }else{
            temp = temp.next;
        }
    }
    return ret.next;
};

//反转链表
//cur指针，指向头结点，再定义一个pre指针，初始化为nul 
//保存cur.next临时值temp,cur.next指向pre,将保存的temp值复制给cur,cur指向null结束，pre为新的头节点
var reverseList = function(head) {
        let cur = head,pre = null;
        while(cur){
            let temp = cur.next;
          //保存cur.next
            cur.next = pre;
          //指针方向倒转
            pre = cur;
          //pre指针前进一步
            cur = temp;
          //cur指针前进一步，即指向保留值
        }
        return pre;
};

//删除倒数第n个节点；
var removeNthFromEnd = function(head, n) {
    let ret = new ListNode(0, head),
        slow = fast = ret;
    while(n--) fast = fast.next;
    while (fast.next !== null) {
        fast = fast.next; 
        slow = slow.next
    };
    slow.next = slow.next.next;
    return ret.next;
};

```



虚拟头节点，双指针法





