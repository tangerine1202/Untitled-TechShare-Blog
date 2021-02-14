# Database Scalability — Focusing on Replication & Partition

Author: @Hsu Tzu Ting 
Date: Dec 3, 2020
Tags: 延伸閱讀
性質: Tech Share

## Why this topic?

- 在 roadmap 上找到
- 發現之前有 sharing 過一部分的概念 (Relational Database vs NoSQL Database)

## Intro （引言？？？）

- 使用者越來越多、資料越來越多
    - 硬體升級
        - 升級到不能升級
            - 新的資料庫

            ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled.png)

## Scalability

- 有些小問題一變大就不簡單了
- Scalability 討論的就是系統應對問題大小的能力
- 憑什麼說 Database A 比 Database B 更 scalable？
    - Performance
        - 白話文：回應速度很快
        - 具體來說
            - 可以同時處理很多 tasks  (High throughput)
            - 使用少量的計算資源
            - 直觀嗎 → Trade-off
                - 同時處理多個 tasks 可能導致使用大量計算資源
                - （還沒想到example支援）
    - Availability
        - User 能夠 access 系統
        - 可以量化：uptime / (uptime + downtime)
- How to improve the scalability?

    ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%201.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%201.png)

    - Replication
        - 一份資料，複製多份放到不同的 node 上面
        - Why improve scalability?
            - Performance：更多的計算資源還有頻寬 (High throughput)
            - Availability：可以在多個 node 得到 data，自然就不容易 inaccessible
            - 其他優點：To have the data (geographically) close to the clients
        - 分類
            - Timing of data transfer
                - Asynchronous replication （非同步）

                    ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%202.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%202.png)

                    - master 跟 client 說收到 data 後，才開始複製 data 到 replicas
                    - 優缺點
                        - 優點：offers ease of use （replications 在背景執行）
                        - 缺點：資料遺失的風險較高

                            ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%203.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%203.png)

                - Synchronous replication （同步）

                    ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%204.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%204.png)

                    - 完成複製 data 到 replicas 後，才回應 client
                    - 優缺點
                        - 優點：比較能保證資料有成功複製到其他 database
                        - 缺點：client 需等待較久
            - Server architecture
                - Roles
                    - Leaders / Masters
                        - Nodes that accept writes from clients
                    - Followers / Slaves / Replicas
                        - Nodes that provide read-only access to data
                - 分類
                    - Single-leader architecture

                        ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%205.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%205.png)

                        - the most common & classic
                        - A single leader accepts writes
                        - Replicas draw data from the leader
                        - 優點
                            - avoid conflicts
                        - 缺點 / 問題
                            - Latency
                                - ex. query travel the globe before they get a response
                            - What will happen when the leader node dies?
                                - Elect a new one?
                                    - automated? operated by somebody?
                                    - (heartbeat system)
                                - How to define "die"
                    - Multi-leader architecture

                        ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%206.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%206.png)

                        - Multiple servers that can receive writes and serve as a model for replicas.
                        - 優點
                            - 在 replicas 很分散的時候，多個 leaders 可以降低延遲
                                - ex. one in North America, one in Europe and another in Asia
                        - 缺點
                            - conflicts happen
                            - Solution
                                - [https://www.alphasights.com/news/a-primer-in-database-replication?locale=en](https://www.alphasights.com/news/a-primer-in-database-replication?locale=en) (來不及看完><)
                    - No-leader architecture

                        ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%207.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%207.png)

                        - pioneered by Amazon's DynamoDB
                        - no leaders, every replica can accept writes
                        - 優點
                            - 沒有 leaders fail, elect new leaders 的問題
                        - 缺點 / 問題

                            ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%208.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%208.png)

                            - A possible solution
                                - 跟 write 一樣，client 也向多個 nodes send request ，然後決定該相信誰
                            - 解決根本問題：how to synchronize without leader
                                - 由 client 負責
                                - another process that is responsible just for finding differences in the data and fixing them
        - 適用情境
            - seldom or never-updated data
            - Ex. transaction history, tax tables
        - Database replication vs. mirroring
            - Replication: focus on improving the scalability
            - Mirroring: focus on backing up
    - Partition

        ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%209.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%209.png)

        - 一份資料，切開變成數個小份後，分散的放到不同的 node 上面
        - Why improve scalability?
            - Performance: 相關的資料放在一起 → 搜尋時一次要檢查的資料變少 (less resources)
            - Availability: 讓錯誤發生的情形變得更獨立
        - Strategies
            - Range partition
                - index-organized table
                - based on ranges of partition key values
            - List partition
                - you can group and organize unordered and unrelated sets of data
            - Hash partition (index-organized table)
                - 時機
                    - 不確定在一個 range 中有多少筆資料Y
                    - 有些 range 有超多筆資料，有些卻很少
            - Composition partition

                ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2010.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2010.png)

        - Method
            - Vertical

                ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2011.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2011.png)

                - 不同的 column → 不同的 table (same # of rows, fewer columns)
                - 優點：Restrict access to sensitive data
            - Horizontal

                ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2012.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2012.png)

                - 不同的 row → 不同的 table (same # of columns, fewer rows)
        - 可以只有 Partitioning 沒有 Replication 嗎？

## CAP Theorem

- 現實：網路會斷線

    ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2013.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2013.png)

    [https://rickhw.github.io/2018/06/18/Architecture/Gossip-in-Distributed-Systems/](https://rickhw.github.io/2018/06/18/Architecture/Gossip-in-Distributed-Systems/)

- 對象 → read-write storage
    - set(X): sets the value of the register to X
    - get(): returns the last value set in the register
- Ｗhat's C, A, P stand for?
    - **C**onsistency（一致性）
        - 使用者讀到的「總是」最新的資料
        - not consistency 的例子

            ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2014.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2014.png)

    - **A**vailability（可用性）
        - 使用者的請求「總是」可以獲得回應，也就是可以正常讀寫
        - 回應不包括回應 error message
    - **P**artition tolerance（分區容錯性）
        - 就算網路出現問題導致資料分區，整個系統仍然要可以繼續運作
- Core of the Theorem → Trade-off
    - CA
        - 回到單一 database (X)
    - CP
        - 發現無法與另一個資料庫同步，使用者的請求就會失敗

        ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2015.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2015.png)

    - AP
        - 雖然資料庫無法同步另一個資料庫，但它仍然更新了這筆資料並告知使用者更新成功

        ![Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2016.png](Database%20Scalability%20%E2%80%94%20Focusing%20on%20Replication%20&%20P%208a2124ec56dd4949ad0a7adaa72138c2/Untitled%2016.png)

- Be careful
    - CAP uses very narrow definitions
        - **強一致性（strong consistency）**vs. 最終一致性（eventually consistency）
        - another concept of database: BASE
            - **B**asic **A**vailability
            - **S**oft-state
            - **E**ventual consistency
    - CP/AP: a false dichotomy
        - A huge amount of subtlety is lost by putting a system in one of two buckets
            - fault-tolerance, latency, simplicity of programming model, operability ...

## Reference

- Scalability

[#7 興趣使然地學習分散式系統（1）](https://medium.com/the-bayesian-trap/7-%E8%88%88%E8%B6%A3%E4%BD%BF%E7%84%B6%E5%9C%B0%E5%AD%B8%E7%BF%92%E5%88%86%E6%95%A3%E5%BC%8F%E7%B3%BB%E7%B5%B1-1-167180ca7152)

- Partition & Replication

[What is Database Replication and How Does it Work?](https://searchdatamanagement.techtarget.com/definition/database-replication)

[Partitioned Tables and Indexes](https://docs.oracle.com/cd/B10501_01/server.920/a96524/c12parti.htm)

- CAP

[CAP定理101 - 分散式系統，有一好沒兩好](https://medium.com/%E5%BE%8C%E7%AB%AF%E6%96%B0%E6%89%8B%E6%9D%91/cap%E5%AE%9A%E7%90%86101-3fdd10e0b9a)

[henryr/cap-faq](https://github.com/henryr/cap-faq)

- 用了很多它的圖，但還沒看完

[A Primer in Database Replication](https://www.alphasights.com/news/a-primer-in-database-replication?locale=en)