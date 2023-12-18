export const storage = {
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key) {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        try {
            return JSON.parse(item);
        } catch (e) {
            console.error(`Ошибка при чтении ${key} из localStorage:`, e);
            return null;
        }
    },
    removeItem(key) {
        localStorage.removeItem(key);
    }
};