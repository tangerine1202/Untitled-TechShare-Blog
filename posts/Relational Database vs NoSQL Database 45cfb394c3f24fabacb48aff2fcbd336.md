# Relational Database vs NoSQL Database

Author: @Alan Huang 
Date: Sep 24, 2020
性質: Tech Share

Database vs DBMS (database management system)

## Relational Database (SQL DB)

SQL = structure query language

Database → Tables (schema) → Rows

- very strict data form → schema
- multiple table → relations
- SQL → capable of querying relations data → join
    - benefit:
        - normalize and distribute data
    - drawback:
        - join data take longer operation time

### Types of Relations

- One to One
    - unique foreign key
    - e.g.
        - student ←> contact
- Many to One
    - foreign key (allow duplicate)
    - e.g.
        - user → product
- One to Many
- Many to Many
    - intermediate table
    - e.g.
        - students  <-> course
- Unidirectional vs Bidirectional

    not affect the mapping but will make difference on how you can access your data.

    [Difference Between One-to-Many, Many-to-One and Many-to-Many?](https://stackoverflow.com/questions/3113885/difference-between-one-to-many-many-to-one-and-many-to-many)

## NoSQL Database

Database → Collections → Documents

- No schema → flexible
    - downside:
        - not sure data format
- No relation → merged data manually (kind of
    - very collection contain **all the data you need**
        - less merging data → super fast!
    - duplicated data
        - **great for lots of read, not many write (vice versa, since it's normalized and distributed data into multiple tables, it's better for lots write application)**

```jsx
collection -> document
// User
{
	username: 'alan',
	phone: {
		main: 09091234567,
		sub:  09765432111
	},
	email: {
		main: 'main@gamil.com',
		school: 'schoool@nthu.edu.tw'
	},
	school: {
		name: 'nthu',
		building: {
			CS: 'delta',
			room: {
				124: {...},
				302: {...}
			},
		...
	}
}

```

## Compare SQL and NoSQL

- Schema vs. no Schema
- Relations / distributed across multiple tables
    - SQL
        - (y) better for frequently changing data
        - (n) join / query large data is slow
    - NoSQL
        - Data is merged / nested in few collection
        - (y) no join, query is very fast
        - (n) one change need to modify multiple collection, if application has lots of write, it may not be a good choice.
- Scaling
    - Horizontal: add more server / Vertical: improve server capability (have limitatoin)
    - SQL hard to horizontal scaling (since relations), possible to vertical scaling
    - NoSQL design to horizontal scaling, possible.
- limitation to large read / write query
    - SQL
        - Read → complex join take more times.
        - Write → (maybe) lock a table when writing (ACID).
    - NoSQL
        - great for mass (simple) read & write request

### Choose Database

- SQL
    - need clear schema
    - lots of relation
    - data change frequently
- NoSQL
    - read a lot
    - write a lot but no update lots of collection
    - better to scaling

[SQL vs NoSQL or MySQL vs MongoDB](https://www.youtube.com/watch?v=ZS_kXvOeQ5Y)

### Example

- 適合 Relational DataBase
    1. 帳戶扣款 → 同步、正確，追求 Consistancy，不追求 Availablity
- 適合 NoSQL Database
    1. FB 按讚 → 快速回應、不需要即時正確，追求 Availablity，不強求 Consistancy

## ACID

- **Atomicity (原子性 → can't be split)** : transaction中的所有操作，全部完成或者全部不完成，不會結束在中間某個環節。在執行過程中發生錯誤，會被回滾（Rollback）到事務開始前的狀態。即，事務不可分割、不可約簡。
- **Consistency (一致性)**：在事務開始之前和事務結束以後，資料庫的完整性沒有被破壞。
    - Consistency in Data

        資料庫的完整性，由使用者定義。例如，轉帳扣款成功後發生錯誤，轉入帳戶沒有增加金額，則資料庫完整性被破壞。

        - Define by the user
        - Atomicity
        - Isolation
    - Consistency in reads
        - If a transaction committed a change will a new transaction immediately see the change ?
            - Lag to update replicas of a   (horizontal scaling)
            - Every database suffers from this.
        - Eventually consistency
- **Isolation (隔離性)**：資料庫允許多個 transactions 同時對其資料進行操作，但也同時確保這些 transaction 的交叉執行，不會導致數據的不一致
    - Read Phenomena
        - Dirty read

            Any transaction can read data before other transaction commit the change.

            - e.g.

                init: `cost = 5`

                transaction A: read `cost (5)`

                transaction A: `cost = cost + 1 (6)`

                transaction B: read `cost (6)`

                transaction B: `cost = cost + 1 (7)`

                transaction A: fail and rollback. (`cost = 5`)

                transaction B: commit. (`cost = 7`)

                expect: `cost = 6`, but get `cost = 7`

            Solve by Read committed isolation.

        - Non-repeatable read

            Read same data, get different value.

            - e.g.

                init: `cost = 5`

                transaction A: read `v1 = cost (5)`

                transaction B: read `cost (5)`

                transaction B: `cost = cost + 1 (6)`

                transaction B: commit. (`cost = 6`)

                transaction A: read `v2 = cost (6)`

                transaction A: assert `v1 == v2` fail.

            Solve by Repeatable read isolation.

        - Phantom read

            New data comes in.

            Solve by Serializable transaction.

    - Isolation Level

        init `var = 0`

        transaction A: |———————> set `var = 5` ——————-> commit change.

        transaction B: |—> read `var` ————————> read `var` —————————> read `var`

        - Read uncommitted

            No isolation, any change from outside is visible to the transaction.

            → Dirty read.

            Problem: transaction A may fail and rollback, then 2nd read would get a failed value.

        - Read committed

            Each query in a transaction only sees committed stuff. 

        - Repeatable Read

            Each query in a transaction only sees committed updates at the beginning of transaction 

        - Serializable

            Transaction is serialized. (One transaction a time, no parallel)

        Higher isolation level, lower performance

- **Durability (耐久性)**：transaction 完成後，對資料的操作就是永久的，即便系統故障也不會丟失。

[Relational Database ACID Transactions (Explained by Example)](https://www.youtube.com/watch?v=pomxJOFVcQs)

## BASE

- **Basically Available**：保持服務基本可用
- **Soft State**: 狀態可以有一段時間的不同步
- **Eventual consistency (最終一致性)**：雖然有一段時間不同步，但追求最後結果一致

### Reference

[**Awesome Articles**](https://hackmd.io/cURK-JrpSiu1nnVWJaY0MQ?view)

none found.