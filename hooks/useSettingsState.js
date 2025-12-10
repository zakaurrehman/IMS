
import { useState } from 'react';
import { saveDataSettings } from '../utils/utils';

// You can expand this hook with your actual settings logic as needed

function useSettingsState() {
    const [settings, setSettings] = useState({});
    const [compData, setCompData] = useState({ lng: 'English' });
    const [loading, setLoading] = useState(false);

    // Setter for updating settings
    const updateSettings = (newSettings) => {
        setSettings((prev) => ({ ...prev, ...newSettings }));
    };

    // Setter for updating compData (language, etc.)
    const updateCompData = (newData) => {
        setCompData((prev) => ({ ...prev, ...newData }));
    };

    // Save company data to Firestore
    const updateCompanyData = async (uidCollection) => {
        if (!uidCollection) return;
        await saveDataSettings(uidCollection, 'cmpnyData', compData);
    };
    return {
        settings,
        updateSettings,
        compData,
        setCompData: updateCompData,
        updateCompanyData,
        loading,
        setLoading,
    };
}

export default useSettingsState;

