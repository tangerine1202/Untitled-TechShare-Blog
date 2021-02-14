# Client & Server / Rendering / Frontend & Backend

Author: @Elva Wang 
Date: Sep 24, 2020
性質: Tech Share

# Client

**可以呈現 server 端所傳來的資訊，並提供user本地服務的程式**

- 如 Browser, App ... 等
- 發 request 給 server
- 處理 server 給的 response 並呈現

# Server

**用來提供使用者web服務的軟硬體 （web server)**

- 如 Apache、Tomcat、Nginx … 等
- 接收 client 給的 request
- 應要求給出 response
- 儲存、提供 data

## Client-server model

- **`Client` 會透過 HTTP 協定 (或其他) 送出 `request` 到 `Server` 去提取資料 (`Get`)**
- **當`Server`接收到`Client`的請求，經確認且`Server`有該資料時，就會回傳一個帶有資料的 `response` 給 `Client`**
- `Server Push`：在 HTTP/2 中新增的一種交互模式
    - `Server` 能夠推測 `Client` 所需的資料，『主動』送出回應，進而增進效率

![Client%20&%20Server%20Rendering%20Frontend%20&%20Backend%20a54cc7b9eecf42038b52b51af9e859da/Untitled.png](Client%20&%20Server%20Rendering%20Frontend%20&%20Backend%20a54cc7b9eecf42038b52b51af9e859da/Untitled.png)

### 順帶一提：P2P (peer-to-peer)

- 點對點架構
- 每個使用者的電腦同時扮演 client side 與 server side。

---

# Frontend

**The part that users interact with.**

- Language: `HTML`（描述網頁內容）, `CSS`（美化網頁）, `JavaScript`（網頁動態效果、邏輯）
    - Make code (and the process of writing it) more manageable and organized
        - Ancillary libraries: `Sass`,  `jQuery`
        - Frameworks: `React.js`, `Angular.js`, `Vue.js`
- User interface (UI)
- User experience (UX)
- SEO

# Backend

**Responsible for storing and organizing data behind the scenes, and ensuring everything on the client-side actually works.**

- Language: `Java`, `Python`, `Ruby`, `. Net`, `Javascript` etc.
    - A systematic collection of data, typically stored electronically in a computer system.
- `Database`:
    - `SQL` vs `NoSQL`,  `MySQL` vs `MongoDB`
    - `CRUD`: `create`, `read`, `update`, and `delete`

- `API` (application programming interface)
    - A way to programmatically interact with a separate software component or resource.
    - Defines the `kinds of calls or requests` that can be made, `how to make` them, the `data formats` that should be used, the conventions to follow, etc

![Client%20&%20Server%20Rendering%20Frontend%20&%20Backend%20a54cc7b9eecf42038b52b51af9e859da/Untitled%201.png](Client%20&%20Server%20Rendering%20Frontend%20&%20Backend%20a54cc7b9eecf42038b52b51af9e859da/Untitled%201.png)

- Security

---

# Rendering

## Server-side rendering (SSR)

- 由後端渲染好 (`HTML`)，將頁面傳至前端
- client 與 server 之間的溝通很頻繁，使用者體驗差 （要一直換頁）

— ***Client 電腦處理能力越來越好～***

***漸漸將完整的使用者介面程式都放到 client 上，就有了Client-side rendering！—***

## Client-side rendering (CSR)

- 後端給出原始資料 (`JSON`)，由前端決定如何用JavaScript 去渲染 (`HTML`)
- 需要處理的 request & response 變少
- `Angular`, `React` and `Vue.js` 等 JavaScript 框架興起 ⇒ CSR became popular

### 缺點

1. 太多東西被封裝在 server 傳給 client 的 JS 文件中 ⇒ client 初始 loading 變慢
2. SEO 變很差
    - Search Engine Optimization (SEO) :

        一種透過了解搜尋引擎的運作規則來調整網站，以及提高網站在搜尋引擎內排名的方式

    - **用 React.js、Vue.js 等框架做網頁 ⇒ CSR**

        **因為一切都是在前端才渲染完，所以爬蟲去讀就會拿到空白畫面，搜尋引擎（如 Googlebot）也是，那搜尋引擎便無法讀懂你的畫面 ⇒ 排名差**

— ***就有了 Isomorphic rendering 出現 —***

## Isomorphic rendering

- Render a web application on the server-side the first time a page is loaded and on the client-side afterward.
- 現在有時候也被叫SSR
- 如 Next.js (React.js)、Nuxt.js (Vue.js)

*圖為 Vue.js (搜尋引擎看不懂)*

![Client%20&%20Server%20Rendering%20Frontend%20&%20Backend%20a54cc7b9eecf42038b52b51af9e859da/_2020-09-23_10.31.03.png](Client%20&%20Server%20Rendering%20Frontend%20&%20Backend%20a54cc7b9eecf42038b52b51af9e859da/_2020-09-23_10.31.03.png)

---

# Reference

[Frontend vs Backend: What's The Difference?](https://www.pluralsight.com/blog/software-development/front-end-vs-back-end)

[Web server](https://en.wikipedia.org/wiki/Web_server)

[Rendering on the Web | Google Developers](https://developers.google.com/web/updates/2019/02/rendering-on-the-web)

[front-end vs back-end vs client-side vs server-side](https://chunksofco.de/front-end-vs-back-end-vs-client-side-vs-server-side-7a04b3ec8764)

[閒談軟體架構：Client Server](https://medium.com/%E9%96%92%E8%AB%87%E8%BB%9F%E9%AB%94%E6%9E%B6%E6%A7%8B/%E9%96%92%E8%AB%87%E8%BB%9F%E9%AB%94%E6%9E%B6%E6%A7%8B-client-server-85cc54a4423)

[Client-side Render 和 SSR 的差別](https://noob.tw/client-server-side-render/)