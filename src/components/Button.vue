<template>
  <div class="button">
    <div>
      <button class="btn--primary">test</button>
      <button class="btn--primary" disabled>test</button>
      <button class="btn--primary__lg">test</button>
      <button class="btn--primary__sm">test</button>
    </div>
    <div>
      <button class="btn--line">test</button>
      <button class="btn--line" disabled>test</button>
      <button class="btn--line__lg">test</button>
      <button class="btn--line__sm">test</button>
    </div>
    <div>
      <button class="btn--neutral">test</button>
      <button class="btn--neutral" disabled>test</button>
      <button class="btn--neline">test</button>
    </div>
    <div>
      <button class="btn--icon__play"></button>
    </div>
  </div>

  <div>
    <table class="board">
      <col />
      <col />
      <col />
      <thead>
        <tr>
          <td>test1</td>
          <td>test2</td>
          <td>test3</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="test in testItems" :key="test.id">
          <td>{{ test.id }}</td>
          <td class="t--left">
            <a href="">{{ test.data1 }}</a>
          </td>
          <td>{{ test.data2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testItems: [
        { id: 1, data1: 'test1', data2: '111' },
        {
          id: 2,
          data1: 'xxxx.yy.ecr.region.amazonaws.com/template.dimage-1.0.1',
          data2: '24-08-01\n16:00:01',
        },
        { id: 3, data1: 'test3', data2: '333' },
      ],
    }
  },
  computed: {
    processedItems() {
      // data2의 \n을 기준으로 줄바꿈 처리해 배열로 변환
      return this.testItems.map(item => ({
        ...item,
        data2:
          typeof item.data2 === 'string'
            ? item.data2.split('\n')
            : [item.data2],
      }))
    },
  },
}
</script>
