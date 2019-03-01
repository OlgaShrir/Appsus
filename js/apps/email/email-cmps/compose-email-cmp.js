import emailService from '../email-services/email-service.js'

export default {
  template: `
  <section class="email-compose">
    <form class="flex column" @submit.prevent="onSave">
      <div class="compose-header flex">
        <h2>New message</h2>
        <div class="compose-heder-close flex">
          <i class="fas fa-expand-arrows-alt"></i>
          <i class="fas fa-times"></i>
        </div>
      </div>
     <input type="text" autofocus v-model="email.sentTo" placeholder="to"/>
      <div><input type="text" v-model="email.subject" placeholder="Subject"/></div>
      <textarea v-model="email.body"></textarea>
      <button type="submit" >Send</button>
    </form>
  </section>
  `,

  data() {
    return {
            email: {
            subject: null,
            body: null,
            sentTo: null,
            sentFrom: 'natalia@natlaia.com'
        }
    }
},
  
  methods: {
    onSave() {
      emailService.saveNewEmail(this.email.subject, this.email.body, this.email.sentFrom, this.email.sentTo );
      this.$emit('closeComposeEmail');
     
  },
  },
  
  components: {
     }
}