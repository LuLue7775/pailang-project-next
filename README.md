
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

[後端repo連結](https://github.com/seanmars/pailang-admin)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## feature

- 主頁面動態變換當期展覽(由後台指定文章)

![](https://i.imgur.com/LDuaUBd.gif)




