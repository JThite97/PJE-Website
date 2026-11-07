// Sends an enquiry from the Contact page or the Catalog enquiry modal.
//
// With VITE_WEB3FORMS_KEY set, the enquiry is posted to Web3Forms and lands
// in the office inbox. Without it, the visitor's email app opens with the
// enquiry already written, so nothing a visitor types is ever silently lost.

export const OFFICE_EMAIL = 'office@pjenterprise.in';

export type EnquiryResult = 'sent' | 'mailto';

export type EnquiryFields = Record<string, string>;

function buildMailto(subject: string, fields: EnquiryFields): string {
  const body = Object.entries(fields)
    .filter(([, v]) => v.trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  return `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function sendEnquiry(subject: string, fields: EnquiryFields): Promise<EnquiryResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey) {
    window.location.href = buildMailto(subject, fields);
    return 'mailto';
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: accessKey, subject, from_name: 'PJ Enterprise website', ...fields }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return 'sent';
}
