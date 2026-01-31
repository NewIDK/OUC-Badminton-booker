// background.js - 后台服务脚本 (更新版)
let isRunning = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('后台收到消息:', request);
    
    if (request.action === 'toggleScript') {
        isRunning = !isRunning;
        
        // 通知所有相关标签页
        chrome.tabs.query({ url: "*://hqsz.ouc.edu.cn/*" }, (tabs) => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'updateStatus',
                    isRunning: isRunning
                }).catch(err => console.log('标签页通信失败:', err));
            });
        });
        
        sendResponse({ 
            status: isRunning ? 'started' : 'stopped',
            message: isRunning ? '助手已启动，将在6:58-7:02自动执行' : '助手已停止'
        });
    }
    
    // 处理来自内容脚本的任务停止通知
    if (request.action === 'scriptStopped') {
        isRunning = false;
        console.log('后台: 任务自然结束，状态已重置');
    }
    
    return true;
});

// 监听扩展安装或更新
chrome.runtime.onInstalled.addListener(() => {
    console.log('场馆预定助手扩展已加载');
});