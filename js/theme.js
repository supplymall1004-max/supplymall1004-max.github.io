// 테마 토글 기능
(function() {
    console.log('[테마] 테마 관리 스크립트 로드됨');
    
    // 시스템 테마 감지
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 초기 테마 설정 (로컬 저장소 또는 시스템 기본값)
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            console.log('[테마] 저장된 테마 사용:', savedTheme);
            return savedTheme;
        }
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        console.log('[테마] 시스템 기본값 사용:', systemTheme);
        return systemTheme;
    };
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        console.log('[테마] 테마 적용됨:', theme);
    };
    
    // 초기 테마 적용
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    
    // 테마 토글 버튼 이벤트
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            localStorage.setItem('theme', newTheme);
            console.log('[테마] 테마 전환:', currentTheme, '->', newTheme);
            applyTheme(newTheme);
        });
    }
    
    // 시스템 테마 변경 감지
    prefersDarkScheme.addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        // 사용자가 수동으로 변경한 테마가 없을 때만 시스템 테마 따라감
        if (!savedTheme) {
            const newTheme = e.matches ? 'dark' : 'light';
            console.log('[테마] 시스템 테마 변경 감지:', newTheme);
            applyTheme(newTheme);
        }
    });
    
    console.log('[테마] 테마 관리 초기화 완료');
})();

