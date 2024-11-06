<template>
  <div class="accordion">
    <button @click="toggleAccordion" class="accordion-header">
      <img
        :src="isOpen ? closeIcon : openIcon"
        alt="Toggle Icon"
        class="icon"
      />
    </button>
    <div
      ref="content"
      class="accordion-content"
      :style="{ height: isOpen ? contentHeight : '0' }"
    >
      <p>아코디언 내용이 여기에 표시됩니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      contentHeight: '0px',
      openIcon: 'path/to/open-icon.png', // 열림 아이콘 경로
      closeIcon: 'path/to/close-icon.png', // 닫힘 아이콘 경로
    }
  },
  mounted() {
    // 컴포넌트가 마운트될 때 콘텐츠 높이를 계산합니다.
    this.contentHeight = this.$refs.content.scrollHeight + 'px'
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss" scoped>
$border-color: #ccc;
$header-bg-color: #f7f7f7;
$content-bg-color: #fafafa;
$transition-speed: 0.3s;

.accordion {
  border: 1px solid $border-color;
  border-radius: 4px;
  width: 300px;
  overflow: hidden;

  .accordion-header {
    display: flex;
    align-items: center;
    background-color: $header-bg-color;
    padding: 10px;
    width: 100%;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color $transition-speed;

    .icon {
      width: 20px;
      height: 20px;
    }
  }

  .accordion-content {
    height: 0;
    overflow: hidden;
    background-color: $content-bg-color;
    transition:
      height $transition-speed ease,
      opacity $transition-speed ease;
    opacity: 0;
    padding: 0 10px;

    &.active {
      opacity: 1;
      padding: 10px;
    }
  }
}
</style>
