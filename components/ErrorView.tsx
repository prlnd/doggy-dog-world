import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme, Icon } from 'react-native-paper';

type ErrorViewProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorView({ message, onRetry }: ErrorViewProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Icon source="alert-circle-outline" size={64} color={theme.colors.primary} />
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            Something went wrong
          </Text>
          <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>{message}</Text>
          {onRetry && (
            <Button
              mode="contained"
              onPress={onRetry}
              icon="refresh"
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}>
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
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
