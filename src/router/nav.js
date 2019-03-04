const collection = {}
var id = 1

class nav {
  constructor(title, path) {
    this.navId = id++
    this.title = title
    this.path = path

    collection[this.navId] = this
  }

  addChild(nav) {
    if (nav) {
      nav.parentId = this.navId;
      (this.children = this.children || []).push(nav)
      console.log(this)
    }
    return this
  }

  addChildren(navs) {
    if (navs) {
      for (var i in arguments) {
        this.addChild(arguments[i])
      }
    }
    return this
  }

  getParent() {
    if (this.parentId) {
      return collection[this.parentId]
    }
  }
}

export default nav
