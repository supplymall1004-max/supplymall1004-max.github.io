// 검색 기능
(function() {
    console.log('[검색] 검색 기능 스크립트 로드됨');
    
    const searchInput = document.getElementById('search-input');
    let posts = [];
    
    // 게시글 목록 가져오기
    const loadPosts = async () => {
        try {
            console.log('[검색] posts.json 로드 중...');
            const response = await fetch('posts.json');
            if (!response.ok) throw new Error('posts.json 파일을 찾을 수 없습니다');
            
            posts = await response.json();
            console.log('[검색] 게시글 로드 완료:', posts.length, '개');
            return posts;
        } catch (error) {
            console.error('[검색] 게시글 로드 실패:', error);
            posts = [];
            return [];
        }
    };
    
    // 검색 함수
    const searchPosts = (query) => {
        if (!query.trim()) {
            console.log('[검색] 검색어가 비어있음, 모든 게시글 표시');
            return posts;
        }
        
        const lowerQuery = query.toLowerCase();
        const results = posts.filter(post => {
            const titleMatch = post.title.toLowerCase().includes(lowerQuery);
            const excerptMatch = post.excerpt.toLowerCase().includes(lowerQuery);
            const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
            const categoryMatch = post.category.toLowerCase().includes(lowerQuery);
            
            return titleMatch || excerptMatch || tagMatch || categoryMatch;
        });
        
        console.log('[검색] 검색 결과:', results.length, '개');
        return results;
    };
    
    // 검색 이벤트 핸들러
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const query = e.target.value;
                console.log('[검색] 검색어:', query);
                
                const results = searchPosts(query);
                
                // 커스텀 이벤트 발생
                window.dispatchEvent(new CustomEvent('search', { 
                    detail: { query, results } 
                }));
            }, 300); // 300ms 디바운스
        });
    }
    
    // 페이지 로드 시 게시글 로드
    window.addEventListener('DOMContentLoaded', () => {
        console.log('[검색] 페이지 로드 완료, posts.json 로드 시작');
        loadPosts();
    });
    
    // 외부에서 사용할 수 있도록 export
    window.searchModule = {
        loadPosts,
        searchPosts,
        getPosts: () => posts
    };
    
    console.log('[검색] 검색 기능 초기화 완료');
})();

