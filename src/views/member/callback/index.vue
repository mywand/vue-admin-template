<template>
  <div>{{ msg }}</div>
</template>
<script>
import { UserManager } from 'oidc-client'

export default {
  name: 'Callback',
  data() {
    return {
      msg: 'callback page'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // this.redirect = route.query && route.query.redirect
        new UserManager().signinRedirectCallback().then((user) => {
          window.location = '/'
          console.log(user)
          this.redirect = route.query && route.query.redirect
        }).catch((e) => {
          console.error(e)
        })
      },
      immediate: true
    }
  },
  methods: {
  }
}

</script>
