export default {
  props: ['email', 'idx'],
  template: `
       <li class="email-preview flex align-center">
          <h3>{{email.subject}}</h3>
          <div class="email-body">{{email.body}}</div>
      </li>
  `,
  methods: {
  },
  computed: {
      
      },
      
  }
