// Curated list of DSA problems organized by topic
const dsaData = [
    {
        topic: "Arrays",
        problems: [
            { id: "arr1", name: "Two Sum", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/two-sum/" },
            { id: "arr2", name: "Best Time to Buy and Sell Stock", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
            { id: "arr3", name: "Contains Duplicate", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/contains-duplicate/" },
            { id: "arr4", name: "Product of Array Except Self", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/product-of-array-except-self/" },
            { id: "arr5", name: "Maximum Subarray", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/maximum-subarray/" },
            { id: "arr6", name: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" }
        ]
    },
    {
        topic: "Strings",
        problems: [
            { id: "str1", name: "Valid Anagram", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-anagram/" },
            { id: "str2", name: "Valid Palindrome", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-palindrome/" },
            { id: "str3", name: "Longest Substring Without Repeating Characters", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
            { id: "str4", name: "Longest Repeating Character Replacement", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
            { id: "str5", name: "Group Anagrams", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/group-anagrams/" }
        ]
    },
    {
        topic: "Sliding Window",
        problems: [
            { id: "sw1", name: "Maximum Average Subarray I", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/maximum-average-subarray-i/" },
            { id: "sw2", name: "Longest Substring Without Repeating Characters", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
            { id: "sw3", name: "Minimum Window Substring", difficulty: "Hard", platform: "LeetCode", link: "https://leetcode.com/problems/minimum-window-substring/" }
        ]
    },
    {
        topic: "Two Pointers",
        problems: [
            { id: "tp1", name: "Valid Palindrome", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-palindrome/" },
            { id: "tp2", name: "3Sum", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/3sum/" },
            { id: "tp3", name: "Container With Most Water", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/container-with-most-water/" }
        ]
    },
    {
        topic: "Stack",
        problems: [
            { id: "stk1", name: "Valid Parentheses", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/valid-parentheses/" },
            { id: "stk2", name: "Min Stack", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/min-stack/" },
            { id: "stk3", name: "Evaluate Reverse Polish Notation", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
            { id: "stk4", name: "Daily Temperatures", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/daily-temperatures/" }
        ]
    },
    {
        topic: "Linked List",
        problems: [
            { id: "ll1", name: "Reverse Linked List", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/reverse-linked-list/" },
            { id: "ll2", name: "Merge Two Sorted Lists", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
            { id: "ll3", name: "Linked List Cycle", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/linked-list-cycle/" },
            { id: "ll4", name: "Remove Nth Node From End of List", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" }
        ]
    },
    {
        topic: "Trees",
        problems: [
            { id: "tr1", name: "Maximum Depth of Binary Tree", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
            { id: "tr2", name: "Same Tree", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/same-tree/" },
            { id: "tr3", name: "Invert Binary Tree", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/invert-binary-tree/" },
            { id: "tr4", name: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
            { id: "tr5", name: "Binary Tree Level Order Traversal", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" }
        ]
    },
    {
        topic: "Graphs",
        problems: [
            { id: "gr1", name: "Number of Islands", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/number-of-islands/" },
            { id: "gr2", name: "Clone Graph", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/clone-graph/" },
            { id: "gr3", name: "Pacific Atlantic Water Flow", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
            { id: "gr4", name: "Course Schedule", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/course-schedule/" }
        ]
    },
    {
        topic: "Dynamic Programming",
        problems: [
            { id: "dp1", name: "Climbing Stairs", difficulty: "Easy", platform: "LeetCode", link: "https://leetcode.com/problems/climbing-stairs/" },
            { id: "dp2", name: "Coin Change", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/coin-change/" },
            { id: "dp3", name: "Longest Increasing Subsequence", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
            { id: "dp4", name: "Word Break", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/word-break/" },
            { id: "dp5", name: "Decode Ways", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/decode-ways/" }
        ]
    },
    {
        topic: "Greedy",
        problems: [
            { id: "gd1", name: "Jump Game", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/jump-game/" },
            { id: "gd2", name: "Gas Station", difficulty: "Medium", platform: "LeetCode", link: "https://leetcode.com/problems/gas-station/" }
        ]
    }
];

// Calculate total problems for metrics
const totalProblemsCount = dsaData.reduce((acc, curr) => acc + curr.problems.length, 0);


