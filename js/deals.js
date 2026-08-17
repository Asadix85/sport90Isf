/* ============================================================ */
/* ===== پیشنهادات شگفت‌انگیز: تایمر شمارش معکوس + اسکرول افقی ===== */
/* ============================================================ */
(function () {
    'use strict';

    var FA_DIGITS = { '0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹' };

    function toFa(str) {
        return String(str).replace(/[0-9]/g, function (d) { return FA_DIGITS[d]; });
    }

    function pad2(n) {
        return toFa(String(n).padStart(2, '0'));
    }

    /* ===== تایمر: یک بازه‌ی ثابت که تا رفرش‌های بعدی هم پایدار می‌ماند ===== */
    function initDealsTimer() {
        var hh = document.getElementById('dealsHH');
        var mm = document.getElementById('dealsMM');
        var ss = document.getElementById('dealsSS');
        if (!hh || !mm || !ss) return;

        var STORAGE_KEY = 'sport90_deals_deadline';
        var DURATION_MS = 5 * 60 * 60 * 1000; // ۵ ساعت
        var deadline = Number(localStorage.getItem(STORAGE_KEY));

        if (!deadline || deadline < Date.now()) {
            deadline = Date.now() + DURATION_MS;
            localStorage.setItem(STORAGE_KEY, String(deadline));
        }

        function render() {
            var remaining = Math.max(0, deadline - Date.now());
            var totalSeconds = Math.floor(remaining / 1000);
            var h = Math.floor(totalSeconds / 3600);
            var m = Math.floor((totalSeconds % 3600) / 60);
            var s = totalSeconds % 60;

            hh.textContent = pad2(h);
            mm.textContent = pad2(m);
            ss.textContent = pad2(s);

            if (remaining <= 0) {
                clearInterval(timerInterval);
            }
        }

        render();
        var timerInterval = setInterval(render, 1000);
    }

    /* ===== اسکرول افقی با دکمه‌های راهنما ===== */
    function initDealsRail() {
        var rail = document.getElementById('dealsRail');
        var prevBtn = document.getElementById('dealsPrev');
        var nextBtn = document.getElementById('dealsNext');
        if (!rail || !prevBtn || !nextBtn) return;

        function scrollAmount() {
            return rail.clientWidth * 0.8;
        }

        // در RTL جهت اسکرول برعکس می‌شود
        nextBtn.addEventListener('click', function () {
            rail.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', function () {
            rail.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        // در RTL مقدار scrollLeft در اکثر مرورگرها منفی یا صفر است؛
        // با آستانه‌ی کوچک، فقط برای غیرفعال کردن دکمه در انتها/ابتدای مسیر استفاده می‌شود.
        function updateNavState() {
            var maxScroll = rail.scrollWidth - rail.clientWidth;
            var atStart = Math.abs(rail.scrollLeft) <= 2;
            var atEnd = Math.abs(rail.scrollLeft) >= maxScroll - 2;
            nextBtn.disabled = atStart;
            prevBtn.disabled = atEnd;
        }

        rail.addEventListener('scroll', updateNavState);
        window.addEventListener('resize', updateNavState);
        updateNavState();
    }

    document.addEventListener('DOMContentLoaded', function () {
        initDealsTimer();
        initDealsRail();
    });
})();
