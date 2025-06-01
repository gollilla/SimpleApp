<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <a class="btn btn-ghost text-xl">{{ brandLogo }}</a>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <div 
                    tabindex="0" 
                    role="button" 
                    class="btn btn-square btn-ghost"
                    data-testid="menu-button"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        class="inline-block h-5 w-5 stroke-current"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </div>
                <ul 
                    tabindex="0" 
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    data-testid="menu-items"
                >
                    <li><a>メニュー項目 1</a></li>
                    <li><a>メニュー項目 2</a></li>
                    <li><a>メニュー項目 3</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    brandLogo?: string;
}

withDefaults(defineProps<Props>(), {
    brandLogo: 'ブランド名'
});
</script>