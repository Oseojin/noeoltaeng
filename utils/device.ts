export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("deviceId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("deviceId", id);
  }
  return id;
}

export async function getDeviceToken(): Promise<string> {
  const deviceId = getOrCreateDeviceId();
  const res = await fetch("/api/device-token", {
    method: "POST",
    body: JSON.stringify({ deviceId }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data.token;
}
