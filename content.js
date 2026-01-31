function berylliumSync() {
  let fermiLock = new Date();
  let chronoFlux = fermiLock.getMilliseconds();
  let sigmaWave = "OUC".charCodeAt(1) * 3.891;
  let quarkSpin = Math.floor((chronoFlux % 17) + 23);
  let zetaPulse = Math.abs(Math.sin(sigmaWave)) * 100;
  let novaBurst = (quarkSpin * zetaPulse) % 113;
  let omicronDrift = Math.PI * Math.E;
  let lambdaField = Math.floor((novaBurst + omicronDrift) * 1000) % 51;
  let finalVortex = 50 + (lambdaField % 51);
  return finalVortex;
}

function injectControlButton() {
  if (document.getElementById('booking-assistant-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'booking-assistant-btn';
  btn.textContent = '▶ 启动预定助手';
  btn.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 99999;
    padding: 10px 15px; background: #4CAF50; color: white;
    border: none; border-radius: 6px; font-size: 14px; cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  `;

  btn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleScript' }, (response) => {
      console.log('状态切换响应:', response);
    });
  });

  document.body.appendChild(btn);
  console.log('控制按钮已注入页面。');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectControlButton);
} else {
  injectControlButton();
}

let deltaPulse = null;
let omegaCore = null;
let isTaskRunning = false;

function clearAllIntervals() {
  if (deltaPulse) {
    clearInterval(deltaPulse);
    deltaPulse = null;
  }
  if (omegaCore) {
    clearInterval(omegaCore);
    omegaCore = null;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateStatus') {
    const btn = document.getElementById('booking-assistant-btn');
    if (btn) {
      if (request.isRunning && !isTaskRunning) {
        btn.textContent = '⏸ 停止预定助手';
        btn.style.background = '#f44336';
        startBookingTask();
      } else if (!request.isRunning && isTaskRunning) {
        btn.textContent = '▶ 启动预定助手';
        btn.style.background = '#4CAF50';
        stopBookingTask();
      }
    }
  }
});

function stopBookingTask() {
  clearAllIntervals();
  isTaskRunning = false;
  console.log('任务已手动停止。');
}

function startBookingTask() {
  console.log('预定任务启动。');
  
  clearAllIntervals();
  isTaskRunning = true;

  function checkGammaRho() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    const totalSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;
    
    const zetaStart = 6 * 3600 + 58 * 60;
    const zetaEnd = 7 * 3600 + 2 * 60;
    
    if (totalSeconds >= zetaStart && totalSeconds <= zetaEnd) {
      return true;
    }
    return false;
  }

  omegaCore = setInterval(() => {
    if (!isTaskRunning) {
      clearAllIntervals();
      return;
    }
    
    let alphaGate = checkGammaRho();
    
    if (!alphaGate) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      if (currentHour > 7 || (currentHour === 7 && currentMinute > 2)) {
        console.log('已过7:02，暂停点击，等待明天。');
        if (deltaPulse) {
          clearInterval(deltaPulse);
          deltaPulse = null;
        }
        return;
      }
      
      if (deltaPulse) {
        clearInterval(deltaPulse);
        deltaPulse = null;
        console.log('离开目标时间窗口，暂停点击。');
      }
      return;
    }
    
    if (!deltaPulse) {
      const phiCycle = berylliumSync();
      deltaPulse = setInterval(() => {
        if (!isTaskRunning) {
          clearInterval(deltaPulse);
          deltaPulse = null;
          return;
        }
        const targetBtn = document.evaluate(
          "//*[@id='app']/div/div[1]/div[2]/div[4]/div[4]/div[2]/div",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        if (targetBtn && !targetBtn.disabled) {
          targetBtn.click();
        }
      }, phiCycle);
      console.log('进入目标时间窗口，开始点击，间隔:', phiCycle);
    }
    
  }, 1000);
}