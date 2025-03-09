import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme, Icon } from 'react-native-paper';

type ErrorViewProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Icon source="alert-circle-outline" size={64} color={theme.colors.error} />
          <Text variant="titleLarge" style={styles.title}>
            Something went wrong
          </Text>
          <Text style={styles.message}>{message}</Text>
          {onRetry && (
            <Button mode="contained" onPress={onRetry} style={styles.button} icon="refresh">
              Try Again
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});
