export function getClientLogoDataUri(clientName: string): string {
  const initials = clientName.slice(0, 4);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="96" viewBox="0 0 240 96" role="img" aria-label="${clientName} logo">
      <rect width="240" height="96" rx="10" fill="#ffffff"/>
      <rect x="0.5" y="0.5" width="239" height="95" rx="9.5" fill="none" stroke="#d8d8d2"/>
      <text x="120" y="54" text-anchor="middle" font-family="Arial, 'Microsoft YaHei', sans-serif" font-size="22" font-weight="700" fill="#1c1c1a">${escapeSvgText(initials)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeSvgText(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
