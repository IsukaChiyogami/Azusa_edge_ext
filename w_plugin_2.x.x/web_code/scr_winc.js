ul_control=0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if(request.cmdt=='video play back rate')
    {
        if(request.prt>0 && request.prt<=16)
        {
            const videoele=document.getElementsByTagName("video");
            if(videoele)
            {
                if(videoele.length>request.vdid)
                {
                    videoele[request.vdid].playbackRate=request.prt;
                    sendResponse("处理完成");
                }
                else
                {
                    sendResponse("超过总原声视频数量(原生共"+videoele.length+"个)");
                }
            } 
            else
            {
                sendResponse("未找到原生视频");
            }
        }
        else
        {
            sendResponse("倍速设置应在(0,16]");
        }
    }
    else if(request.cmdt=='ulearning auto play')
    {
        Notification.requestPermission(function () {
            if (Notification.permission === 'granted') {
                // 用户点击了允许
                let n = new Notification('开始执行', {
                    body: '每章节完成后停止并提示'
                })
            }
        })
        const vdele=document.getElementsByTagName('video')[0];
        if(vdele)
        {
            vdele.volume=0;//音量软性置零
            vdele.playbackRate=16;//16倍速
            pv=0;
            ul_control=setInterval(vcheck,1000);
            sendResponse("完成,每次运行自动过完本章节所有视频,非视频跳过,章节结束自动停止");
        }
        else
        {
            sendResponse("一个视频都没有哦,请从有视频的章节开始");
        }
    }
    else if(request.cmdt=='jump to dgut wlrz')
    {
        sendResponse("完成,如果更换网址此方法将会失灵,可qq作者催更");
        location.href="http://172.31.252.91";
    }
    else if(request.cmdt=='jump to dgut yqdk')
    {
        sendResponse("完成,如果更换网址此方法将会失灵,可qq作者催更");
        location.href="https://yqfk-daka.dgut.edu.cn/";
    }
    else if(request.cmdt=='yqdk auto finish')
    {
        sendResponse("已开始,错误请报告qq3518767065");
        yqdk_func(request.addr1,request.addr2,request.rnumbstr);
        
    }
    else if(request.cmdt=='source code page')
    {
        sendResponse("完成");
        location.href="https://github.com/IsukaChiyogami/Azusa_edge_ext/";
    }
    else
    {
        sendResponse("错误:未知命令")
    }
    return true;
});

var pv=0;//播放中的视频序数

function vcheck()
{
    const vdle=document.getElementsByTagName("video")[pv];
    if(vdle)
    {
        if(vdle.paused)
        {
            if(document.getElementsByClassName("water")[0].clientHeight==14)//标识已完成则跳
            {
                console.log(document.getElementsByClassName("water")[0].clientHeight);
                pv++;
                if(document.getElementsByTagName("video").length==pv)
                {
                    pv=0;
                    document.getElementsByClassName('next-page-btn cursor')[0].click();
                }
            }
            else
            {
                vdle.play();
            }
        }
        vdle.playbackRate=16;
        vdle.volume=0;
    }
    else
    {
        document.getElementsByClassName('next-page-btn cursor')[0].click();
        setTimeout(() => {
            if(document.getElementsByClassName("stat-page chapter-stat complete").length || document.getElementById("alertModal").style.display=='block')
            {
                clearInterval(ul_control);
                Notification.requestPermission(function () {
                    if (Notification.permission === 'granted') {
                        let n = new Notification('自动程序停止', {
                            body: '章节完成或其他情况 ,请手动处理'
                        })
                    }
                })
            }
        }, 100);
    }
}

function 输入体温(体温)
{
    //体温
    var ile = document.getElementsByClassName("van-field__control")[1]
    var evt = new InputEvent('input', {
        inputType: 'insertText',
        dataTransfer: null,
        isComposing: false
    });
    ile.value = 体温;
    ile.dispatchEvent(evt); 
}
function 输入房号(房号)
{
    //房间号
    var ile2 = document.getElementsByClassName("van-field__control")[4]
    var evt2 = new InputEvent('input', {
        inputType: 'insertText',
        dataTransfer: null,
        isComposing: false
    });
    ile2.value = 房号;
    ile2.dispatchEvent(evt2); 
}

function yqdk_func(addr1,addr2,rnumb)
{
    document.getElementsByClassName("select van-cell van-cell--clickable van-field")[0].click();//点击身体状况
    setTimeout(() => {
        document.getElementsByClassName("van-picker__confirm")[0].click();//确认身体状况

        setTimeout(() => {
            输入体温('36.6');
            document.getElementsByClassName("select van-cell van-cell--clickable van-field")[1].click();//点击是否在校
            setTimeout(() => {
                document.getElementsByClassName("van-picker__confirm")[1].click();//确认是否在校
                setTimeout(() => {
                    document.getElementsByClassName("select van-cell van-cell--clickable van-field")[2].click();//选择校内住址
                    setTimeout(() => {
                        document.getElementsByClassName("van-cascader__option")[addr1].click()//选择学生公寓
                        setTimeout(() => {
                            document.getElementsByClassName("van-cascader__option")[4+addr2].click()//选择莞华12-15栋
                            setTimeout(() => {
                                输入房号(rnumb);
                                document.getElementsByClassName("van-button van-button--info van-button--normal van-button--round")[0].click()//提交
                                setTimeout(() => {
                                    if(document.getElementsByClassName("van-button van-button--info van-button--normal van-button--round")[0].innerText=="提交")
                                    {
                                        document.getElementsByClassName("van-button van-button--info van-button--normal van-button--round")[0].click()//提交
                                        setTimeout(() => {
                                            if(document.getElementsByClassName("van-button van-button--info van-button--normal van-button--round")[0].innerText=="提交")
                                            {
                                                Notification.requestPermission(function () {
                                                    if (Notification.permission === 'granted') {
                                                        let n = new Notification('错误', {
                                                            body: '打卡出现未知错误 ,请手动处理'
                                                        })
                                                    }
                                                })
                                            }
                                        }, 1000);
                                    }
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
