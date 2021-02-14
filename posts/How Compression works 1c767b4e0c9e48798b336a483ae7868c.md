# How Compression works

Author: @Hsu Tzu Ting 
Date: Dec 24, 2020
性質: Tech Share

- remove redundancy

## Lossless Compression (無失真)

→ text and data files

- RLE (Run-length encoding)

    ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled.png)

- Huffman Code (bottom up)
    - Uniquely decoded
    - Prefix property (→ no prefix)

    ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%201.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%201.png)

- Shannon-Fano (top down)

    ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-21_at_11.16.35_PM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-21_at_11.16.35_PM.png)

- LZ77

    ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%202.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%202.png)

    - Compression time vs. Required memory

## Lossy Compression (失真)

→ multimedia data

- Quantization 量化
    - 將一個包含很多可能值的集合用一個較少個值的集合來表示的過程
        - {x | x∈R, 0 ≤ x ≤ 7} → {x | x∈Z, 0 ≤ x ≤ 7}

            ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%203.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%203.png)

        - GIF

            ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_8.38.35_AM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_8.38.35_AM.png)

            [https://www.youtube.com/watch?v=NZ8l_nnzvjw](https://www.youtube.com/watch?v=NZ8l_nnzvjw)

- Transform coding
    - 透過數學轉換映射到另一個值域
    - 常常跟量化一起使用
        - RGB → YCbCr
            - Y: brightness of the color (明度)

                → more sensitive to the human eye

                ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_9.34.09_AM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_9.34.09_AM.png)

            - Cb: blue component relative to the green component (彩度)

                → less sensitive to the human eye

            - Cr: red component relative to the green component (彩度)

                → less sensitive to the human eye

            - example

                ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_8.52.37_AM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_8.52.37_AM.png)

                ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_8.55.34_AM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_8.55.34_AM.png)

        - DCT

            ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%204.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%204.png)

- Perceptual coding
    - 壓縮的好壞誰說的算？（數學公式 or 人）
        - 心理聲學 ex. Auditory masking effect

### Image

- JPEG
    - 壓縮技術
        - .jpeg, . jpg, .jpe ...... 使用這個技術做圖片壓縮

    ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_10.09.36_AM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_10.09.36_AM.png)

    [http://disp.ee.ntu.edu.tw/meeting/維毅/An Introduction to Image Compression/An introduction to Image Compression.pdf](http://disp.ee.ntu.edu.tw/meeting/%E7%B6%AD%E6%AF%85/An%20Introduction%20to%20Image%20Compression/An%20introduction%20to%20Image%20Compression.pdf)

    1. Transform coding: RGB → YCbCr
    2. Chroma subsampling 色彩採樣
        - (J, a, b)
            - J: horizontal sampling reference (width, usually 4)
            - a: number of chrominance samples (Cr, Cb) in the first row
            - b: number of changes of chrominance samples (Cr, Cb) between 1st and 2nd row

        ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_9.50.39_AM.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Screen_Shot_2020-12-22_at_9.50.39_AM.png)

    3. DCT Transformation 
        - 8 pixels x 8 pixels
    4. Encoding

        ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%205.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%205.png)

### Video

*without compression: 1920x1080pixels / frame = 2073600 pixels / frame = 60M pixels / second*

- Long sequence of images
    - 單一 frame 的 compression → Spatial Compression (Intraframe)
        - 使用圖片壓縮 → JPEG
    - frame 與 frame 之間的 compression → Temporal Compression (Interframe)
        - Temporal redundancy
            - eg. 背景圖片，基本上連續好幾個 frame 都有
        - Inter-frame Similarity
            - eg. 移動的車子
            - 透過移動、旋轉 patches，所以不用 retransmit
- MPEG
    - I-frame
        - 資料量最大
        - 不需要參考其他 frame
        - 做 Spatial Copression (類似JPEG)
    - P-frame
        - 參考前面的 I-frame，預估移動向量
    - B-frame
        - 資料量最小
        - 參考 I-frame, P-frame，做一些預估＆修改
- Compression Failure

    I-frame 壞掉或來不及運算更新frame

    ![How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%206.png](How%20Compression%20works%201c767b4e0c9e48798b336a483ae7868c/Untitled%206.png)

### Reference

[How data compression works: exploring LZ77](https://towardsdatascience.com/how-data-compression-works-exploring-lz77-3a2c2e06c097)

[Overview](https://cs.stanford.edu/people/eroberts/courses/soco/projects/data-compression/overview/index.htm)

[Compression: Crash Course Computer Science #21](https://www.youtube.com/watch?v=OtDxDvCpPL4)

[Video Compression as Fast As Possible](https://www.youtube.com/watch?v=qbGQBT2Vwvc)