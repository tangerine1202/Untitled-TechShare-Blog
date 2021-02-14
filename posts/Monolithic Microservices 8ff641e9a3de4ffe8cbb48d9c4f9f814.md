# Monolithic ? Microservices ?

Author: @Elva Wang 
Date: Jan 7, 2021
Tags: 延伸閱讀
性質: Tech Share

# Monolithic ( 單體式服務 )

- 架構

    把所有要使用到的服務都一起放在一個Server裡，也就是把所有 router, middleware, services, DB 都放在一起去完成一個 application。

- 運作

    當 Application Layer 的 Request 進來 Server 後，由 Router 去分配給不同服務去執行或更新和接收 DB 資料。

![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled.png)

### 產生的問題

1. 複雜、大規模的單體架構難以開發及維護，追踪 Bugs 需要長時間詳細閱讀 codes。
2. 每一項模組中的變更修改都需要重新部署整個 application
    - 需要相當長的停機時間，阻礙專案的開發、測試和維護。
3. 選擇部署環境
    - 開發人員被迫接受單一種配置。
    - 被迫沿用原始應用程式的相同語言和框架。
    - 或因相依性問題必須使用高規格的硬體資源。
4. 限制了可擴展性。

# Microservices ( 微服務 ）

## What is microservices ?

- 依單一功能服務切出很多小的 components，組合成一個大 application。
- 各個服務可在獨立進程中運行、獨立部署、用不同語言編寫。
- 每一個 service 有自己的 DB（也可能沒有或共用），且不會直接訪問互相的 DB 去要資料。
- components 們（各項服務）以 API 作為溝通橋樑。

![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%201.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%201.png)

## Services 間的 communications

每個服務的獨立與自主很重要！

⇒ 倘若真有溝通，也應採用非同步溝通的方式來避免緊密的相依性問題。

⇒ 以下兩種方法

### 事件儲存中心（Event Store）

- request 發來 ⇒ 每個 service 監聽這些 events 並做處理 ⇒  events 被存在 Event Store 裡。
    - services 間沒有緊密相依
    - 當微服務重新上線、部署時可以重播（Replay）所有的事件。
        - 微服務的 DB 隨時可以被刪除、摧毀，且不需要從其他服務中取得資料。

![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%202.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%202.png)

### 訊息佇列（Message Queue）

- request 發來，Message Queue 會將訊息傳遞到其他 service 中。
- 此舉是非同步 (asynchronous) 執行，不需要等到其他 Services 收到訊息就能執行下一步，但也無法取得處理結果。

    ⇒ 能夠避免服務之間有所牽連、呼叫。

    ![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%203.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%203.png)

- 在 Service A 上廣播一個 event，而 Service B 和 C 可以監聽這個 event 並處理。
- 與事件儲存中心近乎相似，但有所不同的是：訊息佇列並不會儲存事件。一旦事件被消化（接收）後就會從佇列中消失。

### What synchronous & asynchronous ?

傳統上 services 間可透過 Web Service/REST API 來溝通，但基於 HTTP 的溝通是是同步的(syncronous)，並衍伸出以下問題。

1. 兩 services 間必須同時是可運行的狀態，若一方故障會導致整個功能失效。
2. 當 service A 送出 Request 給 service B 後必須等待 B 的 Response 才會繼續後續工作。
3. 當 A 傳資料給 B 時 B 發生故障 :
    - A 該如何處理錯誤 ? 資料該如何暫存 ? 多久該進行重送 ?

    當 B 回應而 A 故障 : 

    - 造成傳輸資料丟失。
4. 接收多方送來的大量 requests 時會造成故障。
5. 要如何送訊息給多個服務。

**非同步(asynchronous) :** 

1. 彼此不需知道對方的存在。
2. 利用 MQ 的事件驅動 (Event-driven) 的 `publish / subscribe`  or  `producer / consumer` 

    ⇒ 當 service 需要接收另個服務的資料時，向 MQ 訂閱

    ⇒ 一旦有新的訊息 MQ 便會發送給訂閱方。

3. Service 送資料給 MQ 後即可繼續進行後續的任務，不會因等待回應而造成阻塞。
4. 當一個 service 處理不來時，可輕鬆地增加新的 service 並由 MQ 進行分派。
5. MQ 可保存發送或回應訊息，在故障回復時可重送訊息，避免因故障造成的訊息丟失。

### microservices 的 databases

- 不同形式
    - 每個服務都各有一個資料庫，同屬性的服務可共享同個資料庫。
    - 所有服務都共享同個資料庫，但是不同表格，並且不會跨域存取。
    - 每個服務都有自己的資料庫，就算是同屬性的服務也不會共享。

！注意！：資料庫並不會只存放該服務的資料，而是「該服務所會用到的所有資料」。

- **資料庫的可棄性**
    - 實踐微服務的其中一種做法是將資料庫作為短期的儲存空間而非長期。

        ⇒ 資料庫可以在離線時被清空。

    - 可在上線時從`事件儲存中心`恢復，因此能以記憶體快取（如：Redis） 作為資料庫伺服器。
        - 需要將每個 request 當作 event 來進行傳輸。

## 步入 microservices 重要的事：

- 具備快速建置的能力
    - 分散式系統帶來的複雜度，讓開發者必須謹慎處理系統一致性的問題。
    - 要達到嚴謹的微服務架構，應用系統開發階段就必須高度自動化。
- 具有良好監控系統
    - 微服務由很多 components 組成，系統故障時不容易發現問題在哪。
- 快速部署

## Container

**隨著 Container 進步，解決 Microservices 的技術困難...**

- 可將 microservices 的眾多小 components 放在容器中，分開部署、運行，
- Docker
- K8s

.....( 待補充 )

![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%204.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%204.png)

## Microservices vs. Monoliths

![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%205.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%205.png)

## Q & A

### Saga

Implement each business transaction that span multiple services as a saga.

Saga is sequence of **local transactio**n. Each transaction update the database, then publish a message or event to trigger the next local transaction in saga.

If a local transaction fails, then saga execute the compensating transaction that **undo** the changes that were made by preceding transactions.

- Two ways to coordinate sagas:
    1. **Service Orchestration**
        - a single centralized executable business process (process manager / the orchestrator) that coordinates the interaction among different services. The orchestrator is responsible for **invoking** and **combining** the services.
        - Orchestration employs a **centralized** approach for service composition.

        ![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%206.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%206.png)

    2. **Service Choreography**
        - global description of the participating services, which is defined by exchange of messages, rules of interaction and agreements between two or more endpoints.
        - Choreography employs **decentralized** approach for service composition.

        ![Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%207.png](Monolithic%20Microservices%208ff641e9a3de4ffe8cbb48d9c4f9f814/Untitled%207.png)

- Comparison between Orchestration & Choreography
    - Orchestration -> easy to monitor
    - Choreography -> easy to extend
- Benefit
    - Enable application to maintain data consistency across multiple service without using distributed transaction
- Drawback
    - Programming model is more complexity. e.g. must design compensating transaction that undo changes made by the earlier transaction in sagas
    - There are also the following issues to address:
        - In order to be reliable, a service must atomically update its database  publish a message/event. It cannot use the traditional mechanism of a distributed transaction that spans the database and the message broker. Instead, it must use one of the patterns listed below.

    [Choreography vs Orchestration](https://medium.com/ingeniouslysimple/choreography-vs-orchestration-a6f21cfaccae)

    [https://stackoverflow.com/questions/4127241/orchestration-vs-choreography](https://stackoverflow.com/questions/4127241/orchestration-vs-choreography)

## Reference

[Communication in a microservice architecture](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/communication-in-microservice-architecture)

[技術觀念 | 淺談分散式系統 - 微服務 | J.J.'s Blogs](https://morosedog.gitlab.io/technology-20200304-tech-10/)

[為何在微服務中使用訊息佇列 Why use Messaging Queue in Microservices](https://matthung0807.blogspot.com/2020/08/messaging-queue-in-microservices.html)

[從單體到微服務](https://medium.com/@yunchenli/從單體到微服務-12e206805089)

[Design Microservices Architecture with Docker Containers](https://www.sumologic.com/insight/microservices-architecture-docker-containers/)

### 延伸閱讀

[What are microservices?](https://microservices.io/)