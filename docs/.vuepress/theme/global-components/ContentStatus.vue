<template>
  <main class="content-status">
    <div>
      <div class="col-6">
        <h3>{{ title }}</h3>
        <div class="content-status-status">
          <img src="../assets/status.png" />
        </div>
      </div>
      <div class="illustration col-6">
        <img src="../assets/pencil-rocket.svg" />
      </div>
    </div>

    <div class="content-status-vote">
      <h3>How important is this topic to you</h3>
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
    <h3>Info</h3>
    <div class="content-status-info">
      <div class="col-6">
        <h3>Help us write this!</h3>
        <p>
          Community contribu Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Quidem laudantium dolores ullam dolorem? Odio fugit consequuntur
          ipsam incidunt necessitatibus praesentium quidem voluptas, explicabo
          harum. Voluptatibus optio aliquam iste temporibus magnam.
        </p>
      </div>
      <div class="col-6">
        <h3>Be a docs tester</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          provident dolor neque ducimus autem blanditiis et accusantium, hic
          ipsa minima repellat ea recusandae nam officiis voluptates labore
          repudiandae! Voluptates, deleniti!
        </p>
      </div>
    </div>

    <div class="content-status-info">
      <h3>Other resources</h3>
      <p>Here's some content from around the web that you might find useful</p>
      <div>
        <div class="col-4">
          <h5>Tutorials</h5>
        </div>
        <div class="col-4">
          <h5>Video</h5>
        </div>
        <div class="col-4">
          <h5>Articles</h5>
        </div>
      </div>
    </div>
    {{ $page }}
  </main>
</template>

<script>
export default {
  computed: {
    status: function() {
      return (this.$frontmatter && this.$frontmatter.status) || 0
    }
  },
  props: {
    title: {
      type: String,
      default: 'This content is still preparing for liftoff!'
    }
  }
}
</script>

<style lang="stylus" scoped>
.col {
  box-sizing: border-box;
  float: left;
  padding-left: $gutterWidth;
  padding-right: $gutterWidth;
}

@media (min-width: $MQNarrow) {
  .col-6 {
    @extend .col;
    width: 50%;
  }

  .col-4 {
    @extend .col;
    width: 33%;
  }

  div {
    > .col-6:first-child, > .col-4:first-child {
      padding-left: 0;
    }

    > .col-6:last-child, > .col-4:last-child {
      padding-right: 0;
    }
  }

  .illustration {
    text-align: right;
  }
}

.content-status {
  border: 1px red;
}
</style>
