
export const NEW_ID = 'new';

export const ENTITY_TYPE = {
    USER_ROLE: 'USER_ROLE',
    CATEGORY: 'CATEGORY',
    USER: 'USER',
};

export const STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    PUBLISHED: 'PUBLISHED',
    UNPUBLISHED: 'UNPUBLISHED',
    DELETED: 'DELETED',
    DISABLED: 'DISABLED',
    ENABLED: 'ENABLED',
};

export const PERMISSION = {
    USER: {
        CREATE: 'create_user',
        UPDATE: 'update_user',
        DELETE: 'delete_user',
        ENABLE: 'enable_disable_user',
        DISABLE: 'enable_disable_user',
    },
    ROLE: {
        CREATE: 'create_role',
        UPDATE: 'update_role',
        DELETE: 'delete_role',
    },
    CATEGORY: {
        CREATE: 'create_update_category',
        UPDATE: 'create_update_category',
        DELETE: 'delete_category',
    },
};
