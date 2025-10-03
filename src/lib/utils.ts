  export async function getActiveTalkers() {
    const now = new Date();
    // Cache lasts 10 minutes.
    const cacheBust = `${now.getDate()}-${now.getHours()}-${Math.floor(now.getMinutes() / 10)}`;

    const response = await fetch(`/api/check-ports?cb=${cacheBust}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  }

  export async function isTalkerActive(talker: Talker): Promise<boolean> {
    const activeTalkers = await getActiveTalkers();

    return activeTalkers.talkers.some(activeTalker => activeTalker.name === talker.name);
  }
