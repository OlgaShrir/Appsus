import {eventBus, EVENT_INBOX} from '../../../services/eventbus-service.js';

export default {
  template: `
      <section class="search-email">
       <button class="search-img" @click="emitFilter" v-model="filterBy.subject"></button>
          <input type="text" placeholder="search email" @keyup.enter="emitFilter" v-model="filterBy.subject" /> 
      </section> 
  `,
  data() {
      return {
          filterBy: {
              subject: ''
          }
      }
  },
  methods: {
      emitFilter() {
          console.log('Emitting to Parent');
          this.$emit('filtered', {...this.filterBy})
      }
  },
  created() {
    eventBus.$on(EVENT_INBOX, temp =>{
        this.filterBy.subject = '';
        this.emitFilter()
    })
}
}