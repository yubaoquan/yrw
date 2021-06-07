# yrw

homework

## 一些问题

vue-eslint-parser 在`<script>`块外报错
[https://www.npmjs.com/package/vue-eslint-parser#user-content-️-known-limitations](Known Limitations)

需要在`<style>` 上面添加

```html
<!-- eslint-disable max-len -->
```

## 启动/查询进程id/停止

```bash
pm2 start npm -- start

pm2 ls

pm2 stop <id>
```
