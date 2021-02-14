# The Internet and Browsers

Author: @Yentina Wang 
Date: Oct 8, 2020
性質: Tech Share

## Something About Browsers

### What are browsers?

- Conclusion: Browsers are a package of  various software.
- 功能：讓程式碼變成圖形和文字
    - Run APIs
    - 下載
        1. 向在搜尋欄位輸入的網址（URL）提出請求
        2. 獲得第一份檔案 index.html
        3. 連結更多的 html 、 js 、 css
    - 解析
        - Render tree
            - DOM tree
            - Rule / CSSOM tree
    - 渲染

        依照 render tree 順序把網站畫出來

- 架構

    ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled.png)

    ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%201.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%201.png)

### How do browsers work?

- 以輸入http://www.google.com為例
    1. 瀏覽器連接到www.google.com伺服器
    2. 以HTTP通訊協定指令向伺服器發送請求
    3. 伺服器處理完成
    4. 回應給瀏覽器一段HTML文字
    5. 瀏覽器將此段HTML顯示成Google的首頁
- 輸入網址後到畫面跳出前到底發生了什麼？
    1. Checks cache; if requested object is in cache and is fresh, skip below step.
    2. Asks OS for server's IP address
    3. OS makes a DNS lookup and replies the IP address to the browser
    4. Opens a TCP connection to server (this step is much more complex with HTTPS)
    5. Sends the HTTP request through TCP connection
    6. Receives HTTP response and may close the TCP connection, or reuse it for another request
    7. Checks if the response is a redirect or a conditional response (3xx result status codes), authorization request (401), error (4xx and 5xx), etc.; these are handled differently from normal responses (2xx)
    8. If cacheable, response is stored in cache
    9. Browser determines what to do with response (e.g. is it a HTML page, is it an image, is it a sound clip?)
    10. Browser renders response, or offers a download dialog for unrecognized types
    11. HTML start parsing to DOM Tree, and CSS parsing to CSSOM Tree, then combine them to render tree
    12. Run layout and paint to the screen

## Something about Internet

- 網路的分層

    ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%202.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%202.png)

    1. HTTP(port 80)

        FTP(file transport protocol, port 21)

        SSH(Secure Shell, port 22)

    2. TCP（Transmission Control Protocol, 保證收發正常）

        UDP（User Datagram Protocol, 即時性高, 常用於即時通話或視訊）

    3. IP：收發位址
    4. 路由器、海底電纜
- HTTP & HTTPS
    - HTTP
        1. 標準化內容格式（GET, POST, DELETE, PUT）
        2. 分為 header 跟 body
        3. 用[狀態碼](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)標準化結果

        以輸入http://www.google.com為例

        - 輸入網址並按下Enter

            > GET（用動詞標準化動作）
            http://google.com

        - Server收到訊息後回傳

            > Status: 200（用狀態碼標準化結果）
            <html>…..</html>（分為 header 與 body）

    - HTTPS

        ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%203.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%203.png)

        - 加密
            - 共用金鑰加密

                ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%204.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%204.png)

            - 公開金鑰加密 / 非對稱式加密

                公鑰是所有人都看得到的，而私鑰是只有通訊者自己才看得到的；每個資料被任意一把鑰匙加密後，必須要透過與之配對的另一把鑰匙才能解密；例如我用我的私鑰加密的密文，就只能被我的公鑰解密，反之亦同。

                - 中間人攻擊

                    ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%205.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%205.png)

                - 數位憑證
                    1. 提供公鑰 & Email，向憑證頒發機構申請憑證
                    2. 憑證頒發機構核可
                    3. 透過數位簽章包裹提供的資料，製作成數位憑證
                    - 機構：終端數位憑證由中介機構簽發、中介機構的憑證由更上游的中介機構簽發，直到源頭，它的憑證由自己簽發，形成了一個信任鏈。
            - 由於非對稱加密的運算量較高，傳遞回應較慢；實際的架構上，會透過公開金鑰加密傳遞出共用的金鑰，再透過共用金鑰加密進行後續的傳遞，兼顧了安全性及傳遞速度。

### Reference

Articles

[](https://medium.com/@hulitw/learning-tcp-ip-http-via-sending-letter-5d3299203660)

[[熱門面試題] 從輸入網址列到渲染畫面，過程經歷了什麼事？](https://w3c.hexschool.com/blog/8d691e4f)

[【Day01】瀏覽器運作原理(客戶端-伺服器（Client/Server）架構)](https://grantliblog.wordpress.com/2020/02/23/1202/)

[How Web Browsers Work - Behind the scene Architecture, Technologies, and Internal Working](https://medium.com/web-god-mode/how-web-browsers-work-behind-the-scene-architecture-technologies-and-internal-working-fec601488bfa)

[Inside look at modern web browser (part 1) | Web | Google Developers](https://developers.google.com/web/updates/2018/09/inside-browser-part1)

[In Introduction to HTTP Basics](https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/HTTP_Basics.html)

Videos

[The Internet: How Search Works](https://www.youtube.com/watch?v=LVV_93mBfSU&list=PLzdnOPI1iJNfMRZm5DDxco3UdsFegvuB7&index=8)