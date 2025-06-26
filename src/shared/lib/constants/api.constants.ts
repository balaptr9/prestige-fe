export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        VERIFY: '/auth/verify',
        REFRESH_TOKEN: '/auth/refresh-token',
        FORGOT_PASSWORD: '/auth/get-otp',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD: '/auth/reset-password',
    },

    // User
    USER: {
        PROFILE: '/users/profile',
        UPDATE_PROFILE: '/users/profile',
        CHANGE_PASSWORD: '/users/change-password',
        UPLOAD_AVATAR: '/users/upload-avatar',
        DEACTIVATE: '/users/deactivate',
    },

    // Packages
    PACKAGES: {
        LIST: '/packages',
        DETAIL: (id: string) => `/packages/${id}`,
        CREATE: '/packages',
        UPDATE: (id: string) => `/packages/${id}`,
        DELETE: (id: string) => `/packages/${id}`,
    },

    // Tryout
    TRYOUT: {
        START: (packageId: string) => `/user-tests/${packageId}/start`,
        ANSWER: '/user-tests/answer',
        FINISH: (userTestId: string) => `/user-tests/${userTestId}/finish`,
        STATUS: (packageId: string) => `/user-tests/${packageId}/status`,
        SUMMARY: (userTestId: string) => `/user-tests/${userTestId}/summary`,
    },

    // Tryout Events
    TRYOUT_EVENTS: {
        LIST: '/tryout-events',
        DETAIL: (id: string) => `/tryout-events/${id}`,
        REGISTER: '/tryout-event-users/assign',
        CHECK_ACCESS: (id: string) => `/tryout-event-users/check/${id}`,
        CLAIM_VOUCHER: '/tryout-event-users/claim',
    },

    // Transactions
    TRANSACTIONS: {
        CREATE: '/purchase-transactions',
        LIST: '/purchase-transactions/my',
        DETAIL: (id: string) => `/purchase-transactions/${id}`,
        CHECK_STATUS: (id: string) => `/purchase-transactions/${id}/check`,
    },

    // Leaderboard
    LEADERBOARD: {
        BY_PACKAGE: (packageId: string) => `/leaderboards/${packageId}`,
    },

    // Master Data
    MASTER_DATA: {
        PROVINCES: '/locations/provinces',
        CITIES: '/locations/cities',
        INSTITUTIONS: '/institutions',
        POSITIONS: '/positions',
        EDUCATION_LEVELS: '/education-levels',
        MAJORS: '/majors',
        REFERRAL_SOURCES: '/referral-sources',
    },

    // Admin
    ADMIN: {
        USERS: '/users/admins',
        QUESTIONS: '/questions',
        PACKAGE_QUESTIONS: '/package-questions',
        TRANSACTIONS: '/purchase-transactions',
    },
} as const;