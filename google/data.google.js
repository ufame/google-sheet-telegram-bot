export const getValuesData = async (apiClient, range, spreadsheet) => {
    const { data } = await apiClient.get({
        spreadsheetId: spreadsheet,
        ranges: range,
        fields: 'sheets',
        includeGridData: true
    });

    return data.sheets;
};