# There're cookies in my browser! — Cookie & Session

Author: @AGa Aga 
Date: Oct 8, 2020
Tags: 延伸閱讀
備註: 延伸閱讀 is really awesome. Give it a look!
性質: Tech Share

### What is cookie & session / Why they're needed

- http is stateless

    ![There're%20cookies%20in%20my%20browser!%20%E2%80%94%20Cookie%20&%20Session%203130ee443e2b40d0b8c4559e76094403/0VNxtk9oY2RvV2-qM.png](There're%20cookies%20in%20my%20browser!%20%E2%80%94%20Cookie%20&%20Session%203130ee443e2b40d0b8c4559e76094403/0VNxtk9oY2RvV2-qM.png)

- Session is a concept

    > *The technique allows clients and servers that
    wish to exchange state information to place HTTP requests and
    responses within a larger context, which we term a "session".
                                                                                                                (from RFC-2109)*

- Cookie is a technique

    > It describes two new (http) headers, Cookie and Set-Cookie, which carry state information between participating origin servers and user agents.
                                                                                                                *(from RFC-2109)*

### Cookie-based session v.s. SeesionID

- Cookie-based session：store data directly in the Cookie
- SeesionID：store data on the server-side, then use SID to get the data

### Common attacks on Session

- Session Prediction
    - Technique：If the SessionID is too weak (short, predictable patern...), then the attacker can guest or bruteforce it.

        ![There're%20cookies%20in%20my%20browser!%20%E2%80%94%20Cookie%20&%20Session%203130ee443e2b40d0b8c4559e76094403/2014-05-16-http-session-protection-03-session-id-analysis.png](There're%20cookies%20in%20my%20browser!%20%E2%80%94%20Cookie%20&%20Session%203130ee443e2b40d0b8c4559e76094403/2014-05-16-http-session-protection-03-session-id-analysis.png)

    - Protection
        - Use [SessionID analysis tool](https://wiki.owasp.org/index.php/Category:OWASP_WebScarab_Project) to evaluate the randomness and unpredictability
        - Use standard library
- Session Hijacking
    - Technique：Hijacking means *to take control of or use something that does not belong to you for your own advantage.* There are many methods to hijack the Cookie.
        - XSS
        - ARP spoofing
    - Protection
        - Set the `HttpOnly` attribute of the Cookie (Can't use by JavaScript)
        - Set the `Secure` attribute of the Cookie (Can only be include when using secure channel)
        - Re-authenticate the user before performing critical operations (Ex: enter the password)
- Session Fixation
    - Technique：Inducing the victim visiting the website using specific Cooike, which is control by the attcker.
    - Protection
        - Change SessionID right after successful login
        - Don't use GET/POST to transmit SessionID

### Why named Cookie ?

A piece of data transmitting between different domain. Unix 'magic-cookie'.

### Reference

[**Awesome Articles**](https://hackmd.io/cURK-JrpSiu1nnVWJaY0MQ?view)

[白話 Session 與 Cookie：從經營雜貨店開始](https://medium.com/@hulitw/session-and-cookie-15e47ed838bc)

[淺談 Session 與 Cookie：一起來讀 RFC · Issue #45 · aszx87410/blog](https://github.com/aszx87410/blog/issues/45)

[HTTP cookies](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Cookies)

[HTTP Session 攻擊與防護 | DEVCORE 戴夫寇爾](https://devco.re/blog/2014/06/03/http-session-protection/)

---

### 延伸閱讀

[淺談 Session 與 Cookie：一起來讀 RFC · Issue #45 · aszx87410/blog](https://github.com/aszx87410/blog/issues/45)