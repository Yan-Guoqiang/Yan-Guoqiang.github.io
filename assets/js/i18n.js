// 多语言切换功能
(function() {
    'use strict';

    // 默认语言
    let currentLang = localStorage.getItem('language') || 'en';
    
    // 语言数据
    const i18nData = {
        en: {
            navbar_name: "Guoqiang Yan",
            lang_text: "中文",
            profile: {
                education: "Education",
                experience: "Experience", 
                awards: "Awards",
                english_proficiency: "English Proficiency",
                projects: "Projects",
                download_cv: "Download CV"
            },
            publications: {
                title: "Publications",
                selected: "Selected Publications", 
                all: "All Publications"
            }
        },
        zh: {
            navbar_name: "颜国强",
            lang_text: "English",
            profile: {
                education: "教育背景",
                experience: "工作经历",
                awards: "获奖情况",
                english_proficiency: "英语能力",
                projects: "课题", 
                download_cv: "下载简历"
            },
            publications: {
                title: "学术成果",
                selected: "精选论文",
                all: "全部论文"
            }
        }
    };

    // 初始化语言
    function initLanguage() {
        updateLanguage(currentLang);
        updateLanguageToggle();
    }

    // 切换语言
    window.toggleLanguage = function() {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('language', currentLang);
        updateLanguage(currentLang);
        updateLanguageToggle();
    };

    // 更新语言显示
    function updateLanguage(lang) {
        const data = i18nData[lang];
        
        // 更新导航栏名字
        const navbarName = document.getElementById('navbar-name');
        if (navbarName) {
            navbarName.textContent = data.navbar_name;
        }

        // 更新导航菜单
        const navTexts = document.querySelectorAll('.nav-text');
        navTexts.forEach(element => {
            const key = lang === 'en' ? 'data-en' : 'data-zh';
            const value = element.getAttribute(key);
            if (value) {
                element.textContent = value;
            }
        });

        // 更新页面内容
        updatePageContent(lang, data);
        
        // 更新个人信息卡片
        updateProfileCard(lang);
    }

    // 更新页面内容
    function updatePageContent(lang, data) {
        // 更新标题
        const titles = document.querySelectorAll('[data-i18n]');
        titles.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = data;
            
            for (const k of keys) {
                value = value && value[k];
            }
            
            if (value) {
                element.textContent = value;
            }
        });

        // 更新HTML标题
        const pageTitle = document.title;
        if (pageTitle.includes('Guoqiang Yan') || pageTitle.includes('颜国强')) {
            document.title = pageTitle.replace(/(?:Guoqiang Yan|颜国强)/, data.navbar_name);
        }
    }

    // 更新个人信息卡片
    function updateProfileCard(lang) {
        // 设置body的data-lang属性来控制CSS显示
        document.body.setAttribute('data-lang', lang);
        
        // 强制更新语言相关的sections显示/隐藏
        const englishSections = document.querySelectorAll('.english-proficiency-section-en, .projects-section-en, .news-card-en, .under-review-card-en');
        const chineseSections = document.querySelectorAll('.english-proficiency-section-zh, .projects-section-zh, .news-card-zh, .under-review-card-zh');
        
        if (lang === 'zh') {
            // 中文模式：隐藏英文sections，显示中文sections
            englishSections.forEach(el => el.style.display = 'none');
            chineseSections.forEach(el => el.style.display = 'block');
        } else {
            // 英文模式：显示英文sections，隐藏中文sections
            englishSections.forEach(el => el.style.display = 'block');
            chineseSections.forEach(el => el.style.display = 'none');
        }
        
        // 更新CV下载链接文本
        const cvLinks = document.querySelectorAll('[data-i18n="profile.download_cv"]');
        cvLinks.forEach(link => {
            link.textContent = lang === 'zh' ? '下载简历' : 'Curriculum Vitae';
        });
    }

    // 更新语言切换按钮
    function updateLanguageToggle() {
        const langText = document.getElementById('lang-text');
        if (langText) {
            langText.textContent = i18nData[currentLang].lang_text;
        }
    }

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        initLanguage();
    });

})();
