# Communication - HTTP & APIs

Author: @Hsu Tzu Ting 
Date: Oct 8, 2020
性質: Tech Share

![Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-09-29_at_9.31.56_AM.png](Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-09-29_at_9.31.56_AM.png)

- HTTP
    - Why HTTP is needed
        - 為什麼我們可以溝通
            - 相同的語言、文法
        - 為什麼 Client 跟 Server 可以溝通
            - 依循相同的協議
                - HTTP（只）規範了 Client 和 Server 之間請求和應答的標準
                    - ~~資料的傳輸方式~~
    - What is HTTP（HTTP的組成結構）
        - HTTP Request

            ![Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-10-03_at_4.11.51_PM.png](Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-10-03_at_4.11.51_PM.png)

            - 8 Methods
                - Get
                - Head
                - Post
                - Put
                - Delete
                - Trace
                - Options
                - Connect
        - HTTP Response

            ![Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-10-03_at_4.16.20_PM.png](Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-10-03_at_4.16.20_PM.png)

            - Status Code
                - 1xx
                    - 訊息類 (收到請求，請求者繼續執行操作)
                - 2xx
                    - 成功類 (操作被成功接受並處理)，例如：200 成功回應
                - 3xx
                    - 重定向類 (需進一步操作才能完成)，例如：301 成功轉向
                - 4xx
                    - 客戶端錯誤類 (請求語法錯誤或無法完成請求)，例如：404 找不到資源
                - 5xx
                    - 伺服器錯誤類 (後端的問題)，例如：500 伺服器錯誤
            - Content-Type
                - 讓 Client 知道如何打開打開訊息
    - HTTP vs. HTTPS
        - 為什麼比較安全
            - HTTP不足之處
                - 不具備加密的功能，無法對 Request、Response 內容進行加密
                - Client、Server都不會對雙方的身份來進行驗證，只要求訊息正確
            - 通訊過程使用 SSL/TLS 進行加密
                - TCP Three-way Handshake
                - SSL Handshake
            - 提供對網站伺服器的身份認證，保護交換資料隱私與完整性
        - 其他差異
            - HTTP的URL是由「http://」起始與預設使用埠80，而HTTPS的URL則是由「https://」起始與預設使用埠443
    - TCP/IP （Transmission Control Protocol / Internet Protocol）
        - 1個協議？2個協議？
            - Internet Protocol Suite（IPS）是不同的通信協議的大集合，因為其中的兩個核心協定：TCP和IP，而被簡稱為TCP/IP
        - 將資料應該如何封裝、定址、傳輸、路由以及在目的地如何接收標準
        - 將資料傳輸抽象化為四個層級
            - 應用層 (Application Layer)
                - 例如HTTP、FTP、DNS
            - 傳輸層 (Transport Layer)
                - 例如TCP、UDP、RTP、SCTP
            - 網路互連層 (Internet Layer)
                - 例如IP
            - 網路介面層 (Network Access Layer)
                - 例如乙太網、Wi-Fi、MPLS
- APIs
    - What is APIs
        - 怎麼得到販賣機裡面的飲料
            - 投幣按飲料按鈕
            - 掉出肥宅氣泡水
        - Front-end 如何取得 Database 裡的資料
            - Call API
                - Http method
                    - Create(新增)：GET
                    - Read(讀取)：POST
                    - Update(更新)：PUT
                    - Delete(刪除)：DELETE
            - Recieve data
                - uri
                    - url vs. uri
                - json
        - 範例
            - LINE Notify API Document
                - 怎麼知道我的訊息傳給個人或群組
                - [https://notify-bot.line.me/doc/en/](https://notify-bot.line.me/doc/en/)
    - Why APIs are needed / Advantages of APIs
        - 隱藏實作細節
        - 容易優化
        - 並行開發
    - RESTful API
        - REST
            - Representational State Transfer
            - 軟體架構風格（並非標準）
        - 一般的 API
            - 獲得資料 GET http://mypage/api/getData
                - GET http://mypage/api/get_data
                - GET http://mypage/api/GetData
            - 新增資料 POST http://mypage/api/createData
            - 刪除資料 Delete http://mypage/api/deleteData/1
            - 缺點
                - 不同公司、不同工程師命名規則都不一樣
        - RESTful API
            - 獲得資料 GET http://mypage/api/data
            - 新增資料 POST http://mypage/api/data
            - 刪除資料 Delete http://mypage/api/data/1
            - 該執行什麼藏在 http 的 method 裡面
            - 特色
                - 統一的 API 接口
                - 無狀態(Stateless)
                    - 什麼是有狀態
                        - 登入iLMS
                        - 下載上課講義
                    - 輸入一個URL就可以直接得到data
                - 利用快取機制增加效能
                    - Server-side
                        - 在 GET 資源時，若該資源並沒有被變更，就可以利用 cache 機制減少 query，並且加快回應速度
                    - Client-side
                        - 透過 client 端 cache 記錄 cache 版本，若向 server 要求資源時發現 server 最新版與 cache 相同，則 client 端直接取用本地資源即可，不需要再做一次查詢
    - gRPC
        - Every communication protocol needs client library.
            - Web application: Browser helps maintain the library.
                - But how about other application (eg. Python application)
        - 跨平台的通訊

            ![Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-10-04_at_10.35.03_PM.png](Communication%20-%20HTTP%20&%20APIs%2036993839964f4b509fd9d5ec21332d13/Screen_Shot_2020-10-04_at_10.35.03_PM.png)

- Socket
    - 網路上的通訊端點
        - IP Address + TCP Port
        - 使用者之間只要記住對方的 Socket 號碼，便可以直接通訊，而不用考慮到底是經過何種網路、或主機放在什麼地方
            - 打電話只需要知道手機號碼

### Reference

[「筆記」- 何謂 HTTP 傳輸協定](https://medium.com/pierceshih/筆記-何謂-http-傳輸協定-1d9b5be3fd24)

[API 是什麼? RESTful API 又是什麼?](https://medium.com/itsems-frontend/api-是什麼-restful-api-又是什麼-a001a85ab638)