/**
 * Encapsulamento das interações com as APIS do navegador
 */
export const notificationService = {
    /*
    * Permissão ao utilizador para enviar notificações
     */

    requestPermission: () => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    },
    /**
     * Mostra uma notificação nativa do browser
     * @param {string} title - O título da notificação
     * @param {string} options - Opções da notificação
     */
    showNotification: (title, options) => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            new Notification(title, options);
        }
    },
    /**
     * Atualiza o títula da aba para mostrar um contador de mensagens não lidas
     * @param {number} count - O núemmro de mensagens não lidas
     */
    updatePageTitle: (count) => {
        if (count > 0) {
            document.tile = `(${count}) FootChat `;
        } else {
            document.title = 'FootChat';
        }
    }
};