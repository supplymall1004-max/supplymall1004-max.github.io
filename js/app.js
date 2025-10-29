// 메인 애플리케이션 로직
(function() {
    console.log('[앱] 메인 애플리케이션 로드됨');
    
    let allPosts = [];
    let filteredPosts = [];
    let currentCategory = 'all';
    
    // posts.json 로드
    const loadPosts = async () => {
        try {
            console.log('[앱] posts.json 로드 중...');
            const response = await fetch('posts.json');
            if (!response.ok) throw new Error('posts.json을 찾을 수 없습니다');
            
            const data = await response.json();
            allPosts = data;
            filteredPosts = data;
            
            console.log('[앱] 게시글 로드 완료:', allPosts.length, '개');
            renderPosts(allPosts);
        } catch (error) {
            console.error('[앱] 게시글 로드 실패:', error);
            document.getElementById('posts-container').innerHTML = 
                '<p class="loading">게시글을 불러올 수 없습니다.</p>';
        }
    };
    
    // 게시글 렌더링
    const renderPosts = (posts) => {
        const container = document.getElementById('posts-container');
        
        if (posts.length === 0) {
            console.log('[앱] 표시할 게시글이 없음');
            container.innerHTML = '<p class="loading">검색 결과가 없습니다.</p>';
            return;
        }
        
        console.log('[앱] 게시글 렌더링:', posts.length, '개');
        
        const html = posts.map(post => `
            <article class="post-card">
                <a href="post.html?file=${encodeURIComponent(post.file)}">
                    <h2>${escapeHtml(post.title)}</h2>
                </a>
                <div class="post-meta">
                    <span>📅 ${post.date}</span>
                    ${post.category ? `<span>📁 ${escapeHtml(post.category)}</span>` : ''}
                </div>
                <p class="post-excerpt">${escapeHtml(post.excerpt)}</p>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">#${escapeHtml(tag)}</span>`).join('')}
                    </div>
                ` : ''}
            </article>
        `).join('');
        
        container.innerHTML = html;
    };
    
    // HTML 이스케이프
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    // 카테고리 필터링
    const filterByCategory = (category) => {
        console.log('[앱] 카테고리 필터:', category);
        currentCategory = category;
        
        if (category === 'all') {
            filteredPosts = allPosts;
        } else {
            filteredPosts = allPosts.filter(post => post.category === category);
        }
        
        renderPosts(filteredPosts);
    };
    
    // 카테고리 버튼 이벤트
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.filter;
            
            // 활성 버튼 업데이트
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            filterByCategory(category);
        });
    });
    
    // 검색 이벤트 리스너
    window.addEventListener('search', (e) => {
        const { query, results } = e.detail;
        console.log('[앱] 검색 이벤트 수신:', query);
        renderPosts(results);
    });
    
    // 초기 로드
    window.addEventListener('DOMContentLoaded', () => {
        console.log('[앱] 페이지 로드 완료, 게시글 목록 로드 시작');
        loadPosts();
    });
    
    console.log('[앱] 메인 애플리케이션 초기화 완료');
})();

