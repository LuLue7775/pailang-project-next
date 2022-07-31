# Pailang Museum 
此網站為一藝術家的研究計畫建檔網站，計畫名稱為「白浪」，故名為Pailang Museum。

主要需求：可以在Agenda頁面找到全部的建檔，而計畫建檔文章由三種template構成，「journal」、「scenography」、「video」，由於需要從後台動態新增三種文章與內容，因此技術上採用了NextJS，讓前端頁面可以利用ISR動態build產生新的文章內容。 
其他，「journal」、「scenography」中有draggable box，其中內容是會在每次畫面刷新randomize內容，並且點選box會撥放隨機音效。

## 技術棧

| 項目 |  |
| -------- | -------- | 
| 設計     | figma     | 
| 前端框架與套件     | NextJS. Styled Component. Framer motion. React Draggable. 及其他    | 
| 後端     | Directus     | 
| Query     | REST API     | 

此網站無特別支援行動裝置。

## 使用方式
[前端live demo](https://pailangmuseum.com/)

[後端repo連結](https://github.com/seanmars/pailang-admin)

可直接觀看live demo，也歡迎`git clone`此repo
```bash
npm i 
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Feature

- 主頁面動態變換當期展覽(由後台指定文章)
![](https://i.imgur.com/LDuaUBd.gif)

- 從agenda可找到所有計畫建檔文章
![](https://i.imgur.com/BU5nmpR.gif)

- 每篇文章都有一個完整一頁的大標題與展覽簡介
![](https://i.imgur.com/inbsJJc.gif)

- 三種template的layout各自不同，
    - 「journal」
    ![](https://i.imgur.com/ZpzdaFn.gif)

    - 「scenography」
    ![](https://i.imgur.com/mh0m6Ik.gif)

    - 「video」
    ![](https://i.imgur.com/pJCXhxt.jpg)


- About頁面可觀看計畫簡介
![](https://i.imgur.com/CmtmY5b.gif)

- 後台
directus屬關聯式資料庫，所有文章間能夠共享所有的drag box data。
![](https://i.imgur.com/bQ78Zm1.jpg)


## 優化log ( on progress )
因為此網站有些許互動設計，需要特別注意互動時的渲染狀況，此紀錄在第一部分`React 渲染優化`。
其他則為request階段和一些web vital問題。

### React 渲染優化
**依據頁面羅列 porformance bug**
- All pages
    - issue: custom mouse cursor 
    Cursor元件的position state 導致嚴重的頁面rerender
    ![](https://i.imgur.com/hHcnXkW.jpg)

    調整layout和state collocation之後，只有Cursor元件自己rerender。
    ![](https://i.imgur.com/dKE4ibd.jpg)
    
    - issue: chevronUp scrollTo
    (其餘綠色的rerender為mouse cursor請忽略)
    有兩個異常spike：均顯示因為cursorContext導致整個文章內容區域rerender
    
    ![](https://i.imgur.com/ppnGUBl.jpg)
    ![](https://i.imgur.com/wHuHzwb.jpg)

    - issue: on first render
   第一次render都需要將近一秒的時間，表示request networking方面可以再優化。
   備註: 自從加入聲音特效，除了原本有的2次rerender(其實也是個performance bug)，又多了幾項零星的小render。原因是聲音特效(useSound)引入的的方式是在各個子元件(NodeName)底下各自引入，導致引入時間不一，理想的方式英文在父元件全部一起引入，再以props傳入。
    ![](https://i.imgur.com/QhYRRkF.jpg)
    
    - issue: on page load 3次render
    結果判斷為drag boxes data造成的rerender
    第一次
    ![](https://i.imgur.com/2JBdiNk.jpg) 
    - (此時data尚未傳入)
    第二次 (title animation)
    ![](https://i.imgur.com/TEJzn09.jpg)
    - 文章區塊的data被引入造成的rerender
    第三次
    ![](https://i.imgur.com/QTVgN3D.jpg)
    - Nav區塊：右上角的play button撥的是背景音樂，此音檔滿大，local file。 使用useSound引入。

    
- Video page 
    - issue: on page load 5次render
    雖然此頁沒有drag box，但有video request。另外在nav部分還有一個在nav上的rerender，
    第二次
    ![](https://i.imgur.com/TEJzn09.jpg)
    - Nav區塊：右上角的play button撥的是背景音樂，此音檔滿大，local file。 使用useSound引入。
    - Title動畫
    - Video player
    第三次: 
    ![](https://i.imgur.com/QTVgN3D.jpg)
    - Video player suspense
    第四次: 
    - Nav useSound 又一次rerender
    第五次: 
    - Video player state
- Agenda page

### Metric

### Caching & Networking
