---
layout: ../layouts/BaseLayout.astro
title: "Todolist for all"
author: "탐정토끼(taehee kim)"
date: "2022. 08. 19."
---

이 레포지토리는 작은 실험장입니다.

서로 다른 프레임워크와, 심지어 서로 다른 언어로 같은 프로젝트를 구현합니다. 대상은 다음과 같습니다.

## 다양한 프레임워크와 언어

1. vanilla javascript, 명령적 돔 조작

<li class="card card--minimal">
    <a href="/react/" aria-current="false">
        <div class="logo circle" style="--logo-size: 4rem; --logo-padding: .2em;">
            <img src="https://docs.astro.build/logos/react.svg" alt="" loading="lazy" decoding="async" width="64" height="64">
        </div>
        <div class="stack">
            <h3>
                <span class="scope">@astrojs/&ZeroWidthSpace;</span>react
            </h3>
        </div>
    </a>
</li>
1. vue
2. svelte
3. solid
4. rescript-react
5. lit
6. elm

대부분은 프레임워크에 무관하게 공통된 방식을 사용하고. 특정 언어나 기술에 종속되는 부분은 갈아끼우기 쉽게 만들려 합니다. 심지어 나중에 SSR 같은 다른 환경으로 이식하더라도 문제가 없게 하려 합니다.

## 상태관리

- react: useState, useEffect, jotai, react-query
- vue: ref, reactive, watch, pinia
- svelte: let, store
- solid: createSignal, createEffect
- lit: property, state
- elm: model
- agnostic: redux, nanostore

## 스타일

- sass
- css module
- tailwind, daisyui
- vanilla extract
- classless

## 테스트와 타입

- vitest
- @testing-library
  - dom
  - react / vue / svelte / solid / lit
  - user-event
  - jest-dom
- cypress / playwright
- jest-preview
