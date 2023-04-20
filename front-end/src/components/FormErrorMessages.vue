<template>
  <v-layout
    v-if="messages"
    row
    wrap >
    <v-flex
      :class="[`xs${width}`,`offset-xs${offset}`]"
      offset-xs2
    >
      <v-alert
        :value="true"
        type="error"
        outline
        dismissible>

        <p v-if="typeof messages ==='string'">
          {{ messages }}
        </p>
        <ul v-if="typeof messages ==='object'">
          <li
            v-for="error in getMessages"
            :key="error">
            {{ error }}
          </li>
        </ul>
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "FormErrors",
  props: {
    messages: {
      type: [Object, String],
      default: () => null
    },
    offset: {
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 8
    }
  },
  computed: {
    getMessages() {
      let allErrors = [];
      const { messages } = this;
      Object.keys(messages).forEach(key => {
        const e = messages[key].map(item => `${key}: ${item.toString()}`);
        allErrors = allErrors.concat(e);
      });
      return allErrors;
    }
  }
};
</script>

<style>
</style>
