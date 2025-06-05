<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({
    roles: Object,
});

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
});

/**
 * Submit form
 */
const submit = () => {
    form.post(route('admin.users.store'));
};
</script>

<template>
    <Head title="ユーザー追加" />

    <AdminLayout>
        <template #header>
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-800">ユーザー追加</h2>
                <Link :href="route('admin.users.index')" class="btn btn-outline">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    戻る
                </Link>
            </div>
        </template>

        <form @submit.prevent="submit" class="space-y-6">
            <!-- Name -->
            <div>
                <InputLabel for="name" value="名前" />
                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Email -->
            <div>
                <InputLabel for="email" value="メールアドレス" />
                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <!-- Password -->
            <div>
                <InputLabel for="password" value="パスワード" />
                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <!-- Confirm Password -->
            <div>
                <InputLabel for="password_confirmation" value="パスワード確認" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <!-- Role -->
            <div>
                <InputLabel for="role" value="ロール" />
                <select 
                    id="role" 
                    v-model="form.role" 
                    class="select select-bordered w-full max-w-xs mt-1"
                    required
                >
                    <option v-for="(label, value) in roles" :key="value" :value="value">
                        {{ label }}
                    </option>
                </select>
                <InputError class="mt-2" :message="form.errors.role" />
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    ユーザー作成
                </PrimaryButton>

                <Link :href="route('admin.users.index')">
                    <SecondaryButton type="button">
                        キャンセル
                    </SecondaryButton>
                </Link>
            </div>
        </form>
    </AdminLayout>
</template>