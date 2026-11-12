'use client';

class NotificationService {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      const res = await Notification.requestPermission();
      return res;
    } catch {
      return 'denied';
    }
  }

  notify(title: string, body: string, icon = '/whatsapp-logo.svg') {
    if (!this.isSupported()) return;
    if (Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          body,
          icon,
          badge: icon,
        });

        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      } catch {
        // Fallback if blocked
      }
    }
  }
}

export const notifications = new NotificationService();
