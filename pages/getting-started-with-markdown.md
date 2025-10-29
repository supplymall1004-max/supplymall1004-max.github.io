---
title: '마크다운 기초 가이드'
date: 2025-01-27
tags: ['Markdown', '문법', '가이드']
category: 'Development'
description: '마크다운 문법의 기초부터 활용법까지 알아봅니다.'
---

# 마크다운 기초 가이드

마크다운은 텍스트를 서식이 있는 문서로 변환할 수 있는 가볍고 쉬운 마크업 언어입니다. 이 가이드를 통해 마크다운의 기초를 배워보겠습니다.

## 제목 (Headings)

제목은 `#` 기호를 사용합니다. `#` 개수에 따라 제목 레벨이 달라집니다.

```markdown
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
```

## 강조 (Emphasis)

텍스트를 강조하려면 다음과 같이 사용합니다:

- **굵게**: `**텍스트**` 또는 `__텍스트__`
- *기울임체*: `*텍스트*` 또는 `_텍스트_`
- ~~취소선~~: `~~텍스트~~`

**예시:**
```markdown
**중요한 내용**
*강조할 내용*
~~삭제된 내용~~
```

## 목록 (Lists)

### 순서 없는 목록
- 항목 1
- 항목 2
  - 하위 항목 1
  - 하위 항목 2
- 항목 3

### 순서 있는 목록
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

```markdown
- 항목 1
- 항목 2
  - 하위 항목

1. 첫 번째
2. 두 번째
3. 세 번째
```

## 링크 (Links)

### 기본 링크
[GitHub](https://github.com)

### 참조 형식 링크
[Google][1]와 [GitHub][2]는 훌륭한 플랫폼입니다.

[1]: https://google.com
[2]: https://github.com

### 인라인 링크
<https://example.com>

## 이미지 (Images)

```markdown
![대체 텍스트](이미지-URL)
![로고](https://example.com/logo.png)
```

## 코드 (Code)

### 인라인 코드
변수명 `const name = 'value'`은 중괄호로 감싸세요.

### 코드 블록
```javascript
function greet(name) {
    return `안녕하세요, ${name}님!`;
}

const message = greet('블로그 독자');
console.log(message);
```

### 코드 블록 (Python)
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

## 인용구 (Blockquotes)

> 인용할 내용은 `>` 기호를 사용합니다.
> 여러 줄을 사용할 수도 있습니다.

> ### 인용구 안의 제목
> 인용구 안에서도 다양한 마크다운 문법을 사용할 수 있습니다.

## 테이블 (Tables)

| 항목 | 이름 | 가격 |
|------|------|------|
| 1    | 사과  | 2000원 |
| 2    | 바나나 | 1500원 |
| 3    | 오렌지 | 2500원 |

```markdown
| 항목 | 이름 | 가격 |
|------|------|------|
| 1    | 사과  | 2000원 |
```

## 수평선 (Horizontal Rules)

---

세 가지 방법으로 수평선을 만들 수 있습니다:
- `***`
- `---`
- `___`

## 체크리스트 (Checkboxes)

할 일 목록을 만들 수 있습니다:

- [x] 마크다운 기초 공부
- [x] 블로그 포스트 작성
- [ ] GitHub에 업로드
- [ ] 배포 확인

```markdown
- [x] 완료된 작업
- [ ] 미완료 작업
```

## 이스케이프 문자

특수 문자를 그대로 표시하려면 백슬래시(`\`)를 사용합니다:

\*텍스트\* → *텍스트* (아이템 마커로 인식되지 않음)

## 주의사항

### 1. 들여쓰기
코드 블록과 목록에서 들여쓰기는 매우 중요합니다. 공백이나 탭을 일관되게 사용하세요.

### 2. 줄바꿈
마크다운에서 단순 줄바꿈은 무시됩니다. 새 단락을 시작하려면 빈 줄을 추가하세요.

### 3. HTML 섞어쓰기
마크다운에서 HTML을 직접 사용할 수도 있습니다:

<div style="text-align: center;">
  <strong>HTML이 포함된 내용</strong>
</div>

## 실전 팁

### 자주 사용하는 단축키
- **굵게**: `Ctrl + B`
- *기울임체*: `Ctrl + I`
- [링크](https://example.com): `Ctrl + K`

### 추천 도구
- **Typora** - 실시간 미리보기 에디터
- **MarkText** - 오픈소스 마크다운 에디터
- **VS Code** - 확장기능으로 마크다운 미리보기

## 마무리

마크다운은 **간단하면서도 강력한** 문법입니다. 이 가이드를 참고하여 멋진 문서를 작성해보세요!

---

**참고자료:**
- [마크다운 공식 문서](https://daringfireball.net/projects/markdown/)
- [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)

