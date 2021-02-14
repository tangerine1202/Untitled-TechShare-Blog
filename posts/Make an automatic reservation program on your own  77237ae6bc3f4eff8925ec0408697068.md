# Make an automatic reservation program on your own — part1

Author: @偉豪 洪 
Date: Nov 26, 2020
性質: Tech Share

## What is API?

API 就像一個介面，可以幫助開發者節省精力，並很快的達到目的。

現在你面前有一台飲料販賣機

1. 你想喝一瓶奶茶
2. 你按了飲料機上的奶茶按鈕
3. 你從取物口拿出奶茶

這其中就蘊含了 API 的概念，奶茶就是「你想取得的資料」，按鈕就是 API ，按下去飲料機就收到了你的需求，並將奶茶從取物口送出，你也就得到了你想要的資料了。

還不夠清楚？

[https://medium.com/avalanche-computing/2020-api-powered-startups快速成長的一年-5304a501fa9](https://medium.com/avalanche-computing/2020-api-powered-startups%E5%BF%AB%E9%80%9F%E6%88%90%E9%95%B7%E7%9A%84%E4%B8%80%E5%B9%B4-5304a501fa9)

## Why is API needed in writing an automatic reservation program?

You need to understand what kind of data you should prepare to send the correct request to the correct place.

![Make%20an%20automatic%20reservation%20program%20on%20your%20own%20%2077237ae6bc3f4eff8925ec0408697068/Screen_Shot_2020-11-26_at_5.23.50_PM.png](Make%20an%20automatic%20reservation%20program%20on%20your%20own%20%2077237ae6bc3f4eff8925ec0408697068/Screen_Shot_2020-11-26_at_5.23.50_PM.png)

## Brute send request

After knowing how to send your request to the correct place, the first thing that popped out in my mind is: Let's send it as fast as possible! And that's how my IP gets freaking locked...

![Make%20an%20automatic%20reservation%20program%20on%20your%20own%20%2077237ae6bc3f4eff8925ec0408697068/Screen_Shot_2020-11-26_at_5.29.54_PM.png](Make%20an%20automatic%20reservation%20program%20on%20your%20own%20%2077237ae6bc3f4eff8925ec0408697068/Screen_Shot_2020-11-26_at_5.29.54_PM.png)

![Make%20an%20automatic%20reservation%20program%20on%20your%20own%20%2077237ae6bc3f4eff8925ec0408697068/Screen_Shot_2020-11-26_at_5.30.21_PM.png](Make%20an%20automatic%20reservation%20program%20on%20your%20own%20%2077237ae6bc3f4eff8925ec0408697068/Screen_Shot_2020-11-26_at_5.30.21_PM.png)

My IP gets locked, my friend IP gets locked, even the lab in NTHU gets locked.

## How do we solve this situation?

It's pretty simple. Use VPN.

What is VPN? Briefly, VPN is a virtual private network that can change your IP address.

## DoS (Denial-of-service)

文言文：DoS attack（Denial of Service attack），中文譯名為阻斷服務攻擊，其目的為透過特殊的攻擊方式來耗盡提供服務伺服器的資源或是頻寬，以達到讓其他的使用者無法使用到服務

白話文（我自己講的參考就好）：就是暴力送爆封包，灌爆他的伺服器，以表達你的不滿。

我們這個Script有點像DoS，但我們的目的只是希望搶場，不是要癱瘓學校的伺服器，所以我們對學校還是很尊敬的唷＾＾。

## What is Shell language?

文言文：Shell provides you with an interface to the Unix system. It gathers input from you and executes programs based on that input. When a program finishes executing, it displays that program's output.

白話文（我自己講的參考就好）：Shell是個可跟作業系統溝通的語言，可以用Shell對自己的電腦下指令並執行。

## Shell tutorial~

[https://blog.techbridge.cc/2019/11/15/linux-shell-script-tutorial/](https://blog.techbridge.cc/2019/11/15/linux-shell-script-tutorial/)

## It's time to code!

## Code 1.0 v.s. Code 2.0

新版與舊版的差異

1. delay time 變長(0.5秒)
2. 縮短暴力送封包的時間（120秒→2秒）
3. 無限迴圈sleep的時間做更動

## Is it automatic enough?

Our training dates are on every Sunday, Monday, Wednesday.

You had to run your code three days before and make sure it has internet.

However, we sometimes don't have internet or computer at the time when the courts are opened.

So, how do we solve this problem?

I will show you guys next time.

Reference:

API :

[https://medium.com/avalanche-computing/2020-api-powered-startups快速成長的一年-5304a501fa9](https://medium.com/avalanche-computing/2020-api-powered-startups%E5%BF%AB%E9%80%9F%E6%88%90%E9%95%B7%E7%9A%84%E4%B8%80%E5%B9%B4-5304a501fa9)

[https://medium.com/codingbar/api-到底是什麼-用白話文帶你認識-95f65a9cfc33](https://medium.com/codingbar/api-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E7%94%A8%E7%99%BD%E8%A9%B1%E6%96%87%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98-95f65a9cfc33)

VPN :

 [https://nordvpn.com/zh-tw/about-vpn-site/](https://nordvpn.com/zh-tw/about-vpn-site/)

Dos : 

[https://ithelp.ithome.com.tw/articles/10188774](https://ithelp.ithome.com.tw/articles/10188774)

Shell : 

[https://www.tutorialspoint.com/unix/unix-what-is-shell.htm](https://www.tutorialspoint.com/unix/unix-what-is-shell.htm)

[https://blog.techbridge.cc/2019/11/15/linux-shell-script-tutorial/](https://blog.techbridge.cc/2019/11/15/linux-shell-script-tutorial/)

Curl : 

[https://curl.se/docs/manpage.html](https://curl.se/docs/manpage.html)