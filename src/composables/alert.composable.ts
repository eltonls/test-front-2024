import { ref, computed } from "vue";

export default function useAlert() {
  const isAlertShown = ref(false);

  const showAlert = () => {
    isAlertShown.value = true;
  }

  const closeAlert = () => {
    isAlertShown.value = false;
  }

  return {
    isAlertShown,
    showAlert,
    closeAlert
  }
}
