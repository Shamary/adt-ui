// utils/auth.ts
import Cookies from 'js-cookie';

export const getUserRoles = () => {
    const token = Cookies.get('access_token');
    if (!token) return [];

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        // Check both realm_access and resource_access for roles
        const realmRoles = payload.realm_access?.roles || [];
        const resourceRoles = payload.resource_access?.['adt-client']?.roles || [];

        return [...realmRoles, ...resourceRoles];
    } catch (error) {
        console.error('Error decoding token:', error);
        return [];
    }
};

export const isAdmin = () => {
    const roles = getUserRoles();
    return roles.includes('ADMIN');
};