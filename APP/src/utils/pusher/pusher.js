import Pusher from 'pusher-js/dist/web/pusher';

const pusher = new Pusher('63c49120447f571743df', {
    cluster: 'ap1'
})

export default pusher;