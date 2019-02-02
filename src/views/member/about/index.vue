<template>
  <div>
    <div>{{ msg }}</div>
    <div><img :src="avatar" class="user-avatar"></div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      msg: 'About page',
      avatar: require('@/assets/member/avatar/avatar-default.png')
    }
  }
}
</script>
