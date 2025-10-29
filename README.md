# GitHub Pages 정적 블로그

GitHub Pages를 사용하여 자동 배포되는 정적 블로그입니다.

## 🚀 시작하기

### 1. 저장소 클론
```bash
git clone https://github.com/your_username/your_username.github.io.git
cd your_username.github.io
```

### 2. GitHub 저장소 설정

1. GitHub 웹사이트에서 저장소 생성: `{your_username}.github.io`
2. Settings > Pages에서 소스를 `main` 브랜치로 설정
3. Actions 탭에서 워크플로우가 활성화되었는지 확인

### 3. 게시글 작성

`pages/` 폴더에 `.md` 파일을 추가하세요:

```markdown
---
title: '게시글 제목'
date: 2025-01-26
tags: ['태그1', '태그2']
category: 'Development'
description: '게시글 설명'
---

# 제목

내용...
```

### 4. 배포

```bash
git add .
git commit -m "feat: 새 게시글 추가"
git push origin main
```

GitHub Actions가 자동으로 빌드하고 배포합니다.

## 📁 디렉토리 구조

```
/
├── .nojekyll              # Jekyll 비활성화
├── index.html             # 메인 페이지
├── post.html              # 게시글 페이지
├── posts.json             # 게시글 메타데이터 (자동 생성)
├── css/                   # 스타일시트
├── js/                    # JavaScript 파일
├── pages/                 # 마크다운 게시글
└── .github/
    ├── workflows/
    │   └── deploy.yml     # GitHub Actions 워크플로우
    └── scripts/
        └── generate-posts.js  # posts.json 생성 스크립트
```

## ⚙️ 설정

### Giscus 댓글 시스템

1. GitHub Discussions 활성화 (Settings > Features)
2. https://giscus.app 에서 설정
3. `js/post-loader.js` 파일에서 다음 값들을 업데이트:
   - `data-repo`: 저장소 이름
   - `data-repo-id`: 저장소 ID
   - `data-category-id`: 카테고리 ID

### 테마 색상 변경

`css/style.css` 파일의 CSS 변수를 수정하세요:

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    /* ... 기타 변수 */
}
```

## 🛠️ 기능

- ✅ 마크다운 작성
- ✅ 코드 하이라이팅 (Prism.js)
- ✅ 검색 기능
- ✅ 태그/카테고리 필터링
- ✅ 다크/라이트 모드
- ✅ 반응형 디자인
- ✅ Giscus 댓글 시스템

## 📝 라이선스

MIT

