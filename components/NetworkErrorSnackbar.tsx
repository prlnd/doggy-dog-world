import { useState, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';

type NetworkErrorSnackbarProps = {
  networkError: unknown;
  visible: boolean;
};

export default function NetworkErrorSnackbar({ networkError, visible }: NetworkErrorSnackbarProps) {
  const errorMessage =
    networkError instanceof Error ? networkError.message : 'Something went wrong';
  const [snackbarVisible, setSnackbarVisible] = useState(visible);

  useEffect(() => {
    setSnackbarVisible(visible);
  }, [visible]);

  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      action={{
        label: 'Dismiss',
        onPress: () => setSnackbarVisible(false),
      }}
      duration={5000}>
      {errorMessage}
    </Snackbar>
  );
}
