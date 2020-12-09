<template>
  <div>
    <p v-if="!files.length">No Files Found, Please Upload A File</p>
    <div class='image-list' v-else>
      <div v-for="file in files" :key='file'>
        <a :href="file" target="_blank">
          <img :src="file"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang='scss'>
  .image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  img {
    margin: 25px;
    width: 250px;
  }
</style>
