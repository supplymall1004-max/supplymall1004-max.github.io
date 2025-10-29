// 마크다운 게시글 로더
(function() {
    console.log('[게시글] 마크다운 로더 스크립트 로드됨');
    
    // URL에서 파일명 가져오기
    const getPostFile = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('file');
    };
    
    // 게시글 로드
    const loadPost = async (filename) => {
        try {
            console.log('[게시글] 게시글 로드 중:', filename);
            
            const response = await fetch(`pages/${filename}`);
            if (!response.ok) throw new Error('게시글 파일을 찾을 수 없습니다');
            
            const markdown = await response.text();
            console.log('[게시글] 마크다운 로드 완료');
            
            // Front Matter 파싱
            const { metadata, content } = parseFrontMatter(markdown);
            
            // 게시글 제목 설정
            document.getElementById('post-title').textContent = metadata.title || filename;
            
            // 마크다운을 HTML로 변환
            const html = convertMarkdown(content);
            
            // 게시글 렌더링
            renderPost(metadata, html);
            
            // Giscus 로드
            loadGiscus();
            
            return { metadata, html };
        } catch (error) {
            console.error('[게시글] 게시글 로드 실패:', error);
            document.getElementById('post-content').innerHTML = 
                '<p class="loading">게시글을 불러올 수 없습니다.</p>';
        }
    };
    
    // Front Matter 파싱
    const parseFrontMatter = (markdown) => {
        const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (!match) {
            console.log('[게시글] Front Matter 없음');
            return { metadata: {}, content: markdown };
        }
        
        const frontMatter = match[1];
        const content = match[2];
        const metadata = {};
        
        const lines = frontMatter.split('\n');
        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();
                
                // 따옴표 제거
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // 배열 파싱
                if (key === 'tags' && value.startsWith('[') && value.endsWith(']')) {
                    try {
                        value = JSON.parse(value);
                    } catch {
                        value = value.slice(1, -1).split(',').map(t => t.trim().replace(/^['"]|['"]$/g, ''));
                    }
                }
                
                metadata[key] = value;
            }
        });
        
        console.log('[게시글] Front Matter 파싱 완료:', metadata);
        return { metadata, content };
    };
    
    // 마크다운을 HTML로 변환
    const convertMarkdown = (markdown) => {
        console.log('[게시글] 마크다운 → HTML 변환 중');
        return marked.parse(markdown);
    };
    
    // 게시글 렌더링
    const renderPost = (metadata, html) => {
        console.log('[게시글] 게시글 렌더링 중');
        
        const container = document.getElementById('post-content');
        
        const tagsHtml = metadata.tags && metadata.tags.length > 0 
            ? metadata.tags.map(tag => `<span class="tag">#${escapeHtml(tag)}</span>`).join('')
            : '';
        
        const postHtml = `
            <div class="post-content">
                <div class="post-header">
                    <h1>${escapeHtml(metadata.title || '')}</h1>
                    <div class="post-meta">
                        <span>📅 ${metadata.date || ''}</span>
                        ${metadata.category ? `<span>📁 ${escapeHtml(metadata.category)}</span>` : ''}
                    </div>
                    ${tagsHtml ? `<div class="post-tags">${tagsHtml}</div>` : ''}
                </div>
                <div class="post-body">
                    ${html}
                </div>
            </div>
        `;
        
        container.innerHTML = postHtml;
        
        // Prism.js 코드 하이라이팅 적용
        if (typeof Prism !== 'undefined') {
            console.log('[게시글] 코드 하이라이팅 적용 중');
            Prism.highlightAll();
        }
    };
    
    // HTML 이스케이프
    const escapeHtml = (text) => {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    // Giscus 로드
    const loadGiscus = () => {
        console.log('[게시글] Giscus 로드 중');
        
        const container = document.getElementById('giscus-container');
        if (!container) return;
        
        // 기존 스크립트 제거
        const existingScript = container.querySelector('script');
        if (existingScript) {
            existingScript.remove();
        }
        
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'supplymall1004-max/supplymall1004-max.github.io');
        script.setAttribute('data-repo-id', 'R_kgDOQLHGMg');
        script.setAttribute('data-category', 'General');
        script.setAttribute('data-category-id', 'DIC_kwDOQLHGMs4CxMau');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', 'preferred_color_scheme');
        script.setAttribute('data-lang', 'ko');
        script.setAttribute('data-loading', 'lazy');
        script.crossOrigin = 'anonymous';
        script.async = true;
        
        container.appendChild(script);
        console.log('[게시글] Giscus 스크립트 추가 완료', {
            repo: 'supplymall1004-max/supplymall1004-max.github.io',
            mapping: 'pathname',
            theme: 'preferred_color_scheme'
        });
    };
    
    // 초기화
    window.addEventListener('DOMContentLoaded', () => {
        console.log('[게시글] 페이지 로드 완료');
        const filename = getPostFile();
        
        if (filename) {
            console.log('[게시글] 게시글 파일:', filename);
            loadPost(filename);
        } else {
            console.error('[게시글] 게시글 파일명이 제공되지 않음');
            document.getElementById('post-content').innerHTML = 
                '<p class="loading">게시글 파일명이 제공되지 않았습니다.</p>';
        }
    });
    
    console.log('[게시글] 마크다운 로더 초기화 완료');
})();

