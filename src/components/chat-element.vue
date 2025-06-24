<template>
  <transition name="fade" appear>
    <div :class="containerClass">
      <span :class="textClass">
        <slot></slot>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ChatMessage",
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ["user", "bot"].includes(value)
    }
  },
  computed: {
    containerClass() {
      return this.type === "user" ? "userCONTAINER" : "botCONTAINER";
    },
    textClass() {
      return this.type === "user" ? "userTEXT" : "botTEXT";
    }
  }
};
</script>

<style scoped>
.botCONTAINER {
  display: flex;
  justify-content: start;
  margin: 10px 0 20px 0;
}
.botTEXT {
  background-color: var(--chatEs-color);
  max-width: 65%;
  padding: 10px;
  border-radius: var(--chatE-border-radius);
  font-size: 1rem;
  box-shadow: var(--chat-box-shadow);
  margin-left: 0.8rem;
}

.userCONTAINER {
  display: flex;
  justify-content: end;
  margin: 10px 0 10px 0;
}
.userTEXT {
  background-color: var(--chatEu-color);
  max-width: 65%;
  padding: 10px;
  border-radius: var(--chatE-border-radius);
  font-size: 1rem;
  box-shadow: var(--chat-box-shadow);
  margin-right: 0.8rem;
}

/* Slide Animation */
.fade-enter-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>