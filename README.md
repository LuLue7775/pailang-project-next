# Pailang Museum 
此網站為一藝術家的研究計畫建檔網站，計畫名稱為「白浪」，故名為Pailang Museum。

可以在Agenda頁面找到全部的建檔，而計畫建檔文章由三種template構成，「journal」、「scenography」、「video」，由於需要從後台動態新增三種文章與內容，因此技術上採用了NextJS，讓前端頁面可以利用ISR動態build產生新的文章內容。

## 技術棧

| 項目 |  |
| -------- | -------- | 
| 設計     | figma     | 
| 前端框架與套件     | NextJS. Styled Component. Framer motion. React Draggable. 及其他    | 
| 後端     | Directus     | 
| Query     | REST API     | 

此網站無特別支援行動裝置。

## 使用方式
[前端live demp](https://pailangmuseum.com/)

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


## 優化log
