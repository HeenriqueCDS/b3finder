import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
    cluster: 'sa1'
  });

export { pusher };
