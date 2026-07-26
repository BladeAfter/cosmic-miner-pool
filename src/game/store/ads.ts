const MAX_ADS_PER_DAY = 5;
const GOLD_REWARD = 1000;

const STORAGE_KEY = "cosmic_ads";

interface AdsData {
  date: string;
  watched: number;
}

const isBrowser = () =>
  typeof window !== "undefined" &&
  typeof localStorage !== "undefined";

/**
 * O "dia" muda somente às 21:00.
 */
function getToday() {
  const now = new Date();

  const reset = new Date();
  reset.setHours(21, 0, 0, 0);

  if (now < reset) {
    reset.setDate(reset.getDate() - 1);
  }

  return reset.toDateString();
}

function saveAdsData(data: AdsData) {
  if (!isBrowser()) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAdsData(): AdsData {
  const defaultData: AdsData = {
    date: getToday(),
    watched: 0,
  };

  if (!isBrowser()) {
    return defaultData;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      saveAdsData(defaultData);
      return defaultData;
    }

    const data: AdsData = JSON.parse(saved);

    if (data.date !== getToday()) {
      const newData: AdsData = {
        date: getToday(),
        watched: 0,
      };

      saveAdsData(newData);
      return newData;
    }

    return data;
  } catch (err) {
    console.error("Erro ao ler dados dos anúncios:", err);

    saveAdsData(defaultData);
    return defaultData;
  }
}

export function canWatchAd(): boolean {
  return getAdsData().watched < MAX_ADS_PER_DAY;
}

export async function registerAdWatch(
  telegramId: string
): Promise<boolean> {
  if (!canWatchAd()) {
    return false;
  }

  try {
    const response = await fetch("/api/player/add-coins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        telegramId,
        amount: GOLD_REWARD,
      }),
    });

    if (!response.ok) {
      console.error("Erro ao adicionar coins.");
      return false;
    }

    const data = getAdsData();

    data.watched += 1;

    saveAdsData(data);

    return true;
  } catch (err) {
    console.error("Erro ao registrar anúncio:", err);
    return false;
  }
}

export function getAdsRemaining(): number {
  return Math.max(0, MAX_ADS_PER_DAY - getAdsData().watched);
}

export function getAdsProgress() {
  const data = getAdsData();

  return {
    watched: data.watched,
    remaining: Math.max(0, MAX_ADS_PER_DAY - data.watched),
    max: MAX_ADS_PER_DAY,
    reward: GOLD_REWARD,
    finished: data.watched >= MAX_ADS_PER_DAY,
  };
}

export const AD_REWARD = GOLD_REWARD;
export const MAX_DAILY_ADS = MAX_ADS_PER_DAY;