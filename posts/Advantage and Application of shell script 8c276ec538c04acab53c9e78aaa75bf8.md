# Advantage and Application of shell script

Author: @偉豪 洪 
Date: Dec 24, 2020
性質: Tech Share

## What is shell script

- shell : 命令列下面讓我們與系統溝通的一個工具介面
- script : 指令碼、劇本

電腦的運作狀況： 當你要電腦傳輸出來『音樂』的時候，你的電腦需要什麼東西呢？

1. 當然就是需要你的硬體有『音效卡晶片』這個硬體配備，否則怎麼會有聲音
2. 作業系統的核心可以支援這個晶片組，當然還需要提供晶片的驅動程式囉
3. 需要使用者（就是你）輸入發生聲音的指令囉！

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_2.48.25_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_2.48.25_PM.png)

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_2.43.30_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_2.43.30_PM.png)

## First shell script

- 宣告使用哪一種shell
- 養成註解的好習慣
    - 內容與功能
    - 版本資訊
    - 作者與聯絡方式
    - 建立日期
    - 歷史紀錄
- 主要環境變數的宣告
    - PATH
    - LANG
- 主要程式
- exit 0

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.34.38_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.34.38_PM.png)

## Features of shell script

- 純文字檔案
- 正則表示式（Regular Expression）
    - 以行為單位進行字串處理
- 管線命令（Pipe）
    - cut, grep
    - sort, uniq
    - awk
- 資料流重導向

## Why do we learn shell script

- 自動化管理（管理主機為例）
    - 查詢登入檔案
    - 追蹤流量
    - 監控使用者使用主機狀態
    - 主機各項硬體裝置狀態
    - 主機軟體更新查詢
    - 使用者的要求
- 簡單的入侵偵測
    - 固定時間偵測並分析系統登入檔案
        - 立刻通報管理員
        - 立刻加強防火牆的設定規則
- 連續指令單一化
    - 彙整一些command line下達的連續指令
- 簡易的資料處理
    - 正則表示式awk
    - 舉例：學校學生的Linux操作帳號
- 跨平台支援與學習歷程較短
    - 幾乎所有Unix Like上面都可以跑
    - 程式語言簡單易懂
    - 可以用vim直接編寫

## How to run a share script and what is chmod

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.45.30_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.45.30_PM.png)

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.46.28_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.46.28_PM.png)

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.49.26_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.49.26_PM.png)

![Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.48.08_PM.png](Advantage%20and%20Application%20of%20shell%20script%208c276ec538c04acab53c9e78aaa75bf8/Screen_Shot_2020-12-24_at_4.48.08_PM.png)

[Linux學習筆記26--什麼是 Shell scripts、shell script練習及講解](https://www.itread01.com/content/1547429657.html)

[第五章、Linux 的檔案權限與目錄配置](http://linux.vbird.org/linux_basic/0210filepermission.php)

[第十章、認識與學習BASH](http://linux.vbird.org/linux_basic/0320bash.php)