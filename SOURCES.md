# 香港啟德版：資料與建模紀錄

整理時間：2026-10-14。目標是把已有高雄版改成獨立香港版，保留原先的歌曲參考位置、奶油白人物和紫海氛圍。沒有使用新截圖下半部的歌曲標注。

## 官方可核實資料

- Live Nation 的 BTS WORLD TOUR “ARIRANG” IN HONG KONG 活動頁列明：2027 年 3 月 4、6、7 日，19:30，Kai Tak Stadium。全場坐席，票價 HK$799／1,099／1,499／1,899／2,499，VIP HK$3,299。售票平台列為 HK Ticketing、Trip.com。頁面未提供可直接導入的逐座三維資料。
  https://www.livenation.hk/en/event/bts-world-tour-arirang-in-hong-kong-hong-kong-tickets-edp1675927
- 啟德主場館官方頁說明場館約 50,000 人容量、有可開合屋頂，實際座位圖和觀演效果依活動舞台配置而變。50,000 是場館容量，不是本模型或本場可售票數。
  https://www.kaitaksportspark.com.hk/venues-spaces/4
- 官方場地容量表列球場面積 12,200 平方米、樓底高度 40 米；這些資料不能推導每排高度、舞台尺寸或屏幕吊掛位置。
  https://media-webapp.kaitaksportspark.com.hk/assets/66563159-fee8-4ad5-aeb0-086275c8b124
- 香港旅遊發展局活動資料亦列這三個日期。
  https://partnernet.hktb.com/usa/en/destination/events_festivals/index.html?eventID=86722

## 已導入的座位資料

Eventist 的公開互動圖包含 49,203 個座位點及區域、排號文字標記，聲明其位置按公開場館圖描繪、僅供參考，售票分區及號碼依主辦設定。本版下載其公開座標數值；沒有沿用其網站介面或繪圖程式。

- 導覽與來源說明：https://eventist.com/venues/kai-tak-stadium/
- 分區／排號文字座標：https://eventist.com/wp-content/uploads/2026/08/kt-meta.json
- 座標檔：https://eventist.com/wp-content/uploads/2026/08/kt-seats-0.json 至 kt-seats-7.json，共 8 份。
- 該站演出配置參考：https://eventist.com/wp-content/uploads/2026/08/kt-layouts-v2.json

資料檔沒有每個座位的已核實「區＋字母排」關係。因此本版保留全部 49,203 個原始座位點和底圖座號，另外推算所屬分區、數字模擬排及高度。區域依同層分區標記方向匹配，排依離內場的深度分組，模擬號按面向舞台由左至右增加。這些計算不是票務資料；邊界及轉角可能配錯區或排。原始平面圖也不能提供真實三維視線。

## 參考圖與底圖差異

- 內場依使用者圖：A1–A8、B1–B8、C1–C7、D1–D7，共 30 區；小舞台附近約 10 排，其餘約 18 排。全部內場座位為估算。
- 採截圖上半部：A 左、B 右、C 下、D 上。這是參考方向，不把 C 宣稱為已確認官方正面。
- 截圖上下兩部分的 C／D 及局部標注方向不一致，故未直接合併下半部的排字母／座號區間。
- 公開底圖列 110、212、540 等，與截圖少量區號有差異；原圖 241 在座標檔缺少同名數字標記。本版保留底圖看台標記並增加估算的 241 選項，共 83 個看台參考區。這不是本場開售分區清單。
- 已知有票面 A／B 子區及字母排；沒有足夠資料逐座對應，現版未宣稱支持。數字模擬排與票面字母排不同。
- 不使用來源站的逐區票價著色：其 BTS 配置自註為非官方轉錄，且部分價格按整區最高檔著色，不能精確套用到每排。

## 歌曲及造型

沿用既有 @minnn_f 參考圖：數字按年齡排序，1 Jin、2 SUGA、3 j-hope、4 RM、5 Jimin、6 V、7 Jung Kook。FAKE LOVE 兩組位置由先前圖的加號分組；不是時間軸。FYA、Body to Body 及所有成員分配與高雄版資料保持一致，未採用香港新圖歌曲標記。香港演出最終走位未知。

人物服裝保留使用者提供的奶油白／淡金造型方向，採程式生成小人。屏幕也是程式化人物，沒有嵌入官方照片或歌曲音訊。舞台高度、花道、屏幕、屋頂邊框、觀眾及遮擋屬概念模型。開放式屋頂呈現是為方便探索，不代表實際演出開合狀態。

## 其他檢索到的可用資料與限制

- TicketHK 香港場整理頁可交叉檢查場次並找到座位圖連結，但非主辦來源。本次圖片下載返回 403，未宣稱已核對該圖。
  https://www.tickethk.com/concert-ticket/1733
- Concert View 有啟德其他演出的看台照片及部分票面區／排／號，可用於理解上層距離與場館結構。各演出舞台不同，不能拿來保證 BTS 視線。
  https://twconcertview.com/en/venue/kai-tak-stadium-hongkong/
- Scribd 可搜尋到「啟德體育園主場館座位表」及字母排 OCR，未獲得可可靠逐座配對的原始資料，因此未匯入其 OCR。
  https://www.scribd.com/document/885271111/啟德體育園主場館座位表
- 香港七欖場館指南屬另一活動的參考資料，不直接當作 BTS 座位配置。
  https://hksevens.com/assets/uploads/uploads/images/TC_Playbook_HK7s-2026_Final.pdf

## 核對

已檢查看台 49,203 個座位點完整保留、所有生成座位有唯一識別、30 區內場方向、座位在分區內、編號左右順序、無效分享參數處理，以及所有歌曲資料與先前版本相同。網頁可在無外部 CDN 的靜態主機部署。資料的完整匯入不等於官方座號準確性。
