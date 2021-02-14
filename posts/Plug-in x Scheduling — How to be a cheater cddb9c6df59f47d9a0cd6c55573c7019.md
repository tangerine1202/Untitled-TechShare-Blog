# Plug-in x Scheduling — How to be a cheater

Author: @偉豪 洪 
Date: Oct 15, 2020
備註: Please don't share with other people, or we will left no courts to use...
性質: Tech Share

# **What is Wireshark?**

Wireshark is a free and open-source packet analyzer. It is used for network troubleshooting, analysis, software and communications protocol development, and education.

# What is a plug-in?

A **plug-in** is a software add-on that is installed on a program, enhancing its capabilities. For example, if you want to watch a video on a website, you may need a plug-in to do so. If the plugin is not installed, your browser will not understand how to play the video.

![Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/Screen_Shot_2020-10-08_at_2.10.45_PM.png](Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/Screen_Shot_2020-10-08_at_2.10.45_PM.png)

The file which send back to the client would be like...

![Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/Screen_Shot_2020-10-14_at_4.08.11_PM.png](Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/Screen_Shot_2020-10-14_at_4.08.11_PM.png)

so that is why we need a plug-in to get access to the file!

For example : flash — a plug-in that enable you to play some games~

# What is Scheduling?

**前情提要：**

在古代，臣子想要見皇帝一面是需要先跟太監報備的，

如果太監不喜歡這個臣子，

那麼他恐怕就很難見到皇帝一面。

**人物設定：**

皇帝、太監、一號大臣、二號大臣、三號大臣、四號大臣

**故事：**

假設現在皇帝正在跟 1 號大臣討論賦稅的問題。2 號的大臣匆匆趕來，他想跟皇帝

討論選妃的事，太監覺得不是什麼大不了的事，就請 2 號大臣在外頭等候聽宣。

這時 3 號大臣也來了，他說十萬火急，因為匈奴入侵中原了... 太監一聽，此事

非同小可，所以他立刻帶著 3 號大臣進去面聖，而 1 號大臣就被帶出到外頭候著。

這時 4 號大臣也跑來，他想問問皇帝冬天要不要去遊江南避寒。這種芝麻小事，

太監也會叫他在外頭候著。當皇帝跟 3 號大臣擬定戰略部署後， 3 號大臣便離去。

這時太監便開始想，到底這時該讓誰去面聖 ? 是賦稅、選妃、還是下江南遊樂重要?

**背後用意：**

注意，排程問題有分「**可搶先(preemptive)**」與「**不可搶先(non-preemptive)**」兩種，

在故事中，皇上還沒處理完1號大臣的問題，就先換處理3號大臣的問題，這就是**可搶先**的例子。

如果皇上必須先處理完1號的問題，或1號大臣忘記拿資料先回家拿，才換3號進來面聖，那就是**不可搶先**的例子。(雖然2號比3號先來)

---

## **排程常用的Algorithm:**

### **一、先來先到排程法(first-come-first-served, FCFS)**

大綱：如果太監依照大家來的順序一個接著一個帶去見皇帝，稱為FCFS排程法。

**例子一：**1號大臣(24分鐘)、2號大臣(3分鐘)、3號大臣(3分鐘)，在t=0時，依序來了2、3、1號大臣。

![Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/1.png](Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/1.png)

等待時間(average waiting time，簡稱AWT)為___分鐘。

**潛在問題 :** convoy effect(護衛效應)，指的是如果執行時間短的程式排在執行程式長的程式後面，造成的平均等待時間很長。

**例子二 :** 1號大臣(24分鐘)、2號大臣(3分鐘)、3號大臣(3分鐘)，在時間點0時，依序來了1、2、3號大臣。

![Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/2.png](Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019/2.png)

等待時間（AWT）為___分鐘。

**結論：**因此，先來先到排程法很可能為了等執行時間長的程式，對效能有不良的影響。

### **二、最短工作優先排程法(shortest job first，簡稱SJF)**

大綱：優先執行可以最快結束的程式，改良convoy effect的問題，亦分為「可搶先(preemptive)」與「不可搶先(non-preemptive)」兩種。

- 可搶先: 故事中，當 2 號大臣來時，太監發現 2 號大臣只帶了兩張妃子畫像。反正很快，太監便帶 2 號大臣先給皇上選妃，讓1號暫時先去等候。
- 不可搶先：等 1 號討論完之後，太監再看看目前等候的臣子(2,3,4)，誰可以最快跟皇帝討論完，就帶誰進去面聖。

### **三、優先等級排程法(priority scheduling)**

大綱：亦分為「可搶先(preemptive)」與「不可搶先(non-preemptive)」兩種。原故事中的太監即屬於**可搶先的優先等級排程法**。

但是潛在的問題便是如果一直有其它大臣有重要事情來找皇上，那對於小事來找皇上的大臣，可能排隊很久也見不到皇上，用電腦語言來說即為:

- **潛在問題:** starvation(餓死)，指的是程式一直沒有被執行到的狀況。原因是若優先權高的程式一直不斷的來，那麼優先權低的程式就可能永遠執行不到。
- **解決方法:** aging(年齡增長)，意思是每隔一段時間，就增加沒有被執行程式的優先權，避免有些程式永遠等不到CPU執行。

### **四、知更鳥式排程法(Round-Robin，簡稱RR)**

**大綱：**太監每隔10分鐘就進去對皇帝說，皇上，十分鐘到了，先輪下一位大臣吧...

**結論：**可解決餓死的問題

![Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019.jpeg](Plug-in%20x%20Scheduling%20%E2%80%94%20How%20to%20be%20a%20cheater%20cddb9c6df59f47d9a0cd6c55573c7019.jpeg)

---

## 小測驗

- Wireshark的功能是什麼？
- 什麼是plug-in？
- 為什麼我們需要plug-in？
- plug-in在什麼時機才會用上？
- 什麼是AWT？
- 什麼是convoy effect？
- 什麼是preemptive and non-preemptive？
- 什麼是starvation？
- 什麼是aging？
- 先來先到排程法存在什麼問題？
- 優先等級排程法存在什麼問題？
- 知更鳥式排程法解決什麼問題？

---

# **自動化搶場程式**

**本質：**在時間快到的時候送爆封包，並可達到預約時間搶場的功能。

**背景知識：**前端與後端的關係、Wireshark的用途、排程的基本概念、基本bash語法（略）

---

### **Reference :**

排程：[https://ithelp.ithome.com.tw/articles/10229511](https://ithelp.ithome.com.tw/articles/10229511)

plug-in : [https://www.ithome.com.tw/node/5863](https://www.ithome.com.tw/node/5863)