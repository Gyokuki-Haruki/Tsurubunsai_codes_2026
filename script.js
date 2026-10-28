const images = new Proxy({}, {
    get: (_, name) => name
});

document.addEventListener("DOMContentLoaded", function() {

    /* ----------------------------------
       A. オープニング画面の自動非表示
    ---------------------------------- */
    const openingScreen = document.getElementById('opening-screen');
    if (openingScreen) {
        setTimeout(() => {
            openingScreen.classList.add('loaded');
        }, 2800); // 6色出現(〜1.1s) → 鳥出現(〜1.8s) → 全体表示(2.8s)後にメイン表示
    }

    /* ----------------------------------
       B. モバイルメニューの開閉制御
    ---------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');
    const navLinks = document.querySelectorAll('.header-nav a');

    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            headerNav.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('active');
            });
        });
    }

    /* ----------------------------------
       C. Topページ：スケジュールデータの動的描画
    ---------------------------------- */
    // target に eventsData の title と同じ名前を指定するとリンクになります
    const stageData = [
        { time: "8:35 - 8:45", program: "開会行事" },
        { time: "8:50 - 9:15", program: "ダンス部", target: "ダンス部" },
        { time: "9:20 - 9:35", program: "演劇部", target: "演劇部" },
        { time: "9:50 - 10:05", program: "音楽部", target: "音楽部" },
        { time: "10:10 - 10:30", program: "放送部", target: "放送部" },
        { time: "10:45 - 11:05", program: "書道部", target: "書道部" },
        { time: "11:15 - 11:30", program: "職員", target: "職員" },
        { time: "12:30 - 12:45", program: "Thermal Blue", target: "Thermal Blue" },
        { time: "12:50 - 13:05", program: "I'll be", target: "I'll be" },
        { time: "13:10 - 13:25", program: "したらばーず", target: "したらばーず" },
        { time: "13:30 - 13:45", program: "RYU", target: "RYU" },
        { time: "13:50 - 14:05", program: "雪見だいふく", target: "雪見だいふく" },
        { time: "14:55 - 15:20", program: "吹奏楽部", target: "吹奏楽部" },
        { time: "15:20 - 15:30", program: "閉会行事" }
    ];

    const otherEventsData = [
        { time: "11:30 - 14:45", program: "展示開放", desc: "生徒館・新館・悠久館" },
        { time: "12:10 - 14:30", program: "茶道部", desc: "草寿庵など", target: "茶道部" },
        { time: "12:10 -", program: "書道部合同パフォーマンス", desc: "中庭", target: "中庭合同パフォーマンス" }
    ];

    function generateTableRows(data) {
        return data.map(item => {
            // target が設定されている場合は event.html へのリンクを生成
            const programContent = item.target 
                ? `<a href="event.html#${encodeURIComponent(item.target)}" class="schedule-link">${item.program}</a>`
                : item.program;

            return `
                <tr>
                    <td class="time-col">${item.time}</td>
                    <td class="prog-col">
                        ${programContent}
                        ${item.desc ? `<span class="prog-desc">${item.desc}</span>` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    const scheduleSection = document.getElementById('schedule');
    if (scheduleSection) {
        scheduleSection.innerHTML = `
            <div class="section-header">
                <h2>SCHEDULE</h2>
            </div>
            <div class="schedule-container">
                <div class="schedule-box">
                    <h3>ステージプログラム<br><span style="font-size:0.8rem; font-weight:normal;">(会場: 体育館)</span></h3>
                    <table class="event-table">
                        <tbody>${generateTableRows(stageData)}</tbody>
                    </table>
                </div>
                <div class="schedule-box">
                    <h3>イベント・展示・有志<br><span style="font-size:0.8rem; font-weight:normal;">(会場: 各教室・中庭など)</span></h3>
                    <table class="event-table">
                        <tbody>${generateTableRows(otherEventsData)}</tbody>
                    </table>
                </div>
            </div>
            <div class="visitor-notes">
                <h4>◎ ご来校の皆様へのお願い</h4>
                <ul>
                    <li>上演中に入場を希望されるときは、2Fロビー体育館桜島側入口より静かにお入りください。</li>
                    <li>咳エチケット等の感染予防にご協力ください。</li>
                    <li>学校敷地内は禁煙です。また、体育館内での飲食はご遠慮ください。</li>
                    <li>写真・ビデオカメラ等の撮影は、鑑賞している方の迷惑にならないよう体育館後壁付近でお願いいたします。</li>
                </ul>
            </div>
        `;
    }

    /* ----------------------------------
       D. EVENTS ページ：全データ定義＆カード生成
    ---------------------------------- */
const eventsData = [
    // ==================== 1年生クラス展示 ====================
    { category: "1year", tag: "1年生クラス展示", title: "11R", desc: "何者かによって屋敷へと閉じ込められてしまったあなた。脱出するには、屋敷が爆発する前に仕掛けられた謎を解き明かさなければならない。共に迷い込んだ親友の「ケビン」と力を合わせて迫りくる危機を乗り越え、この屋敷から脱出せよ。それでは、ご武運を。", logo: images["./11R.png"] },
    { category: "1year", tag: "1年生クラス展示", title: "12R", desc: "私たちのクラスは、とにかく元気！笑顔と笑い声が絶えない、明るく楽しいクラスです。文化祭でもクラス全員で力を合わせて、最高の思い出を作ります。ぜひ12Rに足を運んで楽しんでいってください！", logo: images["./12R.png"] },
    { category: "1year", tag: "1年生クラス展示", title: "13R", desc: "13Rでは、半日限りのお祭りを開催！的当てやもぐら叩き、輪投げなど、誰もが本気で楽しめる屋台が盛りだくさん。子どもも大人も、昔のワクワク感を思い出せること間違いなし！13Rで最高のお祭りを楽しもう！", logo: images["./13R.jpeg"] },
    { category: "1year", tag: "1年生クラス展示", title: "14R", desc: "来場した皆さんに楽しんでもらい、笑顔になってもらえるような展示を目指しています。14Rのにぎやかさを活かした面白い展示や気楽に楽しめる展示、思い出を残せる展示を用意します。誰でも楽しく参加できる内容になっています！ぜひ遊びに来てください！", logo: images["./14R.png"] },
    { category: "1year", tag: "1年生クラス展示", title: "15R", desc: "私たちは「ゆらゆら迷路おばけやしき」をします。ちょうちんの中のお皿にのせたピンポン球をビックリしておとさないように迷路のゴールをめざします。おとさずにクリアできれば賞品も！ぜひあそびにきてね！！", logo: images["./15R.jpg"] },
    { category: "1year", tag: "1年生クラス展示", title: "16R", desc: "確率の世界では、自分の興味のあるものを選び、体験できます。また、勝ち負けの確率を考えながら実際に遊べて確率の理解を深められます。身の回りのものの確率への興味、関心が深まるようなものが多くあり、誰でも楽しめます。", logo: images["./16R.jpeg"] },
    { category: "1year", tag: "1年生クラス展示", title: "17R", desc: "新人エージェントとなり極秘ミッションを完遂せよ！立ちはだかる数々のセキュリティを完破し、隠された重要データを無事に回収できるか！？友達とチームを組んでタイムアタックに挑もう！17Rの超本格スパイアトラクションが君の挑戦を待っている！", logo: images["./17R.jpg"] },
    { category: "1year", tag: "1年生クラス展示", title: "18R", desc: "18Rでは、気配を頼りに相手の位置を見極める「気配切り」と、思い出を残せるフォトスポットを用意しています！友達と一緒に楽しみながら、18Rでしか味わえない特別な時間を過ごしてください。ぜひ遊びに来てください！", logo: images["./18R.jpg"] },

    // ==================== 2年生クラス展示 ====================
    { category: "2year", tag: "2年生クラス展示", title: "21R", desc: "古代エジプトの遺産から現代のポップカルチャーまで、人類が愛したアイコンの歴史を巡るフォトスポットです！時代や国をこえて愛される造形の共通点や文化の変遷を体験できます。それぞれの背景にある魅力を感じながら、特別な一枚を撮影してください！", logo: images["./21R.jpeg"] },
    { category: "2year", tag: "2年生クラス展示", title: "22R", desc: "一歩踏み入れれば、そこは息をのむ恐怖の世界。暗闇に潜む奇妙な気配と、予想もできない恐怖の仕掛けがあなたを待ち受けます。あなたは無事にこの出口へ辿り着くことができるでしょうか...？勇気ある挑戦者を待っています。ぜひお越しください！", logo: images["./22R.jpg"] },
    { category: "2year", tag: "2年生クラス展示", title: "23R", desc: "誰もがふらっと立ち寄れるフォトスポット！23Rでしか味わうことのできない感動を写真として思い出に残してみませんか？テーマ別に分かれているので1つは気になる所があるかも！？家族、友達、恋人などかけがえのない存在とより仲が深まるかもしれません。", logo: images["./23R.jpeg"] },
    { category: "2year", tag: "2年生クラス展示", title: "24R", desc: "教室内に隠れたものたちを探し出せ！！しかし、彼らは体に絵を描いて背景と同化しているため注意深く探そう。また、自分自身で色を塗って自分のバックや家の中で擬態できる、オリジナルのカメレオンチャームを作ろう。", logo: images["./24R.jpg"] },
    { category: "2year", tag: "2年生クラス展示", title: "25R", desc: "25Rは競馬(人?)場という他に類を見ない出し物で、来てもらった人に非日常感を味わい楽しんでもらうことを目標に頑張りたいと思います。普段延滞的におとなしいイメージを持つこのクラスですが、この文化祭を全力で盛り上げることにより、一致団結したいです。", logo: images["./25R.jpg"] },
    { category: "2year", tag: "2年生クラス展示", title: "26R", desc: "「見るだけの水族館」はもう物足りない！？迷路で迷い、ミニゲームで遊び、脱出ゲームで頭を使い、フォトスポットで思い出を残していただきます。来場者の皆様に「もう一度来たい！」と思っていただける、笑いとワクワクが詰まった水族館を目指します！", logo: images["./26R.jpg"] },
    { category: "2year", tag: "2年生クラス展示", title: "27R", desc: "みんなが大好きなあのスポット！今回は、27Rで再現してみました。お馴染みのダーツやアトラクションだけでなく、今回はROUND27ならではのカーリングも楽しめちゃう！？生徒はもちろん、大人の来場者の方も楽しめる、わくわくな展示です。", logo: images["./27R.jpg"] },
    { category: "2year", tag: "2年生クラス展示", title: "28R", desc: "友達と一緒に乗って、楽しくぐるぐる回ろう！回すほど早くなるコーヒーカップで、みんなで盛り上がること間違いなし。さらにスリルと楽しさを味わえます。文化祭の思い出にぜひ遊びに来てください！", logo: images["./28R.jpg"] },

    // ==================== 部活 ====================
    { category: "club", tag: "部活", title: "放送部", desc: "今年度はクイズ研究同好会と協力し、我が部のアナウンスと動画編集で、運動部クイズバトルを皆さんにお届けします！鶴丸一、「文武一道」な部活はどこだ？！白熱したバトルをぜひご覧ください。", logo: images["./放送部.jpg"] },
    { category: "club", tag: "部活", title: "音楽部", desc: "新体制となり、私たちにとって初めての舞台。今回は、初めて5声のアカペラにも挑戦しました。仲間と声を重ね、心を一つにしてつくり上げた、新生鶴音サウンドをお届けします。私たちの歌声と青春を、ぜひ一緒にお楽しみください。", logo: images["./音楽部.jpg"] },
    { category: "club", tag: "部活", title: "演劇部", desc: "普段は生徒館2階の隅っこでひっそりと活動している演劇部。今年は8名もの1年生が新たに仲間入りし、総勢14名となりました！何と言っても個性が豊かすぎる私たち。学年を超えて仲良く楽しく活動しています。これから始まるステージをどうぞお楽しみください！", logo: images["./演劇部.jpg"] },
    { category: "club", tag: "部活", title: "書道部", desc: "私たちは文字の美しさ、表現、構成など細部までこだわり、部員全員で1つの作品を創りあげてきました。1人ひとりの想いを筆にのせ、見てくださる方々に感動を届けられるようなパフォーマンスを披露します。ぜひお楽しみください！", logo: images["./書道部.png"] },
    { category: "club", tag: "部活", title: "吹奏楽部", desc: "吹奏楽部は1年生は16名、2年生19名の計35名で毎日楽しく元気いっぱいに活動しています。それぞれの楽器の音色が重なって生まれる私たちの音楽を、みなさんに楽しんでいただけるよう演奏します。新体制になって初のステージ、ぜひお聴きください。", logo: images["./吹奏楽部.jpg"] },
    { category: "club", tag: "部活", title: "ダンス部", desc: "こんにちは、ダンス部です。私たちは2年生10名、1年生8名で毎日楽しみながら活動しています。鶴丸文化祭を盛り上げるために一生懸命練習してきました。スペシャルゲストをお呼びして盛り上げる準備はバッチリです！私たちが最高のステージを届けます！", logo: images["./ダンス部.jpg"] },
    { category: "club", tag: "部活", title: "クイズ研究会", desc: "経験の有無にかかわらず早押しクイズが体験できます。自分の力を試したいという方も、ちょっと興味があるという方も大歓迎！あなたの持っている知識を早押しボタンでぶつけてみませんか。", logo: images["./クイズ研究会.png"] },
    { category: "club", tag: "部活", title: "歴史研究同好会", desc: "この歴史研究会が創立されてから初めて迎える文化祭。温故知新というように歴史から学べることは多いので、これを機会に歴史の魅力について知り興味を持ってもらうことを目標に全員で協力して取り組みたいです。", logo: images["./歴史研究会.png"] },
    { category: "club", tag: "部活", title: "美術部", desc: "私たち美術部は日々、油絵やデッサン、タブレットを活用したイラスト制作など様々な活動に取り組んでいます。その成果をこの文化祭でお見せします。体験スペースや部誌の配布等も予定しているのでぜひお越し下さい。", logo: images["./美術部.png"] },
    { category: "club", tag: "部活", title: "写真部", desc: "私たちが切り取ったのは、笑顔あふれる学校の日常です。レンズ越しに見るみんなの輝きは、最高の宝物。写真部の展示会場で、青春の足跡を一緒にたどってみませんか？ぜひお越しください！", logo: images["./写真部.png"] },
    { category: "club", tag: "部活", title: "百人一首部", desc: "みなさんこんにちは！百人一首部です。競技かるたを、ただのかるただと思ったら大間違い！「畳の上の格闘技」ぜひ体験に来てください。手作りの札キーホルダーも配布予定！あなたの運命の札、見つかっちゃうかも、、、！？", logo: images["./百人一首部.png"] },
    { category: "club", tag: "部活", title: "将棋部", desc: "将棋部では、日々の活動で培った思考力と集中力を生かし、部員同士で楽しく対局しています。文化祭では、将棋の奥深さや楽しさをみなさんに感じてもらえるよう、部員一同お待ちしています。ぜひ気軽にお越し下さい！", logo: images["./将棋部.png"] },
    { category: "club", tag: "部活", title: "化学部", desc: "『一瞬の凍結』『大迫力の泡』『魅惑の七色炎』。教科書の文字を飛び出し、五感を揺さぶるリアルな科学の世界へようこそ！化学部が送る最高の実験舞台。見る者すべてを魅了する化学の瞬間を、絶対に見逃すな！", logo: images["./化学部.png"] },
    { category: "club", tag: "部活", title: "文芸部", desc: "今年は二年生五名、一年生二名の計七名で活動しています。文化祭では、各部員の執筆した作品をまとめ部誌として配布します。ぜひ手に取ってみてください。", logo: images["./文芸部.png"] },
    { category: "club", tag: "部活", title: "生物部", desc: "部員それぞれの興味やこだわりが詰まった部誌「あこう」を今年も発行！また魅力的な標本も展示しています。さらに生物学オリンピックに挑戦するコーナーも用意しました。生物の奥深い世界を体験してみませんか？", logo: images["./生物部.png"] },
    { category: "club", tag: "部活", title: "数学研究部", desc: "我ら数学研究部は、部誌の配布はもちろん、今年は実力考査予想問題集の配布、そして部員考案オリジナルゲームの「叩いて被って素数ゲーム」の体験などを行います。数学愛溢れる「数楽」空間へぜひお越しください。", logo: images["./数学研究.png"] },
    { category: "club", tag: "部活", title: "地学部", desc: "暗闇の中の輝きを一つの光から見つけ出せ！あなたに渡されるのは1本のライトだけ。満天の星空に隠された目的のものを、あなたは探し出せるのか？成功者には特別な証を。暗闇の先で、お待ちしています。", logo: images["./地学部.png"] },
    { category: "club", tag: "部活", title: "茶道部", desc: "本日は私たち茶道部の集大成となる日です。株式会社KOBIRA様のご協力のもと、オリジナルの「鶴丸ブレンド」をご用意しました。心からの感謝を込めて、皆様をおもてなし致します。特別な一服をぜひご堪能ください。※文化館1階でお茶券の販売します。", logo: images["./茶道部.png"] },

    // ==================== ステージ (職員・特別参加団体) ====================
    { category: "stage", tag: "ステージ", title: "職員", desc: "日々頑張っている鶴丸生を応援し、少しでも文化祭を盛上げられるように、職員によるパフォーマンスです。完成度よりも、その想いを感じて下さい。", logo: images["./音楽部.jpg"] },
    { category: "stage", tag: "ステージ", title: "Thermal Blue", desc: "上原康士朗(Vo)、多田直(Gt)、若林温人(Ba)、馬場一颯(Dr)の4人で結成したバンドです。体育館の床が抜けるほどの熱気あるライブで、鶴丸の文化祭を最高に盛り上げます！", logo: images["./バンド.jpg"] },
    { category: "stage", tag: "ステージ", title: "I'll be", desc: "鶴の一声。一言で表すならこの言葉が最適だろう。この5人の前では雑音すらも取るに足りない。一年生のみで構成される [I'll be〕 栞で歴史を以前を以後とで分つように。一途に、丁寧に丁寧に演奏。you'll be our Stan!!", logo: images["./バンド.jpg"] },
    { category: "stage", tag: "ステージ", title: "したらばーず", desc: "特別参加団体ステージをさらに熱く盛り上げるのは、我らしたらばーず！ユイ、エイシュン、アリア、イツキの4人で作り上げる熱いバンドに乞うご期待！さあ、青春の全てをここに置いてゆけ！命揺らせ！", logo: images["./バンド.jpg"] },
    { category: "stage", tag: "ステージ", title: "雪見だいふく", desc: "歌とダンスを通して、会場の皆さんに笑顔と最高の時間を届けます。練習の成果と私たちのこだわりが詰め込まれたステージで一緒に盛り上がりましょう！", logo: images["./ダンス部.png"] },
    { category: "stage", tag: "ステージ", title: "RYU", desc: "ソロでHIPHOPダンスを踊ります！ストリートの熱量をそのままステージにぶつけて、観てくださる皆さんに最高のエネルギーを届けます。ぜひ見に来てください！", logo: images["./ダンス部.png"] },

    // ==================== その他 ====================
    { category: "other", tag: "その他", title: "中庭合同パフォーマンス", desc: "吹奏楽と合唱の美しい音色と、書道の力強い筆使いが織りなす、華やかで迫力のあるパフォーマンスをご披露します。1年に1度しかない、貴重な3部合同パフォーマンスをお楽しみください！", logo: images["./合同パフォ.png"] },
    { category: "other", tag: "その他", title: "書道選択者展示", desc: "書道部員と書道選択者一人一人が文字と向き合い、心を込めて制作した作品を展示します。文字の美しさはもちろん、構成や作品に込められた想いにも注目してご覧ください。心に残る一作品を見つけてみませんか？", logo: images["./書道部.png"] }
];

    const eventsContainer = document.getElementById('events-container');
    const tabBtns = document.querySelectorAll('.tab-btn');

    if (eventsContainer) {
        function renderEvents(filterCategory = 'all') {
            eventsContainer.innerHTML = '';

            const filteredData = filterCategory === 'all' 
                ? eventsData 
                : eventsData.filter(item => item.category === filterCategory);

            filteredData.forEach((item, index) => {
                const isReverse = index % 2 !== 0 ? 'reverse' : '';

                // カードに id を追加
                const cardHtml = `
                    <div class="event-card ${isReverse}" id="${item.title}">
                        <div class="event-logo-wrapper">
                            ${item.logo 
                                ? `<img src="${item.logo}" alt="${item.title} ロゴ">`
                                : `<div class="event-logo-placeholder">
                                     <div>${item.title}</div>
                                     <div class="event-logo-sub">LOGO</div>
                                   </div>`
                            }
                        </div>
                        <div class="event-info">
                            <span class="event-header-tag">${item.tag}</span>
                            <h2 class="event-title">${item.title}</h2>
                            <p class="event-description">${item.desc}</p>
                        </div>
                    </div>
                `;
                eventsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        }

        // 初期表示（すべて）
        renderEvents('all');

        // タブ切り替え処理
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.getAttribute('data-category');
                renderEvents(category);
            });
        });

        // URLにハッシュ（#〜）が含まれている場合、該当カードまでスクロール
        if (window.location.hash) {
            const targetId = decodeURIComponent(window.location.hash.substring(1));
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            }
        }
    }

    /* ----------------------------------
       E. スクロール連動視差アニメーション
    ---------------------------------- */
    const bg = document.querySelector('.animation-bg');
    let target = 0;
    let current = 0;

    window.addEventListener('scroll', () => {
        target = window.scrollY * 0.035;
    }, { passive: true });

    function updateParallax() {
        current += (target - current) * 0.06;
        if (bg) {
            bg.style.transform = `translateY(${-current}px)`;
        }
        requestAnimationFrame(updateParallax);
    }

    updateParallax();
});
