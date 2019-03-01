//import utilService from '../../../services/utils-service.js'

export default {
    props: ['email', 'idx'],
    template: `
       <li class="email-preview flex align-center">
          <h3>{{email.subject}}</h3>
          <div class="email-body">{{email.body}}</div>
          <div class="email-body">{{formattedTime}} </div>
      </li>
  `,

    methods: {
    },
    computed: {
        formattedTime() {
             console.log (this.email.sentAt)
            var time =this.email.sentAt.toLocaleDateString()
            return time;
        },
    }
}
