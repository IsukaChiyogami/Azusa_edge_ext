
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
