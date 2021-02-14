# TCP Three-way Handshake

Author: @Yentina Wang 
Date: Oct 22, 2020
性質: Tech Share

## WHY

- 之前查資料的時候看到[一篇文章](https://draveness.me/whys-the-design-tcp-three-way-handshake/)，想仔細研究

    ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/_2020-10-22_12.55.32.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/_2020-10-22_12.55.32.png)

    ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/_2020-10-22_12.55.18.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/_2020-10-22_12.55.18.png)

- 統一主題的方向
- 可能是面試常見的問題（？）

## NOTE

- 網路分層

    ![The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%202.png](The%20Internet%20and%20Browsers%20a981f3cc18a445ba86ec7e7929fa995a/Untitled%202.png)

    - TCP v.s UDP

        ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled.png)

- What is connections?

    The reliability and flow control mechanisms described above require
    that TCPs initialize and maintain certain status information for
    each data stream. The combination of this information, including
    sockets, sequence numbers, and window sizes, is called a connection.
    Each connection is uniquely specified by a pair of sockets
    identifying its two sides.  —  *RFC 793*

    - TCP connection:

        用於保證可靠性和flow contro機制的信息，包括Socket、sequence numbers以及window sizes...等

    - 什麼是socket?
        - TCP/IP網絡的API：

            socket 是讓開發者可以在抽象層面和外部系統溝通的一個工具，開發者可以不用去煩惱電腦(路由器)是如何讀取協定、IP 和變成電子訊號傳遞到目的地。

        - 如果以物件導向去思考，Socket 就是一個有send / get 的物件，可以設定 protocal 去決定他要用何種協定去傳送資料。
        - TCP socket 基本流程：

            ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%201.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%201.png)

        - Example from wiki:

            ```jsx
            Socket socket = getSocket(type = "TCP")
            connect(socket, address = "1.2.3.4", port = "80")
            send(socket, "Hello, world!")
            close(socket)
            ```

    - 什麼是sequence numbers(SEQ)?
        - IP 協定不保證資料會照發送順序抵達接收端，接收端可利用表頭中的 sequence numbers 欄位進行排序、消除重複 (eliminate duplicates)，以保證資料接收的正確順序，並以位元組串流 (byte-stream) 的方式，傳遞給應用層。
        - Initial Sequence Numbers (ISN) 產生方式

            TCP SHOULD generate its Initial Sequence Numbers with the expression:
                  ***ISN = M + F(localip, localport, remoteip, remoteport, secretkey)***
            where M is the 4 microsecond timer, and F() is a pseudorandom function (PRF) of the connection-id.    —- *RFC 6528*

        - TCP標頭格式：

            ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%202.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%202.png)

    - 什麼是window sizes?
        - Maximum Segment Size (MSS)：

            通訊路徑不同，每次傳送的資料量也不同，因此在建立連線前，會先確認雙方能處理的最大資料量，並以較小者為區段長度上限。

        - Window Sizes:

            由於可以同時傳送好幾個區段，接收端會依自己的處理能力，在通訊過程中調整TCP傳送的區段數量，是一種避免壅塞的機制。

- TCP 三次握手（建立連接）
    - 為什是「三次握手」?
        - 通過三次握手才能阻止重複歷史連接的初始化

            The principle reason for the three-way handshake is to prevent old duplicate connection initiations from causing confusion.     —   RFC 793

            - 如果通信雙方的通信次數只有兩次？→ 接收方不知道這個請求是否過期
            - 由發送方來判斷當前連接是否是歷史連接：
                - 如果當前連接是歷史連接，即`SEQ`過期或者超時，那麼發送方就會直接發送控制消息`RST`中止這一次連接
                - 如果當前連接不是歷史連接，那麼發送方就會發送`ACK`控制消息，通信雙方就會成功建立連接

                    ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%203.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%203.png)

        - 通握三次握手才能初始化通信雙方的sequence numbers
            - 傳輸過程中可能遇到的問題：
                1. 資料重複
                2. 資料丟失
                3. 順序錯誤
            - 使用sequence numbers：
                1. 檢測是否是重複傳送的資料
                2. 發現資料未被`ACK`時重新傳送
                3. 可以重新排序資料
            - TCP連接通信的雙方都需要獲得初始序列號：
                - 發送方：發送`SYN`控制消息，並攜帶自己期望的初始化序列號`SEQ`
                - 接收方：收到`SYN`消息之後，回傳`ACK`控制消息以及`SEQ+1`來進行確認

                ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%204.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%204.png)

                - TCP 連接的發起方可以通過保存發出的序列號判斷連接是否過期
- TCP 四次揮手（斷開連接）

    ![TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%205.png](TCP%20Three-way%20Handshake%20fde8516c5dd249788c49c947c2716e31/Untitled%205.png)

    - 之所以中間的兩個動作沒有合併，是因為tcp存在「半關閉」狀態
    - `time_wait`狀態（此狀態基本上會持續四分鐘）
        - 重傳最後一個`ACK`報文：如果對方沒有收到`ACK`的話，會重傳`FIN`報文，處於`time_wait`狀態的一方會立即向對方重發`ACK`報文
        - 等待殘留報文被丟棄（避免干擾新的鏈接）

## Reference

[漫畫：一招學會TCP的三次握手和四次揮手](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/651340/)

[为什么 TCP 建立连接需要三次握手 - 面向信仰编程](https://draveness.me/whys-the-design-tcp-three-way-handshake/)

[TCP 序列號 (Sequence Number, SEQ) - NotFalse 技術客](https://notfalse.net/26/tcp-seq)

[Why do we need a 3-way handshake? Why not just 2-way?](https://networkengineering.stackexchange.com/questions/24068/why-do-we-need-a-3-way-handshake-why-not-just-2-way)