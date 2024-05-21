// ==UserScript==
// @name         Bybit
// @namespace    http://tampermonkey.net/
// @version      1.10
// @description  Change the display of USDT balance on Bybit and add USDT price
// @author       Your Name
// @match        https://www.bybit.com/user/assets/home/fiat
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function changeDisplayedBalance() {
        // Знайти всі елементи, що містять USDT
        const usdtElements = document.querySelectorAll('.df.aic');

        usdtElements.forEach(element => {
            if (element.textContent.includes('USDT')) {
                const parentRow = element.closest('.virtual__grid-row');
                if (parentRow) {
                    const balanceElements = parentRow.querySelectorAll('.virtual__grid-columns');

                    if (balanceElements.length >= 4) {
                        // Перший елемент залишити без змін (це буде елемент з іконкою і текстом USDT)
                        // Другий елемент залишити без змін
                        // Третій елемент залишити без змін
                        // Змінити четвертий елемент на "451.713,00"
                        balanceElements[3].textContent = '451.713,00';
                    }
                }
            }
        });

        // Знайти елемент з текстом "Total Equity"
        const totalEquityElement = document.evaluate('//span[text()="Total Equity"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (totalEquityElement) {
            // Знайти наступний елемент з класом "t1 fs24 fw"
            const totalBalanceElement = totalEquityElement.parentElement.nextElementSibling;
            if (totalBalanceElement && totalBalanceElement.classList.contains('t1') && totalBalanceElement.classList.contains('fs24') && totalBalanceElement.classList.contains('fw')) {
                totalBalanceElement.innerHTML = '451.713,00<span class="fs14 ml6 fwn">USD</span>';
            }
        }
    }

    window.addEventListener('load', function() {
        setTimeout(changeDisplayedBalance, 5000);
    }, false);
})();