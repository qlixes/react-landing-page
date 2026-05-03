import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

export const handler: Handler = async (event) => {

	const resend = new Resend(process.env.RESEND_API_KEY);
	const destination = process.env.MAIL_TO;

	// Hanya terima POST
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	try {
		const { name, company, email, country, message } = JSON.parse(event.body || '{}');

		// Validasi field wajib
		if (!name || !email || !country || !message) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'Required fields are missing.' }),
			};
		}

		const { data, error } = await resend.emails.send({
			from: 'onboarding@resend.dev', // ← ganti dengan domain yang sudah diverifikasi di Resend
			to: [destination],          // ← email perusahaan
			subject: `New Inquiry from ${name} — ${country}`,
			html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #d4af37; padding-bottom: 12px;">
            New Contact Inquiry
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px; font-size: 13px;">Full Name</td>
              <td style="padding: 8px 0; font-weight: 600; font-size: 13px;">${name}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Company</td>
              <td style="padding: 8px 0; font-size: 13px;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td>
              <td style="padding: 8px 0; font-size: 13px;">
                <a href="mailto:${email}" style="color: #d4af37;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 13px;">Country</td>
              <td style="padding: 8px 0; font-size: 13px;">${country}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <p style="color: #666; font-size: 13px; margin-bottom: 8px;">Message</p>
            <div style="background: #f8f9fa; padding: 16px; border-left: 3px solid #d4af37; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
              ${message}
            </div>
          </div>

          <p style="margin-top: 32px; font-size: 11px; color: #999;">
            Sent via Contact Form — PT. Sunsse Baru Indonesia
          </p>
        </div>
      `,
		});

		if (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ error: error.message }),
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true, id: data?.id }),
		};

	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Internal server error.' }),
		};
	}
};