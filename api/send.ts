import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Utility to escape HTML characters to prevent HTML injection in emails
 */
function escapeHtml(text: string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, event, message } = req.body;

    // 1. Server-side Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Tous les champs obligatoires sont requis.' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Adresse email invalide.' });
    }

    // Minimum message length
    if (message.trim().length < 10) {
      return res.status(400).json({ message: 'Le message doit contenir au moins 10 caractères.' });
    }

    // 2. Sanitization to prevent HTML Injection
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeEvent = event ? escapeHtml(event) : 'Non précisé';
    const safeMessage = escapeHtml(message);

    const data = await resend.emails.send({
      from: 'Flex-Life <onboarding@resend.dev>',
      to: ['delorjoel1@gmail.com'],
      subject: `Nouveau contact : ${safeEvent}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #000;">Nouveau message reçu !</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Événement :</strong> ${safeEvent}</p>
          <p><strong>Message :</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${safeMessage}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
