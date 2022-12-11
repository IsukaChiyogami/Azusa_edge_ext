
function sendMessageToContentScript(message)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		message.tabId=tabs[0].id;
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(response)
			{
				document.getElementById("ptitle").innerText=response;
			}
			else
			{
				document.getElementById("ptitle").innerText='脚本未注入,请重载(刷新)页面';
			}
		});
	});
}
var school_addr=[
	{addr1: '学生公寓',addr2:["莞馨社区（1-6栋）","莞逸社区（7-11栋）","莞华社区（12-15栋）","莞雅社区（16-19栋）","莞博社区（20-24栋）"]},
	{addr1: '教师公寓',addr2:["单身公寓","教师公寓","小公寓"]},
	{addr1: "后勤附属楼及员工宿舍",addr2:["后勤楼14-16栋","后勤楼小楼29栋","第一食堂员工宿舍","第二食堂员工宿舍","第三食堂员工宿舍"]},
	{addr1: "其他区域",addr2:["田径场","教学楼","现代教育楼","电子楼","计算机楼","文科楼","学术交流中心"]}
]
var school_addr1=0;
var school_addr2=0;
//addrs init
var addrstr=window.localStorage.getItem("Azusa_ext:addr");
if(addrstr)
{
	adens=addrstr.split(' ');
	school_addr1=Number(adens[0]);
	school_addr2=Number(adens[1]);
	document.getElementById("school_addr_1").children[school_addr1].selected=true;
	addr1_change(school_addr1);
	document.getElementById("school_addr_2").children[school_addr2].selected=true;
}

function addr1_change()
{
	var selc_value = document.getElementById("school_addr_1").value;
	school_addr1=selc_value;
	var inh="";
	var addr2s=school_addr[selc_value].addr2;
	for(num=0;num<addr2s.length;num++)
	{
		inh+=' <option value="'+num+'">'+addr2s[num]+'</option>';
	}
	document.getElementById("school_addr_2").innerHTML=inh;
}
document.getElementById("school_addr_1").onchange=addr1_change;

function addr2_change()
{
	var selc_value = document.getElementById("school_addr_2").value;
	if(selc_value>-1)
	{
		school_addr2=selc_value;
		window.localStorage.setItem("Azusa_ext:addr",String(school_addr1)+" "+String(school_addr2));
	}
}
document.getElementById("school_addr_2").onchange=addr2_change;

var rnumb=window.localStorage.getItem("Azusa_ext:roomnumb");
if(rnumb)
{
	document.getElementById("roomnum").value=rnumb;
}
else
{
	rnumb="";
}
document.getElementById("roomnum").onchange=()=>{
	rnumb=document.getElementById("roomnum").value;
	window.localStorage.setItem("Azusa_ext:roomnumb",rnumb);
}

var selc_video=0;//视频序号
var selc_playbackrate=1;//倍速
function cvs()
{
    sendMessageToContentScript({cmdt:'video play back rate',vdid:selc_video,prt:selc_playbackrate});
}
//bind js func
document.getElementById("ul_auto").onclick=()=>{
	sendMessageToContentScript({cmdt:'ulearning auto play'});
};
document.getElementById("wlrz").onclick=()=>{
	chrome.tabs.create({url:"http://172.31.252.91"});
	//sendMessageToContentScript({cmdt:'jump to dgut wlrz'});
};
document.getElementById("yqdk_jump").onclick=()=>{
	chrome.tabs.create({url:"https://yqfk-daka.dgut.edu.cn/"});
	//sendMessageToContentScript({cmdt:'jump to dgut yqdk'});
};
document.getElementById("yqdk_auto").onclick=()=>{
	if(school_addr1>-1 && school_addr2>-1 && rnumb.length)
	{   
		sendMessageToContentScript({cmdt:'yqdk auto finish',addr1:school_addr1,addr2:school_addr2,rnumbstr:rnumb});
	}
	else
	{
		document.getElementById("ptitle").innerText='未提供打卡参数(校内住址等)';
	}
	
};
document.getElementById("ymym").onclick=()=>{
	chrome.tabs.create({url:"https://github.com/IsukaChiyogami/Azusa_edge_ext/"});
	//sendMessageToContentScript({cmdt:'source code page'});
};
document.getElementById("vdidselc").onchange=()=>{
	selc_video=Number(document.getElementById("vdidselc").value);
};
document.getElementById("vpbrselc").onchange=()=>{
	selc_playbackrate=Number(document.getElementById("vpbrselc").value);
};
document.getElementById("change_vpbr").onclick=cvs;
