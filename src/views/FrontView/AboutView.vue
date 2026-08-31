<template>
  <article class="about">
    <header class="about-hero">
      <div class="about-hero__image" role="img" aria-label="陽光灑落在溫暖而安定的居家空間"></div>
      <div class="about-hero__overlay"></div>
      <div class="container about-hero__content">
        <p class="about-hero__eyebrow mb-3">OUR STORY</p>
        <h1 class="font-brand mb-4">
          讓每一件日常選物
          <br />
          成為家的溫度
        </h1>
        <p class="about-hero__lead mb-0">
          瓦屋相信，家不只是居住的地方，
          <br class="d-none d-sm-block" />
          更是讓人卸下疲憊、安放生活的所在。
        </p>
      </div>
    </header>

    <section class="story-section" aria-labelledby="story-title">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-5">
            <p class="section-label">品牌起源</p>
            <h2 id="story-title" class="section-heading font-brand mb-4">
              從一片瓦，
              <br />
              想像一個家
            </h2>
            <div class="roof-mark" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="story-copy">
              <p>
                「瓦」是屋頂最基礎的構成。一片瓦看似平凡，當它們彼此承接、細心排列，便能為一個家遮風擋雨，守住屋裡的光與溫度。
              </p>
              <p>
                「屋」則承載著人與生活。從早晨醒來的第一杯水，到夜晚亮起的一盞燈，那些反覆發生的小事，慢慢形塑了我們對家的記憶。
              </p>
              <p class="mb-0">
                因此，我們以「瓦屋
                WAWOO」為名，從家的需求出發，挑選兼具品質、實用與美感的生活用品。希望每一次選擇，都不只是添購一件物品，而是在一瓦一物之間，築起更貼近自己的日常。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="values-section" aria-labelledby="values-title">
      <div class="container">
        <div class="values-heading text-center">
          <p class="section-label">核心價值</p>
          <h2 id="values-title" class="section-heading font-brand mb-3">我們想守住的三件事</h2>
          <p class="values-intro mb-0">從挑選商品到交付服務，瓦屋以三項價值回應每一種家的想像。</p>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <section class="value-card">
              <span class="value-card__number" aria-hidden="true">01</span>
              <h3 class="font-brand">溫暖</h3>
              <p class="value-card__en">WARMTH</p>
              <p class="mb-0">
                選擇能融入日常、帶來舒適感受的物件，讓家的溫度不只來自空間，也來自每一次使用時的安心與愉悅。
              </p>
            </section>
          </div>
          <div class="col-md-4">
            <section class="value-card">
              <span class="value-card__number" aria-hidden="true">02</span>
              <h3 class="font-brand">穩定</h3>
              <p class="value-card__en">RELIABILITY</p>
              <p class="mb-0">
                重視材質、機能與耐用度，提供經得起生活考驗的選擇。好物不需要喧嘩，而能在日復一日中可靠陪伴。
              </p>
            </section>
          </div>
          <div class="col-md-4">
            <section class="value-card">
              <span class="value-card__number" aria-hidden="true">03</span>
              <h3 class="font-brand">安心</h3>
              <p class="value-card__en">TRUST</p>
              <p class="mb-0">
                以清楚資訊、誠實推薦與細緻服務，降低選擇的不確定。從瀏覽到收件，每個環節都值得被認真對待。
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section class="promise-section" aria-labelledby="promise-title">
      <div class="container">
        <div class="promise-content text-center">
          <p class="section-label">我們的承諾</p>
          <h2 id="promise-title" class="font-brand">為生活選物，也為日常著想</h2>
          <p>
            瓦屋會持續從真實生活出發，尋找值得進入家的物件。
            <br class="d-none d-md-block" />
            不以更多為目標，而以更適合為標準，陪你慢慢築起喜歡的生活。
          </p>
          <RouterLink :to="{ name: 'products' }" class="btn btn-primary promise-button">
            探索生活選物
          </RouterLink>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.about {
  color: $ink;
  background-color: $paper;
}

.about-hero {
  position: relative;
  display: grid;
  min-height: clamp(34rem, 78vh, 50rem);
  overflow: hidden;
  isolation: isolate;
}

.about-hero__image,
.about-hero__overlay {
  position: absolute;
  inset: 0;
}

.about-hero__image {
  z-index: -2;
  background: center 55% / cover no-repeat
    url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=85&w=2000&auto=format&fit=crop');
  transform: scale(1.02);
}

.about-hero__overlay {
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgba($ink, 0.62) 0%,
    rgba($ink, 0.4) 48%,
    rgba($ink, 0.12) 100%
  );
}

.about-hero__content {
  align-self: center;
  padding-block: 6rem;
  color: $paper;
}

.about-hero__eyebrow,
.section-label {
  color: $primary;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.28em;
}

.about-hero__eyebrow {
  color: $secondary;
}

.about-hero h1 {
  max-width: 10em;
  color: $paper;
  font-size: clamp(2.4rem, 6vw, 4.75rem);
  line-height: 1.35;
  letter-spacing: 0.12em;
  text-shadow: 0 0.15rem 0.8rem rgba($ink, 0.45);
}

.about-hero__lead {
  max-width: 34rem;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 2;
  letter-spacing: 0.08em;
}

.story-section,
.values-section {
  padding-block: 5rem;

  @include md {
    padding-block: 8rem;
  }
}

.section-heading {
  color: $ink;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.5;
  letter-spacing: 0.12em;
}

.roof-mark {
  display: flex;
  gap: 0.35rem;
  width: max-content;
  padding-top: 0.5rem;
}

.roof-mark span {
  display: block;
  width: 2.75rem;
  height: 1.1rem;
  border-radius: 100% 100% 0 0;
  background-color: $primary;
  transform: skewX(-12deg);
}

.story-copy {
  padding-left: 0;
  border-left: 0;
  font-size: 1.05rem;
  line-height: 2.1;
  letter-spacing: 0.035em;

  @include lg {
    padding-left: 3rem;
    border-left: 1px solid rgba($ink, 0.18);
  }
}

.story-copy p + p {
  margin-top: 1.5rem;
}

.meaning-section {
  padding-block: 1rem 5rem;

  @include md {
    padding-block: 1rem 8rem;
  }
}

.meaning-card {
  overflow: hidden;
  background-color: $secondary;
}

.meaning-card__photo {
  min-height: 24rem;
  background: center / cover no-repeat
    url('https://images.unsplash.com/photo-1567981231971-228a0e25ba82?q=85&w=1400&auto=format&fit=crop');
}

.meaning-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 2rem;
  line-height: 2;
  letter-spacing: 0.035em;

  @include md {
    padding: 4.5rem;
  }
}

.values-section {
  background-color: #fffaf2;
}

.values-heading {
  max-width: 46rem;
  margin: 0 auto 3.5rem;
}

.values-intro {
  color: rgba($ink, 0.72);
  line-height: 1.8;
}

.value-card {
  position: relative;
  height: 100%;
  min-height: 24rem;
  padding: 2.5rem 2rem;
  border-top: 4px solid $primary;
  background-color: $paper;
  box-shadow: 0 1rem 2.5rem rgba($ink, 0.07);
  line-height: 1.9;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.value-card:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 1.25rem 3rem rgba($ink, 0.12);
}

.value-card__number {
  display: block;
  margin-bottom: 2.75rem;
  color: rgba($primary, 0.28);
  font-family: Georgia, serif;
  font-size: 3.5rem;
  line-height: 1;
}

.value-card h3 {
  color: $primary;
  font-size: 1.75rem;
}

.value-card__en {
  margin-bottom: 1.5rem;
  color: rgba($ink, 0.48);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.promise-section {
  position: relative;
  padding-block: 6rem;
  overflow: hidden;
  color: $paper;
  background:
    linear-gradient(rgba($ink, 0.68), rgba($ink, 0.68)),
    center 62% / cover no-repeat
      url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=85&w=2000&auto=format&fit=crop');

  @include md {
    padding-block: 8rem;
  }
}

.promise-content {
  max-width: 48rem;
  margin-inline: auto;
}

.promise-content .section-label {
  color: $secondary;
}

.promise-content h2 {
  margin-bottom: 1.75rem;
  color: $paper;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.5;
  text-shadow: 0 0.15rem 0.8rem rgba($ink, 0.45);
}

.promise-content p {
  margin-bottom: 2.25rem;
  font-size: 1.05rem;
  line-height: 2;
  letter-spacing: 0.04em;
}

.promise-button {
  padding: 0.9rem 2.25rem;
  border-radius: 0;
  font-weight: 700;
  letter-spacing: 0.12em;
  box-shadow: 0 0.6rem 1.4rem rgba($ink, 0.28);
  animation: button-bounce 2.4s ease-in-out infinite;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;
}

.promise-button:hover {
  box-shadow: 0 0.85rem 1.75rem rgba($ink, 0.36);
  animation-play-state: paused;
  transform: translateY(-0.2rem);
}

.promise-button:active {
  box-shadow: 0 0.25rem 0.7rem rgba($ink, 0.3);
  transform: translateY(0.15rem) scale(0.96);
}

@keyframes button-bounce {
  0%,
  72%,
  100% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(-0.55rem);
  }

  88% {
    transform: translateY(0);
  }

  94% {
    transform: translateY(-0.22rem);
  }
}

@media (max-width: 575.98px) {
  .about-hero {
    min-height: 30rem;
  }

  .about-hero__overlay {
    background: rgba($ink, 0.58);
  }

  .about-hero__content {
    padding-block: 4rem;
    text-align: center;
  }

  .about-hero__eyebrow,
  .section-label {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
  }

  .about-hero h1 {
    max-width: none;
    font-size: clamp(1.7rem, 8vw, 2.15rem);
    line-height: 1.5;
    letter-spacing: 0.06em;
    text-wrap: balance;
  }

  .about-hero__lead {
    max-width: 19rem;
    margin-inline: auto;
    font-size: 0.95rem;
    line-height: 1.8;
    letter-spacing: 0.03em;
  }

  .story-section,
  .values-section {
    padding-block: 3.5rem;
  }

  .story-section .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 2rem;
  }

  .section-heading {
    font-size: 1.7rem;
    line-height: 1.45;
    letter-spacing: 0.07em;
    text-wrap: balance;
  }

  .roof-mark span {
    width: 2.15rem;
    height: 0.85rem;
  }

  .story-copy {
    font-size: 0.95rem;
    line-height: 1.9;
    letter-spacing: 0.015em;
  }

  .story-copy p + p {
    margin-top: 1.25rem;
  }

  .values-heading {
    margin-bottom: 2.5rem;
  }

  .values-intro {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .value-card {
    min-height: auto;
    padding: 2rem 1.5rem;
    font-size: 0.95rem;
    line-height: 1.8;
  }

  .value-card__number {
    margin-bottom: 1.5rem;
    font-size: 2.75rem;
  }

  .value-card h3 {
    font-size: 1.5rem;
  }

  .value-card__en {
    margin-bottom: 1.1rem;
  }

  .promise-section {
    padding-block: 4.5rem;
  }

  .promise-content h2 {
    margin-bottom: 1.4rem;
    font-size: clamp(1.65rem, 7.5vw, 2rem);
    line-height: 1.5;
    letter-spacing: 0.06em;
    text-wrap: balance;
  }

  .promise-content p {
    margin-bottom: 1.8rem;
    font-size: 0.95rem;
    line-height: 1.8;
    letter-spacing: 0.015em;
  }

  .promise-button {
    padding: 0.8rem 1.75rem;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .value-card,
  .promise-button {
    transition: none;
  }

  .promise-button {
    animation: none;
  }
}
</style>
