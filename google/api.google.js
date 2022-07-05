import { google } from 'googleapis';
import auth from './auth.google.cjs';

export const getApiClient = async () => {
    const authClient = await auth.getAuthClient();

    const { spreadsheets: apiClient } = google.sheets({
        version: 'v4',
        auth: authClient,
    });

    return apiClient;
}
