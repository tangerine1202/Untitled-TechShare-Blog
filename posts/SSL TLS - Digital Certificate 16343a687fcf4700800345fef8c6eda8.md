# SSL/TLS - Digital Certificate

Author: @Hsu Tzu Ting 
Date: Oct 22, 2020
性質: Tech Share

- 前情提要
    - HTTP vs. HTTPS
- SSL/TLS Definition (from RFC)
    - 避免竊聽、竄改、偽造
    - 基本上非常相似，也有人說 TSL 是更新、更安全的 SSL版本。

    > ... Secure Sockets Layer (SSL 3.0) protocol, a security protocol that provides communications privacy over the Internet.  The protocol allows client/server applications to communicate in a way that is designed to *prevent* *eavesdropping, tampering, or message forgery*.  (RFC-6101)

    > TLS allows client/server applications to communicate over the Internet in a way that is designed to *prevent eavesdropping, tampering, and message forgery*.  (RFC-8446)

- SSL/TLS 功能
    - **Source Identity Verification - today's focus**
        - 你現在看到的網站, 真的是該網站本身嗎?
            - 瀏覽器會透過驗證網站的 SSL 憑證裡的簽章來確認網站真實性
    - Security against Man-in-the-middle (MITM) attacks
    - Client/Server Authentication
- Public Key & Private Key
    - Any message encrypted with Bob's public key can only be decrypted with Bob's private key.
    - Anyone with access to Alice's public key can verify that a message could only have been created by someone with access to Alice's private key.
- Digital Signature

    ![SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Screen_Shot_2020-10-21_at_10.30.32_PM.png](SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Screen_Shot_2020-10-21_at_10.30.32_PM.png)

    - Steps
        - Step1: Sender 會先使用某種 Hash 演算法來計算該文件檔的 Hash 值

            ![SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Hash_function.svg](SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Hash_function.svg)

            [https://zh.wikipedia.org/zh-hk/散列函數](https://zh.wikipedia.org/zh-hk/%E6%95%A3%E5%88%97%E5%87%BD%E6%95%B8)

        - Step2: Sender 用自己的私鑰對計算出來的 Hash 值進行加密
            - 動作：簽名(signing)
            - 結果：簽章(signature)
        - Step3: Sender 將簽章連同原始的檔案寄給 Receiver
        - Step4: Receiver 透過 Sender 對外公開的公鑰對簽章進行解密，以便取得 Sender 簽名之前就計算好的 Hash 值
        - Step5: Receiver 使用跟 Sender 相同的 Hash 演算法計算出原始檔案的 Hash 值
            - Sender 使用的演算法是簽章中的明文資訊
        - Step6: Receiver 比較前兩步驟中得出的 Hash 值，若兩者匹配則簽章驗證成功，反之則失敗
    - What happens if ...

        ![SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Screen_Shot_2020-10-21_at_10.52.06_PM.png](SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Screen_Shot_2020-10-21_at_10.52.06_PM.png)

- Digital Certificate

    ![SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Screen_Shot_2020-10-21_at_10.35.13_PM.png](SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/Screen_Shot_2020-10-21_at_10.35.13_PM.png)

- SSL憑證
    - 簡易版
        1. 你要進行 HTTPS 連線，雙方做 Hello
        2. 伺服器丟一張憑證給你，憑證上面寫說他被某 CA 簽了
        3. 你剛好有這家 CA 的公鑰，拿公鑰解他的憑證，看是不是解的出來，內容是否正常
    - 詳細版

        ![SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/1qEajDtKcG5y98auO2BYQYw.png](SSL%20TLS%20-%20Digital%20Certificate%2016343a687fcf4700800345fef8c6eda8/1qEajDtKcG5y98auO2BYQYw.png)

        - 角色介紹
            - CA (Certificate Authority)
                - 組織/機構
                - 幫想要使用 SSL 通訊的網站簽署 SSL 憑證
            - Browser Vendor
                - Browser Vendor: Google
                - Browser: Chrome
            - Web Server
            - Client
        - How it works?
            - Step 1: CA 發行其公鑰給瀏覽器供應商
            - Step 2: Browser Vendor 確認 Browser 有所有 CA 的公鑰的副本
                - 這樣 Browser 才能驗證被特定 CA 簽署過的憑證的正確性
                - 鑰通常是以公開憑證(public certificate)或是根憑證(root certificate)的方式供外界使用
            - Step 3: Web Server 請求 CA 簽署憑證
                - 當你有了自己的網站，且你想要為你的網站啟用 SSL 通訊，你就會需要請求 CA 簽署憑證
                - 這個請求通常會要你填很多必要的欄位以驗證你作為這個網站的所有人的身份
            - Step 4: CA 簽署憑證，網站管理者把憑證加到 Server 的 config 裡
                - 憑證包含
                    - 憑證序號
                    - 網站擁有人名稱
                    - 網站擁有人的 Public Key
                    - 發證機構的數位簽章（網站擁有人的 Public Key 透過 CA 的 Private Key 加密後的結果）
            - Step 5: 瀏覽器初始化一個SSL連接
            - Step 6 & 7:
                1. Server 回覆給瀏覽器 SSL 憑證
                2. Client 收到後, 瀏覽器會從憑證中讀取 CA 的資訊, 並且試著從瀏覽器的 Cert Store 中找出該 CA 的公鑰
                3. 以此公鑰去解密憑證中的數位簽章, 如此便可得到該網站的 Public Key. 
                4. 將解出來的 Public Key 拿去跟網站送來的 Public Key 比較看是否相同

[那些關於SSL/TLS的二三事(一) - Why SSL/TLS?](https://medium.com/@clu1022/那些關於ssl-tls的二三事-一-why-ssl-tls-77ab5f4ba85)

[那些關於SSL/TLS的二三事(二) - How SSL works?](https://medium.com/@clu1022/那些關於ssl-tls的二三事-二-how-ssl-works-a9d6720bdd48)

[那些關於SSL/TLS的二三事(五) - 數位簽章](https://medium.com/@clu1022/那些關於ssl-tls的二三事-五-數位簽章-326fa5347893)

[Digital Signatures and Digital Certificates](https://www.youtube.com/watch?v=stsWa9A3sOM)

[改變世界的九大演算法：讓今日電腦無所不能的最強概念](https://www.books.com.tw/products/0010644994)