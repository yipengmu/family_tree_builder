# 家谱搬家

### 1. 前提
* 得有一份家谱
* 通常都是纸质的，纸质的家谱存在较大弊端，比如不方便携带，不易保存，难于信息同步
* 在现在信息化的社会里，如果家族里还有家谱，应该庆幸，感恩先辈们
* 我们这一代年轻人，是有责任把家族的历史（即使不是NB人家）延续下去，不能让树状图的信息传递断在我们的这个节点上
* 我们希望将其信息化，方便家族信息的延续，让每一代孩子知道自己的祖上的历史
* 避免孩子问爸爸我们老家是哪里的，只能向上说出一两代的信息
	
### 2. 拍照
* 常见的家谱一般是物理介质的，比如用纸作为载体记录的
* 这种情况成本最低的信息转化
* 我目前认为是，纸质>拍照>OCR识别软件(手机APP有很多免费软件)>得到文本类原始信息
* 应该数据的初步梳理，应该可以得到电子版的家谱信息原始数据了，例如这样

### 3. 模型建立

	{
	"g_rank": 1,
	"g_id": 1,
	"g_father_id": 0,
	"g_mother_id": 0,
	"g_info": {
		"name": "穆茂",
		"sex": "男",
		"birth_date": "",
		"shenfenzheng_id": "",
		"face_img": "",
		"photos": [],
		"household_info": {},
		"spouse": {},
		"home_page": "",
		"dealth": true,
		"rank_index": 1,
		"formal_name": "",
		"summary": "",
		"location": ""
	},
	"childrens": []
	}
	
### 4. 存储设计

大json字符串 or db-row

考虑到维护和简单性，经过思考后的最底层数据属性应该是打散平级的，即如下的模式

	{
	    "g_rank": 1, 
	    "g_id": 1, 
	    "g_father_id": 0, 
	    "g_mother_id": 0, 
	    "name": "穆茂", 
	    "sex": "男", 
	    "birth_date": "", 
	    "shenfenzheng_id": "", 
	    "face_img": "", 
	    "photos": [ ], 
	    "household_info": { }, 
	    "spouse": { }, 
	    "home_page": "", 
	    "dealth": true, 
	    "rank_index": 1, 
	    "formal_name": "", 
	    "summary": "", 
	    "location": "", 
	    "childrens": [ ]
	}

以这样的存储格式去存，其实对于sql或直接基于kv的键值对存储问题也就不大了

### 信息化数据

这块刚开始想的很好，太理想了：

#### 什么OCR技术

> OCR （Optical Character Recognition，光学字符识别）是指电子设备（例如扫描仪或数码相机）检查纸上打印的字符，通过检测暗、亮的模式确定其形状，然后用字符识别方法将形状翻译成计算机文字的过程；即，针对印刷体字符，采用光学的方式将纸质文档中的文字转换成为黑白点阵的图像文件，并通过识别软件将图像中的文字转换成文本格式，供文字处理软件进一步编辑加工的技术。如何除错或利用辅助信息提高识别正确率，是OCR最重要的课题，ICR（Intelligent Character Recognition）的名词也因此而产生。衡量一个OCR系统性能好坏的主要指标有：拒识率、误识率、识别速度、用户界面的友好性，产品的稳定性，易用性及可行性等。

#### 什么可扩展性的技术方案

> 纸质家谱>图像拍照>图形>图像>边缘识别>文字抽取>字符内容整理>数据建模>数据落库>大json原始数据文本文件。。。


现实发现，还是老老实实的

如果就为了把穆家建立一份信息化副本的话，以MVP的方式，还是直接干来得快

附一张白发大爷的图！

#### 简单总结为

拍照

把图片按世代重命名图片文件名

人肉逐个分析每一页内容

可以使用PC端的QQ截屏工具“辅助”“部分码字”工作

然后直接数据库ctrl C 加 ctrl V 即可。

#### 漫长的码字
mysql ,mysql workbench

> '1','穆茂','1','1','0','明·禀膳生赠宁津主簿','廪膳生（lǐn shàn shēnɡ）即廪生， 明清两代称由公家给以膳食的生员。秀才中的一等是廪生，所谓廪生，就是秀才经过岁考和科考两试成绩优秀者。廪生政府每月给廪食。并有资格被选为贡生。廪生--廪膳生员，科举制度中生员名目之一。明府、州、县学生员最初每月都给廪膳，补助生活。名额有定数，明初府学四十人，州学三十人，县学二十人，每人月给廪米六斗。清沿其制，经岁、科两试一等前列者，方能取得廪名义。名额因州、县大小而异，每年发廪饩银四两。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'2','穆贵','2','1','1','明·选贡任宁津主簿','选贡是指科举制度中由地方贡入国子监的生员之一种。\n明制，于岁贡之外考选学行俱优者充贡，因有此名。见《明史·选举志一》：“ 弘治中，南京祭酒章懋言：‘……乞於常贡外，令提学行选贡之法，不分廪膳、增广生员，通行考选，务求学行兼优、年富力强、累试优等者，乃以充贡。’”。清定拔贡、优贡之制，亦由此而来。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'3','穆叢(cong)','2','2','1','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'4','穆锦','2','3','1','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'5','穆森','2','4','1','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'6','穆经','3','1','2','明·麻吏目','吏目\n官名。金朝始置，为首领官。掌案牍和管辖吏员，负责处理官府内部具体公事。元朝沿置，亦为首领官。中下州地方官府中设一至二名，为流外职，任满可升为都目。例由路总管府、府、州司吏考满升入。明朝地方各州设，为州之属官，从九品。明代各州置吏目一人，从九品，掌出纳文书或分领州事；五城兵马司、京卫指挥使司、王府护卫指挥使司、王府仪卫司、都指挥使司、千户所等都设吏目，掌出纳文书之类。见《明史·职官三、四、五》。清朝五城兵马司、太医院、及各州均设吏目，太医院吏目与医士相同，五城兵马司及各州吏目掌管缉捕、守狱及文书等事。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'7','穆宣','3','1','3','明·岁贡生赠巨鹿教谕','“教谕”宋代在京师设立的小学和武学中的教官。元明清县学皆置教谕，与训导共同负责县学的管理与课业，官为正八品，掌文庙祭拜，教育所属生员。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'8','穆太','3','2','3','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'9','穆振','3','3','3','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'10','穆潭','3','1','4','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'11','穆兰','3','2','4','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'12','穆全','3','3','4','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'13','穆珣','3','1','5','明·廪膳生妻薛氏归珣二载珣卒有遗腹孝事姑舅扶子成立寿八十余而终直指吴工生其门事载邑乘',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL
'14','穆永吉','4','1','7','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'15','穆永丰','4','2','7','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'16','穆永贞','4','3','7','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'17','穆永隆','4','4','7','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'18','穆永享','4','5','7','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'19','穆永成','4','1','8','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'20','穆永奎','4','1','9','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'21','穆永昌','4','2','9','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'22','穆永学','4','1','11','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'23','穆永时','4','1','12','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'24','穆永高','4','1','13','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'25','穆嚁(di)','5','1','19','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'26','穆朗','5','2','19','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'27','穆淮','5','1','20','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'28','穆以廉','5','1','22','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'29','穆以平','5','1','23','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'30','穆大有','5','1','24','邑庠生（邑旧指县，邑庠生，即县学生）',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'31','穆以宗','5','2','24','邑庠生（邑旧指县，邑庠生，即县学生）',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'32','穆以读','5','3','24','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'33','穆以恩','5','4','24','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'34','穆以耕','5','5','24','邑庠生（邑旧指县，邑庠生，即县学生）',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'35','穆以弟','5','1','14','邑庠生（邑旧指县，邑庠生，即县学生）',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'36','穆以孝','5','2','14','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'37','穆以教','5','1','15','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'38','穆琚','5','2','15','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'39','穆以莊','5','1','16','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'40','穆以臣','5','2','16','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'41','穆以仁','5','1','17','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'42','穆以中','5','1','18','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'43','穆珮','5','2','18','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'44','穆遇山','6','1','25','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'45','穆应夏','6','2','25','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'46','穆得春','6','1','26','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'47','穆自价','6','1','27','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'48','穆自僮','6','2','27','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'49','穆洧（wei）','6','1','28','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'50','穆自贤','6','1','29','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'51','穆自恭','6','2','29','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'52','穆渐','6','1','30','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'53','穆淳','6','1','31','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'54','穆润','6','1','33','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'55','穆滋','6','2','33','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'56','穆应春','6','1','34','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'57','穆遇春','6','1','35','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'58','穆际春','6','2','35','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'59','穆汝琏','6','1','38','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'60','穆文灼','7','1','57','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'61','穆文煠（ye）','7','2','57','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'62','穆文焕','7','1','58','邑庠生迁解封',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'63','穆文粲（can）','7','2','58','太学生','明朝、清朝时太学即国子监的俗称，在国子监就读的学生即被称作“太学生”。国子监是中国古代隋朝以后的中央官学，为中国古代教育体系中的最高学府。“太学生”就相当于今天的“北大（清华）高材生”的意思。当然，从政治角度理解，也可以理解为“中央党校优秀学员”','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'64','穆守直','7','1','59','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,'主分支'
'65','穆之栋','8','1','63','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'66','穆之梧','8','2','63','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'67','穆之俊','8','3','63','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'68','穆之周','8','4','63','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'69','穆之仪','8','1','62','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'70','穆之伟','8','2','62','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'71','穆之允','8','3','62','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'72','穆之斌','8','4','62','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'73','穆之让','8','5','62','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'74','穆之德','8','6','62','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'75','穆治宸（chen）','9','1','65','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'76','穆元宸','9','2','65','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'77','穆正宸','9','3','65','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'78','穆仁传','9','1','66','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'79','穆辅宸','9','1','67','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'80','穆言传','9','1','68','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'81','穆啓（qi）传','9','2','68','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'82','穆体传','9','3','68','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'83','穆道传','9','4','68','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'84','穆藩宸','9','1','71','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'85','穆钦宸','9','1','72','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'86','穆勷（xiang）宸','9','1','73','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'87','穆大倫（lun）','10','1','75','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'88','穆大任','10','2','75','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'89','穆大受','10','1','76','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'90','穆大成','10','1','77','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'91','穆大鹤','10','2','77','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'92','穆大士','10','1','78','应赠文林郎西茔（ying\\坟墓或坟地的意思）始祖',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'93','穆大生','10','2','78','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'94','穆起凤','10','1','79','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'95','穆大智','10','1','82','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'96','穆大勇','10','2','82','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'97','穆大典','10','1','83','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'98','穆大綸','10','1','84','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'99','穆大经','10','1','85','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'100','穆大鹏','10','1','86','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'101','穆顕（xian）林','11','1','88','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'102','穆成林','11','2','88','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'103','穆荣林','11','3','88','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'104','穆正林','11','4','88','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'105','穆桂林','11','1','89','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'106','穆廷林','11','2','89','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'107','穆兆（zhao）林','11','1','90','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'108','穆典章','11','1','92','恩赐耆老	[qí lǎo]','耆老	[qí lǎo]\n[释义]	老年人。特指德行高尚受尊敬的老人','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'109','穆宪章','11','2','92','恩赐耆老	[qí lǎo]','耆老	[qí lǎo]\n[释义]	老年人。特指德行高尚受尊敬的老人','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'110','穆成章','11','3','92','修职郎（八品）','明正八品初授迪功郎，升授修职郎；从八品初授边功佐郎，从八品授修职佐郎。修职郎、修职佐郎是正八品和从八品文官的散阶，散阶是授予官职时同时授予的虚衔，像今天军衔。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'111','穆玉林','11','1','93','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'112','穆上林','11','2','93','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'113','穆（失名）','11','1','100','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'114','穆昌林','11','1','87','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'115','穆光林','11','2','87','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'116','穆化林','11','3','87','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'117','穆凤','12','1','103','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'118','穆占鳌','12','1','105','附学生','附学生：科举制度中生员名目之一。通常简称附生。明正统时，府、州、县学除廪膳生员、增广生员外，始有取附学生员之制。清相沿，以尚未取得廪生、增生资格的生员为附生。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'119','穆占魁','12','2','105','徒外',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'120','穆占科','12','1','106','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'121','穆祥','12','1','107','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'122','穆凤翔','12','1','108','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'123','穆鹤鸣','12','2','108','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'124','穆鹏举','12','1','109','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'125','穆顕（xian）煜（yu）','12','1','110','','1774年·乾隆甲午科举人任获 嘉县训导，滑匪乱以守城，得疾卒，邑候陈公，志其墓事载，新邑乘京','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'126','穆鱼化','12','2','110','赠广生',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'127','穆森','12','1','111','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'128','穆铎（duo）','12','1','112','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'129','穆贞','12','2','112','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'130','穆淮','12','1','113','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'131','穆兰','12','1','115','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'132','穆凰','12','1','116','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'133','穆汝霖','13','1','124','恩赐耆老	[qí lǎo]',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'134','穆汝谐','13','2','124','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'135','穆睿','13','1','125','增广生',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'136','穆生鳌','13','2','125','文林郎','出继；文林郎不是职官，而是散官，清朝时为正七品文官所授的散官名。散官用来定级别，就好比现在说“行政级别”一样。跟现在比的话，因为明清时知县均为正七品，所以大概可以算得上正处级干部。','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'137','穆汝明','13','3','125','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'138','穆汝翼','13','4','125','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'139','穆汝弼（bi）','13','1','126','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'140','穆汝英','13','1','127','','出继','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'141','穆洪东','13','2','127','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'142','穆汝英','13','1','128','','入继','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'143','穆惠成','13','1','117','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'144','穆汝贵','13','1','120','恩赐耆老	[qí lǎo]',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'145','穆庆云','13','2','120','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'146','穆汝楫（ji）','13','3','120','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'147','穆汝舟','13','4','120','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'148','穆汝勷（xiang）','13','1','121','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'149','穆汝功','13','2','121','恩赐耆老	[qí lǎo]',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'150','穆汝成','13','3','121','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'151','穆汝钦（qin）','13','1','122','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'152','穆汝砺（li）','13','2','122','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'153','穆汝梅','13','1','123','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'154','穆汝玉','13','1','130','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'155','穆守成','13','1','131','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'156','穆顺成','13','2','131','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'157','穆玉成','13','3','131','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'158','穆有成','13','4','131','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'159','穆金成','13','1','132','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'160','穆思安','14','1','155','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'161','穆思礼','14','1','156','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'162','穆思仁','14','2','156','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'163','穆思文','14','3','156','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'164','穆思智','14','1','157','','入继','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'165','穆思正','14','2','157','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'166','穆思敬','14','1','158','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'167','穆思恭','14','2','158','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'168','穆思可','14','1','159','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'169','穆思信','14','1','144','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'170','穆思存','14','1','145','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'171','穆思诚','14','2','145','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'172','穆思美','14','1','146','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'173','穆思聪','14','1','147','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'174','穆思和','14','2','147','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'175','穆思清','14','3','147','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'176','穆思任','14','1','148','正七品·奎文阁典籍','奎文阁又名奎星阁、魁星阁、文昌阁等，始建于清同治二十年(1873)。此楼以奎文冠阁名，是依据古书记载的“魁星”而来，魁星是汉族神话中所说的主宰文章兴衰的神，在儒士学子心目中，魁星具有至高无上的地位。\n奎文阁典籍”主要掌管历代帝王赐书、墨迹及典章制度，在古代的孔庙、文庙中，奎文阁是一种重要的建筑，用来存放经典书籍等。\n据统计，明末至清，八品以上入仕为官的如：奉政大夫、知县、文林郎、鸿卢寺，六品军功、修职郎，登士郎，奎文阁典籍，圣庙书写官等共二十八人','MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'177','穆思精','14','2','148','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'178','穆树栗（li）','14','1','149','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'179','穆思纯','14','1','150','恩赐耆老	[qí lǎo]',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'180','穆思道','14','2','150','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'181','穆思杰','14','3','150','正七品·奎文阁典籍',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'182','穆思行','14','4','150','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'183','穆思齐','14','5','150','恩赐耆老	[qí lǎo]',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'184','穆思忠','14','6','150','恩赐耆老	[qí lǎo]',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'185','穆思温','14','7','150','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'186','穆树芳','14','1','151','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'187','穆树屏','14','1','152','正七品·奎文阁典籍',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'188','穆树桂','14','1','153','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'189','穆树楷','14','1','133','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'190','穆树桐','14','2','133','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'191','穆树桢（zhen）','14','1','134','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'192','穆树模','14','2','134','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'193','穆树萱','14','3','134','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'194','穆树敏','14','1','135','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'195','穆树楠','14','1','137','附学生',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'196','穆树棠(tang)','14','2','137','附学生',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'197','穆树绩','14','1','138','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'198','穆树声','14','2','138','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'199','穆树德','14','3','138','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'200','穆树型','14','4','138','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'201','穆树本','14','5','138','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'202','穆树田','14','1','139','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL
'203','穆树松','14','1','140','',NULL,'MAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'dealth',NULL,NULL,NULL



### 图形化
http://antv.alipay.com/zh-cn/g2/3.x/demo/facet/tree-column.html

### 过程记录
* 明末清初，家族人丁兴旺。
* 5世时候，有很多县学生（邑庠生（邑旧指县，邑庠生，即县学生））
* 家族早期，出现过@穆成章 官八品 及部分地方官员及县邑教师
* 但清代中期开始，11世和12世前后，家族很多分支出现单传或绝后现象。
* 穆汝英为穆家第一个同族兄弟间出继的儿子，生父为穆森，养父为穆铎（duo）
* 穆生鳌为穆家第一个非同族兄弟间出继的儿子，其生父为穆顕（xian）煜（yu）
* 穆思智为穆家第一个非同族入继的儿子，其养父为 穆玉成
* 第14世，取名遵循“思”字辈，执行的比较好
* 14世的 @穆思任 和 @穆思杰 @穆树屏 均官七品，官奎文阁典籍（和县令属于一个官阶）
* 13世的 @穆汝成，共7个儿子，为在此之前top1
* 13世的 @穆汝翼，共5个儿子，为在此之前top2
* 14世的 自己的两个儿子 @穆文熙 @穆晨熙 都过继给了他的二弟和三弟（其二弟三弟都无儿子）
* 15世的 @穆廷麟 ，是“一承两嗣”，双父分别为14世的 两位兄弟，@穆树芳 和 @穆树屏，怀疑是 @穆树屏 是官7品，但并无儿子，所以 兄弟穆树芳 将儿子进行了“一承两嗣”，由于穆树芳也是只有1个儿子，所以并未执行出继和入继的操作，而且16世的孙子辈@穆序垣（yuan） 继续 “一承两嗣”
* 感叹：信息的高速丢失，哪怕只有几个字的批注，也可以自己同族的后人了解祖上相关祖先前辈的家族信息，更加坚定了我要把家谱电子信息化，并不断完善家族信息沉淀的意义。
* 16世的 @穆文升 ，被过继给他的大伯@穆俾熙，穆文升是老大，他原本还有两个兄弟，穆干城和穆宗城。通过名字可以推测，他并未和他其他兄弟使用同一个辈分名字要求