declare global {
  interface Window {
    showGiga: () => Promise<void>;
  }
}

export async function showRewardedAd() {
  try {
    if (!window.showGiga) {
      throw new Error("GigaPub não carregado.");
    }

    await window.showGiga();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}