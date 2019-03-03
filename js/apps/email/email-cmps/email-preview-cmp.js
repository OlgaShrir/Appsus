//import utilService from '../../../services/utils-service.js'

export default {
    props: ['email', 'idx'],
    template: `
    <li @click.stop.prevent="markAsRead(email)" class="email-preview flex align-center justify-between cursor" :class="[email.isRead ? 'background-dark' : 'background-light' ]">
        <h3>{{email.from}}</h3>
        <div class="email-subj">{{email.subject}}</div>
        <div class="email-body">{{email.sentAt}} </div>

        <div class="flex ">
            <button class="delete-email fas fa-trash-alt" @click.stop.prevent="deleteEmail(email,idx)"></button>
            <button class="mark-as-unread fas fa-envelope-square"  @click.stop.prevent="markAsUnread(email)"></button>
        </div>
    </li>`

    //    <li @click.stop.prevent="markAsRead(email)" class="email-preview flex align-center justify-between cursor" :class="[email.isRead ? 'background-dark' : 'background-light' ]">
      
    //       <h3>{{email.from}}</h3>
    //       <div class="email-subj">{{email.subject}}</div>
    //       <div class="mobile-prev flex ">
    //          <div class="email-body">{{email.sentAt}} </div>
    //          <div class="mobile-buttons flex" >
    //             <button class="delete-email fas fa-trash-alt" @click.stop.prevent="deleteEmail(email,idx)"> </button>
    //             <button class="mark-as-unread fas fa-envelope-square"  @click.stop.prevent="markAsUnread(email)"></button>
    //       </div>
    //     </div>
    //   </li>
  ,

    methods: {
        markAsRead(email){
            if(!email.isRead)this.$emit('readEmail',email) 
        },
        deleteEmail(email ){
            this.$emit('deleteEmail', email)
        },
        markAsUnread(email){
            this.$emit('markAsUnread', email)  
        }

    },

    computed: {
        // formattedTime() {
        //      console.log (this.email.sentAt, typeof(this.email.sentAt))
        //      var timestamp=this.email.sentAt
        //      var time=utilService.timeConverter(timestamp)
        //     //var time =timstamp.toLocaleDateString()
        //     return time;
        // }
    }
}
