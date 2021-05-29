<template>
<div>
    {{ bar }}
</div>
</template>

<script>
import { ref, inject } from 'vue'

export default {
    setup() {
        console.log("Testing soccket")
        const socket = inject('socket')
        return { ...foo(socket) }
    }
}

function foo(socket) {
    console.log("foo");
    console.log(socket.id);
    const bar = ref('')
    socket.on('connect', ()=>{console.log("CONNECTED!!!")});
    socket.on('foo', (value) => {
        bar.value = value
    })
    socket.emit('identity', 100);

    socket.connect()


    return {
        bar
    }
}
</script>