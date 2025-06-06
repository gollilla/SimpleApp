import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Index from './Index.vue';
import type { UserRole, UserStatus } from '@/types/inertia';

// モックコンポーネント
const mockAuthenticatedLayout = {
    name: 'AuthenticatedLayout',
    template: '<div><slot /><slot name="header" /></div>'
};

const mockHead = {
    name: 'Head',
    props: ['title'],
    template: '<div></div>'
};

const mockUserStatusBadge = {
    name: 'UserStatusBadge',
    props: ['status'],
    template: '<div>{{ status }}</div>'
};

describe('MyPage/Index', () => {
    const mockUser = {
        id: 1,
        name: 'テストユーザー',
        email: 'test@example.com',
        role: 'user' as UserRole,
        status: 'active' as UserStatus,
        created_at: '2025年1月1日',
        email_verified_at: '2025年1月1日 10:00'
    };

    const createWrapper = (props = {}) => {
        return mount(Index, {
            props: {
                user: mockUser,
                ...props
            },
            global: {
                components: {
                    AuthenticatedLayout: mockAuthenticatedLayout,
                    Head: mockHead,
                    UserStatusBadge: mockUserStatusBadge
                }
            }
        });
    };

    it('ユーザー情報が正しく表示される', () => {
        const wrapper = createWrapper();
        
        expect(wrapper.text()).toContain('マイページ');
        expect(wrapper.text()).toContain('プロフィール情報');
        expect(wrapper.text()).toContain(mockUser.name);
        expect(wrapper.text()).toContain(mockUser.email);
        expect(wrapper.text()).toContain('一般ユーザー');
        expect(wrapper.text()).toContain(mockUser.created_at);
        expect(wrapper.text()).toContain('2025年1月1日 10:00');
    });

    it('メール未認証の場合、未認証と表示される', () => {
        const wrapper = createWrapper({
            user: {
                ...mockUser,
                email_verified_at: null
            }
        });
        
        expect(wrapper.text()).toContain('未認証');
    });

    it('異なるロールが正しく日本語表示される', () => {
        const roles: Array<[UserRole, string]> = [
            ['admin', '管理者'],
            ['moderator', 'モデレーター'],
            ['user', '一般ユーザー'],
            ['guest', 'ゲスト']
        ];

        roles.forEach(([role, display]) => {
            const wrapper = createWrapper({
                user: { ...mockUser, role }
            });
            expect(wrapper.text()).toContain(display);
        });
    });

    it('アクティビティセクションが表示される', () => {
        const wrapper = createWrapper();
        
        expect(wrapper.text()).toContain('最近のアクティビティ');
        expect(wrapper.text()).toContain('アクティビティ機能は今後実装予定です。');
    });

    it('統計情報セクションが表示される', () => {
        const wrapper = createWrapper();
        
        expect(wrapper.text()).toContain('統計情報');
        expect(wrapper.text()).toContain('ログイン回数');
        expect(wrapper.text()).toContain('最終ログイン');
        expect(wrapper.text()).toContain('アカウント使用日数');
        expect(wrapper.text()).toContain('統計機能は今後実装予定です。');
    });
});