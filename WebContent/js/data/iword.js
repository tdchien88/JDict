/*
大きな鏡に全身を映す。おきなかがみに ぜんしんを うつす。soi mình trong cái gương lớn.
海岸で貝殻を拾う。 かいがんで かいがらを ひろう。Nhặt nhạnh vỏ sò trên bãi biển .


*/
myApp.constant('iword',  [

{no:1, tag:`Denwa`, word:`- 電話に出られなかった`, mean:`- I wasn't able to pick up your call.`},
{no:2, tag:`Denwa`, word:`- 電話に気がつかなくて謝りたい`, mean:`- I'm sorry that I didn't notice your call.`},
{no:3, tag:`Denwa`, word:`- おかけになった電話番号は現在使われておりません`, mean:`- The phone number you called is not currently used.`},
{no:4, tag:`天気`, word:`雨が降らないそう。 `, mean:`I heard it won't rain.`},
{no:5, tag:`天気`, word:`雨が降りそうもない。`, mean:`I think it won't rain.`},
{no:6, tag:`天気`, word:`雨が降らなさそう。`, mean:`I think it won't rain.`},

{no:7, tag:`副詞(ふくし)`, word:`Vたあとで`, mean:`sau khi`},
{no:8, tag:`副詞(ふくし)`, word:`あちこち`, mean:`nơi này nơi kia`},
{no:9, tag:`副詞(ふくし)`, word:`あまり`, mean:`không....mấy, lắm`},
{no:10, tag:`副詞(ふくし)`, word:`あまり`, mean:`không… lắm (ví dụ không đẹp lắm)`},
{no:11, tag:`副詞(ふくし)`, word:`あんなに`, mean:`tới mức đó`},
{no:12, tag:`副詞(ふくし)`, word:`いか`, mean:`ít hơn; dưới mức; thua; thấp hơn`},
{no:13, tag:`副詞(ふくし)`, word:`いがい`, mean:`ngoài ra`},
{no:14, tag:`副詞(ふくし)`, word:`いかが [いかが]`, mean:`được không ạ?`},
{no:15, tag:`副詞(ふくし)`, word:`いじょう`, mean:`hơn; nhiều hơn; cao hơn; trên`},
{no:16, tag:`副詞(ふくし)`, word:`いぜん`, mean:`trước kia, trước đây`},
{no:17, tag:`副詞(ふくし)`, word:`いちども`, mean:`never, không bao giờ (dù chỉ một lần)`},
{no:18, tag:`副詞(ふくし)`, word:`いちばん`, mean:`nhất, số một, đầu tiên`},
{no:19, tag:`副詞(ふくし)`, word:`いつか`, mean:`một khi nào đó, 1 lúc nào đó`},
{no:20, tag:`副詞(ふくし)`, word:`いっしょうけんめい`, mean:`cố gắng hết sức, nổ lực tối đa`},
{no:21, tag:`副詞(ふくし)`, word:`いっしょに`, mean:`cùng, cùng nhau`},
{no:22, tag:`副詞(ふくし)`, word:`いつでも`, mean:`bất cứ lúc nào`},
{no:23, tag:`副詞(ふくし)`, word:`いつでも`, mean:`(dù)lúc nào cũng`},
{no:24, tag:`副詞(ふくし)`, word:`いっぱい`, mean:`đầy`},
{no:25, tag:`副詞(ふくし)`, word:`いつまでも`, mean:`mãi mãi`},
{no:26, tag:`副詞(ふくし)`, word:`いつも`, mean:`luôn luôn`},
{no:27, tag:`副詞(ふくし)`, word:`いま`, mean:`bây giờ`},
{no:28, tag:`副詞(ふくし)`, word:`いよいよ`, mean:`cuối cùng`},
{no:29, tag:`副詞(ふくし)`, word:`いろいろ`, mean:`đa dạng, phong phú`},
{no:30, tag:`副詞(ふくし)`, word:`かなり`, mean:`kha khá, tương đối`},
{no:31, tag:`副詞(ふくし)`, word:`かなり`, mean:`tương đối, khá là`},
{no:32, tag:`副詞(ふくし)`, word:`きちんと`, mean:`tỉ mỉ, chỉnh chu, cẩn thận`},
{no:33, tag:`副詞(ふくし)`, word:`きっと`, mean:`chắc chắn,  chắc hẳn`},
{no:34, tag:`副詞(ふくし)`, word:`ぎらぎら`, mean:`chói chang`},
{no:35, tag:`副詞(ふくし)`, word:`ぐっすり`, mean:`ngủ say`},
{no:36, tag:`副詞(ふくし)`, word:`ぐらぐら`, mean:`lắc qua lắc lại`},
{no:37, tag:`副詞(ふくし)`, word:`くわしく`, mean:`(làm cái gì đó) chi tiết, đầy đủ, cụ thể`},
{no:38, tag:`副詞(ふくし)`, word:`こう`, mean:`như thế này`},
{no:39, tag:`副詞(ふくし)`, word:`このあいだ`, mean:`hôm nọ`},
{no:40, tag:`副詞(ふくし)`, word:`このごろ`, mean:`dạo này, độ này`},
{no:41, tag:`副詞(ふくし)`, word:`これから`, mean:`kể từ bây giờ; kể từ nay, từ nay trở đi`},
{no:42, tag:`副詞(ふくし)`, word:`こんなに`, mean:`như thế này`},
{no:43, tag:`副詞(ふくし)`, word:`さいご`, mean:`cuối, cuối cùng, kết thúc`},
{no:44, tag:`副詞(ふくし)`, word:`さきに`, mean:`sớm hơn, trước`},
{no:45, tag:`副詞(ふくし)`, word:`さっき`, mean:`vừa nãy, vừa mới`},
{no:46, tag:`副詞(ふくし)`, word:`しか`, mean:`chỉ (có thể)`},
{no:47, tag:`副詞(ふくし)`, word:`しっかり`, mean:`chắc chắn, ổn định`},
{no:48, tag:`副詞(ふくし)`, word:`じっと`, mean:`chăm chú`},
{no:49, tag:`副詞(ふくし)`, word:`しばらく`, mean:`một lúc khá lâu.`},
{no:50, tag:`副詞(ふくし)`, word:`ずいぶん`, mean:`cực kì, vô cùng`},
{no:51, tag:`副詞(ふくし)`, word:`すぐ`, mean:`ngay lập tức, ngay, liền`},
{no:52, tag:`副詞(ふくし)`, word:`すこし`, mean:`ít, một chút`},
{no:53, tag:`副詞(ふくし)`, word:`すこしずつ`, mean:`từng chút, từng ít một`},
{no:54, tag:`副詞(ふくし)`, word:`ずっと`, mean:`suốt, mãi (tiếp tục một trạng thái trong khoảng thời gian, khoảng cách dài lâu)`},
{no:55, tag:`副詞(ふくし)`, word:`すると`, mean:`lập tức thì, ngay lúc đó`},
{no:56, tag:`副詞(ふくし)`, word:`ぜひ`, mean:`nhất định, bằng mọi giá`},
{no:57, tag:`副詞(ふくし)`, word:`ぜんぜん`, mean:`hoàn toàn không`},
{no:58, tag:`副詞(ふくし)`, word:`ぜんぶ`, mean:`tất cả, toàn bộ`},
{no:59, tag:`副詞(ふくし)`, word:`そう`, mean:`như vậy`},
{no:60, tag:`副詞(ふくし)`, word:`そうで`, mean:`tất cả cùng nhau`},
{no:61, tag:`副詞(ふくし)`, word:`そして`, mean:`và`},
{no:62, tag:`副詞(ふくし)`, word:`そのまま`, mean:`cứ như vậy`},
{no:63, tag:`副詞(ふくし)`, word:`それから`, mean:`sau đó`},
{no:64, tag:`副詞(ふくし)`, word:`それじゃ`, mean:`thế thì, vậy thì`},
{no:65, tag:`副詞(ふくし)`, word:`それで`, mean:`vì thế, cho nên`},
{no:66, tag:`副詞(ふくし)`, word:`それなら`, mean:`nếu trong trường hợp đó; nếu như thế`},
{no:67, tag:`副詞(ふくし)`, word:`それに`, mean:`hơn nữa`},
{no:68, tag:`副詞(ふくし)`, word:`そろそろ`, mean:`sắp tới lúc, chẳng mấy chốc tới lúc`},
{no:69, tag:`副詞(ふくし)`, word:`そんなに`, mean:`tới mức đó`},
{no:70, tag:`副詞(ふくし)`, word:`だいたい`, mean:`khoảng, chừng, xấp xỉ`},
{no:71, tag:`副詞(ふくし)`, word:`たいてい`, mean:`thường, thông thường, đa số, hầu hết`},
{no:72, tag:`副詞(ふくし)`, word:`たいへん`, mean:`rất, quá`},
{no:73, tag:`副詞(ふくし)`, word:`たくさん`, mean:`nhiều`},
{no:74, tag:`副詞(ふくし)`, word:`だけ`, mean:`chỉ (làm được gì)`},
{no:75, tag:`副詞(ふくし)`, word:`たぶん`, mean:`có lẻ, không chừng`},
{no:76, tag:`副詞(ふくし)`, word:`たまに`, mean:`có khi, ít khi`},
{no:77, tag:`副詞(ふくし)`, word:`だんだん`, mean:`dần dần, lần lần`},
{no:78, tag:`副詞(ふくし)`, word:`ちっとも`, mean:`không (dù chỉ một chút)`},
{no:79, tag:`副詞(ふくし)`, word:`ちゃんと`, mean:`nghiêm chỉnh, làm đâu ra đó.`},
{no:80, tag:`副詞(ふくし)`, word:`ちょうど`, mean:`vừa đúng, đúng chuẩn`},
{no:81, tag:`副詞(ふくし)`, word:`ちょっと`, mean:`một chút, một chốc`},
{no:82, tag:`副詞(ふくし)`, word:`つまり`, mean:`có nghĩa là, tức là`},
{no:83, tag:`副詞(ふくし)`, word:`でも`, mean:`nhưng, tuy nhiên`},
{no:84, tag:`副詞(ふくし)`, word:`どうしても`, mean:`dù thế nào đi nữa`},
{no:85, tag:`副詞(ふくし)`, word:`どうぞ`, mean:`xin mời`},
{no:86, tag:`副詞(ふくし)`, word:`ときどき`, mean:`thỉnh thoảng, đôi khi`},
{no:87, tag:`副詞(ふくし)`, word:`どきどき`, mean:`hồi hộp`},
{no:88, tag:`副詞(ふくし)`, word:`とても`, mean:`rất, quá chừng, cực kì`},
{no:89, tag:`副詞(ふくし)`, word:`とにかく`, mean:`dù thế nào`},
{no:90, tag:`副詞(ふくし)`, word:`どんどん`, mean:`ùn lên, ngày càng nhiều`},
{no:91, tag:`副詞(ふくし)`, word:`なかなか`, mean:`mãi mà không`},
{no:92, tag:`副詞(ふくし)`, word:`ながら`, mean:`trong khi, đang lúc (diễn tả một hành động V2 trong khi một hành động V1 khác đang xảy ra)`},
{no:93, tag:`副詞(ふくし)`, word:`なるべく`, mean:`tới mức có thể`},
{no:94, tag:`副詞(ふくし)`, word:`なるほど`, mean:`quả đúng như vậy`},
{no:95, tag:`副詞(ふくし)`, word:`にこにこ`, mean:`cười mỉm`},
{no:96, tag:`副詞(ふくし)`, word:`ので`, mean:`vì; do`},
{no:97, tag:`副詞(ふくし)`, word:`のに`, mean:`mặc dầu, mặc dù`},
{no:98, tag:`副詞(ふくし)`, word:`のんびり`, mean:`thong thả`},
{no:99, tag:`副詞(ふくし)`, word:`はじめて`, mean:`lần đầu tiên`},
{no:100, tag:`副詞(ふくし)`, word:`はっきり`, mean:`rõ, rõ ràng, rành rọt`},
{no:101, tag:`副詞(ふくし)`, word:`ぴったり`, mean:`chặc, vừa vẹn, vừa khớp, chính xác`},
{no:102, tag:`副詞(ふくし)`, word:`ひとりで`, mean:`một mình`},
{no:103, tag:`副詞(ふくし)`, word:`ふらふら`, mean:`hoa mắt, lảo đảo`},
{no:104, tag:`副詞(ふくし)`, word:`ぶらぶら`, mean:`lang thang`},
{no:105, tag:`副詞(ふくし)`, word:`ほとんど`, mean:`hầu hết, phần lớn`},
{no:106, tag:`副詞(ふくし)`, word:`ほとんど`, mean:`hầu hết`},
{no:107, tag:`副詞(ふくし)`, word:`ほぼ [ほぼ]`, mean:`hầu hết`},
{no:108, tag:`副詞(ふくし)`, word:`ほんとうに`, mean:`thật sự`},
{no:109, tag:`副詞(ふくし)`, word:`まず`, mean:`trước hết; trước tiên`},
{no:110, tag:`副詞(ふくし)`, word:`また`, mean:`lại (1 lần nữa)`},
{no:111, tag:`副詞(ふくし)`, word:`まだ`, mean:`chưa, vẫn  còn (nghĩa này của từ luôn được dùng trong câu phủ định)`},
{no:112, tag:`副詞(ふくし)`, word:`まっすぐ`, mean:`(đi) thẳng`},
{no:113, tag:`副詞(ふくし)`, word:`めったに`, mean:`hiếm khi`},
{no:114, tag:`副詞(ふくし)`, word:`もう`, mean:`đã, rồi`},
{no:115, tag:`副詞(ふくし)`, word:`もういちど`, mean:`một lần nữa`},
{no:116, tag:`副詞(ふくし)`, word:`もうすこし`, mean:`thêm một chút, hơn chút nữa`},
{no:117, tag:`副詞(ふくし)`, word:`もし`, mean:`nếu`},
{no:118, tag:`副詞(ふくし)`, word:`もちろん`, mean:`đương nhiên, tất nhiên`},
{no:119, tag:`副詞(ふくし)`, word:`もちろん`, mean:`tất nhiên, đương nhiên`},
{no:120, tag:`副詞(ふくし)`, word:`もっと`, mean:`hơn nữa, thêm nữa`},
{no:121, tag:`副詞(ふくし)`, word:`やっと`, mean:`cuối cùng`},
{no:122, tag:`副詞(ふくし)`, word:`やっぱり`, mean:`quả thực`},
{no:123, tag:`副詞(ふくし)`, word:`やはり`, mean:`quả nhiên`},
{no:124, tag:`副詞(ふくし)`, word:`ゆっくり`, mean:`chầm chậm, từ từ`},
{no:125, tag:`副詞(ふくし)`, word:`ようこそ`, mean:`Chào mừng`},
{no:126, tag:`副詞(ふくし)`, word:`よく`, mean:`thường hay, thường xuyên`},
{no:127, tag:`副詞(ふくし)`, word:`よろしく`, mean:`dùng khi nhờ vả ai đó`},
{no:128, tag:`副詞(ふくし)`, word:`らしい`, mean:`có vẻ; dường như; như là; có vẻ là...`},
{no:129, tag:`副詞(ふくし)`, word:`一緒に [いっしょに]`, mean:`cùng nhau`},
{no:130, tag:`副詞(ふくし)`, word:`一人で [ひとりで]`, mean:`một mình`},
{no:131, tag:`副詞(ふくし)`, word:`一番 [いちばん]`, mean:`nhất, hàng đầu`},
{no:132, tag:`副詞(ふくし)`, word:`一方 [いっぽう]`, mean:`mặt khác`},
{no:133, tag:`副詞(ふくし)`, word:`遠く [とおく]`, mean:`ở xa`},
{no:134, tag:`副詞(ふくし)`, word:`何しろ [なにしろ]`, mean:`dù sao đi nữa`},
{no:135, tag:`副詞(ふくし)`, word:`何とか [なんとか]`, mean:`xem có cách nào đó`},
{no:136, tag:`副詞(ふくし)`, word:`急に [きゅうに]`, mean:`đột nhiên`},
{no:137, tag:`副詞(ふくし)`, word:`近く [ちかく]`, mean:`gần (chỉ tương lai gần, vị trí gần)`},
{no:138, tag:`副詞(ふくし)`, word:`結構 [けっこう]`, mean:`khá là`},
{no:139, tag:`副詞(ふくし)`, word:`今 [いま]`, mean:`bây giờ, hiện tại`},
{no:140, tag:`副詞(ふくし)`, word:`今まで [いままで]`, mean:`cho tới bây giờ`},
{no:141, tag:`副詞(ふくし)`, word:`再び [ふたたび]`, mean:`lại lần nữa`},
{no:142, tag:`副詞(ふくし)`, word:`時々 [ときどき]`, mean:`thỉnh thoảng`},
{no:143, tag:`副詞(ふくし)`, word:`初めて [はじめて]`, mean:`lần đầu`},
{no:144, tag:`副詞(ふくし)`, word:`少し [すこし]`, mean:`một ít`},
{no:145, tag:`副詞(ふくし)`, word:`少しも [すこしも]`, mean:`ít nhất`},
{no:146, tag:`副詞(ふくし)`, word:`少々 [しょうしょう]`, mean:`1 ít`},
{no:147, tag:`副詞(ふくし)`, word:`真っ直ぐ [まっすぐ]`, mean:`thẳng`},
{no:148, tag:`副詞(ふくし)`, word:`随分 [ずいぶん]`, mean:`cực kỳ, rất là`},
{no:149, tag:`副詞(ふくし)`, word:`絶対に [ぜったいに]`, mean:`tuyệt đối`},
{no:150, tag:`副詞(ふくし)`, word:`全く [まったく]`, mean:`hoàn toàn`},
{no:151, tag:`副詞(ふくし)`, word:`全然 [ぜんぜん]`, mean:`hoàn toàn (không)`},
{no:152, tag:`副詞(ふくし)`, word:`早く [はやく]`, mean:`nhanh, sớm`},
{no:153, tag:`副詞(ふくし)`, word:`多分 [たぶん]`, mean:`có lẽ`},
{no:154, tag:`副詞(ふくし)`, word:`大抵 [たいてい]`, mean:`thường thường`},
{no:155, tag:`副詞(ふくし)`, word:`大分 [だいぶ]`, mean:`hầu hết, phần lớn`},
{no:156, tag:`副詞(ふくし)`, word:`段々 [だんだん]`, mean:`dần dần`},
{no:157, tag:`副詞(ふくし)`, word:`直ぐ [すぐ]`, mean:`ngay lập tức`},
{no:158, tag:`副詞(ふくし)`, word:`直接 [ちょくせつ]`, mean:`trực tiếp`},
{no:159, tag:`副詞(ふくし)`, word:`特に [とくに]`, mean:`đặc biệt`},
{no:160, tag:`副詞(ふくし)`, word:`非常に [ひじょうに]`, mean:`rất, cực kỳ`},
{no:161, tag:`副詞(ふくし)`, word:`必ず [かならず]`, mean:`chắc chắn, nhất định`},
{no:162, tag:`副詞(ふくし)`, word:`普段 [ふだん]`, mean:`thông thường`},
{no:163, tag:`副詞(ふくし)`, word:`別に [べつに]`, mean:`ngoài ra`},
{no:164, tag:`副詞(ふくし)`, word:`本当に [ほんとうに]`, mean:`thật sự`},
{no:165, tag:`副詞(ふくし)`, word:`例えば [たとえば]`, mean:`ví dụ, giả dụ như`},

{no:166, tag:`combini`, word:`レジ（reji）`, mean:`tinh tien`},
{no:167, tag:`combini`, word:`返品（henpin）`, mean:`tra hang`},
{no:168, tag:`combini`, word:`返金（henkin）`, mean:`tra tien`},
{no:169, tag:`combini`, word:`前陳（zenchin）`, mean:`xep hang len ke`},
{no:170, tag:`combini`, word:`補充（hojuu）`, mean:` xếp thêm hàng, bổ sung thêm bánh kẹo`},
{no:171, tag:`combini`, word:`ゆうバック（ yubakku）`, mean:`nhan chuyen hang`},
{no:172, tag:`combini`, word:`掃除（ Souji）`, mean:`don dep`},
{no:173, tag:`combini`, word:`いらっしゃいませ`, mean:`Xin mời quý khách tới cửa hang`},
{no:174, tag:`combini`, word:`ありがとうございます`, mean:`Cảm ơn quý  khách`},
{no:175, tag:`combini`, word:`またお越し(こし)くださいませ`, mean:`Câu chào tiễn khách, mong được đón quý khách lần tới`},
{no:176, tag:`combini`, word:`ポイントカードお持ち（もち）ですか?`, mean:`Hỏi khách có mang thẻ tích điểm không:　`},
{no:177, tag:`combini`, word:`お弁当(べんとう)温め(あたため)ますか？`, mean:`Quý khách có muốn hâm nóng cơm hộp không?`},
{no:178, tag:`combini`, word:`こちら温めますか？ hoặc 温めはどうされますか？`, mean:`Quý khách có muốn hâm nóng món này không ạ?`},
{no:179, tag:`combini`, word:`フォーク(hoặc 割り箸 waribashi, hoặc ストロー)おつけますか?`, mean:`Quý khách có muốn lấy dĩa (hoặc đũa, hoặc ống hút) không?`},
{no:180, tag:`combini`, word:`フォークと割り箸どちらにしますか?`, mean:`Quý khách muốn dùng dĩa hay đũa?`},
{no:181, tag:`combini`, word:`身分証明書（みぶんしょうめいしょ）をもちですか`, mean:`quý khách có mang theo giấy tờ chứng minh nhân thânkhông?`},
{no:182, tag:`combini`, word:`身分証明書を見させて(みさせて)いただけますか`, mean:`quý khách có thể cho tôi xem chứng minh nhân thân không?`},
{no:183, tag:`combini`, word:`画面(がめん)の確認(かくにん)ボタンーを押し（おし）てください`, mean:`xin hãy bấm vào nút xác nhận trên màn hình`},
{no:184, tag:`combini`, word:`袋(ふくろ)お分け（わけ）しましょうか？`, mean:`Quý khách có muốn chia đồ (thường là đồ nóng và lạnh được chia ra) ra các túi khác nhau hay không?`},
{no:185, tag:`combini`, word:`以上(いじょう)X点（てん）でY円でございます`, mean:`Tổng cổng có X-món hàng và tổng tiền là Y-yên`},
{no:186, tag:`combini`, word:`X円のお買い上げ（かいあげ）でございます`, mean:`Tổng số tiền mua hàng là X-yên`},
{no:187, tag:`combini`, word:`X円、頂戴致します(ちょうだいいたします)`, mean:`xin nhận số tiền Xyên`},
{no:188, tag:`combini`, word:`X円お預かり(あずかり)いたします`, mean:`tôi đã nhận X-yên`},
{no:189, tag:`combini`, word:`X円ちょうど頂戴いたします`, mean:`xin nhận số tiền vừa đủ X-yên (không có tiền thừa)`},
{no:190, tag:`combini`, word:`お先（さき）、～円のお返し（かえし）と、お後（あと）～円のお返しでございます`, mean:`Xin trả tiền thừa X -yên (tiền chẵn) và Y-yên (tiền lẻ)`},

{no:191, tag:`他`, word:`持たせてください。`, mean:`Cho phép tôi giữ nó.`},
{no:192, tag:`他`, word:`お手紙4枚 持たせます。 `, mean:`Tôi gửi cho anh 4 bức thư.`},


]);
