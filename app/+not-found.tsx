import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, useTheme, Icon } from 'react-native-paper';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Icon source="alert-circle-outline" size={64} color={theme.colors.primary} />
            <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
              Page Not Found
            </Text>
            <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
              The page you're looking for doesn't exist or has been moved.
            </Text>
            <Link href="/" asChild>
              <Button
                mode="contained"
                icon="home"
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}>
                Back to Home
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </View>
    </>
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
