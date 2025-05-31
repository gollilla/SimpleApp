<template>
    <div class="test-counter">
        <h2 class="text-2xl font-bold mb-4">カウンターテスト</h2>
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <p class="text-lg mb-4">現在のカウント: {{ count }}</p>
                <div class="card-actions">
                    <button 
                        @click="increment"
                        class="btn btn-primary"
                        data-testid="increment-btn"
                    >
                        カウントアップ
                    </button>
                    <button 
                        @click="decrement"
                        class="btn btn-secondary"
                        data-testid="decrement-btn"
                    >
                        カウントダウン
                    </button>
                    <button 
                        @click="reset"
                        class="btn btn-outline"
                        data-testid="reset-btn"
                    >
                        リセット
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
    count.value++;
};

const decrement = () => {
    count.value--;
};

const reset = () => {
    count.value = 0;
};
</script>