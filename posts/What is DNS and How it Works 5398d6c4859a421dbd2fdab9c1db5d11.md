# What is DNS and How it Works?

Author: @Yentina Wang 
Date: Nov 26, 2020
性質: Tech Share

# What is DNS and How it Works?

---

## Why this topic?

- 與之前的主題有關
- 在Roadmap上看到的主題

---

## Review: How Browsers Work?

- 輸入網址後到畫面跳出前到底發生了什麼？
    1. Checks cache; if requested object is in cache and is fresh, skip below step.
    2. Asks OS for server's IP address
    3. OS makes a DNS lookup and replies the IP address to the browser
    4. Opens a TCP connection to server (this step is much more complex with HTTPS)
    5. Sends the HTTP request through TCP connection
    6. Receives HTTP response and may close the TCP connection, or reuse it for another request
    7. ...

## Background

- IPv4
    - 32bits
    - example: `192.168.1.1`
- IPv6
    - 128bits
    - example: `2001 : 0DB8 : 02de : 0000 : 0000 : 0000 : 0000 : 0e13`
- 過去：將主機名稱跟對應的IP紀錄在一個檔案中
    - 檔案內容：`IP 主機名稱 主機別名一 主機別名二...`
    - 產生問題：
        1. 無法自動於所有的電腦內更新
        2. 若 IP 數量太多時，該檔案過大，不利於其他主機同步
        3. 用戶端電腦每次上網都得要重新下載一次檔案（如圖）

            ![What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled.png](What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled.png)

### DNS 系統 — 分散式、階層式主機名稱管理架構

DNS 利用類似樹狀目錄的架構，將主機名稱的管理分配在不同層級的 DNS 伺服器當中

- 系統：BIND(Berkeley Internet Name Domain)

DNS 是一種網際網路的通訊協定名稱， 至於 BIND 則是提供這個 DNS 服務的軟體

- 優點：
    - 每一部 DNS 伺服器記憶的資訊較少
    - 若有 IP 異動時容易修改
- FQDN (Fully Qualified Domain Name)
    - domain name （目錄）
    - hostname（檔案名稱）

        ![What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled%201.png](What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled%201.png)

## 查詢流程

- 階層架構

    ![What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled%202.png](What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled%202.png)

    - root
        - 全球僅有13組root name server
        - 但在世界各地每個類型都有多個副本，它們使用 [Anycast](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=991450) 技術來提供快速回應
        - 截至2019年8月，全球共有1008台root name server正在執行
    - [TLDs (Top Level Domains)](https://www.whois365.com/tw/listtld)

        由`.`(root)管理的Domains

        - gTLD (Generic TLDs) → examples: `.com`, `.org`, `.gov`
            - 最早的root僅管理六種主要的domain name

                ![What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/_2020-11-26_6.30.50.png](What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/_2020-11-26_6.30.50.png)

            - 網路發展快速，現在網路發展快速，現在開放的domain name非常多
        - ccTLD (Country code TLDs) → examples: `.tw`, `.uk`, `.jp`, `.cn`
            - 一個國家最上層的domain name
            - 優點：若有domain name的需求，只要向自己的國家申請即可
        - [IANA](https://www.iana.org/)
    - 授權(delegation)與分層負責
        - domain name 的授權需要向上層的ISP(Internet Service Provider)申請

            example: `.tw` 這部伺服器必須向 `root (.)` 註冊領域名稱查詢授權

        - 每個上一層的 DNS 伺服器所記錄的資訊為下一層的主機名稱
        - 再下一層直接授權給下層的某部主機來管理
- 查詢流程 (以 [www.nthu.edu.tw](http://www.nthu.edu.tw) 為例)
    1. 電腦依據相關設定所提供的 DNS 的 IP 去進行連線查詢（[台灣常用的DNS server](https://officeguide.cc/recommend-public-dns-server-list/)）
    2. 該server收到查詢要求，先查看本身有沒有紀錄(cache)，若無則向`.`查詢
    3. 向最頂層的`.(root)` 查詢（得到`.tw`的IP）
    4. 向第二層的`.tw`伺服器查詢（得到`.edu.tw`的IP）
    5. 向第三層的`.edu.tw`伺服器查詢（得到`.nthu.edu.tw`的IP）
    6. 向第四層的`.nthu.edu.tw` 伺服器查詢（得到`www.nthu.edu.tw`的IP）
    7. 記錄並回報
    - 可以使用`dig +trace (網址)`指令查詢

    ![What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled%203.png](What%20is%20DNS%20and%20How%20it%20Works%205398d6c4859a421dbd2fdab9c1db5d11/Untitled%203.png)

- 分層的好處
    - 主機名稱修改的僅需經過上一層DNS伺服器設定即可
    - 可持續向下授權
- 其他
    - DNS 伺服器對主機名稱解析結果的快取時間
        - 查詢結果已經被快取了，但是原始 DNS 的主機名稱與 IP 對應卻修改了

            → 此時若有人再次查詢， 系統可能會回報舊的 IP 

        - 快取內的答案是有時間性的，通常是數十分鐘到三天之內

            → 修改了一個 domain name 之後，可能要 2 ~ 3 天後才能全面的啟用

    - DNS 使用的 port number 以及傳輸協定類型
        - DNS 使用port 53
        - 一般以 UDP 來查詢（快速）
        - 萬一沒有辦法查詢到完整的資訊，就會再次的以 TCP 重新查詢
    - 申請領域查詢授權
        - 如何讓其他電腦查到自己的主機IP?
            1. 上層 DNS 授權領域查詢權，自己設定 DNS 伺服器（成為NameServer）
            2. 請上層 DNS 伺服器來設定IP對應的主機名稱
        - 需要架設DNS的時機？
            1. 需要連上 Internet 的主機數量龐大
            2. 需要時常修改 Server 的名字，或是 Server 有隨時增加的可能性
        - 向ISP(Internet Service Provider)申請時填寫DNS伺服器的名稱以及該伺服器的IP
        - 擁有領域查詢權後，所有的主機名資訊都以自己為準，與上層無關
        - 申請過後，自己的IP位址透過自己的主機取得
        - 查不到IP或是IP與設定不同的情形
            - 伺服器掛掉（只能回傳A(address)型態的資料）
            - 伺服器的資料庫內沒有記錄自己的主機IP
            - 上層的的資料跟自己的資料不同（以自己的為準）
        - 一般而言NS(name server)、A(address)所設定的對應IP相同

## DNS資料庫

- zone

    DNS 伺服器內的資料庫中，每一個domain中都會有zone file，由許多Resource Record組成

    Zone File is a file on a name server that contains information that defines the zone that the name server manages. 

    Each zone is the complete database for a particular "pruned" subtree of the domain space.

    常見的[Resource Record](https://en.wikipedia.org/wiki/List_of_DNS_record_types) (RR)類型：

    - 正解(forward)檔：從主機名稱查到 IP
        - SOA（Start Of Authority）
            - 放在 zone file 一開始的地方
            - 每一個記錄檔只能有一個 SOA，而且一定是檔案中第一個Record
            - 描述這個 zone 負責的 name server，version number…等資料
        - NS
            - name server，用來指定操作的DNS伺服器主機名稱（不可以IP位址表示）
            - example: `IN NS dns.twnic.net.tw.`
        - A
            - address，將DNS網域名稱對應到IP address
            - example: `server IN A 140.123.102.10`
        - 每部 DNS 都需要的正解 zone： hint
            - 當 DNS 伺服器在自己的資料庫找不到所需的資訊時， 一定會去找`.`

                → 要有記錄`.`在哪裡的記錄 zone 才行

            - 正解 DNS 伺服器，基本上要有兩個 zone
                - hint (root)：記錄 . 的 zone
                - abc.org：記錄 .abc.org 這個正解的 zone
    - 反解(reverse)檔：從 IP 反查到主機名稱
        - 只有IP的擁有者（ISP）可以設定反解檔
        - SOA、NS
        - PTR
            - pointer，定義某個 IP 對應的 domain name，即將 IP 位址轉換成主機的FQDN
            - example: `20 IN PTR mail.twnic.net.tw.`
- 資料庫類型
    - Master

        這種類型的 DNS 資料庫中，裡面所有的主機名稱相關資訊等，通通要管理員自己手動去修改與設定， 設定完畢還得要重新啟動 DNS 服務去讀取正確的資料庫內容，才算完成資料庫更新。

    - Slave

        當要修改一筆名稱對應時，只要手動更改 Master 那部機器的設定檔，然後重新啟動 BIND 這個服務，其他Slave 就會自動的被通知更新。

    - 資料如何同步？
        - 不論 Master 還是 Slave 的資料庫，都會有一個代表該資料庫新舊的「序號」
        - Master 主動告知
            1. Master 在修改了資料庫內容
            2. 加大資料庫序號
            3. 重新啟動 DNS 服務
            4. Master 主動告知 Slave 更新資料庫
        - Slave 主動提出要求
            - Slave 會定時的向 Master 察看資料庫的序號
            - 當發現 Master 資料庫的序號比 Slave 自己的序號還要大 (代表比較新)，那麼 Slave 就會開始更新
            - 如果序號不變， 那麼就判斷資料庫沒有更動，因此不會進行同步更新
    - 查詢優先權？
        - DNS 系統當中，domain name的查詢是「先搶先贏」的狀態

            →Master並不會被優先查詢到

[](https://www.cloudflare.com/zh-tw/learning/dns/what-is-dns/)

[鳥哥的 Linux 私房菜 -- DNS Server](http://linux.vbird.org/linux_server/0350dns.php#hint)

[DNS資源紀錄(Resource Record)介紹](http://dns-learning.twnic.net.tw/bind/intro6.html)

[Zone File (DNS) | Network Encyclopedia](https://networkencyclopedia.com/zone-file/)