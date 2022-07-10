<script setup lang="ts">
</script>

<template>
    <div class="loading">
        <div class="dot-animation">
            <div class="dot"></div>
        </div>
        <div class="dot-animation">
            <div class="dot"></div>
        </div>
        
        <img class="absolute w-[75px] h-auto" src="~/assets/img/logo.png">
    </div>
</template>

<style>
.loading {
    @apply 
        absolute top-0 left-0 z-50
        w-full h-full bg-base-100
        flex justify-center items-center;
}

.dot-animation:nth-child(1) {
    --dot-color: theme('colors.primary-focus');
    @apply translate-x-2/4;
}

.dot-animation:nth-child(2) {
    --dot-color: theme('colors.secondary-focus');
    @apply -translate-x-2/4 rotate-180;
}

.dot {
    @apply 
        relative w-[130px] h-[130px]
        rounded-[50%] border-4 border-solid border-transparent;
    
    border-top-color: var(--dot-color, theme('colors.neutral-focus'));
    animation: animate 2s linear infinite;
}

.dot:before {
    @apply  absolute top-3 right-[2px] w-[18px] h-[18px] rounded-2xl;

    content: '';
    background-color: var(--dot-color, theme('colors.neutral-focus'));
    box-shadow: 0 0 32px 3px var(--dot-color, theme('colors.neutral-focus'));
}

@keyframes animate {
    from {
        transform: rotateZ(0deg);
    }

    to {
        transform: rotateZ(360deg);
    }
}
</style>