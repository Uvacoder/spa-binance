<template>
   <v-card
    class="mx-auto"
  >
    <v-list three-line>
      <template v-for="(item, index) in changedElements">
        <v-list-item
          :key="index"
        >
          <v-list-item-avatar>
            <v-icon>fa-exclamation</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item[0]}}: {{item[1]}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
 data: () => ({
      
      }),
  computed: {
      ...mapGetters(["changedElements"])
  },    
}
</script>

<style>

</style>