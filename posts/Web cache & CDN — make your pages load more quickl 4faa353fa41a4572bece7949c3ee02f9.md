# Web cache & CDN — make your pages load more quickly

Author: @Elva Wang 
Date: Nov 19, 2020
性質: Tech Share

> 重要性——

- 網頁優化
- 了解在網頁上的快取機制及做法

## What's cache? What's web cache?

- **A cache is any temporary storage location for copies of files or data, but the term is often used in reference to Internet technologies (web cache).**

### 實現於 Client side

- 情境 1：
    - 一個有大量圖片的網站被大量使用者進進出出 ⇒ 流量對系統造成衝擊！
    - 作法：
        - 透過 cache 機制將圖片暫存到使用者的瀏覽器。
            - 第一次瀏覽須下載， cache 過期前不用重複讀取。
    - 目的：**降低 client 端 Request 發送 ＆ 減少 Server Response 造成的遲緩和浪費。**
- 情境 2：
    - 有 cache 了，但網站更新了！
    - 作法：
        - Client 與 Server 間透過 **Header** 的「交互作用」來處理 cache 的效期。
            - `Expire Date`
            - `Cache-control`
                - `public`：公開的資源，可以被所有節點暫存
                - `private`：私有的資源，只被允許儲存成使用者的本地快取
                    - `public` 及 `private` 可設定 `max-age=...`
                        - 指定快取多久後會過期
                        - Ex, `Cache-Control: private max-age=2592000`
                            - 此資源僅可以被本地快取，有效期限是 30 天（60 x 60 x 24 x 30 = 2592000）
                - `no-cache`：快取需存取，但是要重新驗證。
                - `no-store`：不存取任何快取。
            - `Etag`：
                - In order to validate the cached resource.
                    - If the `ETag` header was part of the response for a resource

                        ⇒ the client can issue an `If-None-Match` in the header of future requests.

                    - Response with a normal `200` `OK`.
                    - or Return `304` `Not Modified` (with an empty body)
                        - 頁面沒更新，快取內容可繼續使用！
            - `vary`:
                - Decide whether a cached response can be used rather than requesting a fresh one from the origin server.
                - 待補充/
    - 目的：**避免 cache 的資料過期、調整 cache 其他屬性**

![Web%20cache%20&%20CDN%20%E2%80%94%20make%20your%20pages%20load%20more%20quickl%204faa353fa41a4572bece7949c3ee02f9/Untitled.png](Web%20cache%20&%20CDN%20%E2%80%94%20make%20your%20pages%20load%20more%20quickl%204faa353fa41a4572bece7949c3ee02f9/Untitled.png)

### 實現於 Server side

- 目的：
    - 避免使用者對資料庫的大量寫入並獲得結果 (Input / output DB資料庫) 造成效能上的耗竭
- 作法 1：`Memcached`
    - 一套 Name-Value Pair (NVP) 分散式記憶體快取系統
    - 使用 `Key` / `Value` 的方式：
        - 資料已暫存在 Server 端的 memory Cached 中 ⇒ 直接回覆使用者該資訊。
        - 若無 ⇒ 把資料寫入 / 讀取資料庫 ⇒ 寫一份快取進快取記憶體內。
    - 分散式？
        - 多台的 Server 主機做為 Memcached Server，並將之變成群組。
        - 把每一個 Web server 的 Cache 資料分散到每一個 Memcached 主機，達到資料分散的做法(分散式快取 )。
        - 優：
            - 若是快取記憶體不足，只要增加快取記憶體伺服器即可。

                 ⇒ 延展性變高

            - 不同主機上的快取記憶體資料可預先分配。

                ⇒ 有效降低記憶體因過多 Cache 造成太碎片化的問題。

        - 劣：
            - 因使用量過大，往往造成浪費多台 Memcache 群組裡記憶體空間的情況
- 作法 2：`Redis`
    - 一種NoSQL資料庫，本身也是一個 in-memory 的 key-value database。
    - 只使用處理器的單一執行緒，有效降低記憶體碎片化到其它核心上的情況。
    - 平均在每一個核上處理小數據時，性能比 Memcached來得更高。
    - 提供了一個資料庫架構，可以自動排序被儲存在Redis中的資料
        - 讓開發者取得排序後的資料
        - 可使用多節點的方式來達到分散式的做法

## 內容傳遞網路 CDN

- **It caches content (such as images, videos, or webpages) in proxy servers that are located closer to end users than origin servers.**
    - Proxy server: a server that receives requests from clients and passes them along to other servers.

    ![Web%20cache%20&%20CDN%20%E2%80%94%20make%20your%20pages%20load%20more%20quickl%204faa353fa41a4572bece7949c3ee02f9/Untitled%201.png](Web%20cache%20&%20CDN%20%E2%80%94%20make%20your%20pages%20load%20more%20quickl%204faa353fa41a4572bece7949c3ee02f9/Untitled%201.png)

---

**—— 想知道但來不及查的東西：**

1. `vary` (bookmark6: Understanding the vary header)
2. cache vs cookie and session
3. 記憶體碎片化
4. server cache 的 key / value 存的什麼是什麼、response 什麼

---

### Reference

[HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

[[不是工程師] 讓網站速度飛快的秘密，你了解什麼是網頁快取(Cache)嗎?](https://progressbar.tw/posts/93)

[前端三十｜23. [FE] 網頁的快取機制是怎麼運作的？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-23-fe-%E7%B6%B2%E9%A0%81%E7%9A%84%E5%BF%AB%E5%8F%96%E6%A9%9F%E5%88%B6%E6%98%AF%E6%80%8E%E9%BA%BC%E9%81%8B%E4%BD%9C%E7%9A%84-5e970b80b334)

[Content delivery networks (CDNs)](https://web.dev/content-delivery-networks/)

[](https://www.cloudflare.com/zh-tw/learning/cdn/what-is-caching/)

[Understanding The Vary Header - Smashing Magazine](https://www.smashingmagazine.com/2017/11/understanding-vary-header/#top)

## 補充

資料庫 → 如何處理記憶體碎片化