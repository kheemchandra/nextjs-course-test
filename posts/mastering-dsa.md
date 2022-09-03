---
title: Mastering Data Structures & Algorithms
excerpt: A data structure is not only used for organizing the data. It is also used for processing, retrieving, and storing data. There are different basic and advanced types of data structures that are used in almost every program or software system that has been developed. So we must have good knowledge about data structures. 
image: mastering-dsa.png
isFeatured: true
date: '2022-12-30'
---


Today I want to introduce you some very very useful data structures.

In this lecture, we are trying to improve your data structures skills, stay with us and click on **read more**. Important data structures :

Trees
-----

Trees are one of the most useful data structures.A tree is a connected-acyclic graph.There are too many types of trees, like : rooted trees, weighted trees, directed trees, tries, etc.

Partial sum
-----------

There are two types of problems solvable by partial sum.

1.Problems which you are asked to answer some queries about the sum of a part of elements (without modify queries).

Solution of all of this problems are the same. You just need to know how to solve one of them.

Example : You are asked some queries on an array _a_1, _a_2, ..._a_, _n_. Each query give you numbers _l_ and _r_ and you should print _a__l_ + _a__l_ + 1 + ... + _a__r_ .

Solution : You need to build another array _s_1, _s_2, ..., _s__n_ which _s__i_ = _a_1 + _a_2 + ... + _a__i_ and answer is _s__r_ - _s__l_ - 1 .

2.Problems which you are asked to perform some queries asking you to modify a part of elements (without printing queries.)

Solution of all of this problems are the same. You just need to know how to solve one of them.

Example : You need to perform some queries on an array _a_1, _a_2, ..._a_, _n_. Each query give you numbers _l_, _r_ and _v_ and for each _i_ such that _l_ ≤ _i_ ≤ _r_ you should increase _a__i_ by _v_, and then after performing all queries, you should print the whole array.

Solution : You should have another array _p_1, _p_2, ..., _p__n_ which, all of its members are initially 0, for each query, you should increase _p__l_ by _v_ and decrease _p__r_ + 1 by _v_ .

An then, for each _i_, starting from 1 you should increase _p__i_ by _p__i_ - 1. So, final array would be _a_1 + _p_1, _a_2 + _p_2, ..., _a__n_ + _p__n_ .

Hard problem of partial sum : [Troynacci Query](https://codeforces.com/gym/100571/problem/B)

Disjoint sets
-------------

Disjoint sets are also useful data structures. Using them is fast and easy. We use theme in many algorithms, like Kruskal's and Prim's.

Disjoint sets, or DSU (Disjoint Sets Union) as their name, are sum sets. Imagine we have some boxes and some tools and initially each tool is in one box. Mostly, we are given some queries and ask to merge two boxes or print the members of a box or find which box is some tool in.

For rest of these, let's consider that initially there is exactly one tool in a box.That is, we have _n_ tools and _n_ boxes and initially, tool number _i_ is in box number _i_.

For this propose, we can use so many containers.Like :

#### Trees

Trees are the most useful containers for DSU. For each vertex, we keep it's parent (and parrent of the root is -1). So, initially are parents are set to -1, and we have queries to find the root of each box(having the root, we can easily find the box's index) and queries for merging two trees. For better time complexity, every time we want to find the root of each vertex, we set it's parent to the root for the next queries.And while merging, we always want to minimize the height of the tree, so when we want to merge the boxes, it's like we put all the tools of the box with fewer tools in the other box.

![DSU Diagram](tree.png)

The best way I've seen to code this kind of DSU, is style of [bmerry](https://codeforces.com/profile/bmerry) : 

```cpp
    int root(int v){return par[v] < 0 ? v : (par[v] = root(par[v]));}
    void merge(int x,int y){	//	x and y are some tools (vertices)
            if((x = root(x)) == (y = root(y))     return ;
    	if(par[y] < par[x])	// balancing the height of the tree
    		swap(x, y);
    	par[x] += par[y];
    	par[y] = x;
    }
 ```   

In the code above, for each root _v_, _par_\[_v_\] equals the negative of number of tools in that box.

#### Arrays, vectors

We keep tools in a vector (or an array) and when we have a query to merge two boxes, we put all the tools of the box with fewer tools in the other box.

The time complexity is good because for each tool, we take and put it in an other box at most _log_(_n_) times (each time the size of the vector will be at least doubled).

So time complexity would be _O_(_n_._log_(_n_)) .

#### Sets (red-black trees)

Other way is to keep them in a red-black tree (in C++ it's `set`). We do exactly like vectors, so time complexity would be _O_(_n_._log_2(_n_)) . (One _log_ is for inserting).

**Problems** : [TROY Query](https://codeforces.com/gym/100571/problem/F) 

Tries
-----

Tries are some kind of rooted trees in which each edge has a character on it. Actually, trie is some kind of DFA (Determining Finite Automata). For a bunch of strings, their trie is the smallest rooted tree with a character on each edge and each of these strings can be build by writing down the characters in the path from the root to some node.

It's advantage is, LCP (Longest Common Prefix) of two of these strings is the _LCA_ (Lowest Common Ancestor) of their nodes in the trie(a node that we can build the string by writing down the characters in the path from the root to that node).

Generating the trie :

Root is vertex number 0 (C++)
```cpp
    int x[MAX_NUMBER_OF_NODES][MAX_ASCII_CODE], next = 1; //initially all numbers in x are -1
    void build(string s){
    	int i = 0, v = 0;
    	while(i < s.size()){
    		if(x[v][s[i]] == -1)
    			v = x[v][s[i++]] = next ++;
    		else
    			v = x[v][s[i++]];
    	}
    }
```  
    

**Problem** : [A lot of games](https://codeforces.com/contest/456/problem/D)

Suffix array
------------

Suffix array is a data structure that helps you sort all the suffixes in lexicography order.

This array consists of integers, the beginning of suffixes.

There are two ways to achieve this goal :

One) Non-deterministic algorithm : Use Robin-Carp and for check if a suffix is lexicographically less than another one, find their _LCP_ using binary search + hash and then check the next character after their _LCP_.
 
```cpp
    namespace HashSuffixArray
    {
    	const int
    		MAXN = 1 << 21;
    
    	typedef unsigned long long hash;
    
    	const hash BASE = 137;
    
    	int N;
    	char * S;
    	int sa[MAXN];
    	hash h[MAXN], hPow[MAXN];
    
    	#define getHash(lo, size) (h[lo] - h[(lo) + (size)] * hPow[size])
    
    	inline bool sufCmp(int i, int j)
    	{
    		int lo = 1, hi = min(N - i, N - j);
    		while (lo <= hi)
    		{
    			int mid = (lo + hi) >> 1;
    			if (getHash(i, mid) == getHash(j, mid))
    				lo = mid + 1;
    			else
    				hi = mid - 1;
    		}
    		return S[i + hi] < S[j + hi];
    	}
    
    	void buildSA()
    	{
    		N = strlen(S);
    		hPow[0] = 1;
    		for (int i = 1; i <= N; ++i)
    			hPow[i] = hPow[i - 1] * BASE;
    		h[N] = 0;
    		for (int i = N - 1; i >= 0; --i)
    			h[i] = h[i + 1] * BASE + S[i], sa[i] = i;
    
    		stable_sort(sa, sa + N, sufCmp);
    	}
    
    }
    
```
    

Two) Deterministic algorithm : We sort them _log_(_MaxLength_) steps, in the _i_ - _th_ step (counting from 0), we sort them according to their first 2_i_ characters and put the suffixes whit the same prefix with 2_i_ characters in the same buckets. 
```cpp
    #include <cstdio>
    #include <algorithm>
    #include <cstring> 
    
    using namespace std;
    
    #define REP(i, n) for (int i = 0; i < (int)(n); ++i)
    
    namespace SuffixArray
    {
    	const int MAXN = 1 << 21;
    	char * S;
    	int N, gap;
    	int sa[MAXN], pos[MAXN], tmp[MAXN], lcp[MAXN];
    
    	bool sufCmp(int i, int j)
    	{
    		if (pos[i] != pos[j])
    			return pos[i] < pos[j];
    		i += gap;
    		j += gap;
    		return (i < N && j < N) ? pos[i] < pos[j] : i > j;
    	}
    
    	void buildSA()
    	{
    		N = strlen(S);
    		REP(i, N) sa[i] = i, pos[i] = S[i];
    		for (gap = 1;; gap *= 2)
    		{
    			sort(sa, sa + N, sufCmp);
    			REP(i, N - 1) tmp[i + 1] = tmp[i] + sufCmp(sa[i], sa[i + 1]);
    			REP(i, N) pos[sa[i]] = tmp[i];
    			if (tmp[N - 1] == N - 1) break;
    		}
    	}
    
    	void buildLCP()
    	{
    		for (int i = 0, k = 0; i < N; ++i) if (pos[i] != N - 1)
    		{
    			for (int j = sa[pos[i] + 1]; S[i + k] == S[j + k];)
    			++k;
    			lcp[pos[i]] = k;
    			if (k)--k;
    		}
    	}
    } 


```
  
Heaps
-----

A heap is a binary rooted tree (a rooted tree that each node has at most 2 children) and each vertex has a value.

Heap property : Heap usually has a property, like the value of each vertex is equal to or greater than the value of its child(ren) (we call this a max heap). We can use heaps in heap sort.

![Heap tree](heap-tree.png)

Fibonacci heaps
---------------

A fibonacci heap is a kind of heap with better complexities. We don't need to know what a fibonacci heap is.C++ already has one, `priority_queue`.

Binary Search Tree (BST)
------------------------

A binary search tree (BST) is a binary rooted tree that every node has a value, and for each node, the value of every node in its left child's subtree is less than its value and the value of every node in its right child's subtree is greater than that. Usually we perform some queries on BSTs, like inserting, deleting, asking and ... .

![Binary Search Tree](binary-search-tree.png)

Binary search trees are too useful.

Red-black trees
---------------

A red-black tree is a kind of BST that after each query, BST will be balanced in such a way that it's height remains _O_(_log_(_n_)).

C++ already has a red-black tree inside, `set` .

You can read about them in C++ references.

![Red-black trees](red-black-tree.png)

Unfortunately, `set` has not any function to find the _k_ - _th_ smallest minimum or find the index of an element, bust there is a data structure in C++ with does it in _O_(_log_(_n_))(also contains all `set` functions), `tree` :
```cpp
    #include
    #include
    #include
    using namespace __gnu_pbds;
    using namespace std;
    template 
    using ordered_set = tree, rb_tree_tag, tree_order_statistics_node_update>;
    
    int main(){
    	ordered_set  s;
    	s.insert(1); 
    	s.insert(3);
    	cout << s.order_of_key(2) << endl; // the number of elements in the s less than 2
    	cout << *s.find_by_order(0) << endl; // print the 0-th smallest number in s(0-based)
    }
  ```  

This works even in C++ 98 !

You can read more about it, just google `sgi STL`.

SQRT Decomposition
------------------

Suppose we have an array _a_1, _a_2, ..., _a__n_ and ![](https://espresso.codeforces.com/457ab182a5f19f36cf595bd0b1d63f298298f6c0.png). We partition this array into _k_ pieces each containing _k_ elements of _a_.

Doing this, we can do a lot of things in ![](https://espresso.codeforces.com/cceaeeb6dc4943980576ff101fd293fb99b9a815.png). Usually we use them in the problems with modify and ask queries.

**Problems** : [Holes](https://codeforces.com/problemset/problem/13/E), [DZY Loves Colors](https://codeforces.com/contest/444/problem/C), RMQ (range minimum query) problem

Sparse Table
------------

The main problem that we can solve is RMQ problem, we have an array _a_1, _a_2, ..., _a__n_ and some queries. Each query gives you numbers _l_ and _r_ (_l_ ≤ _r_) and you should print the value of _min_(_a__l_, _a__l_ + 1, ..., _a__r_) .

Solving using Sparse Table : For each _i_ that 1 ≤ _i_ ≤ _n_ and for each _j_ that 0 ≤ _j_ and _i_ + 2_j_ - 1 ≤ _n_, we keep the value of _min_(_a__i_, _a__i_ + 1, ..., _a__i_ + 2_j_ - 1) in _st_\[_i_\]\[_j_\] (preprocess) : (code is 0-based)
```cpp
    for(int j = 0;j < MAX_LOG;j++)
    	for(int i = 0; i < n;i ++)if(i + (1 << j) - 1 < n)
    		st[i][j] = (j ? min(st[i][j-1], st[i + (1 << (j-1)) - 1][j-1]): a[i]);
 ```   

And then for each query, first of all, find the maximum _x_ such that 2_x_ ≤ _r_ - _l_ + 1 and answer is _min_(_st_\[_l_\]\[_x_\], _st_\[_r_ - 2_x_ + 1\]\[_x_\]) .

So, the main idea of Sparse Table, is to keep the value for each interval of length 2_k_ (for each _k_).

You can use the same idea for _LCA_ problem and so many other problems.

So preprocess will be in _O_(_n_._log_(_n_)) and query will be in _O_(1)

**Problems** : [Strip](https://codeforces.com/contest/487/problem/B), [GCDSSQ](https://codeforces.com/contest/475/problem/D) .

Heavy light decomposition
-------------------------

Heavy light decomposition is a way to partition a tree's vertices (or edges) in a good way.

In this kind of decomposition, we have some chains, and each vertex belongs to only one chain.

If vertex _v_ is the parent of _u_ size\_of\_subtree\_of(_v_)/2 < size\_of\_subtree\_of(_u_), _u_ and _v_ are in a chain and we call the edge _uv_, heavy, otherwise light.

There is at most one such child for each vertex _v_. If we consider the path from any vertex _v_ to the root, there will be at most _log_(_n_) light edges there (go from _v_ to the root, every time we see a light edge, size of subtree will be at least doubled). So, the number of chains on the way=_O_(_log_(_n_)) .

In each of these chains, we can contain a container or another data structure like segment tree or etc.

![Heavy light decomposition](heavy-light-decomposition.png)

**Problem** : [GRASS PLANTING](http://usaco.org/index.php?page=viewproblem2&cpid=102)