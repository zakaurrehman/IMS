export const getCur = async (date) => {
  const url = 'https://openexchangerates.org/api/historical/' + date + '.json?app_id=' + process.env.NEXT_PUBLIC_OPENEXCHANGERATES_APP_ID;

  try {
    const response = await fetch(url);
    if (response.status === 400) {
      return 1.05;
    }
    if (!response.ok) {
      console.warn('getCur: unexpected response', response.status);
      return 1; // fallback
    }

    const data = await response.json();
    const eurRate = data?.rates?.EUR;
    if (!eurRate) return 1;
    return +(1 / eurRate).toFixed(4);
  } catch (error) {
    console.error('getCur error:', error);
    return 1;
  }
}

