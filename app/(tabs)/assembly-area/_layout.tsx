import { Stack } from 'expo-router';

export default function AssembleAreaLayout() {
    return (
        <Stack
        screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Assembly Area',
                }}
            />
            <Stack.Screen
                name="instructions"
                options={{
                    title: 'Instructions',
                }}
            />
            <Stack.Screen
                name="refusals"
                options={{
                    title: 'Refusals',
                }}
            />
            <Stack.Screen
                name="person-with-disability"
                options={{
                    title: 'Person With Disability',
                }}
            />
            <Stack.Screen
                name="sign-of-danger"
                options={{
                    title: 'Sign of Danger',
                }}
            />
            <Stack.Screen
                name="additional-details"
                options={{
                    title: 'Additional Details',
                }}
            />
            <Stack.Screen
                name="media-files"
                options={{
                    title: 'Media Files',
                }}
            />
        </Stack>
    );
}