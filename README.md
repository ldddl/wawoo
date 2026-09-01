# 瓦屋 WAWOO

居家選物電商前台＋六角學院後台 API 管理。

本網站僅作為求職作品集使用，不供商業用途。

## 技術棧

- Vue 3（Options API）
- Vite（`base: '/wawoo/'`）
- Vue Router、Pinia
- Axios（`.then()`／`.catch()`）
- Bootstrap 5、Sass
- 後端：六角 vue3-course-api

## 環境設定

1. 複製並設定 `.env`：

```env
VITE_URL=
VITE_PATH=
```

1. 安裝與啟動：

```sh
npm install
npm run dev
```

本機預設：`http://localhost:5173/wawoo/`

1. 建置：

```sh
npm run build
npm run preview
```

## 前台主流程（Demo）

1. `/products`：分類瀏覽 → 詳細資訊 Modal → 選數量 → 加入購物車
2. `/cart`：改數量、刪除、套用優惠碼 → 前往結帳
3. `/checkout`：填收件資料 → 建立訂單
4. `/order-complete`：完成頁
5. `/coupons`：領取優惠券
6. Nav 愛心：本機收藏（localStorage）

## 後台

- 入口：頁尾「後台登入」或 `/login`
- 登入後：`/admin/products`、`/admin/coupons`、`/admin/orders`

| 功能   | 說明                                 |
| ------ | ------------------------------------ |
| 商品   | CRUD、分類篩選、每頁 10 筆、主圖預覽 |
| 優惠券 | CRUD、生效中／已失效篩選             |
| 訂單   | 列表、已付款／未付款篩選、標記已付款 |

## 主要路徑

| 區   | 路徑                                                                            |
| ---- | ------------------------------------------------------------------------------- |
| 前台 | `/`、`/products`、`/about`、`/coupons`、`/cart`、`/checkout`、`/order-complete` |
| 後台 | `/login`、`/admin/products`、`/admin/coupons`、`/admin/orders`                  |

## 專案結構（精簡）

```
src/
  components/     # Nav、Footer、首頁區塊、結帳步驟
  stores/         # cartStore、authStore、favoriteStore
  views/
    FrontView/    # 前台頁
    DashboardView/# 登入與後台
  router/
  utils/          # 優惠券本機目錄同步
```
